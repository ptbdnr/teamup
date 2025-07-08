// src/ai/flows/profile-data-collection.ts
'use server';

/**
 * @fileOverview AI-powered profile data collection flow using a chat interface.
 *
 * This file defines a Genkit flow that allows users to input their skills and interests
 * through a chat interface, simplifying the profile completion process.
 *
 * @interface ProfileDataCollectionInput - Input schema for the profile data collection flow.
 * @interface ProfileDataCollectionOutput - Output schema for the profile data collection flow.
 * @function profileDataCollection - The main function to initiate the profile data collection flow.
 */

import { groqChatCompletion } from '@/ai/groq';

export type ProfileDataCollectionInput = {
  query: string;
  existingProfileData?: string;
  chatHistory?: { role: string; content: string }[];
};

export type ProfileDataCollectionOutput = {
  updatedProfileData: string;
  assistantResponse: string;
};

export async function profileDataCollection(input: ProfileDataCollectionInput): Promise<ProfileDataCollectionOutput> {
  console.log('[profileDataCollection] input:', input);
  // Compose the prompt for Groq LLM
  const systemPrompt = `You are an AI assistant helping users prepare for a hackathon team formation. Your main goal is to support the user in a natural, helpful conversation.

Current profile data: ${input.existingProfileData || ''}

- Start by asking one or two friendly, open-ended questions about the user's background, interests, or ideas.
- If the user gives a vague or non-informative answer (like "anything", "whatever", "I don't know"), do NOT start over or repeat all questions. Instead, gently acknowledge their answer, offer to help with suggestions, or ask if they'd like to add anything else.
- If the user seems done, bored, or gives short/vague answers, gracefully wrap up the conversation, thank them, and let them know they can update their profile later.
- Never force the user to answer every field. It's OK if some fields are left empty.
- Only ask follow-up questions if the user seems interested or engaged.
- If the user provides new info, merge it with previous profile data.
- Never repeat questions that have already been answered.
- If all fields are filled or the user seems finished, thank them and end the chat.
- Always preserve all relevant context and details from the user's messages.
- Respond in a friendly, supportive, and concise way.
- Before ending the conversation, if the 'wantsToLead' field is still empty, ask the user (in a friendly, non-intrusive way) if they would be interested in leading a team or taking a leadership role. If they answer, update the field accordingly.

Always respond with a valid JSON object following this schema:
{
  "updatedProfileData": {
    "backgroundTechnologies": "string or empty",
    "interests": "string or empty",
    "hackathonIdeas": "string or empty",
    "wantsToLead": "string or empty"
  },
  "assistantResponse": "your conversational response to the user"
}
If you cannot answer in JSON, wrap your entire response in a JSON object as described, even if it's just a greeting.`;

  let messages;
  if (input.chatHistory && Array.isArray(input.chatHistory) && input.chatHistory.length > 0) {
    // Limit chat history to last 10 messages
    let trimmedHistory = input.chatHistory.slice(-10);
    // Add JSON-format reminder to the latest user message
    trimmedHistory = trimmedHistory.map((msg, idx, arr) => {
      if (msg.role === 'user' && idx === arr.length - 1) {
        return {
          ...msg,
          content: msg.content + '\n\nRemember: Always respond in the required JSON format as described in the system prompt.'
        };
      }
      return msg;
    });
    messages = [
      { role: 'system', content: systemPrompt },
      ...trimmedHistory,
    ];
  } else {
    messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Existing profile data: ${input.existingProfileData || ''}\nUser query: ${input.query}\n\nRemember: Always respond in the required JSON format as described in the system prompt.` },
    ];
  }

  let completion: any;
  try {
    console.log('[messages sent], ', messages);
    completion = await groqChatCompletion({
      messages,
      model: 'llama3-70b-8192',
      temperature: 0.2,
    });
    console.log('[profileDataCollection] Groq completion:', completion);
  } catch (err) {
    console.error('[profileDataCollection] Groq API error:', err);
    throw err;
  }

  // Robust JSON extraction
  let updatedProfileData = '';
  let assistantResponse = '';
  const content = completion.choices?.[0]?.message?.content || '';
  console.log('[profileDataCollection] raw content:', content);
  let jsonString = '';
  let parsingError = false;
  try {
    // Try to extract JSON from code block
    const codeBlockMatch = content.match(/```json[\s\n]*([\s\S]+?)```/i) || content.match(/```[\s\n]*([\s\S]+?)```/i);
    if (codeBlockMatch) {
      jsonString = codeBlockMatch[1];
      console.log('[profileDataCollection] extracted from code block:', jsonString);
    } else {
      // Fallback: extract first {...} block
      const curlyMatch = content.match(/\{[\s\S]*\}/);
      if (curlyMatch) {
        jsonString = curlyMatch[0];
        console.log('[profileDataCollection] extracted from curly braces:', jsonString);
      } else {
        throw new Error('No JSON object found in response');
      }
    }
    const parsed = JSON.parse(jsonString);
    assistantResponse = parsed.assistantResponse || '';
    // Robust merge: preserve previous fields unless updated
    let prev: Record<string, any> = {};
    let next: Record<string, any> = {};
    try {
      prev = input.existingProfileData && typeof input.existingProfileData === 'string' ? JSON.parse(input.existingProfileData) : (input.existingProfileData || {});
    } catch {}
    try {
      next = parsed.updatedProfileData && typeof parsed.updatedProfileData === 'string' ? JSON.parse(parsed.updatedProfileData) : (parsed.updatedProfileData || {});
    } catch {}
    const merged = {
      backgroundTechnologies: next.backgroundTechnologies || prev.backgroundTechnologies || '',
      interests: next.interests || prev.interests || '',
      hackathonIdeas: next.hackathonIdeas || prev.hackathonIdeas || '',
      wantsToLead: next.wantsToLead || prev.wantsToLead || '',
    };
    updatedProfileData = JSON.stringify(merged);
  } catch (e) {
    parsingError = true;
    console.error('[profileDataCollection] Parsing error:', e, content);
    assistantResponse = 'Sorry, there was an error processing the AI response. Please try again.';
    // Keep previous profile data if available
    updatedProfileData = input.existingProfileData || '';
  }

  console.log('[profileDataCollection] output:', { updatedProfileData, assistantResponse });
  return {
    updatedProfileData,
    assistantResponse,
  };
}
