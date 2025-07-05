import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Star, Users, TrendingUp, Sparkles, Save, Edit2, Check, X, ArrowLeft } from "lucide-react";

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
  onUpdateData: (updatedData: Partial<BusinessData>) => void;
  onBackToDashboard: () => void;
  isRegenerating?: boolean;
}

export function BusinessDataCard({
  businessName,
  location,
  data,
  onRegenerateHeadline,
  onUpdateData,
  onBackToDashboard,
  isRegenerating
}: BusinessDataCardProps) {
  const [savedData, setSavedData] = useState<any>(null);
  const [showSavedTemplate, setShowSavedTemplate] = useState(false);
  const [isEditingRating, setIsEditingRating] = useState(false);
  const [isEditingReviews, setIsEditingReviews] = useState(false);
  const [tempRating, setTempRating] = useState(data.rating);
  const [tempReviews, setTempReviews] = useState(data.reviews);

  const handleSaveData = () => {
    const businessData = {
      businessName,
      location,
      rating: data.rating,
      reviews: data.reviews,
      headline: data.headline,
      generatedAt: new Date().toISOString()
    };
    
    setSavedData(businessData);
    setShowSavedTemplate(true);
    
    const dataStr = JSON.stringify(businessData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${businessName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_business_data.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSaveRating = () => {
    onUpdateData({ rating: tempRating });
    setIsEditingRating(false);
  };

  const handleCancelRating = () => {
    setTempRating(data.rating);
    setIsEditingRating(false);
  };

  const handleSaveReviews = () => {
    onUpdateData({ reviews: tempReviews });
    setIsEditingReviews(false);
  };

  const handleCancelReviews = () => {
    setTempReviews(data.reviews);
    setIsEditingReviews(false);
  };
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
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBackToDashboard}
              className="border-business-primary/30 hover:bg-business-primary/10"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSaveData}
              className="border-business-primary/30 hover:bg-business-primary/10"
            >
              <Save className="h-4 w-4" />
              Save Data
            </Button>
            <Badge variant="secondary" className="bg-business-secondary text-business-primary font-semibold">
              Live Data
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Google Business Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-4 rounded-lg bg-gradient-to-br from-business-success/10 to-business-success/5 border border-business-success/20">
            <div className="p-2 rounded-full bg-business-success/20">
              <Star className="h-5 w-5 text-business-success" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-muted-foreground">Google Rating</p>
                {!isEditingRating && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditingRating(true)}
                    className="h-6 w-6 p-0"
                  >
                    <Edit2 className="h-3 w-3" />
                  </Button>
                )}
              </div>
              {isEditingRating ? (
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={tempRating}
                    onChange={(e) => setTempRating(parseFloat(e.target.value))}
                    className="w-20 h-8"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSaveRating}
                    className="h-6 w-6 p-0 text-green-600 hover:text-green-700"
                  >
                    <Check className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCancelRating}
                    className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ) : (
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
              )}
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 rounded-lg bg-gradient-to-br from-business-primary/10 to-business-primary/5 border border-business-primary/20">
            <div className="p-2 rounded-full bg-business-primary/20">
              <Users className="h-5 w-5 text-business-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-muted-foreground">Total Reviews</p>
                {!isEditingReviews && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditingReviews(true)}
                    className="h-6 w-6 p-0"
                  >
                    <Edit2 className="h-3 w-3" />
                  </Button>
                )}
              </div>
              {isEditingReviews ? (
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    min="0"
                    value={tempReviews}
                    onChange={(e) => setTempReviews(parseInt(e.target.value) || 0)}
                    className="w-24 h-8"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSaveReviews}
                    className="h-6 w-6 p-0 text-green-600 hover:text-green-700"
                  >
                    <Check className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCancelReviews}
                    className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ) : (
                <span className="text-2xl font-bold text-business-primary">{data.reviews}</span>
              )}
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
      
      {/* Saved Data Template Dialog */}
      <Dialog open={showSavedTemplate} onOpenChange={setShowSavedTemplate}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-business-primary">Saved Business Data Template</DialogTitle>
          </DialogHeader>
          {savedData && (
            <div className="space-y-4">
              <div className="p-4 bg-card rounded-lg border">
                <h3 className="font-semibold text-lg mb-2">{savedData.businessName}</h3>
                <p className="text-muted-foreground mb-4">{savedData.location}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-3 bg-business-success/10 rounded-lg border border-business-success/20">
                    <p className="text-sm font-medium text-muted-foreground">Rating</p>
                    <p className="text-xl font-bold text-business-success">{savedData.rating} ⭐</p>
                  </div>
                  <div className="p-3 bg-business-primary/10 rounded-lg border border-business-primary/20">
                    <p className="text-sm font-medium text-muted-foreground">Reviews</p>
                    <p className="text-xl font-bold text-business-primary">{savedData.reviews}</p>
                  </div>
                </div>
                
                <div className="p-4 bg-accent/20 rounded-lg border border-accent">
                  <p className="text-sm font-medium text-muted-foreground mb-2">SEO Headline</p>
                  <p className="text-base font-medium italic">"{savedData.headline}"</p>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <p className="text-xs text-muted-foreground">
                    Generated: {new Date(savedData.generatedAt).toLocaleDateString()} at {new Date(savedData.generatedAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}