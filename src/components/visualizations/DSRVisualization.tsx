import { useEffect, useState } from "react";

export const DSRVisualization = () => {
  const [phase, setPhase] = useState<"discovery" | "reply" | "data">("discovery");

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((prev) => 
        prev === "discovery" ? "reply" : 
        prev === "reply" ? "data" : "discovery"
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nodes = [
    { id: "S", x: 100, y: 200, label: "Source" },
    { id: "1", x: 250, y: 150, label: "Node 1" },
    { id: "2", x: 250, y: 250, label: "Node 2" },
    { id: "3", x: 400, y: 200, label: "Node 3" },
    { id: "D", x: 550, y: 200, label: "Destination" },
  ];

  return (
    <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center p-8">
      <svg viewBox="0 0 700 400" className="w-full max-w-4xl">
        {/* All possible connections */}
        <g stroke="hsl(var(--border))" strokeWidth="2" opacity="0.3">
          <line x1="100" y1="200" x2="250" y2="150" />
          <line x1="100" y1="200" x2="250" y2="250" />
          <line x1="250" y1="150" x2="400" y2="200" />
          <line x1="250" y1="250" x2="400" y2="200" />
          <line x1="400" y1="200" x2="550" y2="200" />
        </g>

        {/* Route Discovery Phase */}
        {phase === "discovery" && (
          <g>
            <path
              d="M 100 200 L 250 150 L 400 200 L 550 200"
              stroke="hsl(var(--accent))"
              strokeWidth="3"
              fill="none"
              strokeDasharray="10,5"
              className="animate-pulse"
            />
            <text x="350" y="140" textAnchor="middle" fill="hsl(var(--accent))" fontSize="12" fontWeight="600" className="animate-pulse">
              Route Request: [S → 1 → 3 → D]
            </text>
          </g>
        )}

        {/* Route Reply Phase */}
        {phase === "reply" && (
          <g>
            <path
              d="M 550 200 L 400 200 L 250 150 L 100 200"
              stroke="hsl(var(--primary))"
              strokeWidth="3"
              fill="none"
              strokeDasharray="10,5"
              className="animate-pulse"
            />
            <text x="350" y="140" textAnchor="middle" fill="hsl(var(--primary))" fontSize="12" fontWeight="600" className="animate-pulse">
              Route Reply: [D → 3 → 1 → S]
            </text>
          </g>
        )}

        {/* Data Transfer Phase */}
        {phase === "data" && (
          <g>
            <path
              d="M 100 200 L 250 150 L 400 200 L 550 200"
              stroke="hsl(var(--tech-teal))"
              strokeWidth="4"
              fill="none"
              className="animate-pulse"
            />
            <circle cx="275" cy="175" r="10" fill="hsl(var(--tech-teal))" className="animate-pulse-slow">
              <animateMotion dur="3s" repeatCount="indefinite">
                <mpath href="#dataPath" />
              </animateMotion>
            </circle>
            <path id="dataPath" d="M 100 200 L 250 150 L 400 200 L 550 200" fill="none" />
            <text x="350" y="140" textAnchor="middle" fill="hsl(var(--tech-teal))" fontSize="12" fontWeight="600">
              Data: [S, 1, 3, D] + Payload
            </text>
          </g>
        )}

        {/* Nodes */}
        {nodes.map((node) => (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              r="25"
              fill={
                node.id === "S" ? "hsl(var(--primary))" :
                node.id === "D" ? "hsl(var(--accent))" :
                "hsl(var(--tech-cyan))"
              }
              className={
                phase === "discovery" && (node.id === "1" || node.id === "3") ? "animate-pulse" :
                phase === "reply" && (node.id === "1" || node.id === "3") ? "animate-pulse" : ""
              }
            />
            <text
              x={node.x}
              y={node.y + 5}
              textAnchor="middle"
              fill="white"
              fontSize="16"
              fontWeight="700"
            >
              {node.id}
            </text>
            <text
              x={node.x}
              y={node.y + 45}
              textAnchor="middle"
              fill="hsl(var(--foreground))"
              fontSize="11"
              fontWeight="500"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>

      <div className="mt-8 max-w-2xl text-center space-y-4">
        <h3 className="text-xl font-semibold gradient-text">DSR Protocol (Dynamic Source Routing)</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          DSR is a source routing protocol where the <span className="text-primary font-medium">complete route</span> is 
          stored in the packet header. Each packet carries the full path from source to destination, 
          eliminating the need for routing tables at intermediate nodes.
        </p>
        <div className="grid grid-cols-3 gap-3 mt-6 text-xs">
          <div className={`p-3 rounded-lg transition-all ${phase === "discovery" ? "bg-accent/20 border-2 border-accent" : "bg-muted"}`}>
            <div className="font-semibold text-accent mb-1">Route Discovery</div>
            <div className="text-muted-foreground">Source floods RREQ packet</div>
          </div>
          <div className={`p-3 rounded-lg transition-all ${phase === "reply" ? "bg-primary/20 border-2 border-primary" : "bg-muted"}`}>
            <div className="font-semibold text-primary mb-1">Route Reply</div>
            <div className="text-muted-foreground">Destination sends RREP back</div>
          </div>
          <div className={`p-3 rounded-lg transition-all ${phase === "data" ? "bg-tech-teal/20 border-2 border-tech-teal" : "bg-muted"}`}>
            <div className="font-semibold text-tech-teal mb-1">Data Transfer</div>
            <div className="text-muted-foreground">Packet contains full route</div>
          </div>
        </div>
      </div>
    </div>
  );
};
