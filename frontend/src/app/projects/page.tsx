'use client';

import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { AllUserSkillsChart } from "@/components/AllUserSkillsChart";
import { mockupUsers, mockupTeams, mockupProjects } from "@/lib/mockup-data";
import { User, Users, Target } from "lucide-react";
import ProjectsGraph from "@/components/ProjectsGraph"; // Import TeamsMap

export default function TeamsGraphPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background overflow-auto"> {/* Added overflow-auto */}
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <div className="mb-8">
            <h2 className="text-3xl font-bold flex items-center gap-3 mb-4">
                <Target className="h-8 w-16 text-primary"/>
                Project Ideas
            </h2>
            <div className="w-full max-w-2xl text-center">
                <ProjectsGraph projects={mockupProjects} />
            </div> 
        </div>

        <div className="mb-8">
            <h2 className="text-3xl font-bold flex items-center gap-3 mb-4">
                <User className="h-8 w-8 text-primary"/>
                Participants
            </h2>
            <AllUserSkillsChart users={mockupUsers} />
        </div>

        
        <div className="mb-8">
            <h2 className="text-3xl font-bold flex items-center gap-3 mb-4">
                <Users className="h-8 w-8 text-primary"/>
                Teams
            </h2>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
            {mockupTeams.map(team => {
                const members = team.userIds.map(userId => {
                    return mockupUsers.find(user => user.id === userId);
                }).filter(Boolean); // Filter out any undefined users
                if (!members.length) {
                    return null; // Skip teams with no members
                }
                return (
                <Card key={team.id}>
                    <CardHeader>
                        <CardTitle>{team.name}</CardTitle>
                        {/* <CardDescription>{team.description}</CardDescription> */}
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {members.map(member => {
                            if (!member) return null; // Skip if member not found
                            return (
                            <div key={member.name} className="flex items-center gap-4">
                                <Avatar>
                                    <AvatarImage src={member.avatar} alt={member.name} data-ai-hint={member.dataAiHint} />
                                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <p className="font-semibold">{member.name}</p>
                                    <p className="text-sm text-muted-foreground">{member.role}</p>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {member.skills.map(skill => (
                                            <Badge key={skill} variant="secondary">{skill}</Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            );
                        })}
                    </CardContent>
                </Card>
                );
            })}
        </div> 
       
      </main>
    </div>
  );
}
