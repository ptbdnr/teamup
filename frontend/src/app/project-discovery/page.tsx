'use client';

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from 'next/navigation';
import Header from "@/components/Header";
import { mockupProjects } from "@/lib/mockup-data";
import ProjectSwipeCard from "./ProjectSwipeCard";
import { Project } from "@/lib/types";
import { useToast } from '@/hooks/use-toast';


export default function ProjectDiscoveryPage() {
    const router = useRouter();
    const [ projects, setProjects ] = useState<Project[]>(mockupProjects);
    const [selectedProjectId, setSelectedProjectId] = React.useState('');
    const { toast } = useToast();

    const handleSelectProject = (project: Project) => {
        const selectedProjectName = mockupProjects.find(project => project.id === selectedProjectId)?.name || 'Unknown Project';
        toast({
            title: 'Select',
            description: `You have selected your project.`,
            variant: 'default',
            duration: 2000,
          });
        router.push('/team');
    }
    
      const handleSwipe = (
        direction: "left" | "right"
      ) => {
        console.log(`Swiped ${direction}`);
        if (direction === "right") {
            handleSelectProject(projects[0]);
            return;
        }
        setProjects((prevProjects) => prevProjects.slice(1));
      };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8 flex flex-col items-center">
        <div className="w-full max-w-4xl">
            
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold">Discover Your Project</h1>
                <p className="text-muted-foreground mt-2 text-lg">
                    Swipe left to skip, right to select.
                </p>
            </div>

            {projects.length > 0 ? (
                <div className="w-full max-w-md mx-auto">
                    <ProjectSwipeCard 
                        project={projects[0]} 
                        onSwipe={(direction) => handleSwipe(direction)} 
                        onDisliked={() => handleSwipe("left")}
                        onLiked={() => handleSwipe("right")}
                    />
                </div>
            ) : (
                <div className="text-center text-muted-foreground">
                    No more projects available.
                </div>
            )}
        </div>
      </main>
    </div>
  );
}
