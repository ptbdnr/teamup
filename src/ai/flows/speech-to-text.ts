// src/ai/flows/speech-to-text.ts
'use server';
/**
 * @fileOverview A speech-to-text AI flow.
 *
 * - transcribeAudio - A function that transcribes audio.
 * - TranscribeAudioInput - The input type for the transcribeAudio function.
 * - TranscribeAudioOutput - The return type for the transcribeAudio function.
 */
import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranscribeAudioInputSchema = z.object({
    audioDataUri: z
    .string()
    .describe(
      "An audio recording, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type TranscribeAudioInput = z.infer<typeof TranscribeAudioInputSchema>;

const TranscribeAudioOutputSchema = z.object({
  transcript: z.string().describe('The transcribed text from the audio.'),
});
export type TranscribeAudioOutput = z.infer<typeof TranscribeAudioOutputSchema>;


const sttPrompt = ai.definePrompt({
    name: 'sttPrompt',
    input: { schema: TranscribeAudioInputSchema },
    output: { schema: TranscribeAudioOutputSchema },
    prompt: `You are a highly accurate speech-to-text transcription service.
    Transcribe the following audio and return the text in the 'transcript' field.
    Audio: {{media url=audioDataUri}}`,
});


const speechToTextFlow = ai.defineFlow(
  {
    name: 'speechToTextFlow',
    inputSchema: TranscribeAudioInputSchema,
    outputSchema: TranscribeAudioOutputSchema,
  },
  async (input) => {
    const {output} = await sttPrompt(input);
    return output!;
  }
);

export async function transcribeAudio(input: TranscribeAudioInput): Promise<TranscribeAudioOutput> {
    return speechToTextFlow(input);
}
