import React from 'react';
import Unit, { UnitType } from './Unit';

interface UnitListProps {
  units: Array<{
    id: string;
    type: UnitType;
    position: { x: number; y: number };
    health: number;
    trainingProgress: number;
  }>;
}

const UnitList: React.FC<UnitListProps> = ({ units }) => {
  return (
    <>
      {units.map(unit => (
        <Unit
          key={unit.id}
          type={unit.type}
          position={unit.position}
          health={unit.health}
          trainingProgress={unit.trainingProgress}
        />
      ))}
    </>
  );
};

export default UnitList;