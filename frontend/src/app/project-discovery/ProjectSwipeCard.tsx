import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { motion } from "framer-motion";

import { ThumbsDown, ThumbsUp} from 'lucide-react';
import { Project } from "@/lib/types";


interface ProjectSwipeCardProps {
    project: Project;
    onSwipe?: (direction: "left" | "right") => void;
    onLiked?: () => void;
    onDisliked?: () => void;
  }

export default function ProjectSwipeCard({ 
  project, 
  onSwipe,
  onDisliked = () => {},
  onLiked = () => {},
}: ProjectSwipeCardProps) {
    const handleDragEnd = (event: MouseEvent | TouchEvent | undefined, info: { offset: { x: number } }) => {
        if (info.offset.x > 100) {
          if (onSwipe) {
            onSwipe("right");
          }
        } else if (info.offset.x < -100) {
          if (onSwipe) {
            onSwipe("left");
          }
        }
      };
    
    return (
    <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        whileDrag={{ scale: 1.2 }}
    >
        <Card className="flex flex-col h-full">
            <CardHeader>
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>{project.shortDescription}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-row space-y-4 gap-4">
              <button
                aria-label="Dislike project"
                onClick={onDisliked}
              >
                <ThumbsDown size={24} />
            </button>
              <CardDescription>{project.longDescription}</CardDescription>
              <button 
                aria-label="Like project"
                onClick={onLiked}
              >
                <ThumbsUp size={24} />
              </button>
            </CardContent>
        </Card>
    </motion.div>
    );
};