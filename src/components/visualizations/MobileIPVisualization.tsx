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

  // Reason bubbles for each phase
  const reasons = {
    home: {
      chosen: { text: "At home network", x: 90, y: 90 },
      skipped: { text: "Foreign unused", x: 620, y: 90 },
    },
    foreign: {
      chosen: { text: "Registered here", x: 620, y: 90 },
      skipped: { text: "Home inactive", x: 90, y: 90 },
    },
  };

  // Cloud bubble component
  const Cloud = ({ x, y, text }: any) => {
    const width = text.length * 7 + 35;

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height="34"
          rx="12"
          ry="12"
          fill="white"
          stroke="gray"
          strokeWidth="1"
          style={{ filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.25))" }}
        />
        <polygon
          points={`${x + width / 2 - 8},${y + 34}
                   ${x + width / 2 + 8},${y + 34}
                   ${x + width / 2},${y + 46}`}
          fill="white"
          stroke="gray"
        />
        <text
          x={x + width / 2}
          y={y + 21}
          textAnchor="middle"
          fontSize="11"
          fontWeight="600"
          fill="black"
        >
          {text}
        </text>
      </g>
    );
  };

  const isForeign = animate === true;

  return (
    <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center p-8">
      <svg viewBox="0 0 800 400" className="w-full max-w-4xl">

        {/* Cloud bubbles */}
        {isForeign
          ? (
            <>
              <Cloud x={reasons.foreign.chosen.x} y={reasons.foreign.chosen.y} text={reasons.foreign.chosen.text} />
              <Cloud x={reasons.foreign.skipped.x} y={reasons.foreign.skipped.y} text={reasons.foreign.skipped.text} />
            </>
          )
          : (
            <>
              <Cloud x={reasons.home.chosen.x} y={reasons.home.chosen.y} text={reasons.home.chosen.text} />
              <Cloud x={reasons.home.skipped.x} y={reasons.home.skipped.y} text={reasons.home.skipped.text} />
            </>
          )
        }

        {/* Home Network */}
        <g>
          <rect x="50" y="150" width="150" height="100" fill="hsl(var(--primary))" opacity="0.2" rx="8" />
          <text x="125" y="200" textAnchor="middle" fontSize="14" fontWeight="600">
            Home Network
          </text>
          <circle cx="125" cy="230" r="8" fill="hsl(var(--primary))" />
          <text x="125" y="255" textAnchor="middle" fontSize="10">
            Home Agent
          </text>
        </g>

        {/* Foreign Network */}
        <g>
          <rect x="600" y="150" width="150" height="100" fill="hsl(var(--accent))" opacity="0.2" rx="8" />
          <text x="675" y="200" textAnchor="middle" fontSize="14" fontWeight="600">
            Foreign Network
          </text>
          <circle cx="675" cy="230" r="8" fill="hsl(var(--accent))" />
          <text x="675" y="255" textAnchor="middle" fontSize="10">
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
            <text x="400" y="140" textAnchor="middle" fontSize="12" fontWeight="600">
              IP Tunnel
            </text>
          </g>
        )}

        {/* Correspondent Node */}
        <g>
          <circle cx="400" cy="50" r="12" fill="hsl(var(--tech-cyan))" />
          <text x="400" y="30" textAnchor="middle" fontSize="12" fontWeight="600">
            Correspondent Node
          </text>
        </g>

        {/* Data Flow Arrow */}
        {animate && (
          <g className="animate-pulse">
            <path d="M 400 65 L 665 215" stroke="hsl(var(--accent))" strokeWidth="2" markerEnd="url(#arrowhead)" />
          </g>
        )}

        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="hsl(var(--accent))" />
          </marker>
        </defs>
      </svg>
    </div>
  );
};
