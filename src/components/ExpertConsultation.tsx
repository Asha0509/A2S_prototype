import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ArrowLeft,
  Video,
  MessageCircle,
  Calendar,
  Star,
  Clock,
  Languages,
  Send,
  Mic,
  Phone
} from 'lucide-react';
import expertRiya from '@/assets/expert-riya.jpg';
import expertSarah from '@/assets/expert-sarah.jpg';
import expertConsultant from '@/assets/expert-consultant.jpg';
import room3d from '@/assets/room-3d.jpg';

interface ExpertConsultationProps {
  onNavigate: (screen: string) => void;
}

export const ExpertConsultation: React.FC<ExpertConsultationProps> = ({ onNavigate }) => {
  const [isInCall, setIsInCall] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');

  const experts = [
    {
      id: 1,
      name: "Riya Sharma",
      title: "Senior Interior Designer",
      rating: 4.8,
      reviews: 156,
      languages: ["English", "Hindi", "Telugu"],
      specialties: ["Modern", "Minimalist", "Contemporary"],
      experience: "8+ years",
      price: 500,
      availability: "Available now",
      image: expertRiya
    },
    {
      id: 2,
      name: "Sarah Johnson",
      title: "Space Planning Expert",
      rating: 4.7,
      reviews: 134,
      languages: ["English", "Hindi"],
      specialties: ["Small Spaces", "Budget-friendly", "Traditional"],
      experience: "6+ years",
      price: 400,
      availability: "Available in 30 min",
      image: expertSarah
    },
    {
      id: 3,
      name: "Alex Chen",
      title: "Luxury Design Consultant",
      rating: 4.9,
      reviews: 89,
      languages: ["English"],
      specialties: ["Luxury", "Corporate", "Modern"],
      experience: "10+ years",
      price: 800,
      availability: "Book for tomorrow",
      image: expertConsultant
    }
  ];

  const timeSlots = [
    "Now", "2:00 PM", "3:30 PM", "5:00 PM", "Tomorrow 10 AM", "Tomorrow 2 PM"
  ];

  const [chatMessages, setChatMessages] = useState([
    { sender: 'expert', message: 'Hello! I can see your room layout. The oak table placement looks great!', time: '2:45 PM' },
    { sender: 'user', message: 'Thanks! I\'m concerned about the walking space though.', time: '2:46 PM' },
    { sender: 'expert', message: 'Good point. Let me suggest moving the table 30cm to the right. This will improve the flow.', time: '2:47 PM' },
    { sender: 'expert', message: 'I can also help you optimize the budget. Would you like to see some alternatives?', time: '2:48 PM' }
  ]);

  const simulatedResponses = [
    "That's a great question! For your space, I'd recommend...",
    "I can see the issue. Let me suggest a quick fix...",
    "Based on your budget, here are some alternatives...",
    "The lighting could be improved by placing a lamp here...",
    "This color combination would work better with your style..."
  ];

  const sendMessage = () => {
    if (!message.trim()) return;
    
    const userMessage = { sender: 'user', message, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
    setChatMessages(prev => [...prev, userMessage]);
    setMessage('');

    // Simulate expert response
    setTimeout(() => {
      const expertResponse = {
        sender: 'expert',
        message: simulatedResponses[Math.floor(Math.random() * simulatedResponses.length)],
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      };
      setChatMessages(prev => [...prev, expertResponse]);
    }, 1500);
  };

  if (isInCall) {
    return (
      <div className="min-h-screen bg-black text-white">
        {/* Video Call Interface */}
        <div className="relative h-screen">
          {/* Expert Video */}
          <div className="absolute inset-0">
            <img 
              src={expertRiya} 
              alt="Expert Riya" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* User's Room Preview */}
          <div className="absolute top-4 right-4 w-32 h-24 rounded-lg overflow-hidden border-2 border-white/20">
            <img 
              src={room3d} 
              alt="Your Room" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Call Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <div className="max-w-md mx-auto">
              {/* Expert Info */}
              <div className="text-center mb-4">
                <h2 className="text-lg font-bold">Riya Sharma</h2>
                <p className="text-sm text-gray-300">Interior Design Specialist</p>
                <div className="flex items-center justify-center mt-1">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="text-sm">15:32</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center space-x-6">
                <Button size="icon" variant="ghost" className="bg-white/20 hover:bg-white/30">
                  <Mic className="w-5 h-5" />
                </Button>
                <Button size="icon" variant="ghost" className="bg-white/20 hover:bg-white/30">
                  <Video className="w-5 h-5" />
                </Button>
                <Button 
                  size="icon" 
                  variant="destructive"
                  onClick={() => setIsInCall(false)}
                >
                  <Phone className="w-5 h-5" />
                </Button>
                <Button size="icon" variant="ghost" className="bg-white/20 hover:bg-white/30">
                  <MessageCircle className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Chat Overlay */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-64 bg-black/60 backdrop-blur-sm rounded-lg p-4">
            <div className="space-y-3 mb-4 max-h-32 overflow-y-auto">
              {chatMessages.slice(-3).map((msg, index) => (
                <div key={index} className={`text-sm ${msg.sender === 'expert' ? 'text-left' : 'text-right'}`}>
                  <div className={`inline-block p-2 rounded-lg max-w-[80%] ${
                    msg.sender === 'expert' 
                      ? 'bg-accent-teal text-white' 
                      : 'bg-white/20 text-white'
                  }`}>
                    {msg.message}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{msg.time}</div>
                </div>
              ))}
            </div>
            
            <div className="flex space-x-2">
              <Input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className="bg-white/20 border-white/30 text-white placeholder:text-gray-300 text-sm"
              />
              <Button size="sm" variant="teal" onClick={sendMessage}>
                <Send className="w-4 h-4" />
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
              onClick={() => onNavigate('room')}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-lg font-bold text-foreground">Expert Consultation</h1>
              <p className="text-sm text-muted-foreground">Get professional advice</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="max-w-md mx-auto space-y-6">
          {/* Available Experts */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Available Experts</h2>
            <div className="space-y-4">
              {experts.map((expert) => (
                <Card key={expert.id} className="shadow-medium">
                  <CardContent className="p-4">
                    <div className="flex space-x-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={expert.image} />
                        <AvatarFallback>{expert.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 space-y-2">
                        <div>
                          <h3 className="font-semibold text-foreground">{expert.name}</h3>
                          <p className="text-sm text-muted-foreground">{expert.title}</p>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-accent-amber text-accent-amber" />
                            <span>{expert.rating}</span>
                            <span className="text-muted-foreground">({expert.reviews})</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {expert.experience}
                          </Badge>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {expert.specialties.map((specialty) => (
                            <Badge key={specialty} variant="secondary" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Languages className="w-3 h-3" />
                            <span>{expert.languages.join(', ')}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-semibold text-primary">₹{expert.price}/session</span>
                            <div className="text-xs text-accent-teal">{expert.availability}</div>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setIsInCall(true)}
                            >
                              <Video className="w-4 h-4 mr-1" />
                              Video Call
                            </Button>
                            <Button size="sm" variant="teal">
                              <MessageCircle className="w-4 h-4 mr-1" />
                              Chat
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Schedule Consultation */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Schedule for Later</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Available Time Slots</label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot}
                      variant={selectedSlot === slot ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSlot(slot)}
                      className="text-xs"
                    >
                      {slot}
                    </Button>
                  ))}
                </div>
              </div>
              
              <Button 
                variant="gradient" 
                className="w-full"
                disabled={!selectedSlot}
              >
                Book Consultation (₹500)
              </Button>
            </CardContent>
          </Card>

          {/* Quick Questions */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Quick Questions</CardTitle>
              <p className="text-sm text-muted-foreground">Get instant answers for common queries</p>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                "Is my furniture placement optimal?",
                "How to improve lighting in this space?",
                "What colors work with my style?",
                "Budget-friendly upgrade suggestions?"
              ].map((question, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-left h-auto p-3"
                  onClick={() => setIsInCall(true)}
                >
                  {question}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Continue Button */}
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full"
            onClick={() => onNavigate('vendor')}
          >
            Skip for Now
          </Button>
        </div>
      </div>
    </div>
  );
};