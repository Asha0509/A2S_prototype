import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ArrowLeft,
  MapPin,
  Star,
  Clock,
  MessageCircle,
  Phone,
  Video,
  Truck,
  Shield,
  Award,
  Users,
  Store
} from 'lucide-react';

interface VendorConnectProps {
  onNavigate: (screen: string) => void;
}

export const VendorConnect: React.FC<VendorConnectProps> = ({ onNavigate }) => {
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);

  const vendors = [
    {
      id: '1',
      name: "Hyderabad Home Store",
      type: "Furniture Retailer",
      rating: 4.6,
      reviews: 324,
      distance: "2.3 km",
      deliveryTime: "2-4 days",
      verified: true,
      specialties: ["Modern Furniture", "Office Setup", "Bedroom"],
      address: "Jubilee Hills, Hyderabad",
      phone: "+91 98765 43210",
      whatsapp: "+91 98765 43210",
      openNow: true,
      image: "/placeholder-store.jpg",
      offers: ["Free Delivery", "30-Day Return", "Installation Service"],
      portfolio: [
        { item: "Oak Study Table", price: 7500, inStock: true },
        { item: "Ergonomic Chair", price: 4200, inStock: true },
        { item: "Wooden Bookshelf", price: 8900, inStock: false }
      ]
    },
    {
      id: '2',
      name: "Office Plus",
      type: "Office Furniture Specialist",
      rating: 4.4,
      reviews: 156,
      distance: "3.7 km",
      deliveryTime: "1-3 days",
      verified: true,
      specialties: ["Office Chairs", "Desks", "Storage Solutions"],
      address: "Banjara Hills, Hyderabad",
      phone: "+91 98765 43211",
      whatsapp: "+91 98765 43211",
      openNow: true,
      image: "/placeholder-store.jpg",
      offers: ["Bulk Discounts", "Same Day Delivery", "Setup Service"],
      portfolio: [
        { item: "Executive Chair", price: 6500, inStock: true },
        { item: "Standing Desk", price: 12000, inStock: true }
      ]
    },
    {
      id: '3',
      name: "Light House",
      type: "Lighting & Decor",
      rating: 4.7,
      reviews: 89,
      distance: "1.8 km",
      deliveryTime: "1-2 days",
      verified: false,
      specialties: ["LED Lighting", "Decorative Lamps", "Smart Lights"],
      address: "Madhapur, Hyderabad",
      phone: "+91 98765 43212",
      whatsapp: "+91 98765 43212",
      openNow: false,
      image: "/placeholder-store.jpg",
      offers: ["Energy Efficient", "2 Year Warranty"],
      portfolio: [
        { item: "Modern Floor Lamp", price: 2800, inStock: true },
        { item: "LED Strip Lights", price: 1200, inStock: true }
      ]
    }
  ];

  const selectedVendorData = vendors.find(v => v.id === selectedVendor);

  if (selectedVendor && selectedVendorData) {
    return (
      <div className="min-h-screen bg-gradient-surface">
        {/* Header */}
        <div className="bg-card shadow-soft border-b border-border sticky top-0 z-10">
          <div className="max-w-md mx-auto p-4">
            <div className="flex items-center space-x-3">
              <Button 
                size="icon" 
                variant="ghost"
                onClick={() => setSelectedVendor(null)}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex-1">
                <h1 className="text-lg font-bold text-foreground">{selectedVendorData.name}</h1>
                <p className="text-sm text-muted-foreground">{selectedVendorData.type}</p>
              </div>
              {selectedVendorData.verified && (
                <Badge variant="default" className="bg-accent-teal text-white">
                  <Shield className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="max-w-md mx-auto space-y-6">
            {/* Vendor Info */}
            <Card className="shadow-medium">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarFallback className="bg-accent-teal text-white text-lg">
                      <Store className="w-8 h-8" />
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-accent-amber text-accent-amber" />
                        <span className="font-semibold">{selectedVendorData.rating}</span>
                        <span className="text-sm text-muted-foreground">({selectedVendorData.reviews} reviews)</span>
                      </div>
                      <Badge variant={selectedVendorData.openNow ? "default" : "secondary"}>
                        {selectedVendorData.openNow ? "Open Now" : "Closed"}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedVendorData.address}</span>
                        <Badge variant="outline" className="text-xs">
                          {selectedVendorData.distance}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Truck className="w-4 h-4 text-muted-foreground" />
                        <span>Delivery: {selectedVendorData.deliveryTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Specialties */}
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {selectedVendorData.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Options */}
            <div className="grid grid-cols-2 gap-3">
              <Button variant="gradient" className="h-14">
                <MessageCircle className="w-5 h-5 mr-2" />
                <div className="text-left">
                  <div className="font-medium">WhatsApp</div>
                  <div className="text-xs opacity-90">Quick message</div>
                </div>
              </Button>
              <Button variant="teal" className="h-14">
                <Video className="w-5 h-5 mr-2" />
                <div className="text-left">
                  <div className="font-medium">Video Demo</div>
                  <div className="text-xs opacity-90">See products</div>
                </div>
              </Button>
            </div>

            {/* Available Items */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Items from Your List</CardTitle>
                <p className="text-sm text-muted-foreground">Available at this store</p>
              </CardHeader>
              <CardContent className="space-y-3">
                {selectedVendorData.portfolio.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.item}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="font-semibold text-primary">₹{item.price.toLocaleString('en-IN')}</span>
                        <Badge 
                          variant={item.inStock ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {item.inStock ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant={item.inStock ? "outline" : "ghost"}
                      disabled={!item.inStock}
                    >
                      {item.inStock ? "Add" : "Notify"}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Offers */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-accent-amber" />
                  <span>Special Offers</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {selectedVendorData.offers.map((offer, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent-teal rounded-full"></div>
                      <span className="text-sm">{offer}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-3">
              <Button 
                variant="gradient" 
                size="lg" 
                className="w-full"
                onClick={() => onNavigate('checkout')}
              >
                <Phone className="w-5 h-5 mr-2" />
                Call & Place Order
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full"
              >
                <MapPin className="w-5 h-5 mr-2" />
                Get Directions
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Header */}
      <div className="bg-card shadow-soft border-b border-border sticky top-0 z-10">
        <div className="max-w-md mx-auto p-4">
          <div className="flex items-center space-x-3">
            <Button 
              size="icon" 
              variant="ghost"
              onClick={() => onNavigate('expert')}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-lg font-bold text-foreground">Local Vendors</h1>
              <p className="text-sm text-muted-foreground">Connect with nearby stores</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="max-w-md mx-auto space-y-6">
          {/* Filter Bar */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            <Button variant="default" size="sm" className="whitespace-nowrap">
              <MapPin className="w-4 h-4 mr-1" />
              Nearby
            </Button>
            <Button variant="outline" size="sm" className="whitespace-nowrap">
              <Star className="w-4 h-4 mr-1" />
              Top Rated
            </Button>
            <Button variant="outline" size="sm" className="whitespace-nowrap">
              <Truck className="w-4 h-4 mr-1" />
              Fast Delivery
            </Button>
            <Button variant="outline" size="sm" className="whitespace-nowrap">
              <Shield className="w-4 h-4 mr-1" />
              Verified
            </Button>
          </div>

          {/* Vendor List */}
          <div className="space-y-4">
            {vendors.map((vendor) => (
              <Card 
                key={vendor.id} 
                className="shadow-medium cursor-pointer hover:shadow-strong transition-all"
                onClick={() => setSelectedVendor(vendor.id)}
              >
                <CardContent className="p-4">
                  <div className="flex space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarFallback className="bg-accent-teal text-white">
                        <Store className="w-6 h-6" />
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground">{vendor.name}</h3>
                          <p className="text-sm text-muted-foreground">{vendor.type}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          {vendor.verified && (
                            <Badge variant="outline" className="bg-accent-teal/10 text-accent-teal border-accent-teal">
                              <Shield className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-accent-amber text-accent-amber" />
                          <span>{vendor.rating}</span>
                          <span className="text-muted-foreground">({vendor.reviews})</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{vendor.distance}</span>
                        </div>
                        <Badge variant={vendor.openNow ? "default" : "secondary"} className="text-xs">
                          {vendor.openNow ? "Open" : "Closed"}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>Delivery: {vendor.deliveryTime}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {vendor.specialties.slice(0, 2).map((specialty) => (
                          <Badge key={specialty} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                        {vendor.specialties.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{vendor.specialties.length - 2} more
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          WhatsApp
                        </Button>
                        <Button size="sm" variant="teal" className="flex-1">
                          <Video className="w-4 h-4 mr-1" />
                          Video Demo
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Stats */}
          <Card className="shadow-soft bg-gradient-secondary">
            <CardContent className="p-6 text-center">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-2xl font-bold text-foreground">{vendors.length}</div>
                  <div className="text-sm text-muted-foreground">Local Vendors</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">2.1 km</div>
                  <div className="text-sm text-muted-foreground">Avg Distance</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">2-4</div>
                  <div className="text-sm text-muted-foreground">Days Delivery</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Continue Button */}
          <Button 
            variant="gradient" 
            size="lg" 
            className="w-full"
            onClick={() => onNavigate('checkout')}
          >
            Continue to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};