import { useEffect, useState } from "react";

export const MobileIPVisualization = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const interval = setInterval(() => {
      setAnimate(false);
      setTimeout(() => setAnimate(true), 100);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center p-8">
      <svg viewBox="0 0 800 400" className="w-full max-w-4xl">
        {/* Home Network */}
        <g>
          <rect x="50" y="150" width="150" height="100" fill="hsl(var(--primary))" opacity="0.2" rx="8" />
          <text x="125" y="200" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="14" fontWeight="600">
            Home Network
          </text>
          <circle cx="125" cy="230" r="8" fill="hsl(var(--primary))" />
          <text x="125" y="255" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="10">
            Home Agent
          </text>
        </g>

        {/* Foreign Network */}
        <g>
          <rect x="600" y="150" width="150" height="100" fill="hsl(var(--accent))" opacity="0.2" rx="8" />
          <text x="675" y="200" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="14" fontWeight="600">
            Foreign Network
          </text>
          <circle cx="675" cy="230" r="8" fill="hsl(var(--accent))" />
          <text x="675" y="255" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="10">
            Foreign Agent
          </text>
        </g>

        {/* Mobile Node */}
        <g className={animate ? "animate-pulse-slow" : ""}>
          <circle 
            cx={animate ? "675" : "125"} 
            cy="230" 
            r="15" 
            fill="hsl(var(--tech-teal))" 
            className="transition-all duration-[3s]"
          />
          <text 
            x={animate ? "675" : "125"} 
            y="275" 
            textAnchor="middle" 
            fill="hsl(var(--foreground))" 
            fontSize="12"
            fontWeight="600"
            className="transition-all duration-[3s]"
          >
            Mobile Node
          </text>
        </g>

        {/* Tunnel */}
        {animate && (
          <g>
            <path
              d="M 200 230 Q 400 100 600 230"
              stroke="hsl(var(--primary))"
              strokeWidth="3"
              fill="none"
              strokeDasharray="10,5"
              className="animate-pulse"
            />
            <text x="400" y="140" textAnchor="middle" fill="hsl(var(--primary))" fontSize="12" fontWeight="600">
              IP Tunnel
            </text>
          </g>
        )}

        {/* Correspondent Node */}
        <g>
          <circle cx="400" cy="50" r="12" fill="hsl(var(--tech-cyan))" />
          <text x="400" y="30" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="12" fontWeight="600">
            Correspondent Node
          </text>
        </g>

        {/* Data Flow Arrows */}
        {animate && (
          <g className="animate-pulse">
            <path d="M 400 65 L 665 215" stroke="hsl(var(--accent))" strokeWidth="2" markerEnd="url(#arrowhead)" />
          </g>
        )}

        {/* Arrow marker definition */}
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="hsl(var(--accent))" />
          </marker>
        </defs>
      </svg>

      <div className="mt-8 max-w-2xl text-center space-y-4">
        <h3 className="text-xl font-semibold gradient-text">Mobile IP Protocol</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Mobile IP allows a device to move between networks while maintaining its IP address. 
          The <span className="text-primary font-medium">Home Agent</span> tracks the mobile node's location, 
          while the <span className="text-accent font-medium">Foreign Agent</span> provides connectivity in the visited network. 
          Data is tunneled between networks to ensure seamless communication.
        </p>
        <div className="grid grid-cols-2 gap-4 mt-6 text-xs">
          <div className="p-3 bg-primary/10 rounded-lg">
            <div className="font-semibold text-primary mb-1">Registration</div>
            <div className="text-muted-foreground">Mobile node registers with foreign agent</div>
          </div>
          <div className="p-3 bg-accent/10 rounded-lg">
            <div className="font-semibold text-accent mb-1">Tunneling</div>
            <div className="text-muted-foreground">Packets encapsulated and forwarded</div>
          </div>
        </div>
      </div>
    </div>
  );
};
