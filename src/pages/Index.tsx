import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [resources, setResources] = useState({ wood: 100, stone: 50, gold: 25 });
  const [buildings, setBuildings] = useState([]);
  const [selectedHero, setSelectedHero] = useState(null);
  const [weather, setWeather] = useState('clear');

  const heroes = [
    { id: 1, name: "Arthur", bonus: "Wood +20%", civilization: "Britons" },
    { id: 2, name: "Joan", bonus: "Defense +15%", civilization: "French" },
    { id: 3, name: "Saladin", bonus: "Gold +25%", civilization: "Saracens" },
  ];

  const constructBuilding = (type) => {
    toast({
      title: "Building Started",
      description: `Construction of ${type} has begun!`,
    });
    // Add building logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-game-secondary to-game-primary p-4">
      {/* Resources Display */}
      <div className="fixed top-4 right-4 flex gap-4">
        <Card className="p-3 bg-opacity-90 backdrop-blur">
          <div className="flex gap-4 text-game-accent">
            <div>Wood: {resources.wood}</div>
            <div>Stone: {resources.stone}</div>
            <div>Gold: {resources.gold}</div>
          </div>
        </Card>
      </div>

      {/* Hero Selection */}
      <div className="fixed top-4 left-4">
        <Card className="p-4 bg-opacity-90 backdrop-blur">
          <h2 className="text-xl mb-3 text-game-accent">Heroes</h2>
          <div className="flex flex-col gap-2">
            {heroes.map((hero) => (
              <Button
                key={hero.id}
                variant={selectedHero?.id === hero.id ? "secondary" : "outline"}
                className="w-full justify-start"
                onClick={() => setSelectedHero(hero)}
              >
                <div className="text-left">
                  <div>{hero.name}</div>
                  <div className="text-sm opacity-70">{hero.bonus}</div>
                </div>
              </Button>
            ))}
          </div>
        </Card>
      </div>

      {/* Building Menu */}
      <div className="fixed bottom-4 left-4">
        <Card className="p-4 bg-opacity-90 backdrop-blur">
          <h2 className="text-xl mb-3 text-game-accent">Buildings</h2>
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => constructBuilding('House')}
            >
              House (50 wood)
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => constructBuilding('Barracks')}
            >
              Barracks (100 wood, 50 stone)
            </Button>
          </div>
        </Card>
      </div>

      {/* Weather Display */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2">
        <Card className="p-3 bg-opacity-90 backdrop-blur">
          <div className="text-game-accent">
            Weather: {weather.charAt(0).toUpperCase() + weather.slice(1)}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;