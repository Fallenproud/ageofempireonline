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
    { 
      id: 1, 
      name: "Arthur", 
      bonus: "Wood +20%", 
      civilization: "Britons",
      image: "/lovable-uploads/b89a3e30-67f1-4a91-b3df-ba4819f9d934.png"
    },
    { 
      id: 2, 
      name: "Joan", 
      bonus: "Defense +15%", 
      civilization: "French",
      image: "/lovable-uploads/cb87f06e-098a-4bd1-a356-e578b3ffa3b2.png"
    },
    { 
      id: 3, 
      name: "Saladin", 
      bonus: "Gold +25%", 
      civilization: "Saracens",
      image: "/lovable-uploads/4065badc-b430-4863-ae64-85bdcc38887e.png"
    },
  ];

  const buildingTypes = {
    house: {
      name: "House",
      cost: { wood: 50, stone: 0, gold: 0 },
      image: "/lovable-uploads/403d589d-44f6-4d9c-b003-84a5918edb71.png"
    },
    barracks: {
      name: "Barracks",
      cost: { wood: 100, stone: 50, gold: 0 },
      image: "/lovable-uploads/06f6421b-91d9-4182-ae25-5b9824111e3b.png"
    },
    archeryRange: {
      name: "Archery Range",
      cost: { wood: 150, stone: 50, gold: 0 },
      image: "/lovable-uploads/f1526835-ab5e-48ea-a317-4bbc731ac04a.png"
    }
  };

  const constructBuilding = (type) => {
    toast({
      title: "Building Started",
      description: `Construction of ${buildingTypes[type].name} has begun!`,
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

      {/* Building Menu */}
      <div className="fixed bottom-4 left-4">
        <Card className="p-4 bg-opacity-90 backdrop-blur">
          <h2 className="text-xl mb-3 text-game-accent">Buildings</h2>
          <div className="grid grid-cols-1 gap-2">
            {Object.entries(buildingTypes).map(([type, building]) => (
              <Button
                key={type}
                variant="outline"
                className="w-full flex items-center gap-3"
                onClick={() => constructBuilding(type)}
              >
                <img src={building.image} alt={building.name} className="w-12 h-12 object-contain" />
                <div className="text-left">
                  <div>{building.name}</div>
                  <div className="text-sm opacity-70">
                    {building.cost.wood > 0 && `${building.cost.wood} wood `}
                    {building.cost.stone > 0 && `${building.cost.stone} stone `}
                    {building.cost.gold > 0 && `${building.cost.gold} gold`}
                  </div>
                </div>
              </Button>
            ))}
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

      {/* Game Background */}
      <div className="fixed inset-0 -z-10">
        <img 
          src="/lovable-uploads/aad01c13-58d2-4c99-9e7f-3d05893a467d.png" 
          alt="Game Background" 
          className="w-full h-full object-cover opacity-30"
        />
      </div>
    </div>
  );
};

export default Index;