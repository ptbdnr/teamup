'use server';

import { profileDataCollection } from '@/ai/flows/profile-data-collection';
import { z } from 'zod';

const formSchema = z.object({
  query: z.string().min(1, 'Message cannot be empty.'),
  existingProfileData: z.string().optional(),
});

export async function getAiProfileUpdate(prevState: any, formData: FormData) {
  const validatedFields = formSchema.safeParse({
    query: formData.get('query'),
    existingProfileData: formData.get('existingProfileData'),
  });

  if (!validatedFields.success) {
    return {
      error: 'Invalid input.',
      updatedProfileData: prevState.updatedProfileData || '',
    };
  }

  try {
    const result = await profileDataCollection(validatedFields.data);
    return {
      error: null,
      updatedProfileData: result.updatedProfileData,
    };
  } catch (error) {
    console.error('AI flow error:', error);
    return {
      error: 'An error occurred while talking to the AI. Please try again.',
      updatedProfileData: prevState.updatedProfileData || '',
    };
  }
}
