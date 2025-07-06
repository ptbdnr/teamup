// src/ai/flows/speech-to-text.ts
'use server';
/**
 * @fileOverview A speech-to-text AI flow using Groq API.
 *
 * - transcribeAudio - A function that transcribes audio.
 * - TranscribeAudioInput - The input type for the transcribeAudio function.
 * - TranscribeAudioOutput - The return type for the transcribeAudio function.
 */
import { groqSpeechToText } from '@/ai/groq';

export type TranscribeAudioInput = {
  audioDataUri: string; // data URI: 'data:<mimetype>;base64,<encoded_data>'
};

export type TranscribeAudioOutput = {
  transcript: string;
};

function dataUriToBuffer(dataUri: string): Buffer {
  const base64 = dataUri.split(',')[1];
  return Buffer.from(base64, 'base64');
}

export async function transcribeAudio(input: TranscribeAudioInput): Promise<TranscribeAudioOutput> {
  const fileBuffer = dataUriToBuffer(input.audioDataUri);
  const result = await groqSpeechToText({
    file: fileBuffer,
    model: 'whisper-large-v3-turbo',
    response_format: 'json',
    language: 'en',
  }) as any;
  return {
    transcript: result.text || '',
  };
}
