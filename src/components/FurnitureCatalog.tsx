import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { SwipeNavigation } from '@/components/ui/swipe-navigation';
import { AnimatedCard } from '@/components/ui/animated-card';
import { demoFurniture } from '@/data/demo-furniture';
import { 
  Search, 
  Filter, 
  Plus, 
  Star, 
  MapPin, 
  Heart,
  ArrowLeft,
  SlidersHorizontal,
  Zap,
  Truck
} from 'lucide-react';
import studyTable from '@/assets/study-table.jpg';

interface FurnitureCatalogProps {
  onNavigate: (screen: string) => void;
}

export const FurnitureCatalog: React.FC<FurnitureCatalogProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', name: 'All', count: 124 },
    { id: 'tables', name: 'Tables', count: 32 },
    { id: 'chairs', name: 'Chairs', count: 28 },
    { id: 'storage', name: 'Storage', count: 24 },
    { id: 'lighting', name: 'Lighting', count: 18 },
    { id: 'decor', name: 'Decor', count: 22 }
  ];

  // Use enhanced demo data
  const furnitureItems = demoFurniture.map(item => ({
    ...item,
    image: studyTable, // Using placeholder for all items
    inBudget: item.price <= 10000 // Simple budget check
  }));

  const filteredItems = furnitureItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCategory === 'all' || item.name.toLowerCase().includes(selectedCategory))
  );

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
              <h1 className="text-lg font-bold text-foreground">Furniture Catalog</h1>
              <p className="text-sm text-muted-foreground">For your bedroom</p>
            </div>
            <Button 
              size="icon" 
              variant="ghost"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-card shadow-soft">
        <div className="max-w-md mx-auto p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search furniture..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="bg-card shadow-soft">
        <div className="max-w-md mx-auto p-4">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="whitespace-nowrap flex-shrink-0"
              >
                {category.name}
                <Badge variant="secondary" className="ml-2 text-xs">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      {showFilters && (
        <div className="bg-secondary/50 border-b border-border">
          <div className="max-w-md mx-auto p-4">
            <div className="flex items-center space-x-4 text-sm">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-1" />
                Price: ₹0-₹10K
              </Button>
              <Button variant="outline" size="sm">
                <MapPin className="w-4 h-4 mr-1" />
                Local Only
              </Button>
              <Button variant="outline" size="sm">
                <Star className="w-4 h-4 mr-1" />
                4+ Rating
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Furniture Grid */}
      <div className="p-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">
              {filteredItems.length} items found
            </span>
            <Button variant="ghost" size="sm">
              Sort by: Relevance
            </Button>
          </div>

          <div className="space-y-4">
            {filteredItems.map((item) => (
              <AnimatedCard key={item.id} className="shadow-soft overflow-hidden">
                <div className="flex">
                  <div className="relative">
                    <SwipeNavigation
                      currentIndex={0}
                      onIndexChange={() => {}}
                      showDots={false}
                      className="w-24 h-24"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover"
                      />
                      <img
                        src={item.image}
                        alt={`${item.name} alt view`}
                        className="w-24 h-24 object-cover"
                      />
                    </SwipeNavigation>
                    
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute top-1 right-1 w-6 h-6 bg-card/80 backdrop-blur-sm"
                    >
                      <Heart className="w-3 h-3" />
                    </Button>
                    
                    {item.isBestFit && (
                      <Badge 
                        variant="default" 
                        className="absolute bottom-1 left-1 text-xs bg-accent-teal text-white"
                      >
                        <Zap className="w-2 h-2 mr-1" />
                        Best Fit
                      </Badge>
                    )}
                    
                    {item.discount && (
                      <Badge 
                        variant="destructive" 
                        className="absolute top-1 left-1 text-xs"
                      >
                        {item.discount}% OFF
                      </Badge>
                    )}
                  </div>
                  
                  <CardContent className="flex-1 p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="font-medium text-sm text-foreground line-clamp-2">
                          {item.name}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 fill-accent-amber text-accent-amber" />
                            <span className="text-xs text-muted-foreground">
                              {item.rating} ({item.reviews})
                            </span>
                          </div>
                          {item.isLocalVendor && (
                            <Badge variant="outline" className="text-xs bg-accent/10 text-accent border-accent">
                              <MapPin className="w-2 h-2 mr-1" />
                              Local
                            </Badge>
                          )}
                          {!item.inStock && (
                            <Badge variant="secondary" className="text-xs">
                              Pre-order
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-primary">
                          ₹{item.price.toLocaleString('en-IN')}
                        </span>
                        {item.originalPrice && item.originalPrice > item.price && (
                          <span className="text-xs text-muted-foreground line-through">
                            ₹{item.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                        {!item.inBudget && (
                          <Badge variant="destructive" className="text-xs">
                            Over Budget
                          </Badge>
                        )}
                      </div>
                      
                      <div className="text-xs text-muted-foreground flex items-center space-x-2">
                        <span>{item.vendor}</span>
                        <span>•</span>
                        <div className="flex items-center space-x-1">
                          <Truck className="w-3 h-3" />
                          <span>{item.deliveryTime}</span>
                        </div>
                      </div>
                      
                      {/* Color options */}
                      {item.colors && item.colors.length > 0 && (
                        <div className="flex items-center space-x-1">
                          <span className="text-xs text-muted-foreground">Colors:</span>
                          <div className="flex space-x-1">
                            {item.colors.slice(0, 3).map((color, index) => (
                              <div
                                key={index}
                                className="w-3 h-3 rounded-full border border-border bg-muted"
                                title={color}
                              />
                            ))}
                            {item.colors.length > 3 && (
                              <span className="text-xs text-muted-foreground">+{item.colors.length - 3}</span>
                            )}
                          </div>
                        </div>
                      )}
                      
                      <Button 
                        size="sm" 
                        variant={item.inBudget ? "gradient" : "outline"}
                        className="w-full"
                        onClick={() => onNavigate('placement')}
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        Add to Room
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};