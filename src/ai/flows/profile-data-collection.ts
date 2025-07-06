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
  const systemPrompt = `You are an AI profile assistant designed to help users quickly and easily input their skills and interests.\n\nYour goal is to extract skills and interests from the user's input and update their profile data.\n\nThe user will provide input through a chat interface. Use that input to gather the relevant information.\n\nExisting profile data: {{{existingProfileData}}}\n\nUser query: {{{query}}}\n\nBased on the user's query and any existing profile data, update the profile data with new skills and interests. Make sure to retain all existing data and just add or update based on the query. If no profile data exists, create the profile data.\n\nThen, provide a brief, friendly, and conversational response to the user.\n\nRespond ONLY with a valid JSON object with the following shape and nothing else:\n{ updatedProfileData: string, assistantResponse: string }`;

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
