import React from 'react';
import { Card } from "@/components/ui/card";

interface Resources {
  wood: number;
  stone: number;
  gold: number;
}

interface ResourceDisplayProps {
  resources: Resources;
}

const ResourceDisplay: React.FC<ResourceDisplayProps> = ({ resources }) => {
  return (
    <div className="fixed top-16 right-4 flex gap-4">
      <Card className="p-3 bg-opacity-90 backdrop-blur">
        <div className="flex gap-6 text-game-accent items-center">
          <div className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/403d589d-44f6-4d9c-b003-84a5918edb71.png" 
              alt="Wood" 
              className="w-6 h-6 object-contain"
            />
            <span>{resources.wood}</span>
          </div>
          <div className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/06f6421b-91d9-4182-ae25-5b9824111e3b.png" 
              alt="Stone" 
              className="w-6 h-6 object-contain"
            />
            <span>{resources.stone}</span>
          </div>
          <div className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/f1526835-ab5e-48ea-a317-4bbc731ac04a.png" 
              alt="Gold" 
              className="w-6 h-6 object-contain"
            />
            <span>{resources.gold}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ResourceDisplay;