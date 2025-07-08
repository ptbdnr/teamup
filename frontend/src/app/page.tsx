import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rocket, Users, BrainCircuit } from 'lucide-react';
import Header from '@/components/Header';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1">
        <section className="container mx-auto px-4 py-20 text-center">
          <Rocket className="mx-auto h-16 w-16 text-primary" />
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">

            Team Forge
          </h1>
          <h4 className="mt-4 text-xl text-muted-foreground">
            Aligned from the start.
          </h4>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
            TeamForge uses AI to connect you with the perfect team members based on your skills and interests. Start the conversation, and let our AI do the rest.
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="/profile">Get Started</Link>
            </Button>
          </div>
        </section>

        <section className="container mx-auto px-4 pb-20">
          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <BrainCircuit className="h-8 w-8 text-primary" />
                <CardTitle>AI-Powered Profiling</CardTitle>
              </CardHeader>
              <CardContent>

                Just chat with our AI assistant. It will understand your skills and interests to build a comprehensive profile for you.
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Users className="h-8 w-8 text-primary" />
                <CardTitle>Smart Team Matching</CardTitle>
              </CardHeader>
              <CardContent>

                Our algorithm analyzes profiles to create balanced and synergistic teams.
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Rocket className="h-8 w-8 text-primary" />
                <CardTitle>Launch Your Project</CardTitle>
              </CardHeader>
              <CardContent>

                Get connected with your new team and start building the next big thing. Kick-off material is provided to help you get started.
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <footer className="container mx-auto px-4 py-6 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} TeamForge. All rights reserved.</p>
      </footer>
    </div>
  );
}
