'use client'

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PersonStandingIcon, CodeIcon, TrophyIcon } from 'lucide-react';
import { Project } from '@/lib/team-data';


interface ProjectGraphProps {
  projects: Project[];
}

const ProjectGraph: React.FC<ProjectGraphProps> = ({ projects: projects }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseDialog = () => {
    setSelectedProject(null);
  };

  // Calculate position within the triangle
  // The triangle vertices are:
  // Top (Method & Tech): x=50, y=0
  // Bottom Left (Social & Emotion): x=0, y=100
  // Bottom Right (Result & Control): x=100, y=100
  // This is a simplified representation and might need adjustments for a more accurate SDI-like visual.
  // We'll use a barycentric coordinate-like approach, but scaled for the triangle's dimensions.

  const getTrianglePosition = useMemo(() => {
    // Define triangle dimensions for calculation
    const triangleWidth = 100; // Arbitrary unit, can be scaled later
    const triangleHeight = Math.sqrt(3) / 2 * triangleWidth; // Height of an equilateral triangle

    return (project: Project) => {
      // Assuming scores are normalized to 0-1 scale.
      const socialFocusNorm = project.graphCoordinates.social;
      const resultFocusNorm = project.graphCoordinates.result;
      const methodFocusNorm = project.graphCoordinates.method;

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
        // B (Social & Emotion): (0, 100)
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
    <div className="relative w-full max-w-[700px] mx-auto aspect-[4/3] bg-gray-50 border rounded-md overflow-hidden p-8 flex flex-col justify-end items-center">
      {/* SDI Triangle Background (Simplified) */}
      <div className="absolute inset-0 flex justify-center items-center">
        {/* This is a placeholder. A real SDI visualization would use a SVG or complex CSS shapes. */}
        {/* We'll use text labels positioned around where the points would be */}
        <div className="absolute top-4 text-center text-lg font-semibold text-purple-700 flex items-center">
          <CodeIcon className="w-5 h-5 mr-1" /> Method & Tech
        </div>
        <div className="absolute bottom-4 left-4 text-lg font-semibold text-blue-700 flex items-center">
           <PersonStandingIcon className="w-5 h-5 mr-1" /> Social & Emotion
        </div>
        <div className="absolute bottom-4 right-4 text-lg font-semibold text-green-700 flex items-center">
          <TrophyIcon className="w-5 h-5 mr-1" /> Result & Control
        </div>
      </div>

      {projects.map((project) => (
        <div // Use a button or interactive element for better accessibility
          key={project.id}
          className="absolute p-2 bg-blue-500 bg-opacity-70 rounded-full cursor-pointer hover:bg-blue-600 transition-all duration-200 shadow-md"
          onClick={() => handleProjectClick(project)}
          title={`${project.name}\nSocial & Emotion: ${project.graphCoordinates.social}\nResult & Control: ${project.graphCoordinates.result}\nMethod & Tech: ${project.graphCoordinates.method}`}
          style={{
            left: `calc(${getTrianglePosition(project).x}% - 16px)`, // Adjust by half element width
            top: `calc(${getTrianglePosition(project).y}% - 16px)`, // Adjust by half element height
          }}
        >
          {project.name}
        </div>
      ))}

      <Dialog open={!!selectedProject} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedProject?.name}</DialogTitle>
            <DialogDescription>Detailed information about {selectedProject?.name}.</DialogDescription>
          </DialogHeader>
          {selectedProject && (
            <div className="py-4">
              <p className="text-sm text-gray-700 mb-4">{selectedProject.description}</p>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Social & Emotion</CardDescription>
                    <CardTitle className="text-2xl flex items-center">
                      <PersonStandingIcon className="w-5 h-5 mr-2 text-blue-500" />
                      {selectedProject.graphCoordinates.social}
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
                      {selectedProject.graphCoordinates.result}
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
                      {selectedProject.graphCoordinates.method}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectGraph;

