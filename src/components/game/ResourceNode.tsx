import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";

export type ResourceType = 'wood' | 'stone' | 'gold';

interface ResourceNodeProps {
  type: ResourceType;
  position: { x: number; y: number };
  amount: number;
  onGather: (amount: number) => void;
}

const ResourceNode: React.FC<ResourceNodeProps> = ({
  type,
  position,
  amount,
  onGather,
}) => {
  const { toast } = useToast();
  const [isGathering, setIsGathering] = useState(false);
  const [gatherProgress, setGatherProgress] = useState(0);

  const resourceImages = {
    wood: "/lovable-uploads/403d589d-44f6-4d9c-b003-84a5918edb71.png",
    stone: "/lovable-uploads/06f6421b-91d9-4182-ae25-5b9824111e3b.png",
    gold: "/lovable-uploads/f1526835-ab5e-48ea-a317-4bbc731ac04a.png"
  };

  const gatheringTimes = {
    wood: 2000,
    stone: 3000,
    gold: 4000
  };

  const handleGather = () => {
    if (isGathering || amount <= 0) return;
    
    setIsGathering(true);
    setGatherProgress(0);
    
    const gatherDuration = gatheringTimes[type];
    const gatherAmount = 5;
    
    // Progress animation
    const startTime = Date.now();
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / gatherDuration) * 100, 100);
      setGatherProgress(progress);
      
      if (progress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        onGather(gatherAmount);
        setIsGathering(false);
        setGatherProgress(0);
        
        toast({
          title: "Resource Gathered",
          description: `Gathered ${gatherAmount} ${type}`,
        });
      }
    };
    
    requestAnimationFrame(updateProgress);
  };

  return (
    <div 
      style={{ 
        position: 'absolute', 
        left: `${position.x}px`, 
        top: `${position.y}px` 
      }}
      className={cn(
        "w-16 h-16 cursor-pointer transition-transform hover:scale-105",
        isGathering && "animate-resource-gain"
      )}
      onClick={handleGather}
    >
      <img 
        src={resourceImages[type]} 
        alt={`${type} resource`}
        className="w-full h-full object-contain"
      />
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm text-game-accent">
        {amount}
      </div>
      {isGathering && (
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-20">
          <Progress value={gatherProgress} className="h-1 bg-game-secondary" />
        </div>
      )}
    </div>
  );
};

export default ResourceNode;