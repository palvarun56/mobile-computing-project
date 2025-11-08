import { useState } from "react";
import { ProtocolCard } from "@/components/ProtocolCard";
import { AboutModal } from "@/components/AboutModal";
import { MobileIPVisualization } from "@/components/visualizations/MobileIPVisualization";
import { AODVVisualization } from "@/components/visualizations/AODVVisualization";
import { DSRVisualization } from "@/components/visualizations/DSRVisualization";
import { TCPMobileVisualization } from "@/components/visualizations/TCPMobileVisualization";
import { HandoffVisualization } from "@/components/visualizations/HandoffVisualization";
import { Network, Radio, Route, Wifi, WifiOff } from "lucide-react";
import { Card } from "@/components/ui/card";

type Protocol = "mobile-ip" | "aodv" | "dsr" | "tcp-mobile" | "handoff" | null;

const protocols = [
  {
    id: "mobile-ip" as Protocol,
    title: "Mobile IP",
    description: "Protocol for mobile host routing across different networks while maintaining a permanent IP address",
    icon: Network,
  },
  {
    id: "aodv" as Protocol,
    title: "AODV",
    description: "Ad Hoc On-Demand Distance Vector routing protocol for mobile ad hoc networks",
    icon: Radio,
  },
  {
    id: "dsr" as Protocol,
    title: "DSR",
    description: "Dynamic Source Routing protocol using source routing for packet delivery in ad hoc networks",
    icon: Route,
  },
  {
    id: "tcp-mobile" as Protocol,
    title: "TCP in Mobile Environment",
    description: "TCP behavior and challenges in mobile computing scenarios with packet loss and handoffs",
    icon: WifiOff,
  },
  {
    id: "handoff" as Protocol,
    title: "Mobile Handoff",
    description: "Process of transferring ongoing connections between base stations as mobile devices move",
    icon: Wifi,
  },
];

const Index = () => {
  const [selectedProtocol, setSelectedProtocol] = useState<Protocol>(null);

  const renderVisualization = () => {
    switch (selectedProtocol) {
      case "mobile-ip":
        return <MobileIPVisualization />;
      case "aodv":
        return <AODVVisualization />;
      case "dsr":
        return <DSRVisualization />;
      case "tcp-mobile":
        return <TCPMobileVisualization />;
      case "handoff":
        return <HandoffVisualization />;
      default:
        return (
          <div className="flex items-center justify-center h-full text-center p-8">
            <div className="space-y-4 animate-fade-in">
              <div className="text-6xl animate-float">📡</div>
              <h3 className="text-2xl font-semibold text-muted-foreground">
                Select a protocol to view its visualization
              </h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Click on any protocol card above to see an interactive animation showing how it works
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold gradient-text">
              Mobile Computing Protocol Visualizations
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Interactive demonstrations of mobile networking protocols
            </p>
          </div>
          <AboutModal />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Protocol Cards Grid */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-foreground">
            Available Protocols
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {protocols.map((protocol) => (
              <ProtocolCard
                key={protocol.id}
                title={protocol.title}
                description={protocol.description}
                icon={protocol.icon}
                onClick={() => setSelectedProtocol(protocol.id)}
                isActive={selectedProtocol === protocol.id}
              />
            ))}
          </div>
        </section>

        {/* Visualization Area */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-foreground">
            {selectedProtocol ? "Protocol Visualization" : "Visualization Area"}
          </h2>
          <Card className="bg-card shadow-card">
            {renderVisualization()}
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t mt-16 py-6 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Mobile Computing Protocol Visualizations | Final Year University Project</p>
          <p className="mt-1">Built with React, TypeScript, and Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
