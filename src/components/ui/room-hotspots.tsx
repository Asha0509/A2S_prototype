import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Info, ShoppingCart, Settings, X } from 'lucide-react';

interface Hotspot {
  id: string;
  x: number; // Percentage from left
  y: number; // Percentage from top
  item: {
    name: string;
    price: number;
    vendor: string;
    inBudget: boolean;
  };
  type: 'furniture' | 'space' | 'suggestion';
}

interface RoomHotspotsProps {
  imageUrl: string;
  hotspots: Hotspot[];
  className?: string;
  onHotspotClick?: (hotspot: Hotspot) => void;
  onAddFurniture?: (x: number, y: number) => void;
}

export const RoomHotspots: React.FC<RoomHotspotsProps> = ({
  imageUrl,
  hotspots,
  className,
  onHotspotClick,
  onAddFurniture
}) => {
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const [showAddMode, setShowAddMode] = useState(false);

  const defaultHotspots: Hotspot[] = [
    {
      id: '1',
      x: 25,
      y: 60,
      item: { name: 'Oak Study Table', price: 7500, vendor: 'Local Store', inBudget: true },
      type: 'furniture'
    },
    {
      id: '2', 
      x: 75,
      y: 45,
      item: { name: 'Add Bookshelf Here', price: 3800, vendor: 'Suggested', inBudget: true },
      type: 'suggestion'
    },
    {
      id: '3',
      x: 50,
      y: 80,
      item: { name: 'Floor Lamp', price: 2800, vendor: 'Light House', inBudget: true },
      type: 'furniture'
    }
  ];

  const activeHotspots = hotspots.length > 0 ? hotspots : defaultHotspots;

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!showAddMode) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    onAddFurniture?.(x, y);
    setShowAddMode(false);
  };

  const getHotspotColor = (type: string, inBudget: boolean) => {
    if (type === 'suggestion') return 'bg-accent-amber/90 border-accent-amber';
    if (!inBudget) return 'bg-destructive/90 border-destructive';
    return 'bg-accent-teal/90 border-accent-teal';
  };

  return (
    <div className={cn("relative overflow-hidden rounded-lg", className)}>
      {/* Room Image */}
      <div 
        className={cn(
          "relative w-full h-64 cursor-pointer transition-all duration-200",
          showAddMode && "cursor-crosshair"
        )}
        onClick={handleImageClick}
      >
        <img 
          src={imageUrl} 
          alt="Room Layout" 
          className="w-full h-full object-cover"
        />
        
        {/* Add Mode Overlay */}
        {showAddMode && (
          <div className="absolute inset-0 bg-primary/10 backdrop-blur-[0.5px] flex items-center justify-center">
            <Badge variant="outline" className="bg-card/90 backdrop-blur-sm">
              Click anywhere to add furniture
            </Badge>
          </div>
        )}

        {/* Hotspots */}
        {activeHotspots.map((hotspot) => (
          <div
            key={hotspot.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${hotspot.x}%`,
              top: `${hotspot.y}%`
            }}
          >
            {/* Hotspot Indicator */}
            <Button
              size="icon"
              variant="secondary"
              className={cn(
                "w-8 h-8 rounded-full border-2 shadow-lg animate-pulse",
                getHotspotColor(hotspot.type, hotspot.item.inBudget),
                "hover:scale-110 transition-transform duration-200"
              )}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedHotspot(selectedHotspot === hotspot.id ? null : hotspot.id);
                onHotspotClick?.(hotspot);
              }}
            >
              {hotspot.type === 'suggestion' ? (
                <ShoppingCart className="w-4 h-4 text-white" />
              ) : (
                <Info className="w-4 h-4 text-white" />
              )}
            </Button>

            {/* Hotspot Details Popup */}
            {selectedHotspot === hotspot.id && (
              <Card className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-48 shadow-lg z-10 animate-scale-in">
                <CardContent className="p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-foreground line-clamp-2">
                        {hotspot.item.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {hotspot.item.vendor}
                      </p>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="w-6 h-6 -mt-1 -mr-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedHotspot(null);
                      }}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary text-sm">
                      ₹{hotspot.item.price.toLocaleString('en-IN')}
                    </span>
                    {!hotspot.item.inBudget && (
                      <Badge variant="destructive" className="text-xs">
                        Over Budget
                      </Badge>
                    )}
                  </div>
                  
                  {hotspot.type === 'suggestion' ? (
                    <Button size="sm" variant="gradient" className="w-full mt-2">
                      <ShoppingCart className="w-3 h-3 mr-1" />
                      Add Item
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" className="w-full mt-2">
                      <Settings className="w-3 h-3 mr-1" />
                      Customize
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="absolute top-4 right-4 space-y-2">
        <Button
          size="icon"
          variant="secondary"
          className={cn(
            "bg-card/90 backdrop-blur-sm",
            showAddMode && "bg-accent-teal text-white"
          )}
          onClick={() => setShowAddMode(!showAddMode)}
        >
          <ShoppingCart className="w-4 h-4" />
        </Button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 flex space-x-2">
        <Badge variant="outline" className="bg-card/90 backdrop-blur-sm text-xs">
          <div className="w-2 h-2 rounded-full bg-accent-teal mr-1"></div>
          Placed
        </Badge>
        <Badge variant="outline" className="bg-card/90 backdrop-blur-sm text-xs">
          <div className="w-2 h-2 rounded-full bg-accent-amber mr-1"></div>
          Suggested
        </Badge>
      </div>
    </div>
  );
};