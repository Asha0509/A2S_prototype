import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter, 
  Plus, 
  Star, 
  MapPin, 
  Heart,
  ArrowLeft,
  SlidersHorizontal
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

  const furnitureItems = [
    {
      id: 1,
      name: "Minimalist Oak Study Table",
      price: 7500,
      originalPrice: 9000,
      vendor: "Hyderabad Home Store",
      rating: 4.6,
      reviews: 124,
      dimensions: "120x60x75 cm",
      delivery: "3-5 days",
      isLocalVendor: true,
      isBestFit: true,
      image: studyTable,
      inBudget: true
    },
    {
      id: 2,
      name: "Ergonomic Office Chair",
      price: 4200,
      originalPrice: 5500,
      vendor: "Office Plus",
      rating: 4.4,
      reviews: 89,
      dimensions: "65x65x110 cm",
      delivery: "2-4 days",
      isLocalVendor: true,
      isBestFit: false,
      image: studyTable, // Placeholder
      inBudget: true
    },
    {
      id: 3,
      name: "Modern Floor Lamp",
      price: 2800,
      originalPrice: 3200,
      vendor: "Light House",
      rating: 4.7,
      reviews: 156,
      dimensions: "30x30x150 cm",
      delivery: "1-3 days",
      isLocalVendor: false,
      isBestFit: true,
      image: studyTable, // Placeholder
      inBudget: true
    },
    {
      id: 4,
      name: "Wooden Bookshelf",
      price: 8900,
      originalPrice: 11000,
      vendor: "Wood Craft",
      rating: 4.5,
      reviews: 67,
      dimensions: "80x30x180 cm",
      delivery: "5-7 days",
      isLocalVendor: true,
      isBestFit: false,
      image: studyTable, // Placeholder
      inBudget: false
    }
  ];

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
              <Card key={item.id} className="shadow-soft overflow-hidden">
                <div className="flex">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover"
                    />
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
                        Best Fit
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
                              Local
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
                        {item.originalPrice > item.price && (
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
                      
                      <div className="text-xs text-muted-foreground">
                        {item.vendor} • {item.delivery}
                      </div>
                      
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
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};