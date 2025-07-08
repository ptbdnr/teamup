'use server';

import { profileDataCollection } from '@/ai/flows/profile-data-collection';
import { transcribeAudio as transcribeAudioFlow } from '@/ai/flows/speech-to-text';
import { textToSpeech as textToSpeechFlow } from '@/ai/flows/text-to-speech';
import { z } from 'zod';

const formSchema = z.object({
  query: z.string().min(1, 'Message cannot be empty.'),
  existingProfileData: z.string().optional(),
  chatHistory: z.string().optional(),
});

export async function getAiProfileUpdate(prevState: any, formData: FormData) {
  const validatedFields = formSchema.safeParse({
    query: formData.get('query'),
    existingProfileData: formData.get('existingProfileData'),
    chatHistory: formData.get('chatHistory'),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      error: 'Invalid input.',
    };
  }

  try {
    // Parse chatHistory if present
    let chatHistoryArr = [];
    if (validatedFields.data.chatHistory) {
      try {
        chatHistoryArr = JSON.parse(validatedFields.data.chatHistory);
      } catch {}
    }
    const result = await profileDataCollection({
      ...validatedFields.data,
      chatHistory: chatHistoryArr,
    });

    return {
      error: null,
      updatedProfileData: result.updatedProfileData,
      assistantResponse: result.assistantResponse,
    };
  } catch (error) {
    console.error('AI flow error:', error);
    return {
      ...prevState,
      error: 'An error occurred while talking to the AI. Please try again.',
    };
  }
}

const transcribeSchema = z.object({
  audioDataUri: z.string(),
});

export async function transcribeAudio(formData: FormData) {
    const validatedFields = transcribeSchema.safeParse({
        audioDataUri: formData.get('audioDataUri'),
    });

    if (!validatedFields.success) {
        return { error: 'Invalid audio data.' };
    }

    try {
        const { transcript } = await transcribeAudioFlow(validatedFields.data);
        return { transcript, error: null };
    } catch (error) {
        console.error('Transcription error:', error);
        return { error: 'Failed to transcribe audio.' };
    }
}

const speechSchema = z.object({
    text: z.string(),
});

type TTSResult = { media: string } | null;

export async function textToSpeech(text: string) {
  return textToSpeechFlow(text);
}

export async function synthesizeSpeech(formData: FormData) {
    const validatedFields = speechSchema.safeParse({
        text: formData.get('text'),
    });
    
    if (!validatedFields.success) {
        return { error: 'Invalid text for speech synthesis.' };
    }

    if (!validatedFields.data.text) {
        return { audioDataUri: null, error: null };
    }

    try {
        const result = await textToSpeech(validatedFields.data.text);
        if (!result) {
          return { audioDataUri: null, error: null };
        }
        const { media } = result;
        return { audioDataUri: media, error: null };
    } catch (error) {
        console.error('TTS error:', error);
        return { error: 'Failed to synthesize speech.' };
    }
}
