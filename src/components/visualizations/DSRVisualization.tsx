import { useEffect, useState } from "react";

export const DSRVisualization = () => {
  const [phase, setPhase] = useState<"discovery" | "reply" | "data">("discovery");
  const [hop, setHop] = useState(0);

  const route = ["S", "1", "3", "D"];

  // Final bubble placements with pointer direction
  const reasons: Record<
    string,
    { text: string; x: number; y: number; pos: "top" | "bottom" | "left" | "right" }
  > = {
    "S→1": { text: "Node 1 chosen: Strong signal", x: 200, y: 80, pos: "top" },
    "S→2": { text: "Node 2 skipped: Longer path", x: 230, y: 290, pos: "bottom" },
    "1→3": { text: "Node 3 chosen: Low delay", x: 330, y: 80, pos: "top" },
    "1→2": { text: "Node 2 skipped: Loop chance", x: 260, y: 300, pos: "bottom" },
    "3→D": { text: "D chosen: Direct stable link", x: 720, y: 170, pos: "right" }, // Fixed
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((p) =>
        p === "discovery" ? "reply" : p === "reply" ? "data" : "discovery"
      );
      setHop(0);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (phase !== "discovery") return;
    const h = setInterval(() => {
      setHop((prev) => (prev < route.length - 1 ? prev + 1 : prev));
    }, 1100);
    return () => clearInterval(h);
  }, [phase]);

  const nodes = [
    { id: "S", x: 100, y: 200, label: "Source" },
    { id: "1", x: 250, y: 150, label: "Node 1" },
    { id: "2", x: 250, y: 250, label: "Node 2" },
    { id: "3", x: 400, y: 200, label: "Node 3" },
    { id: "D", x: 550, y: 200, label: "Destination" },
  ];

  const Bubble = ({ x, y, text, pos }: any) => {
    const width = text.length * 7 + 40;
    const height = 40;

    return (
      <g>
        {/* Bubble box */}
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          rx={10}
          ry={10}
          fill="white"
          stroke="gray"
          strokeWidth="1"
          style={{ filter: "drop-shadow(0px 2px 3px rgba(0,0,0,0.15))" }}
        />

        {/* Pointer triangle */}
        {pos === "top" && (
          <polygon
            points={`${x + width / 2 - 8},${y + height}
                     ${x + width / 2 + 8},${y + height}
                     ${x + width / 2},${y + height + 12}`}
            fill="white"
            stroke="gray"
          />
        )}
        {pos === "bottom" && (
          <polygon
            points={`${x + width / 2 - 8},${y}
                     ${x + width / 2 + 8},${y}
                     ${x + width / 2},${y - 12}`}
            fill="white"
            stroke="gray"
          />
        )}
        {pos === "right" && (
          <polygon
            points={`${x},${y + height / 2 - 6}
                     ${x},${y + height / 2 + 6}
                     ${x - 12},${y + height / 2}`}
            fill="white"
            stroke="gray"
          />
        )}
        {pos === "left" && (
          <polygon
            points={`${x + width},${y + height / 2 - 6}
                     ${x + width},${y + height / 2 + 6}
                     ${x + width + 12},${y + height / 2}`}
            fill="white"
            stroke="gray"
          />
        )}

        {/* Text */}
        <text
          x={x + width / 2}
          y={y + 25}
          fontSize="12"
          fontWeight="600"
          fill="black"
          textAnchor="middle"
        >
          {text}
        </text>
      </g>
    );
  };

  return (
    <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center p-8">
      <svg viewBox="0 0 1000 400" className="w-full max-w-6xl">
        {/* All possible links */}
        <g stroke="hsl(var(--border))" strokeWidth="2" opacity="0.35">
          <line x1="100" y1="200" x2="250" y2="150" />
          <line x1="100" y1="200" x2="250" y2="250" />
          <line x1="250" y1="150" x2="400" y2="200" />
          <line x1="250" y1="250" x2="400" y2="200" />
          <line x1="400" y1="200" x2="550" y2="200" />
        </g>

        {/* Discovery with bubble */}
        {phase === "discovery" &&
          route.slice(0, hop + 1).map((_, i) => {
            if (i === hop && i < route.length - 1) {
              const from = nodes.find((n) => n.id === route[i]);
              const to = nodes.find((n) => n.id === route[i + 1]);
              const chooseKey = `${from?.id}→${to?.id}`;
              const skipKey = i === 0 ? "S→2" : i === 1 ? "1→2" : null;

              return (
                <g key={i}>
                  <line
                    x1={from!.x}
                    y1={from!.y}
                    x2={to!.x}
                    y2={to!.y}
                    stroke="hsl(var(--accent))"
                    strokeWidth="4"
                    className="animate-pulse"
                  />

                  <Bubble
                    x={reasons[chooseKey].x}
                    y={reasons[chooseKey].y}
                    text={reasons[chooseKey].text}
                    pos={reasons[chooseKey].pos}
                  />

                  {skipKey && (
                    <Bubble
                      x={reasons[skipKey].x}
                      y={reasons[skipKey].y}
                      text={reasons[skipKey].text}
                      pos={reasons[skipKey].pos}
                    />
                  )}
                </g>
              );
            }
          })}

        {/* Reply */}
        {phase === "reply" && (
          <path
            d="M 550 200 L 400 200 L 250 150 L 100 200"
            stroke="hsl(var(--primary))"
            strokeWidth="3"
            fill="none"
            strokeDasharray="10,5"
            className="animate-pulse"
          />
        )}

        {/* Data */}
        {phase === "data" && (
          <path
            d="M 100 200 L 250 150 L 400 200 L 550 200"
            stroke="hsl(var(--tech-teal))"
            strokeWidth="4"
            fill="none"
            className="animate-pulse"
          />
        )}

        {/* Nodes */}
        {nodes.map((node) => (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              r="26"
              fill={
                node.id === "S"
                  ? "hsl(var(--primary))"
                  : node.id === "D"
                  ? "hsl(var(--accent))"
                  : "hsl(var(--tech-cyan))"
              }
            />
            <text
              x={node.x}
              y={node.y + 6}
              textAnchor="middle"
              fill="white"
              fontSize="16"
              fontWeight="700"
            >
              {node.id}
            </text>
            <text
              x={node.x}
              y={node.y + 40}
              textAnchor="middle"
              fontSize="11"
              fill="hsl(var(--foreground))"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};
