import React, { useState } from 'react';
import { OnboardingFlow } from '@/components/OnboardingFlow';
import { RoomVisualization } from '@/components/RoomVisualization';
import { FurnitureCatalog } from '@/components/FurnitureCatalog';
import { PlacementScreen } from '@/components/PlacementScreen';
import { ExpertConsultation } from '@/components/ExpertConsultation';
import { VendorConnect } from '@/components/VendorConnect';
import { CheckoutScreen } from '@/components/CheckoutScreen';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<string>('onboarding');

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <OnboardingFlow onComplete={() => setCurrentScreen('room')} />;
      case 'room':
        return <RoomVisualization onNavigate={handleNavigate} />;
      case 'catalog':
        return <FurnitureCatalog onNavigate={handleNavigate} />;
      case 'placement':
        return <PlacementScreen onNavigate={handleNavigate} />;
      case 'expert':
        return <ExpertConsultation onNavigate={handleNavigate} />;
      case 'vendor':
        return <VendorConnect onNavigate={handleNavigate} />;
      case 'checkout':
        return <CheckoutScreen onNavigate={handleNavigate} />;
      default:
        return <OnboardingFlow onComplete={() => setCurrentScreen('room')} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderScreen()}
    </div>
  );
};

export default Index;
