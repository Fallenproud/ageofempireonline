import React from 'react';
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

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

  const resourceImages = {
    wood: "/lovable-uploads/403d589d-44f6-4d9c-b003-84a5918edb71.png",
    stone: "/lovable-uploads/06f6421b-91d9-4182-ae25-5b9824111e3b.png",
    gold: "/lovable-uploads/f1526835-ab5e-48ea-a317-4bbc731ac04a.png"
  };

  const handleGather = () => {
    if (isGathering) return;
    
    setIsGathering(true);
    const gatherAmount = 5; // Base gather amount

    onGather(gatherAmount);
    
    toast({
      title: "Resource Gathered",
      description: `Gathered ${gatherAmount} ${type}`,
    });

    // Animation duration matches the CSS animation
    setTimeout(() => setIsGathering(false), 500);
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
    </div>
  );
};

export default ResourceNode;