'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { teams, myTeamId } from "@/lib/team-data";
import { ArrowLeft, BrainCircuit, UserPlus } from 'lucide-react';

export default function TeamSwapPage() {
    const router = useRouter();
    const otherTeams = teams.filter(team => team.id !== myTeamId);
    const [joiningTeamName, setJoiningTeamName] = React.useState('');

    const handleJoinTeam = () => {
        // In a real app, this would be an API call.
        // For now, we just simulate success and navigate.
        // We'd need to update `myTeamId` in a persistent way (e.g. cookies, localstorage, or server).
        // For this demo, we'll just redirect to the main team page.
        alert(`You have successfully joined "${joiningTeamName}"! Your old team has been notified. (This is a simulation)`);
        router.push('/team');
    }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8 flex flex-col items-center">
        <div className="w-full max-w-4xl">
            <Button asChild variant="ghost" className="mb-4">
                <Link href="/team">
                    <ArrowLeft className="mr-2 h-4 w-4"/>
                    Back to Your Team
                </Link>
            </Button>

            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold">Find a New Team</h1>
                <p className="text-muted-foreground mt-2 text-lg">
                    Browse other teams. If you find a good fit, you can request to join.
                </p>
            </div>

            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full max-w-xl mx-auto"
            >
                <CarouselContent>
                    {otherTeams.map((team) => (
                        <CarouselItem key={team.id}>
                            <div className="p-1">
                                <Card className="flex flex-col h-full">
                                    <CardHeader>
                                        <CardTitle>{team.name}</CardTitle>
                                        <CardDescription>{team.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-1 space-y-4">
                                        <h3 className="font-semibold text-sm">Members ({team.members.length})</h3>
                                        <div className="space-y-3">
                                            {team.members.map(member => (
                                                <div key={member.name} className="flex items-center gap-3">
                                                    <Avatar>
                                                        <AvatarImage src={member.avatar} alt={member.name} data-ai-hint={member.dataAiHint} />
                                                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-semibold text-sm">{member.name}</p>
                                                        <p className="text-xs text-muted-foreground">{member.role}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                         <div className="pt-4">
                                            <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                                                <BrainCircuit className="h-4 w-4 text-primary" />
                                                Top Skills
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {Array.from(new Set(team.members.flatMap(m => m.skills))).slice(0, 5).map(skill => (
                                                    <Badge key={skill}>{skill}</Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button className="w-full" onClick={() => setJoiningTeamName(team.name)}>
                                                    <UserPlus className="mr-2 h-4 w-4"/>
                                                    Request to Join Team
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Join "{joiningTeamName}"?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        If you join this team, you will automatically leave your current team. This action cannot be undone. Are you sure?
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={handleJoinTeam}>Yes, Join Team</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </CardFooter>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex" />
                <CarouselNext className="hidden sm:flex" />
            </Carousel>
        </div>
      </main>
    </div>
  );
}
