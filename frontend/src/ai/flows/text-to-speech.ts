// src/ai/flows/text-to-speech.ts
'use server';
/**
 * @fileOverview A text-to-speech AI flow using Groq API.
 *
 * - textToSpeech - A function that converts text to speech audio.
 */
import { groqTextToSpeech } from '@/ai/groq';
import { Readable } from 'stream';

export async function textToSpeech(text: string) {
  const audio = await groqTextToSpeech({
    text,
    model: 'playai-tts',
    voice: 'Arista-PlayAI',
    response_format: 'wav',
  });

  let audioBuffer: Buffer;
  if (audio instanceof Buffer) {
    audioBuffer = audio;
  } else if (audio.arrayBuffer) {
    // Blob or File in browser/edge
    audioBuffer = Buffer.from(await audio.arrayBuffer());
  } else if (typeof Response !== 'undefined' && audio instanceof Response && audio.body) {
    // If audio is a fetch Response (Node.js or edge), read the stream
    const chunks: Buffer[] = [];
    const stream = Readable.from(audio.body as any);
    for await (const chunk of stream) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }
    audioBuffer = Buffer.concat(chunks);
  } else {
    throw new Error('Unknown audio type returned from Groq TTS');
  }

  return {
    media: 'data:audio/wav;base64,' + audioBuffer.toString('base64'),
  };
}
