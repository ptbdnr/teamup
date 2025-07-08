'use client'

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useProfileContext } from '@/contexts/ProfileContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { PersonStandingIcon, CodeIcon, TrophyIcon, Users, UserPlus, Plus } from 'lucide-react';
import { User, Project } from '@/lib/types';
import { mockupTeams, mockupUsers } from '@/lib/mockup-data';
import { useToast } from '@/hooks/use-toast';


interface ProjectsGraphProps {
  projects: Project[];
  users?: User[];
}

const ProjectsGraph: React.FC<ProjectsGraphProps> = ({ projects: projects }) => {
  const { toast } = useToast();
  const { profile, setProfile } = useProfileContext();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const router = useRouter();

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseDialog = () => {
    setSelectedProject(null);
  };

  const handleJoinTeam = (teamId: string) => {
    toast({
      title: 'Joining',
      description: `You have joined the team with ID: ${teamId}.`,
      variant: 'default',
      duration: 2000,
    });
    router.push('/team');
  };

  const handleCreateTeam = () => {
    // In a real app, this would create a new team for the project
    toast({
      title: 'Creating',
      description: 'You are creating a new team for this project.',
      variant: 'default',
      duration: 2000,
    });
    router.push('/team');
  };

  // Get teams working on the selected project
  const getProjectTeams = (project: Project) => {
    // Filter teams that are working on this project
    // In a real app, projects would have team associations
    // For now, we'll show some teams as examples
    return mockupTeams.filter(team => team.id == project.teamId);
  };

  const projectTeams = selectedProject ? getProjectTeams(selectedProject) : [];

  // Calculate position within the triangle
  // The triangle vertices are:
  // Top (Method & Tech): x=50, y=0
  // Bottom Left (Social & Nature): x=0, y=100
  // Bottom Right (Result & Control): x=100, y=100
  // This is a simplified representation and might need adjustments for a more accurate SDI-like visual.
  // We'll use a barycentric coordinate-like approach, but scaled for the triangle's dimensions.

  const getTrianglePosition = useMemo(() => {
    // Define triangle dimensions for calculation
    const triangleWidth = 100; // Arbitrary unit, can be scaled later
    const triangleHeight = Math.sqrt(3) / 2 * triangleWidth; // Height of an equilateral triangle

    return (project: Project) => {
      // Assuming scores are normalized to 0-1 scale.
      const socialFocusNorm = project.graphCoordinates?.social || 0;
      const resultFocusNorm = project.graphCoordinates?.result || 0;
      const methodFocusNorm = project.graphCoordinates?.method || 0;

      // Simple sum for weighting, ideally the scores would add up to a constant for positioning within a standard triangle,
      // but SDI can have varying strengths. We'll adjust based on total "energy".
      const totalScore = socialFocusNorm + resultFocusNorm + methodFocusNorm;

      let x = 0;
      let y = 0;

      if (totalScore === 0) {
        // Center if all scores are 0
        x = 50;
        y = 50;
      } else {
        // Barycentric-like approach scaled to the triangle vertices
        // Vertices (normalized coordinates 0-100, 0-100):
        // A (Method & Tech): (50, 0)
        // B (Social & Nature): (0, 100)
        // C (Result & Control): (100, 100)

        // Using normalized scores as weights. Adjusting for totalScore can help
        // keep points within bounds if scores don't sum to a constant.
        const socialFocusWeight = socialFocusNorm / totalScore;
        const resultFocusWeight = resultFocusNorm / totalScore;
        const methodFocusWeight = methodFocusNorm / totalScore;

        // Calculate position using weighted average of vertex positions
        x = (socialFocusWeight * 0) + (resultFocusWeight * 100) + (methodFocusWeight * 50);
        y = (socialFocusWeight * 100) + (resultFocusWeight * 100) + (methodFocusWeight * 0);

        // Add some padding to keep points slightly away from edges
        const padding = 5;
        x = Math.max(padding, Math.min(100 - padding, x));
        y = Math.max(padding, Math.min(100 - padding, y));
      }

      return { x, y };
    };
  }, []); // Recalculate if projects data structure or scaling changes (unlikely in this case)

  return (
    <div className="relative w-full max-w-[350px] sm:max-w-[700px] mx-auto aspect-[4/3] bg-gray-50 border rounded-md overflow-hidden p-2 sm:p-8 flex flex-col justify-end items-center">
      {/* SDI Triangle Background (Simplified) */}
      <div className="absolute inset-0 flex justify-center items-center">
        {/* Responsive text labels for triangle corners */}
        <div className="absolute top-2 sm:top-4 left-1/2 -translate-x-1/2 text-center text-base sm:text-lg font-semibold text-purple-700 flex items-center">
          <CodeIcon className="w-5 h-5 mr-1" /> Method & Tech
        </div>
        <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 text-base sm:text-lg font-semibold text-blue-700 flex items-center">
           <PersonStandingIcon className="w-5 h-5 mr-1" /> Social & Nature
        </div>
        <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 text-base sm:text-lg font-semibold text-green-700 flex items-center">
          <TrophyIcon className="w-5 h-5 mr-1" /> Result & Control
        </div>
      </div>

      {projects.map((project) => (
        <div // Use a button or interactive element for better accessibility
          key={project.id}
          className="absolute p-2 bg-blue-100 bg-opacity-70 rounded-full cursor-pointer hover:bg-blue-600 transition-all duration-200 shadow-md"
          onClick={() => handleProjectClick(project)}
          title={`${project.name}`}
          style={{
            left: `calc(${getTrianglePosition(project).x}% - 16px)`, // Adjust by half element width
            top: `calc(${getTrianglePosition(project).y}% - 16px)`, // Adjust by half element height
          }}
        >
          🎯
        </div>
      ))}

      <Dialog open={!!selectedProject} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedProject?.name}</DialogTitle>
            <DialogDescription>{selectedProject?.shortDescription}</DialogDescription>
          </DialogHeader>
          {selectedProject && (
            <div className="py-4 space-y-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Social & Nature</CardDescription>
                    <CardTitle className="text-2xl flex items-center">
                      <PersonStandingIcon className="w-5 h-5 mr-2 text-blue-500" />
                      {selectedProject.graphCoordinates?.social}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Results & Control</CardDescription>
                    <CardTitle className="text-2xl flex items-center">
                      <TrophyIcon className="w-5 h-5 mr-2 text-green-500" />
                      {selectedProject.graphCoordinates?.result}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Method & Tech</CardDescription>
                    <CardTitle className="text-2xl flex items-center">
                      <CodeIcon className="w-5 h-5 mr-2 text-purple-500" />
                      {selectedProject.graphCoordinates?.method}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    
                  </CardContent>
                </Card>
              </div>
            
              <div className="flex">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Teams Working on This Project ({projectTeams.length})
                  </CardTitle>
                  <CardDescription>
                    {projectTeams.length > 0 
                      ? "Join an existing team or create a new one for this project"
                      : "No teams are working on this project yet. Be the first to create one!"
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {projectTeams.length > 0 && (
                    <div className="space-y-3">
                      {projectTeams.map(team => {
                        const teamMembers = team.userIds.map(userId => 
                          mockupUsers.find(user => user.id === userId)
                        ).filter(Boolean);

                      return (
                        <div key={team.id} className="border rounded-lg p-4 flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold">{team.name}</h4>
                              <Badge variant="secondary">{teamMembers.length} members</Badge>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              {teamMembers.slice(0, 3).map(member => member && (
                                <Avatar key={member.id} className="h-6 w-6">
                                  <AvatarImage src={member.avatar} alt={member.name} />
                                  <AvatarFallback className="text-xs">{member.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                              ))}
                              {teamMembers.length > 3 && (
                                <span className="text-xs text-muted-foreground">+{teamMembers.length - 3} more</span>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {Array.from(new Set(teamMembers.flatMap(m => m?.skills || []))).slice(0, 4).map(skill => (
                                <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
                              ))}
                            </div>
                            <div className="pt-4">
                              <Button 
                                onClick={() => handleJoinTeam(team.id)}
                                className="ml-4"
                              >
                                <UserPlus className="w-4 h-4 mr-2" />
                                Join This Team
                              </Button>
                            </div>
                          </div>
                        </div>
                      );                          
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
              </div>

              <div className="pt-4 border-t">
                <Button 
                  onClick={handleCreateTeam}
                  className="w-full"
                  variant={projectTeams.length > 0 ? "outline" : "default"}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Team for This Project
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectsGraph;

