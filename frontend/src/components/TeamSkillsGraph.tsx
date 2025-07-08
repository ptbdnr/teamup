'use client';

import {
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import type { User } from '@/lib/types';
import { BrainCircuit } from 'lucide-react';

interface TeamSkillsGraphProps {
  members: User[];
}

export function TeamSkillsGraph({ members }: TeamSkillsGraphProps) {
  const skillCounts: { [skill: string]: number } = {};
  const allSkills = new Set<string>();

  members.forEach(member => {
    member.skills.forEach(skill => {
      allSkills.add(skill);
      skillCounts[skill] = (skillCounts[skill] || 0) + 1;
    });
  });

  const chartData = Array.from(allSkills).map(skill => ({
    skill: skill,
    value: skillCounts[skill],
    fullMark: members.length,
  }));

  const commonSkills = Object.entries(skillCounts).filter(([, count]) => count > 1).map(([skill]) => skill);
  const uniqueSkills = Object.entries(skillCounts).filter(([, count]) => count === 1).map(([skill]) => skill);


  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <BrainCircuit className="h-8 w-8 text-primary" />
          <div>
            <CardTitle>Team Skills Analysis</CardTitle>
            <CardDescription>A visual breakdown of your team's skillset.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
            <div>
                <h3 className="font-semibold mb-2">Skill Distribution</h3>
                <p className="text-sm text-muted-foreground mb-4">
                    This radar chart shows how many members possess each skill. The outer ring represents the total number of team members.
                </p>
                <ResponsiveContainer width="100%" height={300}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="skill" />
                    <PolarRadiusAxis angle={30} domain={[0, members.length]} tickCount={members.length + 1} />
                    <Radar name="Members" dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
                    <Tooltip content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                            return (
                            <div className="p-2 bg-background border rounded-md shadow-lg">
                                <p className="label">{`${payload[0].payload.skill} : ${payload[0].value}`}</p>
                            </div>
                            );
                        }
                        return null;
                    }} />
                </RadarChart>
                </ResponsiveContainer>
            </div>
            <div>
                <h3 className="font-semibold mb-2">Skill Synergy</h3>
                <div className="space-y-4">
                    <div>
                        <h4 className="font-medium text-sm text-primary">Common Skills</h4>
                        <p className="text-xs text-muted-foreground mb-2">Skills shared by more than one member.</p>
                        <div className="flex flex-wrap gap-2">
                            {commonSkills.map(skill => <span key={skill} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md font-medium">{skill}</span>)}
                             {commonSkills.length === 0 && <p className="text-sm text-muted-foreground">No common skills found.</p>}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-medium text-sm text-accent">Specialized Skills</h4>
                        <p className="text-xs text-muted-foreground mb-2">Skills unique to one member.</p>
                        <div className="flex flex-wrap gap-2">
                            {uniqueSkills.map(skill => <span key={skill} className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-md font-medium">{skill}</span>)}
                             {uniqueSkills.length === 0 && <p className="text-sm text-muted-foreground">No unique skills found.</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
