import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Home, Download, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
  const navigate = useNavigate();

  const orderDetails = {
    orderNumber: 'A2S-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
    items: [
      { name: 'Modern Study Table', price: 8500 },
      { name: 'Ergonomic Chair', price: 3200 }
    ],
    total: 11700,
    deliveryDate: 'Dec 28-30, 2024',
    estimatedTime: '2-3 business days'
  };

  return (
    <div className="min-h-screen bg-gradient-surface flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Success Icon */}
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Order Placed Successfully!</h1>
          <p className="text-muted-foreground">Thank you for choosing A2S Aesthetics to Spaces</p>
        </div>

        {/* Order Details */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="text-center">Order #{orderDetails.orderNumber}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Items */}
            <div className="space-y-2">
              {orderDetails.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{item.name}</span>
                  <span>₹{item.price.toLocaleString('en-IN')}</span>
                </div>
              ))}
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Total Amount</span>
                <span className="text-primary">₹{orderDetails.total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-secondary/50 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="font-medium text-sm">Estimated Delivery</span>
              </div>
              <p className="text-sm text-muted-foreground">{orderDetails.deliveryDate}</p>
              <p className="text-xs text-muted-foreground mt-1">{orderDetails.estimatedTime}</p>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="shadow-soft">
          <CardContent className="p-4 space-y-3">
            <h3 className="font-semibold text-center mb-3">What's Next?</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span>You'll receive an SMS confirmation shortly</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-accent-teal"></div>
                <span>Our team will call to confirm delivery slot</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-accent-amber"></div>
                <span>Track your order via SMS updates</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => {/* Add download invoice logic */}}
          >
            <Download className="w-4 h-4 mr-2" />
            Download Invoice
          </Button>
          
          <Button 
            variant="gradient" 
            className="w-full"
            onClick={() => navigate('/')}
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>

        {/* Support Info */}
        <div className="text-center text-xs text-muted-foreground">
          <p>Need help? Contact us at support@a2s.com or call +91-9876543210</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;