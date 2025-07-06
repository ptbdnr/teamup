import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Text Generation (Chat Completion)
export async function groqChatCompletion({ messages, model = 'llama3-70b-8192', ...rest }: {
  messages: { role: string; content: string }[];
  model?: string;
  [key: string]: any;
}) {
  // Cast messages as any[] for type safety (SDK does not export the type)
  return groq.chat.completions.create({
    model,
    messages: messages as any[],
    ...rest,
  });
}

// Helper to convert Buffer to File-like object for SDK
function bufferToFile(buffer: Buffer, filename = 'audio.wav', mime = 'audio/wav') {
  // If File is available (browser/edge), use it
  if (typeof File !== 'undefined') {
    return new File([buffer], filename, { type: mime });
  }
  // Node.js: use a Blob and add a name property
  const blob: any = new Blob([buffer], { type: mime });
  blob.name = filename;
  return blob;
}

// Speech-to-Text (Transcription)
export async function groqSpeechToText({ file, model = 'whisper-large-v3-turbo', ...rest }: {
  file: Buffer;
  model?: string;
  [key: string]: any;
}) {
  const fileLike = bufferToFile(file);
  return groq.audio.transcriptions.create({
    file: fileLike,
    model,
    ...rest,
  });
}

// Text-to-Speech
export async function groqTextToSpeech({ text, model = 'playai-tts', voice = 'Arista-PlayAI', ...rest }: {
  text: string;
  model?: string;
  voice?: string;
  [key: string]: any;
}) {
  return groq.audio.speech.create({
    model,
    input: text,
    voice,
    ...rest,
  });
} 