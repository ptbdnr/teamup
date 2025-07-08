'use client';

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { User } from '@/lib/types';
import { BarChart3 } from 'lucide-react';

interface AllUserSkillsChartProps {
  users: User[];
  topN?: number;
}

export function AllUserSkillsChart({ users, topN = 15 }: AllUserSkillsChartProps) {
  const skillCounts: { [skill: string]: number } = {};

  users.forEach(user => {
    user.skills.forEach(skill => {
      skillCounts[skill] = (skillCounts[skill] || 0) + 1;
    });
  });

  const sortedSkills = Object.entries(skillCounts)
    .map(([skill, count]) => ({ skill, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, topN);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <BarChart3 className="h-8 w-8 text-primary" />
          <div>
            <CardTitle>Hackathon-Wide Skill Distribution</CardTitle>
            <CardDescription>
              A look at the top {topN} most popular skills among all participants.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={sortedSkills} layout="vertical" margin={{ left: 20, right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" allowDecimals={false} />
            <YAxis dataKey="skill" type="category" width={100} interval={0} />
            <Tooltip
              cursor={{ fill: 'hsl(var(--muted))' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="p-2 bg-background border rounded-md shadow-lg">
                      <p className="label">{`${payload[0].payload.skill} : ${payload[0].value} participants`}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="count" name="Participants" fill="hsl(var(--primary))" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
