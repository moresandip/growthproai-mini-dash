import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users, TrendingUp, Sparkles } from "lucide-react";

interface BusinessData {
  rating: number;
  reviews: number;
  headline: string;
}

interface BusinessDataCardProps {
  businessName: string;
  location: string;
  data: BusinessData;
  onRegenerateHeadline: () => void;
  isRegenerating?: boolean;
}

export function BusinessDataCard({
  businessName,
  location,
  data,
  onRegenerateHeadline,
  isRegenerating
}: BusinessDataCardProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto bg-business-card border-0 shadow-elevation">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-foreground">
              {businessName}
            </CardTitle>
            <p className="text-muted-foreground font-medium">{location}</p>
          </div>
          <Badge variant="secondary" className="bg-business-secondary text-business-primary font-semibold">
            Live Data
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Google Business Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-4 rounded-lg bg-gradient-to-br from-business-success/10 to-business-success/5 border border-business-success/20">
            <div className="p-2 rounded-full bg-business-success/20">
              <Star className="h-5 w-5 text-business-success" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Google Rating</p>
              <div className="flex items-center space-x-1">
                <span className="text-2xl font-bold text-business-success">{data.rating}</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(data.rating)
                          ? "text-business-warning fill-current"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 rounded-lg bg-gradient-to-br from-business-primary/10 to-business-primary/5 border border-business-primary/20">
            <div className="p-2 rounded-full bg-business-primary/20">
              <Users className="h-5 w-5 text-business-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Reviews</p>
              <span className="text-2xl font-bold text-business-primary">{data.reviews}</span>
            </div>
          </div>
        </div>

        {/* SEO Headline Section */}
        <div className="p-6 rounded-lg bg-gradient-to-br from-accent/50 to-accent/20 border border-accent">
          <div className="flex items-center space-x-2 mb-3">
            <div className="p-1.5 rounded-full bg-business-primary/20">
              <TrendingUp className="h-4 w-4 text-business-primary" />
            </div>
            <h3 className="font-semibold text-foreground">AI-Generated SEO Headline</h3>
            <Badge variant="outline" className="bg-white/50 border-business-primary/30 text-business-primary text-xs">
              Latest
            </Badge>
          </div>
          
          <blockquote className="text-lg font-medium text-foreground/90 italic mb-4 leading-relaxed">
            "{data.headline}"
          </blockquote>
          
          <Button
            variant="regenerate"
            onClick={onRegenerateHeadline}
            disabled={isRegenerating}
            className="w-full md:w-auto"
          >
            {isRegenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Regenerate SEO Headline
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}