import { useState } from "react";
import { BusinessForm } from "@/components/BusinessForm";
import { BusinessDataCard } from "@/components/BusinessDataCard";
import { mockApiService } from "@/utils/mockApi";
import { useToast } from "@/hooks/use-toast";

interface BusinessData {
  rating: number;
  reviews: number;
  headline: string;
}

interface BusinessInfo {
  name: string;
  location: string;
}

const Index = () => {
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo | null>(null);
  const [businessData, setBusinessData] = useState<BusinessData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const { toast } = useToast();

  const handleFormSubmit = async (data: BusinessInfo) => {
    setIsLoading(true);
    try {
      const result = await mockApiService.getBusinessData(data);
      setBusinessInfo(data);
      setBusinessData(result);
      toast({
        title: "Success!",
        description: `Business insights loaded for ${data.name}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load business data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToDashboard = () => {
    setBusinessInfo(null);
    setBusinessData(null);
  };

  const handleUpdateData = (updatedData: Partial<BusinessData>) => {
    setBusinessData(prev => prev ? { ...prev, ...updatedData } : null);
  };

  const handleRegenerateHeadline = async () => {
    if (!businessInfo) return;
    
    setIsRegenerating(true);
    try {
      const newHeadline = await mockApiService.regenerateHeadline(
        businessInfo.name,
        businessInfo.location
      );
      setBusinessData(prev => prev ? { ...prev, headline: newHeadline } : null);
      toast({
        title: "Headline Updated!",
        description: "New SEO headline generated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to regenerate headline. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRegenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold bg-business-gradient bg-clip-text text-transparent mb-2">
              GrowthProAI
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Mini Local Business Dashboard - Analyze your business presence and generate AI-powered SEO content
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {!businessData ? (
            <div className="flex flex-col items-center space-y-6">
              <BusinessForm onSubmit={handleFormSubmit} isLoading={isLoading} />
              
              {/* Feature highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 w-full max-w-3xl">
                <div className="text-center p-4">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-business-primary/20 flex items-center justify-center">
                    <span className="text-business-primary font-bold">★</span>
                  </div>
                  <h3 className="font-semibold mb-1">Google Insights</h3>
                  <p className="text-sm text-muted-foreground">Real-time ratings and reviews analysis</p>
                </div>
                <div className="text-center p-4">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-business-success/20 flex items-center justify-center">
                    <span className="text-business-success font-bold">AI</span>
                  </div>
                  <h3 className="font-semibold mb-1">SEO Headlines</h3>
                  <p className="text-sm text-muted-foreground">AI-generated content for better visibility</p>
                </div>
                <div className="text-center p-4">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-business-secondary/60 flex items-center justify-center">
                    <span className="text-business-primary font-bold">📊</span>
                  </div>
                  <h3 className="font-semibold mb-1">Business Analytics</h3>
                  <p className="text-sm text-muted-foreground">Comprehensive performance insights</p>
                </div>
              </div>
            </div>
          ) : (
            <BusinessDataCard
              businessName={businessInfo!.name}
              location={businessInfo!.location}
              data={businessData}
              onRegenerateHeadline={handleRegenerateHeadline}
              onUpdateData={handleUpdateData}
              onBackToDashboard={handleBackToDashboard}
              isRegenerating={isRegenerating}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>© 2025 GrowthProAI - Empowering local businesses with AI-driven insights</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
