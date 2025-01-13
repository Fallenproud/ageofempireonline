import React, { useState, useEffect } from 'react';
import ResourceNode, { ResourceType } from './ResourceNode';
import { Card } from "@/components/ui/card";

interface ResourceManagerProps {
  onResourceUpdate: (resources: { wood: number; stone: number; gold: number }) => void;
}

const ResourceManager: React.FC<ResourceManagerProps> = ({ onResourceUpdate }) => {
  const [nodes, setNodes] = useState<Array<{
    id: string;
    type: ResourceType;
    position: { x: number; y: number };
    amount: number;
  }>>([]);

  useEffect(() => {
    // Initialize resource nodes
    const initialNodes = [
      { id: '1', type: 'wood', position: { x: 100, y: 100 }, amount: 1000 },
      { id: '2', type: 'wood', position: { x: 300, y: 150 }, amount: 1000 },
      { id: '3', type: 'stone', position: { x: 200, y: 250 }, amount: 800 },
      { id: '4', type: 'gold', position: { x: 400, y: 200 }, amount: 500 },
    ];
    setNodes(initialNodes);
  }, []);

  const handleGather = (nodeId: string, gatheredAmount: number) => {
    setNodes(prevNodes => 
      prevNodes.map(node => {
        if (node.id === nodeId) {
          const newAmount = Math.max(0, node.amount - gatheredAmount);
          return { ...node, amount: newAmount };
        }
        return node;
      })
    );

    // Update total resources
    const node = nodes.find(n => n.id === nodeId);
    if (node) {
      onResourceUpdate({
        wood: node.type === 'wood' ? gatheredAmount : 0,
        stone: node.type === 'stone' ? gatheredAmount : 0,
        gold: node.type === 'gold' ? gatheredAmount : 0,
      });
    }
  };

  return (
    <div className="relative w-full h-full">
      {nodes.map(node => (
        <ResourceNode
          key={node.id}
          type={node.type}
          position={node.position}
          amount={node.amount}
          onGather={(amount) => handleGather(node.id, amount)}
        />
      ))}
    </div>
  );
};

export default ResourceManager;