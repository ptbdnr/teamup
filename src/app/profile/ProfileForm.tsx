'use client';

import { useState, useTransition, useRef, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';

import { getAiProfileUpdate } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, User, Bot, Sparkles, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

const initialState = {
  error: null,
  updatedProfileData: 'Your profile is empty. Start by telling the AI about your skills!',
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

export function ProfileForm() {
  const [state, formAction] = useFormState(getAiProfileUpdate, initialState);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
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

  const handleFormSubmit = async (formData: FormData) => {
    const query = formData.get('query') as string;
    if (query) {
      setChatHistory(prev => [...prev, { role: 'user', content: query }]);
      formAction(formData);
      formRef.current?.reset();
    }
  };
  
  useEffect(() => {
    if (state.updatedProfileData && chatHistory.length > 0 && chatHistory[chatHistory.length - 1].role === 'user') {
        setChatHistory(prev => [...prev, { role: 'assistant', content: 'Thanks! I have updated your profile based on our conversation. You can see it on the right. Is there anything else?' }]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.updatedProfileData]);

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>AI Assistant</CardTitle>
          <CardDescription>Chat with our bot to build your profile.</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] w-full pr-4">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarFallback><Bot /></AvatarFallback>
                </Avatar>
                <div className="bg-muted p-3 rounded-lg max-w-[80%]">
                  <p className="font-bold">TeamForge Bot</p>
                  <p className="text-sm">Hello! Tell me about your skills, interests, or what you'd like to build. For example: "I'm a frontend developer skilled in React and Next.js. I'm interested in building AI apps."</p>
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
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <form ref={formRef} action={handleFormSubmit} className="flex w-full items-center space-x-2">
            <Input name="query" placeholder="Type your message..." autoComplete="off" />
            <input type="hidden" name="existingProfileData" value={state.updatedProfileData} />
            <SubmitButton />
          </form>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-accent" />
            <CardTitle>Your Profile Summary</CardTitle>
          </div>
          <CardDescription>This is what we've gathered so far. It will be used for team matching.</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] w-full">
            <pre className="whitespace-pre-wrap font-sans text-sm p-4 bg-muted rounded-md">{state.updatedProfileData}</pre>
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
