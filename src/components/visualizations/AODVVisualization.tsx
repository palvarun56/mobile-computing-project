import { useEffect, useState } from "react";

export const AODVVisualization = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const nodes = [
    { id: "A", x: 100, y: 200, label: "Source A" },
    { id: "B", x: 250, y: 150, label: "Node B" },
    { id: "C", x: 250, y: 250, label: "Node C" },
    { id: "D", x: 400, y: 150, label: "Node D" },
    { id: "E", x: 400, y: 250, label: "Node E" },
    { id: "F", x: 550, y: 200, label: "Dest F" },
  ];

  return (
    <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center p-8">
      <svg viewBox="0 0 700 400" className="w-full max-w-4xl">
        {/* Connections */}
        <g stroke="hsl(var(--border))" strokeWidth="2" opacity="0.3">
          <line x1="100" y1="200" x2="250" y2="150" />
          <line x1="100" y1="200" x2="250" y2="250" />
          <line x1="250" y1="150" x2="400" y2="150" />
          <line x1="250" y1="150" x2="250" y2="250" />
          <line x1="250" y1="250" x2="400" y2="250" />
          <line x1="400" y1="150" x2="550" y2="200" />
          <line x1="400" y1="250" x2="550" y2="200" />
          <line x1="400" y1="150" x2="400" y2="250" />
        </g>

        {/* Active Path */}
        {step >= 2 && (
          <g stroke="hsl(var(--primary))" strokeWidth="3" className="animate-pulse">
            <line x1="100" y1="200" x2="250" y2="150" />
            <line x1="250" y1="150" x2="400" y2="150" />
            <line x1="400" y1="150" x2="550" y2="200" />
          </g>
        )}

        {/* RREQ Broadcast */}
        {step === 0 && (
          <g className="animate-pulse-slow">
            <circle cx="100" cy="200" r="40" fill="hsl(var(--accent))" opacity="0.2" />
            <circle cx="100" cy="200" r="60" fill="hsl(var(--accent))" opacity="0.1" />
          </g>
        )}

        {step === 1 && (
          <g className="animate-pulse-slow">
            <circle cx="250" cy="150" r="40" fill="hsl(var(--accent))" opacity="0.2" />
            <circle cx="250" cy="250" r="40" fill="hsl(var(--accent))" opacity="0.2" />
          </g>
        )}

        {/* Data Packet */}
        {step === 3 && (
          <circle 
            cx="275" 
            cy="175" 
            r="8" 
            fill="hsl(var(--tech-teal))" 
            className="animate-pulse"
          />
        )}

        {/* Nodes */}
        {nodes.map((node) => (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              r="20"
              fill={
                node.id === "A" ? "hsl(var(--primary))" :
                node.id === "F" ? "hsl(var(--accent))" :
                "hsl(var(--tech-cyan))"
              }
              className={step >= 1 && (node.id === "B" || node.id === "C" || node.id === "D") ? "animate-pulse" : ""}
            />
            <text
              x={node.x}
              y={node.y + 5}
              textAnchor="middle"
              fill="white"
              fontSize="14"
              fontWeight="600"
            >
              {node.id}
            </text>
            <text
              x={node.x}
              y={node.y + 40}
              textAnchor="middle"
              fill="hsl(var(--foreground))"
              fontSize="10"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>

      <div className="mt-8 max-w-2xl text-center space-y-4">
        <h3 className="text-xl font-semibold gradient-text">AODV Protocol (Ad Hoc On-Demand Distance Vector)</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          AODV is a reactive routing protocol for mobile ad hoc networks. It discovers routes on-demand 
          using <span className="text-accent font-medium">Route Request (RREQ)</span> broadcasts and 
          <span className="text-primary font-medium"> Route Reply (RREP)</span> messages.
        </p>
        <div className="grid grid-cols-4 gap-2 mt-6 text-xs">
          <div className={`p-2 rounded-lg transition-all ${step === 0 ? "bg-accent/20 border-2 border-accent" : "bg-muted"}`}>
            <div className="font-semibold">1. RREQ Broadcast</div>
          </div>
          <div className={`p-2 rounded-lg transition-all ${step === 1 ? "bg-accent/20 border-2 border-accent" : "bg-muted"}`}>
            <div className="font-semibold">2. Route Discovery</div>
          </div>
          <div className={`p-2 rounded-lg transition-all ${step === 2 ? "bg-primary/20 border-2 border-primary" : "bg-muted"}`}>
            <div className="font-semibold">3. RREP Reply</div>
          </div>
          <div className={`p-2 rounded-lg transition-all ${step === 3 ? "bg-tech-teal/20 border-2 border-tech-teal" : "bg-muted"}`}>
            <div className="font-semibold">4. Data Transfer</div>
          </div>
        </div>
      </div>
    </div>
  );
};
