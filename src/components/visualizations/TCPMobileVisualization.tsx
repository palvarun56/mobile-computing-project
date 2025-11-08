import { useEffect, useState } from "react";

export const TCPMobileVisualization = () => {
  const [packetPosition, setPacketPosition] = useState(0);
  const [congestionWindow, setCongestionWindow] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setPacketPosition((prev) => (prev + 1) % 4);
      setCongestionWindow((prev) => {
        if (packetPosition === 3) return 1; // Reset on timeout
        return Math.min(prev + 1, 8); // Grow window
      });
    }, 1500);
    return () => clearInterval(interval);
  }, [packetPosition]);

  return (
    <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center p-8">
      <svg viewBox="0 0 800 450" className="w-full max-w-4xl">
        {/* Mobile Device */}
        <g>
          <rect x="50" y="150" width="120" height="180" fill="hsl(var(--primary))" opacity="0.2" rx="12" />
          <circle cx="110" cy="190" r="8" fill="hsl(var(--primary))" />
          <text x="110" y="230" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="14" fontWeight="600">
            Mobile Device
          </text>
          <text x="110" y="250" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="10">
            TCP Sender
          </text>
        </g>

        {/* Base Station / Network */}
        <g>
          <circle cx="400" cy="200" r="30" fill="hsl(var(--accent))" opacity="0.3" />
          <circle cx="400" cy="200" r="50" fill="hsl(var(--accent))" opacity="0.1" />
          <text x="400" y="265" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="14" fontWeight="600">
            Wireless Network
          </text>
          <text x="400" y="280" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="10">
            Variable Delay
          </text>
        </g>

        {/* Server */}
        <g>
          <rect x="630" y="150" width="120" height="180" fill="hsl(var(--tech-cyan))" opacity="0.2" rx="12" />
          <circle cx="690" cy="190" r="8" fill="hsl(var(--tech-cyan))" />
          <text x="690" y="230" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="14" fontWeight="600">
            Server
          </text>
          <text x="690" y="250" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="10">
            TCP Receiver
          </text>
        </g>

        {/* Data Packet Animation */}
        {packetPosition > 0 && packetPosition < 3 && (
          <g>
            <circle
              cx={170 + (packetPosition * 230)}
              cy="200"
              r="12"
              fill="hsl(var(--tech-teal))"
              className="animate-pulse-slow"
            />
            <text
              x={170 + (packetPosition * 230)}
              y="185"
              textAnchor="middle"
              fill="hsl(var(--foreground))"
              fontSize="10"
              fontWeight="600"
            >
              DATA
            </text>
          </g>
        )}

        {/* ACK Packet Animation */}
        {packetPosition === 3 && (
          <g className="animate-pulse">
            <circle cx="400" cy="200" r="12" fill="hsl(var(--primary))" />
            <text x="400" y="185" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">
              ACK
            </text>
          </g>
        )}

        {/* Signal Strength Indicator */}
        <g>
          <rect x="380" y="280" width="8" height="30" fill="hsl(var(--accent))" opacity="0.5" />
          <rect x="392" y="270" width="8" height="40" fill="hsl(var(--accent))" opacity={packetPosition !== 3 ? 0.5 : 0.2} />
          <rect x="404" y="260" width="8" height="50" fill="hsl(var(--accent))" opacity={packetPosition !== 3 ? 0.5 : 0.2} />
          <rect x="416" y="250" width="8" height="60" fill="hsl(var(--accent))" opacity={packetPosition !== 3 ? 0.5 : 0.2} />
        </g>

        {/* Congestion Window Visualization */}
        <g>
          <text x="110" y="350" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="12" fontWeight="600">
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

        {/* Error indicator */}
        {packetPosition === 3 && (
          <g className="animate-pulse">
            <circle cx="400" cy="320" r="20" fill="hsl(var(--destructive))" opacity="0.2" />
            <text x="400" y="325" textAnchor="middle" fill="hsl(var(--destructive))" fontSize="11" fontWeight="600">
              Timeout!
            </text>
          </g>
        )}
      </svg>

      <div className="mt-8 max-w-2xl text-center space-y-4">
        <h3 className="text-xl font-semibold gradient-text">TCP in Mobile Environment</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          TCP faces challenges in mobile networks due to <span className="text-destructive font-medium">packet loss</span> from 
          handoffs and weak signals. Traditional TCP interprets loss as congestion, 
          reducing the <span className="text-primary font-medium">congestion window</span> unnecessarily, 
          leading to poor performance.
        </p>
        <div className="grid grid-cols-3 gap-4 mt-6 text-xs">
          <div className="p-3 bg-primary/10 rounded-lg">
            <div className="font-semibold text-primary mb-1">Slow Start</div>
            <div className="text-muted-foreground">Window grows exponentially</div>
          </div>
          <div className="p-3 bg-accent/10 rounded-lg">
            <div className="font-semibold text-accent mb-1">Wireless Loss</div>
            <div className="text-muted-foreground">Signal interference causes drops</div>
          </div>
          <div className="p-3 bg-destructive/10 rounded-lg">
            <div className="font-semibold text-destructive mb-1">False Detection</div>
            <div className="text-muted-foreground">TCP treats wireless loss as congestion</div>
          </div>
        </div>
      </div>
    </div>
  );
};
