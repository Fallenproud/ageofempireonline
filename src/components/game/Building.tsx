import React from 'react';
import { cn } from "@/lib/utils";

export type BuildingType = 'house' | 'barracks' | 'archeryRange';

interface BuildingProps {
  type: BuildingType;
  position: { x: number; y: number };
  constructionProgress: number;
}

const Building: React.FC<BuildingProps> = ({
  type,
  position,
  constructionProgress
}) => {
  const buildingImages = {
    house: "/lovable-uploads/403d589d-44f6-4d9c-b003-84a5918edb71.png",
    barracks: "/lovable-uploads/06f6421b-91d9-4182-ae25-5b9824111e3b.png",
    archeryRange: "/lovable-uploads/f1526835-ab5e-48ea-a317-4bbc731ac04a.png"
  };

  return (
    <div 
      style={{ 
        position: 'absolute', 
        left: `${position.x}px`, 
        top: `${position.y}px` 
      }}
      className={cn(
        "w-20 h-20 cursor-pointer transition-transform hover:scale-105",
        constructionProgress < 100 && "opacity-70"
      )}
    >
      <img 
        src={buildingImages[type]} 
        alt={`${type} building`}
        className="w-full h-full object-contain"
      />
      {constructionProgress < 100 && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
          <div 
            className="h-full bg-game-accent transition-all duration-300"
            style={{ width: `${constructionProgress}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default Building;