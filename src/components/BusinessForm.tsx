import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BusinessFormProps {
  onSubmit: (data: { name: string; location: string }) => void;
  isLoading?: boolean;
}

export function BusinessForm({ onSubmit, isLoading }: BusinessFormProps) {
  const [businessName, setBusinessName] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (businessName.trim() && location.trim()) {
      onSubmit({ name: businessName.trim(), location: location.trim() });
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto glass shadow-elevation hover:shadow-glow transition-smooth transform hover:-translate-y-2">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-3xl font-bold gradient-text mb-2">
          Business Dashboard
        </CardTitle>
        <p className="text-muted-foreground text-base">Enter your business details to get started</p>
        <div className="w-12 h-1 bg-business-gradient mx-auto rounded-full mt-4"></div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="businessName" className="text-sm font-semibold text-foreground">
              Business Name
            </Label>
            <Input
              id="businessName"
              type="text"
              placeholder="e.g., Cake & Co"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="transition-smooth focus:shadow-business hover:shadow-card-elevated border-border/50 bg-card/50 backdrop-blur-sm"
              required
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="location" className="text-sm font-semibold text-foreground">
              Location
            </Label>
            <Input
              id="location"
              type="text"
              placeholder="e.g., Mumbai"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="transition-smooth focus:shadow-business hover:shadow-card-elevated border-border/50 bg-card/50 backdrop-blur-sm"
              required
            />
          </div>
          <Button
            type="submit"
            variant="premium"
            size="lg"
            className="w-full mt-8"
            disabled={isLoading || !businessName.trim() || !location.trim()}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                Analyzing...
              </>
            ) : (
              "Get Business Insights"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}