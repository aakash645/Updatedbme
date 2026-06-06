import { X } from "lucide-react";
import { useState } from "react";

export default function AppLaunchBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="w-full bg-gradient-to-r from-primary to-primary/80 text-white py-3 sticky top-0 z-40 shadow-md">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <p className="text-sm md:text-base font-semibold">BME New App Launching Soon - Stay tuned for the enhanced mobile experience!</p>
        <button onClick={() => setIsVisible(false)} className="shrink-0 ml-4 p-1 hover:bg-white/20 rounded transition-all" aria-label="Close banner">
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
