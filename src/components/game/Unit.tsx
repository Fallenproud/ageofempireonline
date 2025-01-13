import React from 'react';
import { cn } from "@/lib/utils";

export type UnitType = 'villager' | 'warrior' | 'archer';

interface UnitProps {
  type: UnitType;
  position: { x: number; y: number };
  health: number;
  trainingProgress?: number;
}

const Unit: React.FC<UnitProps> = ({
  type,
  position,
  health,
  trainingProgress
}) => {
  const unitImages = {
    villager: "/lovable-uploads/b89a3e30-67f1-4a91-b3df-ba4819f9d934.png",
    warrior: "/lovable-uploads/cb87f06e-098a-4bd1-a356-e578b3ffa3b2.png",
    archer: "/lovable-uploads/4065badc-b430-4863-ae64-85bdcc38887e.png"
  };

  return (
    <div 
      style={{ 
        position: 'absolute', 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)' 
      }}
      className={cn(
        "w-12 h-12 cursor-pointer transition-transform hover:scale-105",
        trainingProgress !== undefined && trainingProgress < 100 && "opacity-70"
      )}
    >
      <img 
        src={unitImages[type]} 
        alt={`${type} unit`}
        className="w-full h-full object-contain"
      />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-red-200">
        <div 
          className="h-full bg-red-500 transition-all duration-300"
          style={{ width: `${health}%` }}
        />
      </div>
      {trainingProgress !== undefined && trainingProgress < 100 && (
        <div className="absolute -top-2 left-0 w-full h-1 bg-gray-200">
          <div 
            className="h-full bg-game-accent transition-all duration-300"
            style={{ width: `${trainingProgress}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default Unit;