import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Home, Building, Palette, Video, Upload, Camera } from 'lucide-react';
import a2sLogo from '@/assets/a2s-logo.jpg';

interface OnboardingFlowProps {
  onComplete: () => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [budget, setBudget] = useState(25000);
  const [roomType, setRoomType] = useState('');
  const [style, setStyle] = useState('');
  const [uploading, setUploading] = useState(false);

  const roomTypes = [
    { id: 'bedroom', name: 'Bedroom', icon: Home },
    { id: 'living', name: 'Living Room', icon: Building },
    { id: 'kitchen', name: 'Kitchen', icon: Home },
    { id: 'office', name: 'Home Office', icon: Building }
  ];

  const styles = [
    { id: 'modern', name: 'Modern Minimalist', color: 'bg-primary' },
    { id: 'traditional', name: 'Traditional', color: 'bg-accent-amber' },
    { id: 'contemporary', name: 'Contemporary', color: 'bg-accent-teal' },
    { id: 'scandinavian', name: 'Scandinavian', color: 'bg-accent' }
  ];

  const handleVideoUpload = () => {
    if (uploading) return; // Prevent double clicks
    setUploading(true);
    // Simulate upload progress
    setTimeout(() => {
      setUploading(false);
      onComplete();
    }, 3000);
  };

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-surface flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <img src={a2sLogo} alt="A2S Logo" className="w-32 h-20 mx-auto mb-4 rounded-lg object-cover" />
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to A2S</h1>
            <p className="text-muted-foreground">Aesthetics to Spaces</p>
            <p className="text-sm text-muted-foreground mt-2">Transform your space with AI-powered interior design</p>
          </div>
          
          <Card className="shadow-medium">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                  <Camera className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Quick Room Scan</h3>
                  <p className="text-sm text-muted-foreground">Upload a video of your room</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-secondary flex items-center justify-center">
                  <Palette className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">AI Design Magic</h3>
                  <p className="text-sm text-muted-foreground">Get personalized furniture suggestions</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-accent-teal flex items-center justify-center">
                  <Building className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Local Vendors</h3>
                  <p className="text-sm text-muted-foreground">Connect with nearby furniture stores</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button 
            variant="gradient" 
            size="lg" 
            className="w-full"
            onClick={() => setStep(2)}
          >
            Get Started
          </Button>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-surface p-4">
        <div className="max-w-md mx-auto pt-8">
          <div className="mb-6">
            <Progress value={33} className="mb-2" />
            <p className="text-sm text-muted-foreground">Step 1 of 3</p>
          </div>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>What's your budget?</span>
                <Badge variant="outline">₹{budget.toLocaleString('en-IN')}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <input
                  type="range"
                  min="10000"
                  max="200000"
                  step="5000"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>₹10K</span>
                  <span>₹200K</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[15000, 30000, 50000, 100000].map((amount) => (
                  <Button
                    key={amount}
                    variant={budget === amount ? "default" : "outline"}
                    size="sm"
                    onClick={() => setBudget(amount)}
                  >
                    ₹{amount.toLocaleString('en-IN')}
                  </Button>
                ))}
              </div>

              <Button 
                variant="gradient" 
                className="w-full"
                onClick={() => setStep(3)}
              >
                Continue
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gradient-surface p-4">
        <div className="max-w-md mx-auto pt-8">
          <div className="mb-6">
            <Progress value={66} className="mb-2" />
            <p className="text-sm text-muted-foreground">Step 2 of 3</p>
          </div>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>What type of room?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {roomTypes.map((room) => (
                <button
                  key={room.id}
                  onClick={() => setRoomType(room.id)}
                  className={`w-full p-4 rounded-lg border-2 transition-all ${
                    roomType === room.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <room.icon className="w-6 h-6 text-primary" />
                    <span className="font-medium">{room.name}</span>
                  </div>
                </button>
              ))}

              <div className="mt-6">
                <h3 className="font-medium mb-3">Design Style</h3>
                <div className="grid grid-cols-2 gap-2">
                  {styles.map((styleOption) => (
                    <Button
                      key={styleOption.id}
                      variant={style === styleOption.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setStyle(styleOption.id)}
                      className="h-auto p-3"
                    >
                      <div className="text-center">
                        <div className={`w-6 h-6 rounded-full ${styleOption.color} mb-1 mx-auto`} />
                        <span className="text-xs">{styleOption.name}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              <Button 
                variant="gradient" 
                className="w-full"
                disabled={!roomType || !style}
                onClick={() => setStep(4)}
              >
                Continue
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-surface p-4">
      <div className="max-w-md mx-auto pt-8">
        <div className="mb-6">
          <Progress value={uploading ? 100 : 90} className="mb-2" />
          <p className="text-sm text-muted-foreground">Step 3 of 3</p>
        </div>

        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Upload Room Video</CardTitle>
            <p className="text-sm text-muted-foreground">
              Record a 360° video of your {roomTypes.find(r => r.id === roomType)?.name.toLowerCase()}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {!uploading ? (
              <>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Video className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-2">Upload Video</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    MP4, MOV up to 100MB
                  </p>
                  <Button variant="outline" onClick={handleVideoUpload}>
                    <Upload className="w-4 h-4 mr-2" />
                    Choose File
                  </Button>
                </div>

                <div className="bg-secondary/50 rounded-lg p-4">
                  <h4 className="font-medium text-sm mb-2">📱 Recording Tips:</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Move slowly around the room</li>
                    <li>• Keep phone steady and horizontal</li>
                    <li>• Good lighting helps our AI</li>
                    <li>• Include all walls and corners</li>
                  </ul>
                </div>
              </>
            ) : (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto">
                  <Upload className="w-8 h-8 text-white animate-pulse" />
                </div>
                <div>
                  <h3 className="font-medium">Processing your room...</h3>
                  <p className="text-sm text-muted-foreground">
                    Our AI is analyzing your space
                  </p>
                </div>
                <Progress value={75} />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};