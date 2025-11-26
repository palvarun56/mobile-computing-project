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

  // 🔥 Minimal reasons for each transition
  const reasons: Record<number, any> = {
    0: {
      chosen: { text: "Strong signal", x: 110, y: 80 },
      skipped: { text: "BS2 weak", x: 420, y: 80 },
    },
    1: {
      chosen: { text: "Strong signal", x: 110, y: 80 },
      skipped: { text: "BS2 weak", x: 420, y: 80 },
    },
    2: {
      chosen: { text: "Better signal", x: 410, y: 80 },
      skipped: { text: "BS1 far", x: 120, y: 80 },
    },
    3: {
      chosen: { text: "Better signal", x: 410, y: 80 },
      skipped: { text: "BS1 far", x: 120, y: 80 },
    },
    4: {
      chosen: { text: "Best signal", x: 610, y: 80 },
      skipped: { text: "BS2 weak", x: 410, y: 80 },
    },
  };

  // ☁️ Cloud bubble component
  const Cloud = ({ x, y, text }: any) => {
    const width = text.length * 7 + 30;
    return (
      <g>
        {/* bubble box */}
        <rect
          x={x}
          y={y}
          width={width}
          height="32"
          rx="12"
          ry="12"
          fill="white"
          stroke="gray"
          strokeWidth="1"
          style={{ filter: "drop-shadow(0px 2px 3px rgba(0,0,0,0.2))" }}
        />

        {/* pointer */}
        <polygon
          points={`${x + width / 2 - 8},${y + 32} ${x + width / 2 + 8},${y + 32} ${x + width / 2},${y + 44}`}
          fill="white"
          stroke="gray"
          strokeWidth="1"
        />

        {/* text */}
        <text
          x={x + width / 2}
          y={y + 20}
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

  return (
    <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center p-8">
      <svg viewBox="0 0 850 450" className="w-full max-w-4xl">

        {/* 🌤 Reason Bubbles */}
        {reasons[position] && (
          <>
            {/* chosen BS cloud */}
            <Cloud x={reasons[position].chosen.x} y={reasons[position].chosen.y} text={reasons[position].chosen.text} />

            {/* skipped BS cloud */}
            <Cloud x={reasons[position].skipped.x} y={reasons[position].skipped.y} text={reasons[position].skipped.text} />
          </>
        )}

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
            />
            <text x={bs.x} y={bs.y + 5} textAnchor="middle" fill="white" fontSize="10" fontWeight="600">
              {bs.id}
            </text>
            <text x={bs.x} y={bs.y + 40} textAnchor="middle" fontSize="11" fontWeight="500">
              Base Station {idx + 1}
            </text>
          </g>
        ))}

        {/* Handoff indicator */}
        {(position === 2 || position === 4) && (
          <g className="animate-pulse">
            <circle cx={mobileX} cy="200" r="50" fill="hsl(var(--accent))" opacity="0.2" />
            <text x={mobileX} y="270" textAnchor="middle" fontSize="12" fontWeight="700">
              Handoff in Progress
            </text>
          </g>
        )}

        {/* Mobile Device */}
        <g>
          <circle cx={mobileX} cy="200" r="20" fill="hsl(var(--tech-teal))" className="transition-all duration-[1800ms]" />
          <text x={mobileX} y="205" textAnchor="middle" fill="white" fontSize="14" fontWeight="700">
            📱
          </text>
          <text x={mobileX} y="240" textAnchor="middle" fontSize="11" fontWeight="600">
            Mobile Device
          </text>
        </g>

        {/* Signal Lines */}
        {position <= 1 && (
          <line x1={mobileX} y1="200" x2="150" y2="200" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="5,5" />
        )}
        {position >= 2 && position <= 3 && (
          <line x1={mobileX} y1="200" x2="450" y2="200" stroke="hsl(var(--accent))" strokeWidth="2" strokeDasharray="5,5" />
        )}
        {position >= 4 && (
          <line x1={mobileX} y1="200" x2="650" y2="200" stroke="hsl(var(--tech-cyan))" strokeWidth="2" strokeDasharray="5,5" />
        )}

      </svg>
    </div>
  );
};
