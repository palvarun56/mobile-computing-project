import { useEffect, useState } from "react";

export const HandoffVisualization = () => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => (prev + 1) % 5);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const baseStations = [
    { id: "BS1", x: 150, y: 200 },
    { id: "BS2", x: 450, y: 200 },
    { id: "BS3", x: 650, y: 200 },
  ];

  const mobileX = 100 + position * 125;

  return (
    <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center p-8">
      <svg viewBox="0 0 800 450" className="w-full max-w-4xl">
        {/* Coverage areas */}
        {baseStations.map((bs, idx) => (
          <g key={bs.id}>
            <circle
              cx={bs.x}
              cy={bs.y}
              r="120"
              fill={
                (position <= 1 && idx === 0) ? "hsl(var(--primary))" :
                (position >= 2 && position <= 3 && idx === 1) ? "hsl(var(--accent))" :
                (position >= 4 && idx === 2) ? "hsl(var(--tech-cyan))" :
                "hsl(var(--muted))"
              }
              opacity="0.1"
              className="transition-all duration-1000"
            />
            <circle
              cx={bs.x}
              cy={bs.y}
              r="15"
              fill={
                (position <= 1 && idx === 0) ? "hsl(var(--primary))" :
                (position >= 2 && position <= 3 && idx === 1) ? "hsl(var(--accent))" :
                (position >= 4 && idx === 2) ? "hsl(var(--tech-cyan))" :
                "hsl(var(--muted))"
              }
              className="transition-all duration-1000"
            />
            <text
              x={bs.x}
              y={bs.y + 5}
              textAnchor="middle"
              fill="white"
              fontSize="10"
              fontWeight="600"
            >
              {bs.id}
            </text>
            <text
              x={bs.x}
              y={bs.y + 40}
              textAnchor="middle"
              fill="hsl(var(--foreground))"
              fontSize="11"
              fontWeight="500"
            >
              Base Station {idx + 1}
            </text>
          </g>
        ))}

        {/* Handoff indicator */}
        {(position === 2 || position === 4) && (
          <g className="animate-pulse">
            <circle cx={mobileX} cy="200" r="50" fill="hsl(var(--accent))" opacity="0.2" />
            <text
              x={mobileX}
              y="270"
              textAnchor="middle"
              fill="hsl(var(--accent))"
              fontSize="12"
              fontWeight="700"
            >
              Handoff in Progress
            </text>
          </g>
        )}

        {/* Mobile Device */}
        <g>
          <circle
            cx={mobileX}
            cy="200"
            r="20"
            fill="hsl(var(--tech-teal))"
            className="transition-all duration-[1800ms]"
          />
          <text
            x={mobileX}
            y="205"
            textAnchor="middle"
            fill="white"
            fontSize="14"
            fontWeight="700"
          >
            📱
          </text>
          <text
            x={mobileX}
            y="240"
            textAnchor="middle"
            fill="hsl(var(--foreground))"
            fontSize="11"
            fontWeight="600"
            className="transition-all duration-[1800ms]"
          >
            Mobile Device
          </text>
        </g>

        {/* Signal lines */}
        {position <= 1 && (
          <line
            x1={mobileX}
            y1="200"
            x2="150"
            y2="200"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeDasharray="5,5"
            className="animate-pulse transition-all duration-1000"
          />
        )}
        {position >= 2 && position <= 3 && (
          <line
            x1={mobileX}
            y1="200"
            x2="450"
            y2="200"
            stroke="hsl(var(--accent))"
            strokeWidth="2"
            strokeDasharray="5,5"
            className="animate-pulse transition-all duration-1000"
          />
        )}
        {position >= 4 && (
          <line
            x1={mobileX}
            y1="200"
            x2="650"
            y2="200"
            stroke="hsl(var(--tech-cyan))"
            strokeWidth="2"
            strokeDasharray="5,5"
            className="animate-pulse transition-all duration-1000"
          />
        )}

        {/* Direction arrow */}
        <g>
          <path
            d="M 700 350 L 750 350"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth="2"
            markerEnd="url(#arrow)"
          />
          <text x="725" y="340" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="11">
            Direction of Movement
          </text>
        </g>

        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="hsl(var(--muted-foreground))" />
          </marker>
        </defs>
      </svg>

      <div className="mt-8 max-w-2xl text-center space-y-4">
        <h3 className="text-xl font-semibold gradient-text">Mobile Handoff Protocol</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Handoff (or handover) is the process of transferring an active connection from one 
          <span className="text-primary font-medium"> base station</span> to another as the mobile device moves. 
          The system must maintain <span className="text-accent font-medium">seamless connectivity</span> without 
          dropping the connection during the transfer.
        </p>
        <div className="grid grid-cols-3 gap-4 mt-6 text-xs">
          <div className="p-3 bg-primary/10 rounded-lg">
            <div className="font-semibold text-primary mb-1">Measurement</div>
            <div className="text-muted-foreground">Monitor signal strength continuously</div>
          </div>
          <div className="p-3 bg-accent/10 rounded-lg">
            <div className="font-semibold text-accent mb-1">Decision</div>
            <div className="text-muted-foreground">Trigger handoff when threshold met</div>
          </div>
          <div className="p-3 bg-tech-cyan/10 rounded-lg">
            <div className="font-semibold text-tech-cyan mb-1">Execution</div>
            <div className="text-muted-foreground">Switch to new base station</div>
          </div>
        </div>
      </div>
    </div>
  );
};
