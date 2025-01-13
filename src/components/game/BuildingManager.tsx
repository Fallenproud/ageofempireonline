import React, { useState } from 'react';
import Building, { BuildingType } from './Building';
import { toast } from "@/components/ui/use-toast";

export const buildingCosts = {
  house: { wood: 50, stone: 0, gold: 0 },
  barracks: { wood: 100, stone: 50, gold: 0 },
  archeryRange: { wood: 150, stone: 50, gold: 0 }
};

interface BuildingManagerProps {
  resources: { wood: number; stone: number; gold: number };
  onResourcesSpent: (cost: { wood: number; stone: number; gold: number }) => void;
}

const BuildingManager: React.FC<BuildingManagerProps> = ({
  resources,
  onResourcesSpent
}) => {
  const [buildings, setBuildings] = useState<Array<{
    id: string;
    type: BuildingType;
    position: { x: number; y: number };
    constructionProgress: number;
  }>>([]);
  const [selectedBuildingType, setSelectedBuildingType] = useState<BuildingType | null>(null);

  const canAffordBuilding = (type: BuildingType) => {
    const cost = buildingCosts[type];
    return (
      resources.wood >= cost.wood &&
      resources.stone >= cost.stone &&
      resources.gold >= cost.gold
    );
  };

  const handlePlaceBuilding = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedBuildingType) return;

    if (!canAffordBuilding(selectedBuildingType)) {
      toast({
        title: "Cannot Build",
        description: "Not enough resources!",
      });
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newBuilding = {
      id: Date.now().toString(),
      type: selectedBuildingType,
      position: { x, y },
      constructionProgress: 0
    };

    setBuildings(prev => [...prev, newBuilding]);
    onResourcesSpent(buildingCosts[selectedBuildingType]);
    
    // Start construction
    const constructionInterval = setInterval(() => {
      setBuildings(prev => 
        prev.map(building => {
          if (building.id === newBuilding.id) {
            const newProgress = building.constructionProgress + 1;
            if (newProgress >= 100) {
              clearInterval(constructionInterval);
              toast({
                title: "Construction Complete",
                description: `${selectedBuildingType} is ready!`,
              });
            }
            return { ...building, constructionProgress: Math.min(newProgress, 100) };
          }
          return building;
        })
      );
    }, 100);

    setSelectedBuildingType(null);
  };

  return (
    <div className="relative w-full h-full" onClick={handlePlaceBuilding}>
      <div className="fixed bottom-4 right-4 flex gap-2">
        {Object.keys(buildingCosts).map((type) => (
          <button
            key={type}
            className={`p-2 rounded ${
              selectedBuildingType === type 
                ? 'bg-game-accent text-white' 
                : 'bg-game-secondary text-game-accent'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedBuildingType(type as BuildingType);
            }}
          >
            {type}
          </button>
        ))}
      </div>
      {buildings.map(building => (
        <Building
          key={building.id}
          type={building.type}
          position={building.position}
          constructionProgress={building.constructionProgress}
        />
      ))}
    </div>
  );
};

export default BuildingManager;