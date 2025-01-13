import React, { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Sun, Cloud, CloudRain, Zap } from "lucide-react";
import ResourceManager from '@/components/game/ResourceManager';
import BuildingManager from '@/components/game/BuildingManager';
import UnitManager from '@/components/game/UnitManager';
import GameHeader from '@/components/game/GameHeader';
import ResourceDisplay from '@/components/game/ResourceDisplay';
import HeroSelection from '@/components/game/HeroSelection';

const Index = () => {
  const { toast } = useToast();
  const [resources, setResources] = useState({ wood: 100, stone: 50, gold: 25 });
  const [selectedHero, setSelectedHero] = useState(null);
  const [weather, setWeather] = useState('clear');
  const [isLoading, setIsLoading] = useState(true);
  const [weatherEffects, setWeatherEffects] = useState({
    moveSpeed: 1,
    attackPower: 1,
    visibility: 1
  });

  const weatherIcons = {
    clear: {
      icon: Sun,
      color: "text-yellow-500",
      label: "Clear",
      description: "Perfect conditions for gathering and combat"
    },
    rain: {
      icon: CloudRain,
      color: "text-blue-500",
      label: "Rain",
      description: "Reduced movement speed"
    },
    fog: {
      icon: Cloud,
      color: "text-gray-500",
      label: "Fog",
      description: "Limited visibility"
    },
    lightning: {
      icon: Zap,
      color: "text-amber-500",
      label: "Lightning Storm",
      description: "Increased attack power"
    }
  };

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

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  const handleResourceUpdate = (gathered) => {
    setResources(prev => ({
      wood: prev.wood + gathered.wood,
      stone: prev.stone + gathered.stone,
      gold: prev.gold + gathered.gold,
    }));
  };

  const handleResourcesSpent = (cost) => {
    setResources(prev => ({
      wood: prev.wood - cost.wood,
      stone: prev.stone - cost.stone,
      gold: prev.gold - cost.gold,
    }));
  };

  useEffect(() => {
    const weatherTypes = ['clear', 'rain', 'fog', 'lightning'];
    const weatherInterval = setInterval(() => {
      const newWeather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
      setWeather(newWeather);
      
      const effects = {
        clear: { moveSpeed: 1, attackPower: 1, visibility: 1 },
        rain: { moveSpeed: 0.7, attackPower: 0.9, visibility: 0.8 },
        fog: { moveSpeed: 0.8, attackPower: 0.7, visibility: 0.5 },
        lightning: { moveSpeed: 1, attackPower: 1.2, visibility: 0.9 }
      };
      
      setWeatherEffects(effects[newWeather]);
      
      toast({
        title: `Weather Changed: ${weatherIcons[newWeather].label}`,
        description: weatherIcons[newWeather].description,
      });
    }, 30000);

    return () => clearInterval(weatherInterval);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-game-secondary flex items-center justify-center flex-col gap-4">
        <img 
          src="/lovable-uploads/aad01c13-58d2-4c99-9e7f-3d05893a467d.png" 
          alt="Age of Empires 2025 Online" 
          className="w-64 h-64 object-contain animate-pulse"
        />
        <div className="text-game-accent text-xl font-bold">Loading your realm...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-game-secondary to-game-primary p-4">
      <GameHeader 
        weather={weather}
        weatherEffects={weatherEffects}
        weatherIcons={weatherIcons}
      />
      
      <ResourceDisplay resources={resources} />
      
      <HeroSelection
        heroes={heroes}
        selectedHero={selectedHero}
        onHeroSelect={setSelectedHero}
      />

      <div className="fixed inset-0 z-0 mt-16">
        <ResourceManager onResourceUpdate={handleResourceUpdate} />
        <BuildingManager 
          resources={resources}
          onResourcesSpent={handleResourcesSpent}
        />
        <UnitManager
          resources={resources}
          onResourcesSpent={handleResourcesSpent}
        />
      </div>

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