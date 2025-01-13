import React from 'react';
import { unitCosts } from './UnitManager';
import { UnitType } from './Unit';

interface UnitControlsProps {
  selectedUnitType: UnitType | null;
  onUnitSelect: (type: UnitType) => void;
}

const UnitControls: React.FC<UnitControlsProps> = ({
  selectedUnitType,
  onUnitSelect,
}) => {
  return (
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
            onUnitSelect(type as UnitType);
          }}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

export default UnitControls;