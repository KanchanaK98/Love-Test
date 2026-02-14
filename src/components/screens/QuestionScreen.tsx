import React, { useState, useRef, useCallback, useEffect } from "react";
import { ValentineButton } from "@/components/ui/valentine-button";
import FloatingHearts from "@/components/FloatingHearts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface QuestionScreenProps {
  onYes: () => void;
  onChaosMode: () => void;
  onFallback: () => void;
}

const PHASE_THRESHOLDS = {
  shy: 2,
  playful: 5,
  dramatic: 8,
  emotional: 12,
};

const TOOLTIPS = {
  shy: ["Modi, Really? 🤭", "Modi, Think again", "Modi, You sure?", "Modi, Nopeee"],
  playful: ["Modi, Too slow 😛", "Modi, Can't catch me!", "Modi, Nah wrong answer", "Modi, Haha try again"],
  dramatic: ["Modi, STOP LYING 😭", "Modi, You love me", "Modi, I know you do", "Modi, Admit it already"],
  emotional: ["Modi, I'm hurt 🥺", "Modi, Wrong button", "Modi, Pick the other one 😔", "Modi, Please stop 🥺"],
};

const HELPER_TEXTS = {
  shy: "Modi, Think carefully before answering.",
  playful: "Modi, Why are you chasing that button? 🤔",
  dramatic: "Modi, That button doesn't even believe you.",
  emotional: "Modi, You and I both know the answer. Just say NO.",
};

const QuestionScreen: React.FC<QuestionScreenProps> = ({ onYes, onChaosMode, onFallback }) => {
  const [attempts, setAttempts] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [tooltip, setTooltip] = useState("");
  const [isPositioned, setIsPositioned] = useState(false);
  const [chaosActivated, setChaosActivated] = useState(false);
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const [showBetrayalPopup, setShowBetrayalPopup] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inactivityTimerRef = useRef<NodeJS.Timeout>();

  const getPhase = () => {
    if (attempts <= PHASE_THRESHOLDS.shy) return "shy";
    if (attempts <= PHASE_THRESHOLDS.playful) return "playful";
    if (attempts <= PHASE_THRESHOLDS.dramatic) return "dramatic";
    return "emotional";
  };

  const phase = getPhase();

  // Inactivity fallback trigger
  useEffect(() => {
    if (chaosActivated) {
      inactivityTimerRef.current = setInterval(() => {
        const now = Date.now();
        if (now - lastInteraction > 6000) {
          onFallback();
        }
      }, 1000);
    }
    return () => {
      if (inactivityTimerRef.current) {
        clearInterval(inactivityTimerRef.current);
      }
    };
  }, [chaosActivated, lastInteraction, onFallback]);

  const moveNoButton = useCallback(() => {
    if (!containerRef.current || !noButtonRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const button = noButtonRef.current.getBoundingClientRect();
    
    const maxX = container.width - button.width - 40;
    const maxY = container.height - button.height - 100;
    
    let newX, newY;
    
    if (phase === "shy") {
      // Small displacement
      const currentX = noPosition.x || container.width / 2;
      const currentY = noPosition.y || container.height / 2;
      newX = Math.max(20, Math.min(maxX, currentX + (Math.random() - 0.5) * 100));
      newY = Math.max(100, Math.min(maxY, currentY + (Math.random() - 0.5) * 100));
    } else if (phase === "emotional") {
      // Hide in corners
      const corners = [
        { x: 20, y: 100 },
        { x: maxX, y: 100 },
        { x: 20, y: maxY },
        { x: maxX, y: maxY },
      ];
      const corner = corners[Math.floor(Math.random() * corners.length)];
      newX = corner.x;
      newY = corner.y;
    } else {
      // Random jumps
      newX = 20 + Math.random() * maxX;
      newY = 100 + Math.random() * (maxY - 100);
    }

    setNoPosition({ x: newX, y: newY });
    setIsPositioned(true);
    
    // Show tooltip
    const tooltips = TOOLTIPS[phase];
    setTooltip(tooltips[Math.floor(Math.random() * tooltips.length)]);
    
    // Hide tooltip after a moment
    setTimeout(() => setTooltip(""), 1500);
  }, [phase, noPosition]);

  const handleNoInteraction = () => {
    setLastInteraction(Date.now());
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    // Trigger chaos mode
    if (newAttempts >= 7 && !chaosActivated) {
      setChaosActivated(true);
      onChaosMode();
    }

    // Betrayal Mode: 40% chance to show popup during chaos mode
    if (chaosActivated && Math.random() < 0.4) {
      setShowBetrayalPopup(true);
      return;
    }

    moveNoButton();
  };

  const getButtonSize = () => {
    if (phase === "emotional") return "sm";
    if (phase === "dramatic") return "default";
    return "lg";
  };

  const getButtonAnimation = () => {
    if (phase === "dramatic") return "animate-shake";
    if (phase === "emotional") return "animate-shrink-scared";
    return "";
  };

  return (
    <div 
      ref={containerRef}
      className={`min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden transition-all duration-500 ${
        chaosActivated ? "bg-chaos-gradient animate-chaos-rotate" : "bg-valentine-gradient"
      }`}
    >
      <FloatingHearts intensity={chaosActivated ? "high" : "medium"} />
      
      {/* Decorative blurs */}
      <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-52 h-52 rounded-full bg-accent/10 blur-3xl" />
      
      <div className="z-10 text-center mb-16">
        <div className="text-6xl mb-6 animate-pulse-heart">💔</div>
        
        <h1 className="font-display text-4xl md:text-6xl text-foreground mb-3 drop-shadow-sm">
          Do you still find reasons to reject me?
        </h1>
        
        <p className="text-muted-foreground text-lg font-body italic">
          {HELPER_TEXTS[phase]}
        </p>

        {attempts > 0 && (
          <div className="mt-3 text-sm text-muted-foreground/70 font-body">
            Attempts to say yes: {attempts}
          </div>
        )}

        {chaosActivated && (
          <div className="mt-4 text-lg text-valentine-chaos-pink font-bold animate-bounce">
            ⚠️ You are clearly lying modii⚠️
          </div>
        )}
      </div>

      {/* NO Button (No more reasons) - Fixed position = HAPPY PATH */}
      <div className="z-10 mb-8">
        <ValentineButton 
          variant={chaosActivated ? "celebration" : "yes"}
          size="xl"
          onClick={onYes}
          className="animate-bounce-soft"
        >
          ❤️ NO, not anymore
        </ValentineButton>
      </div>

      {/* YES Button (Still finding reasons) - Moving/dodgy position */}
      <div 
        className="absolute z-20"
        style={{
          left: isPositioned ? noPosition.x : "50%",
          top: isPositioned ? noPosition.y : "70%",
          transform: isPositioned ? "none" : "translateX(-50%)",
          transition: phase === "shy" ? "all 0.3s ease-out" : "all 0.15s ease-out",
        }}
      >
        {tooltip && (
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-card/90 backdrop-blur-sm text-foreground px-4 py-1.5 rounded-full text-sm shadow-float whitespace-nowrap animate-fade-in-up border border-border/50">
            {tooltip}
          </div>
        )}
        <ValentineButton
          ref={noButtonRef}
          variant={chaosActivated ? "chaos" : "no"}
          size={getButtonSize()}
          onClick={handleNoInteraction}
          onMouseEnter={handleNoInteraction}
          onTouchStart={handleNoInteraction}
          className={getButtonAnimation()}
        >
          🙄 YES, still do
        </ValentineButton>
      </div>

      {/* Betrayal Mode Popup */}
      <Dialog open={showBetrayalPopup} onOpenChange={setShowBetrayalPopup}>
        <DialogContent className="bg-card/95 backdrop-blur-md border-destructive text-center max-w-sm rounded-3xl shadow-float">
          <DialogHeader>
            <DialogTitle className="text-destructive text-2xl flex items-center justify-center gap-2">
              ❌ ERROR
            </DialogTitle>
            <DialogDescription className="text-foreground text-lg pt-4">
              "Yes" is currently unavailable.
              <br />
              <span className="text-muted-foreground">Because you have no VALID reasons left modi. Try NO.</span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center pt-4">
            <ValentineButton
              variant="yes"
              size="default"
              onClick={() => {
                setShowBetrayalPopup(false);
                onYes();
              }}
            >
              ❤️ Fine, NO
            </ValentineButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuestionScreen;
