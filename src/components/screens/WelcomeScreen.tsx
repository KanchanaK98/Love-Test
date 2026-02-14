import React from "react";
import { ValentineButton } from "@/components/ui/valentine-button";
import FloatingHearts from "@/components/FloatingHearts";

interface WelcomeScreenProps {
  onContinue: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onContinue }) => {
  return (
    <div className="min-h-screen bg-valentine-gradient flex flex-col items-center justify-center p-6 relative overflow-hidden animate-subtle-bg">
      <FloatingHearts intensity="low" />
      
      {/* Decorative background circles */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-accent/5 blur-3xl" />
      
      <div className="z-10 text-center animate-fade-in-up">
        <div className="text-7xl mb-8 animate-bounce-soft">🥺</div>
        
        <h1 className="font-display text-5xl md:text-7xl text-foreground mb-4 drop-shadow-sm">
          Hey Moda Sachinii… 🥺
        </h1>
        
        <p className="font-body text-xl md:text-2xl text-foreground/80 mb-2 font-medium">
          I need to ask you something…
        </p>
        
        <p className="text-muted-foreground text-base mb-12 font-body italic">
          දෙයියනේ… මං මේ ප්‍රශ්නය අහන්නේ මේ ලෝකේ ලස්සනම කෙල්ලගෙන්නේ. 🌹✨
        </p>
        
        <ValentineButton 
          variant="yes" 
          size="lg"
          onClick={onContinue}
          className="animate-float"
        >
          Okay, ask me… 👀
        </ValentineButton>
      </div>
    </div>
  );
};

export default WelcomeScreen;
