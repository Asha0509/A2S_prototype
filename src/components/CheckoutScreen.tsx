import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft,
  ShoppingCart,
  Truck,
  Calendar,
  CreditCard,
  MapPin,
  Clock,
  CheckCircle,
  Star,
  Phone,
  AlertCircle
} from 'lucide-react';
import studyTable from '@/assets/study-table.jpg';
import room3d from '@/assets/room-3d.jpg';

interface CheckoutScreenProps {
  onNavigate: (screen: string) => void;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ onNavigate }) => {
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [deliverySlot, setDeliverySlot] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const orderItems = [
    {
      id: 1,
      name: "Minimalist Oak Study Table",
      vendor: "Hyderabad Home Store",
      price: 7500,
      originalPrice: 9000,
      quantity: 1,
      delivery: "3-5 days",
      image: studyTable
    },
    {
      id: 2,
      name: "Ergonomic Office Chair",
      vendor: "Office Plus",
      price: 4200,
      originalPrice: 5500,
      quantity: 1,
      delivery: "2-4 days",
      image: studyTable
    },
    {
      id: 3,
      name: "Modern Floor Lamp",
      vendor: "Light House",
      price: 2800,
      originalPrice: 3200,
      quantity: 1,
      delivery: "1-3 days",
      image: studyTable
    }
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const savings = orderItems.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0);
  const delivery = 299;
  const installation = 500;
  const total = subtotal + delivery + installation;
  const budgetUsed = (total / 30000) * 100;

  const deliverySlots = [
    "Tomorrow 10AM-2PM",
    "Tomorrow 2PM-6PM",
    "Day after 10AM-2PM",
    "Day after 2PM-6PM",
    "Weekend 10AM-6PM"
  ];

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      // Navigate to success screen or show success message
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Header */}
      <div className="bg-card shadow-soft border-b border-border sticky top-0 z-10">
        <div className="max-w-md mx-auto p-4">
          <div className="flex items-center space-x-3">
            <Button 
              size="icon" 
              variant="ghost"
              onClick={() => onNavigate('vendor')}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-lg font-bold text-foreground">Checkout</h1>
              <p className="text-sm text-muted-foreground">Review your order</p>
            </div>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary">
              3 Items
            </Badge>
          </div>
        </div>
      </div>

      {/* Budget Status */}
      <div className="bg-card shadow-soft">
        <div className="max-w-md mx-auto p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Budget Used</span>
            <Badge 
              variant={budgetUsed > 90 ? "destructive" : "default"}
              className="text-xs"
            >
              {budgetUsed.toFixed(0)}% (₹{total.toLocaleString('en-IN')})
            </Badge>
          </div>
          <Progress value={budgetUsed} className="h-2" />
          {budgetUsed > 100 && (
            <div className="flex items-center space-x-1 mt-2 text-destructive text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>Over budget by ₹{(total - 30000).toLocaleString('en-IN')}</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="max-w-md mx-auto space-y-6">
          {/* Room Preview */}
          <Card className="shadow-medium">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Your Room Layout</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative rounded-lg overflow-hidden">
                <img 
                  src={room3d} 
                  alt="Final Room Layout" 
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-3">
                  <div className="text-white text-sm">
                    <div className="font-medium">10x12 ft Bedroom</div>
                    <div className="text-xs opacity-90">Modern Minimalist Style</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ShoppingCart className="w-5 h-5" />
                <span>Order Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {orderItems.map((item) => (
                <div key={item.id} className="flex space-x-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 space-y-1">
                    <h4 className="font-medium text-sm">{item.name}</h4>
                    <p className="text-xs text-muted-foreground">{item.vendor}</p>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-primary">₹{item.price.toLocaleString('en-IN')}</span>
                      {item.originalPrice > item.price && (
                        <span className="text-xs text-muted-foreground line-through">
                          ₹{item.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-xs">
                      <Truck className="w-3 h-3 text-muted-foreground" />
                      <span className="text-muted-foreground">{item.delivery}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">Qty: {item.quantity}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Delivery Schedule */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Delivery Schedule</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 gap-2">
                {deliverySlots.map((slot) => (
                  <Button
                    key={slot}
                    variant={deliverySlot === slot ? "default" : "outline"}
                    size="sm"
                    onClick={() => setDeliverySlot(slot)}
                    className="justify-start h-auto p-3"
                  >
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{slot}</span>
                    </div>
                  </Button>
                ))}
              </div>
              
              <div className="bg-secondary/20 rounded-lg p-3 mt-3">
                <div className="flex items-start space-x-2">
                  <Truck className="w-4 h-4 text-accent-teal mt-0.5" />
                  <div className="text-sm">
                    <div className="font-medium">Installation Included</div>
                    <div className="text-muted-foreground text-xs">
                      Our team will set up your furniture
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Price Breakdown */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Price Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal ({orderItems.length} items)</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-accent-teal">
                <span>You save</span>
                <span>-₹{savings.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>₹{delivery}</span>
              </div>
              <div className="flex justify-between">
                <span>Installation Service</span>
                <span>₹{installation}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span className="text-primary">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5" />
                <span>Payment Method</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { id: 'upi', name: 'UPI Payment', desc: 'Pay using any UPI app' },
                { id: 'card', name: 'Credit/Debit Card', desc: 'Visa, Mastercard, RuPay' },
                { id: 'wallet', name: 'Digital Wallet', desc: 'Paytm, PhonePe, etc.' },
                { id: 'cod', name: 'Cash on Delivery', desc: 'Pay when delivered' }
              ].map((method) => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                    paymentMethod === method.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="font-medium">{method.name}</div>
                  <div className="text-sm text-muted-foreground">{method.desc}</div>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Order Actions */}
          <div className="space-y-3">
            {!isProcessing ? (
              <>
                <Button 
                  variant="gradient" 
                  size="lg" 
                  className="w-full"
                  disabled={!deliverySlot}
                  onClick={handlePayment}
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Pay ₹{total.toLocaleString('en-IN')}
                </Button>
                
                <div className="flex space-x-3">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Vendor
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Star className="w-4 h-4 mr-2" />
                    Save for Later
                  </Button>
                </div>
              </>
            ) : (
              <Card className="shadow-medium bg-gradient-primary text-white">
                <CardContent className="p-6 text-center">
                  <div className="space-y-4">
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto">
                      <CreditCard className="w-8 h-8 animate-pulse" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Processing Payment...</h3>
                      <p className="text-sm opacity-90">Please don't close this screen</p>
                    </div>
                    <Progress value={60} className="bg-white/20" />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Terms */}
          <div className="text-center text-xs text-muted-foreground">
            By placing this order, you agree to our{' '}
            <button className="text-primary underline">Terms & Conditions</button>
            {' '}and{' '}
            <button className="text-primary underline">Privacy Policy</button>
          </div>
        </div>
      </div>
    </div>
  );
};