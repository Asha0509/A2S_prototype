import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { RoomHotspots } from '@/components/ui/room-hotspots';
import { BudgetCalculator } from '@/components/ui/budget-calculator';
import { SwipeNavigation } from '@/components/ui/swipe-navigation';
import { 
  Plus, 
  RotateCcw, 
  Map, 
  Maximize2, 
  DollarSign,
  Eye,
  Grid3x3,
  Share,
  Settings,
  TrendingUp
} from 'lucide-react';
import room3d from '@/assets/room-3d.jpg';
import livingRoom from '@/assets/living-room.jpg';

interface RoomVisualizationProps {
  onNavigate: (screen: string) => void;
}

export const RoomVisualization: React.FC<RoomVisualizationProps> = ({ onNavigate }) => {
  const [budget, setBudget] = useState([30000]);
  const [isFloorPlan, setIsFloorPlan] = useState(false);
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);
  const [showBudgetBreakdown, setShowBudgetBreakdown] = useState(false);
  const [roomData] = useState({
    dimensions: "10x12 ft",
    type: "Bedroom",
    style: "Modern Minimalist"
  });

  const roomViews = [
    { name: '3D View', image: room3d, type: '3d' },
    { name: 'Alternative View', image: livingRoom, type: '3d' },
    { name: 'Floor Plan', image: room3d, type: 'floorplan' }
  ];

  const budgetData = [
    {
      category: 'Furniture',
      allocated: 20000,
      spent: 14500,
      items: [
        { name: 'Oak Study Table', price: 7500 },
        { name: 'Ergonomic Chair', price: 4200 },
        { name: 'Floor Lamp', price: 2800 }
      ]
    },
    {
      category: 'Storage',
      allocated: 8000,
      spent: 3800,
      items: [
        { name: 'Modern Bookshelf', price: 3800 }
      ]
    },
    {
      category: 'Decor',
      allocated: 2000,
      spent: 0,
      items: []
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Header */}
      <div className="bg-card shadow-soft border-b border-border">
        <div className="max-w-md mx-auto p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-foreground">Your Room</h1>
              <p className="text-sm text-muted-foreground">{roomData.dimensions} {roomData.type}</p>
            </div>
            <Badge variant="outline" className="bg-accent-amber/10 text-accent-amber border-accent-amber">
              {roomData.style}
            </Badge>
          </div>
        </div>
      </div>

      {/* Budget Slider */}
      <div className="bg-card shadow-soft">
        <div className="max-w-md mx-auto p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">Budget</span>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary">
              ₹{budget[0].toLocaleString('en-IN')}
            </Badge>
          </div>
          <Slider
            value={budget}
            onValueChange={setBudget}
            max={100000}
            min={10000}
            step={5000}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>₹10K</span>
            <span>₹100K</span>
          </div>
        </div>
      </div>

      {/* Interactive Room Views */}
      <div className="p-4">
        <div className="max-w-md mx-auto">
          <Card className="shadow-medium overflow-hidden">
            <SwipeNavigation
              currentIndex={currentRoomIndex}
              onIndexChange={setCurrentRoomIndex}
              showDots={true}
              showArrows={false}
            >
              {roomViews.map((view, index) => (
                <div key={index} className="relative">
                  <RoomHotspots
                    imageUrl={view.image}
                    hotspots={[]}
                    onHotspotClick={(hotspot) => {
                      console.log('Hotspot clicked:', hotspot);
                    }}
                    onAddFurniture={(x, y) => {
                      console.log('Add furniture at:', x, y);
                      onNavigate('catalog');
                    }}
                  />
                  
                  {/* Overlay Controls */}
                  <div className="absolute top-4 right-4 space-y-2">
                    <Button 
                      size="icon" 
                      variant="secondary"
                      className="bg-card/90 backdrop-blur-sm"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="secondary"
                      className="bg-card/90 backdrop-blur-sm"
                    >
                      <Share className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="secondary"
                      className="bg-card/90 backdrop-blur-sm"
                      onClick={() => setShowBudgetBreakdown(!showBudgetBreakdown)}
                    >
                      <TrendingUp className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* View Label */}
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="outline" className="bg-card/90 backdrop-blur-sm">
                      {view.name}
                    </Badge>
                  </div>
                </div>
              ))}
            </SwipeNavigation>
          </Card>

          {/* Room Stats */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <Card className="shadow-soft">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">8</div>
                <div className="text-xs text-muted-foreground">Items Placed</div>
              </CardContent>
            </Card>
            <Card className="shadow-soft">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-accent-teal">75%</div>
                <div className="text-xs text-muted-foreground">Space Used</div>
              </CardContent>
            </Card>
            <Card className="shadow-soft">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-accent-amber">₹22K</div>
                <div className="text-xs text-muted-foreground">Total Cost</div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 mt-6">
            <Button 
              variant="gradient" 
              size="lg" 
              className="w-full"
              onClick={() => onNavigate('catalog')}
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Furniture
            </Button>
            
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => onNavigate('placement')}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Rearrange
              </Button>
              <Button 
                variant="teal" 
                className="flex-1"
                onClick={() => onNavigate('expert')}
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Get Expert Help
              </Button>
            </div>
          </div>

          {/* Budget Breakdown or Recent Additions */}
          {showBudgetBreakdown ? (
            <BudgetCalculator
              totalBudget={budget[0]}
              budgetItems={budgetData}
              className="mt-6"
              onOptimize={() => {
                // Handle budget optimization
                console.log('Optimize budget');
              }}
            />
          ) : (
            <Card className="shadow-soft mt-6">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Recently Added</CardTitle>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => setShowBudgetBreakdown(true)}
                  >
                    <Settings className="w-4 h-4 mr-1" />
                    Budget
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "Oak Study Table", price: "₹7,500", vendor: "Hyderabad Home Store" },
                  { name: "Ergonomic Chair", price: "₹4,200", vendor: "Office Plus" },
                  { name: "Floor Lamp", price: "₹2,800", vendor: "Light House" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <div className="font-medium text-sm">{item.name}</div>
                      <div className="text-xs text-muted-foreground">{item.vendor}</div>
                    </div>
                    <div className="text-sm font-medium text-primary">{item.price}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};