import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, BrainCircuit, Lightbulb, ExternalLink } from "lucide-react";

const teamMembers = [
  {
    name: 'Alex Johnson',
    avatar: 'https://placehold.co/100x100.png',
    dataAiHint: "man portrait",
    role: 'Frontend Developer (You)',
    skills: ['React', 'Next.js', 'TypeScript', 'TailwindCSS'],
    interests: ['AI Apps', 'Developer Tools', 'Design Systems'],
    discord: '#',
  },
  {
    name: 'Brenda Smith',
    avatar: 'https://placehold.co/100x100.png',
    dataAiHint: "woman portrait",
    role: 'Backend Developer',
    skills: ['Node.js', 'Python', 'PostgreSQL', 'Docker'],
    interests: ['Data Science', 'Machine Learning', 'APIs'],
    discord: '#',
  },
  {
    name: 'Charlie Brown',
    avatar: 'https://placehold.co/100x100.png',
    dataAiHint: "person portrait",
    role: 'UI/UX Designer',
    skills: ['Figma', 'User Research', 'Prototyping', 'Accessibility'],
    interests: ['Mobile Design', 'Minimalism', 'User Psychology'],
    discord: '#',
  },
];

export default function TeamPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <Users className="h-10 w-10 text-primary" />
            Your Team: "The Innovators"
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            You've been matched! Here's your team. Reach out via Discord to get started.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <Card key={member.name} className="flex flex-col">
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={member.avatar} alt={member.name} data-ai-hint={member.dataAiHint} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{member.name}</CardTitle>
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
          ))}
        </div>
      </main>
    </div>
  );
}
