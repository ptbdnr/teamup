'use client';


import { useState, useTransition, useRef, useEffect, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import Link from 'next/link';
import { useProfileContext } from '@/contexts/ProfileContext';


import { getAiProfileUpdate, transcribeAudio, synthesizeSpeech } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { Mic, MicOff, Send, User, Bot, Sparkles, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import styles from './ProfileForms.module.css';


type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" disabled={pending}>
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
      <span className="sr-only">Send</span>
    </Button>
  );
}


function humanLabel(key: string): string {
  switch (key) {
    case 'backgroundTechnologies': return 'Background Technologies';
    case 'interests': return 'Interests';
    case 'hackathonIdeas': return 'Hackathon Ideas';
    case 'wantsToLead': return 'Wants To Lead';
    default:
      // Fallback: split camelCase to words
      return key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
  }
}

function renderProfileSummary(
  profile: string | Record<string, unknown> | null | undefined
): React.ReactNode {
  if (!profile || (typeof profile === 'string' && (!profile.trim() || profile.trim() === '{}'))) {
    return <span>Your profile is empty. Start by telling the AI about your skills!</span>;
  }
  let obj = profile;
  if (typeof profile === 'string') {
    try {
      obj = JSON.parse(profile);
    } catch {
      return <span>{profile}</span>;
    }
  }
  if (!obj || typeof obj !== 'object') return <span>Your profile is empty. Start by telling the AI about your skills!</span>;
  const entries = Object.entries(obj).filter(([_, v]) => v && v !== '' && v !== 'string or empty');
  if (entries.length === 0) return <span>Your profile is empty. Start by telling the AI about your skills!</span>;
  return (
    <ul className="list-disc pl-4">
      {entries.map(([k, v]) => (
        <li key={k}><b>{humanLabel(k)}:</b> {String(v)}</li>
      ))}
    </ul>
  );
}

export function ProfileForm() {
  const { profile, isLoading, setProfile } = useProfileContext();
  
  const initialState: {
    error: string | null;
    updatedProfileData: string;
    assistantResponse?: string;
  } = {
    error: null,
    updatedProfileData: profile?.dataAiHint || 'Your profile is empty. Start by telling the AI about your skills!',
    assistantResponse: '',
  };

  const [state, formAction] = useActionState(getAiProfileUpdate, initialState);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, startTranscribing] = useTransition();
  const [isSynthesizing, startSynthesizing] = useTransition();
  const chatViewportRef = useRef<HTMLDivElement | null>(null);
  const didMountRef = useRef(false);
  const scrollDebounceRef = useRef<NodeJS.Timeout | null>(null);


  const { toast } = useToast();

  useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.error,
      });
    }
  }, [state.error, toast]);


  const scrollToBottom = () => {
    if (chatViewportRef.current) {
      chatViewportRef.current.scrollTo({
        top: chatViewportRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (didMountRef.current && chatHistory.length > 0) {
      // if (scrollDebounceRef.current) {
      //   clearTimeout(scrollDebounceRef.current);
      // }
      // scrollDebounceRef.current = setTimeout(() => {
        scrollToBottom();
      // }, 1000); // 1 second debounce
    } else {
      didMountRef.current = true;
    }
  }, [chatHistory]);

  const handleFormSubmit = async (formData: FormData) => {
    const query = formData.get('query') as string;
    if (query) {
      setChatHistory(prev => [...prev, { role: 'user', content: query }]);
      formData.set('chatHistory', JSON.stringify([...chatHistory, { role: 'user', content: query }]));
      formAction(formData);
      formRef.current?.reset();
    }
  };
  
  useEffect(() => {
    if (state.assistantResponse && chatHistory.length > 0 && chatHistory[chatHistory.length - 1].role === 'user') {
        setChatHistory(prev => [...prev, { role: 'assistant', content: state.assistantResponse! }]);
        // TTS temporarily disabled
        // startSynthesizing(async () => {
        //   const formData = new FormData();
        //   formData.append('text', state.assistantResponse!);
        //   const result = await synthesizeSpeech(formData);
        //   if (result.error) {
        //       toast({ variant: 'destructive', title: 'Speech Error', description: result.error });
        //   } else if (result.audioDataUri && audioRef.current) {
        //       audioRef.current.src = result.audioDataUri;
        //       audioRef.current.play().catch(e => console.error("Audio playback failed", e));
        //   }
        // });

    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.assistantResponse, state.updatedProfileData]);

  const startRecording = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        const audioChunks: Blob[] = [];

        mediaRecorderRef.current.ondataavailable = (event) => {
            audioChunks.push(event.data);
        };

        mediaRecorderRef.current.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
            const reader = new FileReader();
            reader.readAsDataURL(audioBlob);
            reader.onloadend = () => {
                const base64data = reader.result as string;
                
                startTranscribing(async () => {
                    const formData = new FormData();
                    formData.append('audioDataUri', base64data);
                    const result = await transcribeAudio(formData);
                    if (result.error) {
                        toast({ variant: 'destructive', title: 'Transcription Error', description: result.error });
                    } else if (result.transcript) {
                        const transcriptFormData = new FormData(formRef.current!);
                        transcriptFormData.set('query', result.transcript);
                        handleFormSubmit(transcriptFormData);
                    }
                });
            };
            stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
    } catch (err) {
        toast({ variant: 'destructive', title: 'Microphone Error', description: 'Could not access microphone. Please grant permission and try again.' });
        console.error("Mic error:", err);
    }
  };

  const stopRecording = () => {
      if (mediaRecorderRef.current && isRecording) {
          mediaRecorderRef.current.stop();
          setIsRecording(false);
      }
  };

  const handleRecordClick = () => {
      if (isRecording) {
          stopRecording();
      } else {
          startRecording();
      }
  };

  const isProcessing = useFormStatus().pending || isTranscribing || isSynthesizing;

  return (

    <div className="grid md:grid-cols-2 gap-8">
      <Card className="flex flex-col h-[500px] md:h-[600px] overflow-hidden">
        <CardHeader>
          <CardTitle>AI Assistant</CardTitle>
          <CardDescription>Chat with our bot to build your profile.</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col min-h-0">
            <ScrollArea className="min-h-[250px] flex-1 min-h-0 h-full w-full pr-4" viewportRef={chatViewportRef}>
            <div className="space-y-4 h-full">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarFallback><Bot /></AvatarFallback>
                </Avatar>
                <div className="bg-muted p-3 rounded-lg max-w-[80%]">
                  <p className="font-bold">TeamForge Bot</p>
                  <p className="text-sm">Hello! Tell me about your skills, interests, or what you'd like to build. You can type or use the microphone to talk to me.</p>
                </div>
              </div>
              {chatHistory.map((message, index) => (
                <div key={index} className={`flex items-start gap-4 ${message.role === 'user' ? 'justify-end' : ''}`}>
                  {message.role === 'assistant' && (
                    <Avatar>
                      <AvatarFallback><Bot /></AvatarFallback>
                    </Avatar>
                  )}
                  <div className={`${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'} p-3 rounded-lg max-w-[80%]`}>
                    <p className="font-bold">{message.role === 'user' ? 'You' : 'TeamForge Bot'}</p>
                    <p className="text-sm">{message.content}</p>
                  </div>
                  {message.role === 'user' && (
                    <Avatar>
                      <AvatarFallback><User /></AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isProcessing && (
                <div className="flex items-start gap-4">
                   <Avatar>
                      <AvatarFallback><Bot /></AvatarFallback>
                    </Avatar>
                    <div className="bg-muted p-3 rounded-lg max-w-[80%] flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin"/>
                      <p className="text-sm text-muted-foreground">Thinking...</p>
                    </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <form ref={formRef} action={handleFormSubmit} className="flex w-full items-center space-x-2">
            <Input name="query" placeholder="Type or record your message..." autoComplete="off" disabled={isProcessing} />
            <input type="hidden" name="existingProfileData" value={state.updatedProfileData} />
            <input type="hidden" name="chatHistory" value={JSON.stringify(chatHistory)} />
            <Button type="button" size="icon" variant="outline" onClick={handleRecordClick} disabled={useFormStatus().pending || isSynthesizing}>
              {isRecording ? <MicOff className="h-4 w-4 text-destructive animate-pulse" /> : isTranscribing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mic className="h-4 w-4" />}
              <span className="sr-only">{isRecording ? "Stop Recording" : "Start Recording"}</span>
            </Button>
            <SubmitButton />
          </form>
          <audio ref={audioRef} className="hidden" />
        </CardFooter>
      </Card>
      <Card className="flex-1">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-accent" />
            <CardTitle>Your Profile Summary</CardTitle>
          </div>
          <CardDescription>This is what we've gathered so far. It will be used for team matching.</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[215px] md:h-[400px] w-full">
            {renderProfileSummary(state.updatedProfileData)}
          </ScrollArea>
        </CardContent>
        <CardFooter className="flex justify-end">
            <Button asChild disabled={state.updatedProfileData === initialState.updatedProfileData}>

                <Link href="/confirmation">Confirm Profile & Continue</Link>
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
