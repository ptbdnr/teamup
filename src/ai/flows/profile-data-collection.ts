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
};

export type ProfileDataCollectionOutput = {
  updatedProfileData: string;
  assistantResponse: string;
};

export async function profileDataCollection(input: ProfileDataCollectionInput): Promise<ProfileDataCollectionOutput> {
  console.log('[profileDataCollection] input:', input);
  // Compose the prompt for Groq LLM
  const systemPrompt = `You are an AI assistant helping users prepare for a hackathon team formation. Your main goal is to support the user in a natural, helpful conversation. You can:

- Answer questions, provide suggestions, or brainstorm ideas if the user asks.
- Encourage and support the user, not just ask questions.
- If the user provides new info about their background, interests, ideas, or leadership preference, update the profile accordingly.
- Always parse the user's latest message for any new info about background technologies, interests, hackathon ideas, or leadership preference. If you find new info, add it to the relevant field in updatedProfileData, merging with previous data.
- If the user repeats info, keep the most recent or merge as appropriate.
- If the user's latest message answers a missing field, update that field and do not ask about it again.
- If all fields are filled, thank the user and offer to update or add more, but do not repeat questions.
- If the user answers about leadership (e.g., 'yes, I can', 'no', 'maybe'), set 'wantsToLead' accordingly and do not ask again unless the user wants to change it.
- If the user seems ready or the conversation lulls, gently ask about any missing profile fields.
- Never force the user to answer anything; everything is optional.
- When updating profile fields, always preserve all relevant context, keywords, and details from the user's message. Do not generalize or omit important information.
- For hackathon ideas, always include the full context (e.g., 'football project to improve Player's performance', not just 'improve Player's performance').
- If the user provides a word or phrase that matches a technology (e.g., React, Redux), put it in 'backgroundTechnologies'.
- If the user provides a word or phrase that matches a topic, hobby, or area of interest (e.g., football, AI, fintech), put it in 'interests'.
- Only put something in 'hackathonIdeas' if the user describes a specific project idea or goal, not just a topic or interest.

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

  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: `Existing profile data: ${input.existingProfileData || ''}\nUser query: ${input.query}` },
  ];

  let completion: any;
  try {
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
    updatedProfileData = parsed.updatedProfileData || '';
    assistantResponse = parsed.assistantResponse || '';
  } catch (e) {
    console.error('[profileDataCollection] Parsing error:', e, content);
    assistantResponse = content;
  }

  console.log('[profileDataCollection] output:', { updatedProfileData, assistantResponse });
  return {
    updatedProfileData,
    assistantResponse,
  };
}
