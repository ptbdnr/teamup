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

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProfileDataCollectionInputSchema = z.object({
  query: z.string().describe('The user query to the AI profile assistant.'),
  existingProfileData: z
    .string()
    .optional()
    .describe('Existing profile data, if any, to be augmented.'),
});
export type ProfileDataCollectionInput = z.infer<typeof ProfileDataCollectionInputSchema>;

const ProfileDataCollectionOutputSchema = z.object({
  updatedProfileData: z
    .string()
    .describe('The updated profile data containing skills and interests.'),
  assistantResponse: z
    .string()
    .describe("The assistant's conversational response to the user."),
});
export type ProfileDataCollectionOutput = z.infer<typeof ProfileDataCollectionOutputSchema>;

export async function profileDataCollection(input: ProfileDataCollectionInput): Promise<ProfileDataCollectionOutput> {
  return profileDataCollectionFlow(input);
}

const profileDataCollectionPrompt = ai.definePrompt({
  name: 'profileDataCollectionPrompt',
  input: {schema: ProfileDataCollectionInputSchema},
  output: {schema: ProfileDataCollectionOutputSchema},
  prompt: `You are an AI profile assistant designed to help users quickly and easily input their skills and interests.

  Your goal is to extract skills and interests from the user's input and update their profile data.

  The user will provide input through a chat interface. Use that input to gather the relevant information.

  Existing profile data: {{{existingProfileData}}}

  User query: {{{query}}}

  Based on the user's query and any existing profile data, update the profile data with new skills and interests. Make sure to retain all existing data and just add or update based on the query. If no profile data exists, create the profile data.

  Then, provide a brief, friendly, and conversational response to the user. For example, you can confirm what you've added and ask if there's anything else they'd like to include.

  Return the updated profile data in the 'updatedProfileData' field.
  Return your conversational response in the 'assistantResponse' field.
`,
});

const profileDataCollectionFlow = ai.defineFlow(
  {
    name: 'profileDataCollectionFlow',
    inputSchema: ProfileDataCollectionInputSchema,
    outputSchema: ProfileDataCollectionOutputSchema,
  },
  async input => {
    const {output} = await profileDataCollectionPrompt(input);
    return output!;
  }
);
