import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ProtocolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
  isActive: boolean;
}

export const ProtocolCard = ({ title, description, icon: Icon, onClick, isActive }: ProtocolCardProps) => {
  return (
    <Card
      onClick={onClick}
      className={`protocol-card cursor-pointer transition-all duration-300 ${
        isActive 
          ? "border-primary shadow-card-hover bg-gradient-to-br from-primary/5 to-accent/5" 
          : "border-border shadow-card hover:border-primary/50"
      }`}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl mb-2 flex items-center gap-2">
              <Icon className={`h-5 w-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
              {title}
            </CardTitle>
            <CardDescription className="text-sm">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">Click to view visualization</p>
      </CardContent>
    </Card>
  );
};
