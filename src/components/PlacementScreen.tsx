import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft,
  RotateCw,
  Move,
  Trash2,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Ruler,
  Users
} from 'lucide-react';
import room3d from '@/assets/room-3d.jpg';

interface PlacementScreenProps {
  onNavigate: (screen: string) => void;
}

export const PlacementScreen: React.FC<PlacementScreenProps> = ({ onNavigate }) => {
  const [selectedItem, setSelectedItem] = useState<string | null>('table');
  const [budgetUsed] = useState(75);
  const [spaceUsage] = useState(68);
  const [showWarnings, setShowWarnings] = useState(true);

  const placedItems = [
    {
      id: 'table',
      name: 'Oak Study Table',
      price: 7500,
      position: { x: 40, y: 60 },
      rotation: 0,
      selected: selectedItem === 'table'
    },
    {
      id: 'chair',
      name: 'Ergonomic Chair',
      price: 4200,
      position: { x: 35, y: 45 },
      rotation: 180,
      selected: selectedItem === 'chair'
    },
    {
      id: 'lamp',
      name: 'Floor Lamp',
      price: 2800,
      position: { x: 70, y: 30 },
      rotation: 0,
      selected: selectedItem === 'lamp'
    }
  ];

  const totalCost = placedItems.reduce((sum, item) => sum + item.price, 0);
  const budgetLimit = 30000;

  const warnings = [
    {
      type: 'space',
      message: 'Table blocks main walking path',
      severity: 'warning'
    },
    {
      type: 'budget',
      message: `₹${(totalCost + 5000).toLocaleString('en-IN')} exceeds budget by ₹${(totalCost + 5000 - budgetLimit).toLocaleString('en-IN')}`,
      severity: 'error'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Header */}
      <div className="bg-card shadow-soft border-b border-border sticky top-0 z-10">
        <div className="max-w-md mx-auto p-4">
          <div className="flex items-center space-x-3">
            <Button 
              size="icon" 
              variant="ghost"
              onClick={() => onNavigate('room')}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-lg font-bold text-foreground">Arrange Furniture</h1>
              <p className="text-sm text-muted-foreground">Drag to move, tap to select</p>
            </div>
          </div>
        </div>
      </div>

      {/* Budget & Space Status */}
      <div className="bg-card shadow-soft">
        <div className="max-w-md mx-auto p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Budget Used</span>
            <Badge 
              variant={budgetUsed > 90 ? "destructive" : budgetUsed > 75 ? "default" : "secondary"}
              className="text-xs"
            >
              {budgetUsed}% (₹{totalCost.toLocaleString('en-IN')})
            </Badge>
          </div>
          <Progress value={budgetUsed} className="h-2" />
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Space Used</span>
            <Badge variant="outline" className="text-xs">
              {spaceUsage}%
            </Badge>
          </div>
          <Progress value={spaceUsage} className="h-2" />
        </div>
      </div>

      {/* Warnings */}
      {showWarnings && warnings.length > 0 && (
        <div className="bg-destructive/5 border-l-4 border-destructive">
          <div className="max-w-md mx-auto p-4">
            {warnings.map((warning, index) => (
              <div key={index} className="flex items-start space-x-2 mb-2 last:mb-0">
                <AlertTriangle className="w-4 h-4 text-destructive mt-0.5" />
                <span className="text-sm text-destructive">{warning.message}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3D Room Canvas */}
      <div className="p-4">
        <div className="max-w-md mx-auto">
          <Card className="shadow-medium overflow-hidden">
            <div className="relative">
              <img 
                src={room3d} 
                alt="Room Layout" 
                className="w-full h-64 object-cover"
              />
              
              {/* Furniture Items Overlay */}
              {placedItems.map((item) => (
                <div
                  key={item.id}
                  className={`absolute w-8 h-8 rounded-lg cursor-move transition-all ${
                    item.selected 
                      ? 'bg-primary border-2 border-primary shadow-lg scale-110' 
                      : 'bg-accent-teal border border-accent-teal'
                  }`}
                  style={{
                    left: `${item.position.x}%`,
                    top: `${item.position.y}%`,
                    transform: `translate(-50%, -50%) rotate(${item.rotation}deg)`
                  }}
                  onClick={() => setSelectedItem(item.id)}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded"></div>
                  </div>
                </div>
              ))}
              
              {/* Walking Path Overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <svg className="w-full h-full">
                  <path
                    d="M 20 80 Q 50 60 80 40"
                    stroke="rgba(59, 130, 246, 0.5)"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    fill="none"
                  />
                  <text x="50" y="90" className="text-xs fill-primary">Walking Path</text>
                </svg>
              </div>

              {/* Grid Overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="w-full h-full" style={{
                  backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }} />
              </div>
            </div>
          </Card>

          {/* Item Controls */}
          {selectedItem && (
            <Card className="shadow-soft mt-4">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center justify-between">
                  <span>{placedItems.find(i => i.id === selectedItem)?.name}</span>
                  <Badge variant="outline">
                    ₹{placedItems.find(i => i.id === selectedItem)?.price.toLocaleString('en-IN')}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Move className="w-4 h-4 mr-1" />
                    Move
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <RotateCw className="w-4 h-4 mr-1" />
                    Rotate
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center space-x-1">
                    <Ruler className="w-3 h-3 text-muted-foreground" />
                    <span className="text-muted-foreground">120x60 cm</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-3 h-3 text-muted-foreground" />
                    <span className="text-muted-foreground">2 users</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Placement Stats */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <Card className="shadow-soft">
              <CardContent className="p-3 text-center">
                <div className="text-lg font-bold text-primary">{placedItems.length}</div>
                <div className="text-xs text-muted-foreground">Items</div>
              </CardContent>
            </Card>
            <Card className="shadow-soft">
              <CardContent className="p-3 text-center">
                <div className="text-lg font-bold text-accent-teal">{spaceUsage}%</div>
                <div className="text-xs text-muted-foreground">Space</div>
              </CardContent>
            </Card>
            <Card className="shadow-soft">
              <CardContent className="p-3 text-center">
                <div className="text-lg font-bold text-accent-amber">₹{(totalCost/1000).toFixed(0)}K</div>
                <div className="text-xs text-muted-foreground">Total</div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 mt-6">
            <Button 
              variant="gradient" 
              size="lg" 
              className="w-full"
              onClick={() => onNavigate('expert')}
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Finalize Layout
            </Button>
            
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => onNavigate('catalog')}
              >
                Add More Items
              </Button>
              <Button 
                variant="teal" 
                className="flex-1"
                onClick={() => onNavigate('expert')}
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Get Quote
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};