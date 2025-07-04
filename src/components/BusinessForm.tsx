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
    <Card className="w-full max-w-md mx-auto bg-business-card border-0 shadow-card-elevated">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold bg-business-gradient bg-clip-text text-transparent">
          Business Dashboard
        </CardTitle>
        <p className="text-muted-foreground">Enter your business details to get started</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="businessName" className="text-sm font-medium">
              Business Name
            </Label>
            <Input
              id="businessName"
              type="text"
              placeholder="e.g., Cake & Co"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="transition-all duration-200 focus:shadow-business border-border/50"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium">
              Location
            </Label>
            <Input
              id="location"
              type="text"
              placeholder="e.g., Mumbai"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="transition-all duration-200 focus:shadow-business border-border/50"
              required
            />
          </div>
          <Button
            type="submit"
            variant="business"
            size="lg"
            className="w-full mt-6"
            disabled={isLoading || !businessName.trim() || !location.trim()}
          >
            {isLoading ? "Analyzing..." : "Get Business Insights"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}