import React, { useState } from 'react';
import Unit, { UnitType } from './Unit';
import { toast } from "@/components/ui/use-toast";

export const unitCosts = {
  villager: { wood: 0, stone: 0, gold: 50 },
  warrior: { wood: 0, stone: 0, gold: 100 },
  archer: { wood: 50, stone: 0, gold: 50 }
};

interface UnitManagerProps {
  resources: { wood: number; stone: number; gold: number };
  onResourcesSpent: (cost: { wood: number; stone: number; gold: number }) => void;
}

const UnitManager: React.FC<UnitManagerProps> = ({
  resources,
  onResourcesSpent
}) => {
  const [units, setUnits] = useState<Array<{
    id: string;
    type: UnitType;
    position: { x: number; y: number };
    health: number;
    trainingProgress: number;
  }>>([]);
  const [selectedUnitType, setSelectedUnitType] = useState<UnitType | null>(null);

  const canAffordUnit = (type: UnitType) => {
    const cost = unitCosts[type];
    return (
      resources.wood >= cost.wood &&
      resources.stone >= cost.stone &&
      resources.gold >= cost.gold
    );
  };

  const handleTrainUnit = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedUnitType) return;

    if (!canAffordUnit(selectedUnitType)) {
      toast({
        title: "Cannot Train",
        description: "Not enough resources!",
      });
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newUnit = {
      id: Date.now().toString(),
      type: selectedUnitType,
      position: { x, y },
      health: 100,
      trainingProgress: 0
    };

    setUnits(prev => [...prev, newUnit]);
    onResourcesSpent(unitCosts[selectedUnitType]);
    
    // Start training
    const trainingInterval = setInterval(() => {
      setUnits(prev => 
        prev.map(unit => {
          if (unit.id === newUnit.id) {
            const newProgress = unit.trainingProgress + 2;
            if (newProgress >= 100) {
              clearInterval(trainingInterval);
              toast({
                title: "Training Complete",
                description: `${selectedUnitType} is ready!`,
              });
            }
            return { ...unit, trainingProgress: Math.min(newProgress, 100) };
          }
          return unit;
        })
      );
    }, 100);

    setSelectedUnitType(null);
  };

  return (
    <div className="relative w-full h-full" onClick={handleTrainUnit}>
      <div className="fixed bottom-4 left-4 flex gap-2">
        {Object.keys(unitCosts).map((type) => (
          <button
            key={type}
            className={`p-2 rounded ${
              selectedUnitType === type 
                ? 'bg-game-accent text-white' 
                : 'bg-game-secondary text-game-accent'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedUnitType(type as UnitType);
            }}
          >
            {type}
          </button>
        ))}
      </div>
      {units.map(unit => (
        <Unit
          key={unit.id}
          type={unit.type}
          position={unit.position}
          health={unit.health}
          trainingProgress={unit.trainingProgress}
        />
      ))}
    </div>
  );
};

export default UnitManager;