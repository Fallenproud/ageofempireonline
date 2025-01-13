import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Hero {
  id: number;
  name: string;
  bonus: string;
  civilization: string;
  image: string;
}

interface HeroSelectionProps {
  heroes: Hero[];
  selectedHero: Hero | null;
  onHeroSelect: (hero: Hero) => void;
}

const HeroSelection: React.FC<HeroSelectionProps> = ({ heroes, selectedHero, onHeroSelect }) => {
  return (
    <div className="fixed top-32 left-4">
      <Card className="p-4 bg-opacity-90 backdrop-blur">
        <h2 className="text-xl mb-3 text-game-accent">Heroes</h2>
        <div className="flex flex-col gap-2">
          {heroes.map((hero) => (
            <Button
              key={hero.id}
              variant={selectedHero?.id === hero.id ? "secondary" : "outline"}
              className="w-full justify-start"
              onClick={() => onHeroSelect(hero)}
            >
              <div className="flex items-center gap-3">
                <img src={hero.image} alt={hero.name} className="w-12 h-12 rounded-full object-cover" />
                <div className="text-left">
                  <div>{hero.name}</div>
                  <div className="text-sm opacity-70">{hero.bonus}</div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default HeroSelection;