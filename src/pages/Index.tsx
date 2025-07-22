import React, { useState, useEffect } from 'react';
import { OnboardingFlow } from '@/components/OnboardingFlow';
import { RoomVisualization } from '@/components/RoomVisualization';
import { FurnitureCatalog } from '@/components/FurnitureCatalog';
import { PlacementScreen } from '@/components/PlacementScreen';
import { ExpertConsultation } from '@/components/ExpertConsultation';
import { VendorConnect } from '@/components/VendorConnect';
import { CheckoutScreen } from '@/components/CheckoutScreen';

// App State Interface
interface AppState {
  user: {
    budget: number;
    roomType: string;
    stylePreference: string;
    hasUploadedRoom: boolean;
  };
  room: {
    dimensions: { width: number; height: number; };
    videoUploaded: boolean;
    layout3DGenerated: boolean;
  };
  furniture: {
    selectedItems: Array<{
      id: string;
      name: string;
      price: number;
      category: string;
      vendor: string;
    }>;
    totalCost: number;
    placedItems: number;
  };
  expert: {
    consultationBooked: boolean;
    consultationCompleted: boolean;
    expertRecommendations: string[];
  };
  vendor: {
    selectedVendors: string[];
    quotesReceived: number;
  };
  workflow: {
    currentStep: string;
    completedSteps: string[];
    canProceed: boolean;
  };
}

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<string>('onboarding');
  const [appState, setAppState] = useState<AppState>({
    user: {
      budget: 0,
      roomType: '',
      stylePreference: '',
      hasUploadedRoom: false
    },
    room: {
      dimensions: { width: 0, height: 0 },
      videoUploaded: false,
      layout3DGenerated: false
    },
    furniture: {
      selectedItems: [],
      totalCost: 0,
      placedItems: 0
    },
    expert: {
      consultationBooked: false,
      consultationCompleted: false,
      expertRecommendations: []
    },
    vendor: {
      selectedVendors: [],
      quotesReceived: 0
    },
    workflow: {
      currentStep: 'onboarding',
      completedSteps: [],
      canProceed: false
    }
  });

  // Business Logic Functions
  const updateAppState = (updates: Partial<AppState>) => {
    setAppState(prev => ({
      ...prev,
      ...updates,
      workflow: {
        ...prev.workflow,
        ...updates.workflow,
        currentStep: currentScreen
      }
    }));
  };

  const checkWorkflowConditions = (targetScreen: string): boolean => {
    const { user, room, furniture, expert } = appState;

    switch (targetScreen) {
      case 'room':
        return user.budget > 0 && user.roomType !== '';
      case 'catalog':
        return room.layout3DGenerated;
      case 'placement':
        return furniture.selectedItems.length > 0;
      case 'expert':
        return furniture.placedItems > 0 || furniture.totalCost > user.budget * 0.8;
      case 'vendor':
        return expert.consultationCompleted || furniture.placedItems >= 3;
      case 'checkout':
        return furniture.placedItems > 0 && appState.vendor.quotesReceived > 0;
      default:
        return true;
    }
  };

  const handleNavigate = (screen: string, data?: any) => {
    // Update state based on current screen completion
    const completedStep = currentScreen;
    
    // Update app state based on the screen we're leaving
    switch (completedStep) {
      case 'onboarding':
        if (data) {
          updateAppState({
            user: { ...appState.user, ...data },
            workflow: {
              ...appState.workflow,
              completedSteps: [...appState.workflow.completedSteps, 'onboarding']
            }
          });
        }
        break;
      case 'room':
        updateAppState({
          room: { ...appState.room, layout3DGenerated: true },
          workflow: {
            ...appState.workflow,
            completedSteps: [...appState.workflow.completedSteps, 'room']
          }
        });
        break;
      case 'catalog':
        if (data?.selectedItems) {
          updateAppState({
            furniture: {
              ...appState.furniture,
              selectedItems: data.selectedItems,
              totalCost: data.totalCost || 0
            }
          });
        }
        break;
      case 'placement':
        updateAppState({
          furniture: { ...appState.furniture, placedItems: appState.furniture.selectedItems.length }
        });
        break;
      case 'expert':
        updateAppState({
          expert: { 
            ...appState.expert, 
            consultationCompleted: true,
            expertRecommendations: data?.recommendations || []
          }
        });
        break;
      case 'vendor':
        updateAppState({
          vendor: { 
            ...appState.vendor, 
            quotesReceived: data?.quotes || 3,
            selectedVendors: data?.vendors || []
          }
        });
        break;
    }

    // Check if navigation is allowed
    if (checkWorkflowConditions(screen)) {
      setCurrentScreen(screen);
    } else {
      console.log(`Navigation to ${screen} blocked - conditions not met`);
      // Could show toast or modal here
    }
  };

  // Auto-redirect logic based on workflow conditions
  useEffect(() => {
    const { user, furniture, expert } = appState;
    
    // Auto-redirect to expert if budget exceeded
    if (furniture.totalCost > user.budget && currentScreen !== 'expert' && currentScreen !== 'vendor' && currentScreen !== 'checkout') {
      console.log('Budget exceeded - redirecting to expert consultation');
      setCurrentScreen('expert');
    }
    
    // Auto-redirect to vendor if consultation completed
    if (expert.consultationCompleted && currentScreen === 'expert') {
      setTimeout(() => setCurrentScreen('vendor'), 2000);
    }
  }, [appState, currentScreen]);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return (
          <OnboardingFlow 
            onComplete={() => handleNavigate('room', {
              budget: 30000,
              roomType: 'bedroom',
              stylePreference: 'modern',
              hasUploadedRoom: true
            })} 
          />
        );
      case 'room':
        return (
          <RoomVisualization 
            onNavigate={(screen) => handleNavigate(screen, { layout3DGenerated: true })}
          />
        );
      case 'catalog':
        return (
          <FurnitureCatalog 
            onNavigate={(screen) => handleNavigate(screen, {
              selectedItems: [
                { id: 'table', name: 'Oak Study Table', price: 7500, category: 'table', vendor: 'Local Store' },
                { id: 'chair', name: 'Ergonomic Chair', price: 4200, category: 'chair', vendor: 'Office Plus' }
              ],
              totalCost: 11700
            })}
          />
        );
      case 'placement':
        return (
          <PlacementScreen 
            onNavigate={(screen) => handleNavigate(screen, { placedItems: 2 })}
          />
        );
      case 'expert':
        return (
          <ExpertConsultation 
            onNavigate={(screen) => handleNavigate(screen, {
              recommendations: ['Consider adding a bookshelf', 'Lamp position needs adjustment']
            })}
          />
        );
      case 'vendor':
        return (
          <VendorConnect 
            onNavigate={(screen) => handleNavigate(screen, {
              quotes: 3,
              vendors: ['Hyderabad Home Store', 'Office Plus', 'Decor Mart']
            })}
          />
        );
      case 'checkout':
        return (
          <CheckoutScreen 
            onNavigate={handleNavigate}
          />
        );
      default:
        return (
          <OnboardingFlow 
            onComplete={() => handleNavigate('room', {
              budget: 30000,
              roomType: 'bedroom',
              stylePreference: 'modern'
            })} 
          />
        );
    }
  };

  // Development helper - show current app state in console
  useEffect(() => {
    console.log('App State Updated:', {
      currentScreen,
      workflow: appState.workflow,
      userBudget: appState.user.budget,
      totalCost: appState.furniture.totalCost,
      canProceedToNext: checkWorkflowConditions(currentScreen)
    });
  }, [appState, currentScreen]);

  return (
    <div className="min-h-screen">
      {renderScreen()}
    </div>
  );
};

export default Index;
