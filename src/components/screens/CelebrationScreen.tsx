import React, { useEffect, useState } from "react";
import { ValentineButton } from "@/components/ui/valentine-button";
import FloatingHearts from "@/components/FloatingHearts";
import Confetti from "@/components/Confetti";

const CelebrationScreen: React.FC = () => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Refresh confetti periodically
    const interval = setInterval(() => {
      setShowConfetti(false);
      setTimeout(() => setShowConfetti(true), 100);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-celebration-gradient flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <FloatingHearts intensity="celebration" />
      {showConfetti && <Confetti />}
      
      {/* Celebration background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-accent/15 blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
      
      <div className="z-10 text-center animate-fade-in-up">
        <div className="text-7xl mb-4 animate-bounce-soft">🎉</div>
        
        <h1 className="font-display text-5xl md:text-7xl text-foreground mb-6 drop-shadow-sm">
          I KNEW IT MODI🥹
        </h1>
        
        <div className="text-4xl mb-6 flex justify-center gap-2">
          <span className="animate-pulse-heart">💖</span>
          <span className="animate-pulse-heart" style={{ animationDelay: "0.2s" }}>💕</span>
          <span className="animate-pulse-heart" style={{ animationDelay: "0.4s" }}>💝</span>
        </div>
        
        <div className="bg-card/80 backdrop-blur-md rounded-3xl p-8 shadow-float mb-8 max-w-md mx-auto border border-border/30">
          <p className="font-body text-xl text-foreground mb-2">
            So you officially, completely, absolutely have
          </p>
          <p className="font-display text-4xl text-primary mb-4">
            NO REASONS LEFT 💖
          </p>
          <div className="text-muted-foreground text-sm space-y-1">
            <p>No excuses.</p>
            <p>No escape.</p>
            <p className="font-semibold">You're stuck with me forever.</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <ValentineButton
            variant="celebration"
            size="lg"
            onClick={() => {}}
          >
            💕 Fine, I choose you
          </ValentineButton>
          <ValentineButton
            variant="soft"
            size="lg"
            onClick={() => {
              alert("Screenshot this before she changes her mind! 📸💕");
            }}
          >
            📸 Proof before she runs
          </ValentineButton>
        </div>
        
        <p className="text-muted-foreground text-sm italic">
          No more reasons. No more running. Just us. 😌
        </p>
      </div>
    </div>
  );
};

export default CelebrationScreen;
