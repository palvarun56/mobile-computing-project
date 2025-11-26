import { useEffect, useState } from "react";

export const TCPMobileVisualization = () => {
  const [packetPosition, setPacketPosition] = useState(0);
  const [congestionWindow, setCongestionWindow] = useState(1);

  // Minimal reasons for each hop
  const reasons: Record<
    number,
    { text: string; x: number; y: number }
  > = {
    1: { text: "Stable wireless link", x: 170, y: 120 },
    2: { text: "Low-delay route", x: 400, y: 120 },
    3: { text: "ACK returned", x: 400, y: 120 }
  };

  // Bubble component
  const Bubble = ({ x, y, text }: any) => (
    <g>
      <rect
        x={x}
        y={y}
        width={text.length * 7 + 30}
        height="32"
        rx="10"
        ry="10"
        fill="white"
        stroke="gray"
        strokeWidth="1"
        style={{ filter: "drop-shadow(0px 2px 3px rgba(0,0,0,0.2))" }}
      />
      <polygon
        points={`${x + 25},${y + 32} ${x + 35},${y + 32} ${x + 30},${y + 42}`}
        fill="white"
        stroke="gray"
        strokeWidth="1"
      />
      <text
        x={x + (text.length * 7 + 30) / 2}
        y={y + 20}
        textAnchor="middle"
        fill="black"
        fontSize="11"
        fontWeight="600"
      >
        {text}
      </text>
    </g>
  );

  // animation logic
  useEffect(() => {
    const interval = setInterval(() => {
      setPacketPosition((prev) => (prev + 1) % 4);

      setCongestionWindow((prev) => {
        if (packetPosition === 3) return 1;
        return Math.min(prev + 1, 8);
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [packetPosition]);

  return (
    <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center p-8">
      <svg viewBox="0 0 850 450" className="w-full max-w-4xl">

        {/* ========== MOBILE DEVICE ========== */}
        <g>
          <rect x="50" y="150" width="120" height="180" fill="hsl(var(--primary))" opacity="0.2" rx="12" />
          <circle cx="110" cy="190" r="8" fill="hsl(var(--primary))" />
          <text x="110" y="230" textAnchor="middle" fontSize="14" fontWeight="600">
            Mobile Device
          </text>
          <text x="110" y="250" textAnchor="middle" fontSize="10">
            TCP Sender
          </text>
        </g>

        {/* ========== NETWORK ========== */}
        <g>
          <circle cx="400" cy="200" r="30" fill="hsl(var(--accent))" opacity="0.3" />
          <circle cx="400" cy="200" r="50" fill="hsl(var(--accent))" opacity="0.1" />
          <text x="400" y="265" textAnchor="middle" fontSize="14" fontWeight="600">
            Wireless Network
          </text>
          <text x="400" y="280" textAnchor="middle" fontSize="10">
            Variable Delay
          </text>
        </g>

        {/* ========== SERVER ========== */}
        <g>
          <rect x="650" y="150" width="120" height="180" fill="hsl(var(--tech-cyan))" opacity="0.2" rx="12" />
          <circle cx="710" cy="190" r="8" fill="hsl(var(--tech-cyan))" />
          <text x="710" y="230" textAnchor="middle" fontSize="14" fontWeight="600">
            Server
          </text>
          <text x="710" y="250" textAnchor="middle" fontSize="10">
            TCP Receiver
          </text>
        </g>

        {/* ========== DATA PACKET HOPS ========== */}
        {/* PACKET VISUAL */}
        {packetPosition > 0 && packetPosition < 3 && (
          <g>
            <circle
              cx={170 + packetPosition * 230}
              cy="200"
              r="12"
              fill="hsl(var(--tech-teal))"
              className="animate-pulse"
            />
            <text
              x={170 + packetPosition * 230}
              y="185"
              textAnchor="middle"
              fontSize="10"
              fontWeight="600"
            >
              DATA
            </text>

            {/* Reason Bubble */}
            <Bubble
              x={reasons[packetPosition].x}
              y={reasons[packetPosition].y}
              text={reasons[packetPosition].text}
            />
          </g>
        )}

        {/* ACK RETURN */}
        {packetPosition === 3 && (
          <g>
            <circle cx="400" cy="200" r="12" fill="hsl(var(--primary))" />
            <text x="400" y="185" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">
              ACK
            </text>

            <Bubble x={reasons[3].x} y={reasons[3].y} text={reasons[3].text} />
          </g>
        )}

        {/* ========== SIGNAL BARS ========== */}
        <g>
          <rect x="380" y="280" width="8" height="30" fill="hsl(var(--accent))" opacity="0.5" />
          <rect x="392" y="270" width="8" height="40" fill="hsl(var(--accent))" opacity={packetPosition !== 3 ? 0.5 : 0.2} />
          <rect x="404" y="260" width="8" height="50" fill="hsl(var(--accent))" opacity={packetPosition !== 3 ? 0.5 : 0.2} />
          <rect x="416" y="250" width="8" height="60" fill="hsl(var(--accent))" opacity={packetPosition !== 3 ? 0.5 : 0.2} />
        </g>

        {/* ========== CWND BARS ========== */}
        <g>
          <text x="110" y="350" textAnchor="middle" fontSize="12" fontWeight="600">
            Congestion Window: {congestionWindow}
          </text>

          {[...Array(8)].map((_, i) => (
            <rect
              key={i}
              x={50 + i * 15}
              y="360"
              width="12"
              height="20"
              fill={i < congestionWindow ? "hsl(var(--primary))" : "hsl(var(--muted))"}
              opacity={i < congestionWindow ? 0.8 : 0.3}
              rx="2"
            />
          ))}
        </g>

        {/* Timeout Indicator */}
        {packetPosition === 3 && (
          <g>
            <circle cx="400" cy="320" r="20" fill="hsl(var(--destructive))" opacity="0.2" />
            <text x="400" y="325" textAnchor="middle" fontSize="11" fontWeight="600">
              Timeout!
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};
