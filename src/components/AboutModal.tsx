import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

export const AboutModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Info className="h-4 w-4" />
          About
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl gradient-text">
            Mobile Computing Protocol Visualizations
          </DialogTitle>
          <DialogDescription className="text-base mt-4 space-y-4">
            <p>
              This interactive platform provides visual demonstrations of key mobile computing protocols, 
              designed to help students and professionals understand how mobile networks operate.
            </p>
            
            <div className="mt-6 space-y-3">
              <h4 className="font-semibold text-foreground text-lg">Available Protocols:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <div>
                    <span className="font-medium text-foreground">Mobile IP:</span> Learn how devices maintain 
                    connectivity while moving between networks
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <div>
                    <span className="font-medium text-foreground">AODV:</span> Discover on-demand routing in 
                    ad hoc networks
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-tech-cyan">•</span>
                  <div>
                    <span className="font-medium text-foreground">DSR:</span> Explore source routing with 
                    complete path information
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-tech-teal">•</span>
                  <div>
                    <span className="font-medium text-foreground">TCP Mobile:</span> Understand TCP challenges 
                    in wireless environments
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <div>
                    <span className="font-medium text-foreground">Handoff:</span> See how connections transfer 
                    between base stations
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-6 p-4 bg-primary/10 rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">How to Use:</h4>
              <ol className="text-sm space-y-1 list-decimal list-inside">
                <li>Click on any protocol card to view its visualization</li>
                <li>Watch the animated diagram to understand the protocol flow</li>
                <li>Read the explanatory notes below each visualization</li>
                <li>Observe how data packets move through the network</li>
              </ol>
            </div>

            <p className="text-xs text-muted-foreground mt-6">
              Final Year University Project | Mobile Computing Protocols
            </p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
