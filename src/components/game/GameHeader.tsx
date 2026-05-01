import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sun, Cloud, CloudRain, Zap, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface WeatherEffects {
  moveSpeed: number;
  attackPower: number;
  visibility: number;
}

interface WeatherProps {
  weather: string;
  weatherEffects: WeatherEffects;
  weatherIcons: {
    [key: string]: {
      icon: any;
      color: string;
      label: string;
      description: string;
    };
  };
}

const GameHeader: React.FC<WeatherProps> = ({ weather, weatherEffects, weatherIcons }) => {
  const { user, signOut } = useAuth();
  return (
    <>
      <div className="fixed top-0 left-0 right-0 bg-game-secondary/90 backdrop-blur p-2 flex items-center justify-between z-50">
        <div className="w-32" />
        <img 
          src="/lovable-uploads/aad01c13-58d2-4c99-9e7f-3d05893a467d.png" 
          alt="Game Logo" 
          className="h-12 object-contain"
        />
        <div className="w-32 flex justify-end items-center gap-2">
          {user && (
            <>
              <span className="text-game-accent text-sm hidden sm:inline">
                {user.email?.split('@')[0]}
              </span>
              <Button size="sm" variant="ghost" onClick={signOut}>
                <LogOut className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="fixed top-4 left-1/2 -translate-x-1/2">
        <Card className="p-4 bg-opacity-90 backdrop-blur">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              {React.createElement(weatherIcons[weather].icon, {
                className: `w-6 h-6 ${weatherIcons[weather].color}`
              })}
              <span className="text-game-accent font-semibold">
                {weatherIcons[weather].label}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              {weatherIcons[weather].description}
            </div>
            <div className="grid grid-cols-3 gap-4 text-xs text-game-accent mt-2">
              <div className="text-center">
                <div>Move Speed</div>
                <div>{Math.round(weatherEffects.moveSpeed * 100)}%</div>
              </div>
              <div className="text-center">
                <div>Attack</div>
                <div>{Math.round(weatherEffects.attackPower * 100)}%</div>
              </div>
              <div className="text-center">
                <div>Visibility</div>
                <div>{Math.round(weatherEffects.visibility * 100)}%</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default GameHeader;