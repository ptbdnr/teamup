import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, BrainCircuit, Lightbulb, ExternalLink, Search, BarChart3 } from "lucide-react";
import { mockupUsers, mockupTeams, myTeamId } from "@/lib/mockup-data";
import { User } from "@/lib/types";
import { TeamSkillsGraph } from "@/components/TeamSkillsGraph";
import Link from "next/link";

export default function TeamPage() {
  const myTeam = mockupTeams.find(team => team.id === myTeamId);

  if (!myTeam) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1 container mx-auto p-4 md:p-8 text-center">
          <h1 className="text-2xl font-bold">Team not found</h1>
          <p className="text-muted-foreground">You are not currently assigned to a team.</p>
          <Button asChild className="mt-4">
            <Link href="/teams-graph">Browse Teams</Link>
          </Button>
        </main>
      </div>
    )
  }

  const { name, userIds } = myTeam;
  const members = userIds.map((userId) => {
    const user = mockupUsers.find((u) => u.id === userId);
    if (!user) {
      return null; // Skip if user not found
    }
    return {
      ...user,
      isYou: user.id === myTeamId, // Mark if this is the current user
      skills: user.skills || [],
      interests: user.interests || [],
      discord: user.discord || '#',
      dataAiHint: user.dataAiHint || '',
    } as User;
  }).filter(Boolean); // Filter out any null values

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <Users className="h-10 w-10 text-primary" />
            Your Team: "{name}"
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Here's your team. Reach out via Discord to get started.
          </p>
          <Button asChild size="lg" variant="outline">
            <Link href="/team-swap">
                <Search className="mr-2"/>
                Changed your mind? (Try another team)
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {members.map((member) => {
            if (!member) {
              return null; // Skip if member is null
            }
            return (
            <Card key={member.name} className="flex flex-col">
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={member.avatar} alt={member.name} data-ai-hint={member.dataAiHint} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{member.name} {member.isYou && '(You)'}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mb-4">
                  <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <BrainCircuit className="h-4 w-4 text-primary" />
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill) => (
                      <Badge key={skill}>{skill}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-accent" />
                    Interests
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {member.interests.map((interest) => (
                      <Badge key={interest} variant="secondary">{interest}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full" variant="outline">
                  <a href={member.discord} target="_blank" rel="noopener noreferrer">
                    Connect on Discord
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
            );
          })}
        </div>

        {members.length > 0 && 
          <div className="mb-8">
              <TeamSkillsGraph members={members.filter((member): member is User => member !== null)} />
          </div>
        }

        <Card>
            <CardHeader>
                <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">

              <div>
                <h3 className="font-semibold text-lg mb-2">Kickoff Agenda</h3>
                <ul className="list-disc pl-5">
                  <li>Introduction and team alignment</li>
                  <li>Project goals and objectives</li>
                  <li>Roles and responsibilities</li>
                  <li>Timeline and milestones</li>
                  <li>Q&A session</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">User Journey Outline</h3>
                <p className="text-muted-foreground">
                  Define the user experience from onboarding to achieving their goals:
                </p>
                <ul className="list-disc pl-5">
                  <li>Onboarding process</li>
                  <li>Key interactions and touchpoints</li>
                  <li>Feedback loops</li>
                  <li>Retention strategies</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Tentative Schedule</h3>
                <ul className="list-disc pl-5">
                  <li>Week 1: Research and planning</li>
                  <li>Week 2-3: Design and prototyping</li>
                  <li>Week 4-6: Development and testing</li>
                  <li>Week 7: Final review and deployment</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Milestones</h3>
                <ul className="list-disc pl-5">
                  <li>Completion of user research</li>
                  <li>Approval of design prototypes</li>
                  <li>Development of core features</li>
                  <li>Successful testing and QA</li>
                  <li>Project launch</li>
                </ul>
              </div>
                
            </CardContent>
        </Card>

      </main>
    </div>
  );
}
