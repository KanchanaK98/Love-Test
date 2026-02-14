import React, { useState } from "react";
import { ValentineButton } from "@/components/ui/valentine-button";
import FloatingHearts from "@/components/FloatingHearts";

interface FallbackScreenProps {
  onContinue: () => void;
}

const FallbackScreen: React.FC<FallbackScreenProps> = ({ onContinue }) => {
  const [showSoftQuestion, setShowSoftQuestion] = useState(false);

  if (showSoftQuestion) {
    return (
      <div className="min-h-screen bg-valentine-gradient flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <FloatingHearts intensity="medium" />
        
        <div className="z-10 text-center animate-fade-in-up">
          <div className="text-6xl mb-8">❤️</div>
          
          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-8">
            So… do you still find reasons to reject me?
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ValentineButton
              variant="yes"
              size="lg"
              onClick={onContinue}
            >
              ❤️ No, not anymore
            </ValentineButton>
            <ValentineButton
              variant="yes"
              size="lg"
              onClick={onContinue}
            >
              🥰 Never had any
            </ValentineButton>
          </div>
          
          <p className="text-muted-foreground text-sm mt-8 italic">
            (The "Yes" button gave up and left)
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-valentine-gradient flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <FloatingHearts intensity="low" />
      
      <div className="z-10 text-center max-w-md animate-fade-in-up">
        <div className="text-5xl mb-6">😅</div>
        
        <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4 drop-shadow-sm">
          Hey Modi, wait…
        </h1>
        
        <p className="font-body text-xl text-foreground/80 mb-2 font-medium">
          I know I'm not perfect, Modi.
        </p>
        
        <p className="text-muted-foreground text-base mb-6 font-body italic">
          I mess up, I annoy you, I steal your food…
          <br />
          But none of those are real reasons, right, Modi?
        </p>

        <p className="text-sm text-muted-foreground mb-8 italic">
          Please don't overthink it.
        </p>

        <div className="bg-card/80 backdrop-blur-md rounded-3xl p-8 shadow-float mb-8 border border-border/30">
          <p className="font-body text-foreground text-lg mb-2">
            No drama.
          </p>
          <p className="font-body text-foreground text-lg mb-2">
            No games.
          </p>
          <p className="font-display text-2xl text-foreground">
            Just us. 💕
          </p>
        </div>
        
        <ValentineButton
          variant="yes"
          size="lg"
          onClick={() => setShowSoftQuestion(true)}
        >
          💖 Okay, ask me again
        </ValentineButton>
      </div>
    </div>
  );
};

export default FallbackScreen;
