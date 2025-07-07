import { useState } from "react";
import { BusinessForm } from "@/components/BusinessForm";
import { BusinessDataCard } from "@/components/BusinessDataCard";
import { apiService } from "@/services/api";
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
      const result = await apiService.getBusinessData(data);
      setBusinessInfo(data);
      setBusinessData(result);
      toast({
        title: "Success!",
        description: `Business insights loaded for ${data.name}`,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to load business data";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      console.error("API Error:", error);
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
      const newHeadline = await apiService.regenerateHeadline(
        businessInfo.name,
        businessInfo.location
      );
      setBusinessData(prev => prev ? { ...prev, headline: newHeadline } : null);
      toast({
        title: "Headline Updated!",
        description: "New SEO headline generated successfully.",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to regenerate headline";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      console.error("API Error:", error);
    } finally {
      setIsRegenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background animated-bg">
      {/* Header */}
      <header className="glass border-b border-border/30 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4 float">
              GrowthProAI
            </h1>
            <div className="w-16 h-1 bg-business-gradient mx-auto rounded-full mb-4"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Mini Local Business Dashboard - Analyze your business presence and generate AI-powered SEO content
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {!businessData ? (
            <div className="flex flex-col items-center space-y-12">
              <BusinessForm onSubmit={handleFormSubmit} isLoading={isLoading} />
              
              {/* Feature highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 w-full max-w-4xl">
                <div className="glass p-8 rounded-2xl text-center hover-glow transform hover:-translate-y-2 transition-bounce">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-business-gradient p-4 pulse-glow">
                    <span className="text-white font-bold text-2xl">★</span>
                  </div>
                  <h3 className="font-semibold text-xl mb-3 text-foreground">Google Insights</h3>
                  <p className="text-muted-foreground">Real-time ratings and reviews analysis</p>
                </div>
                <div className="glass p-8 rounded-2xl text-center hover-glow transform hover:-translate-y-2 transition-bounce">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-business-secondary to-business-accent p-4 pulse-glow">
                    <span className="text-white font-bold text-xl">AI</span>
                  </div>
                  <h3 className="font-semibold text-xl mb-3 text-foreground">SEO Headlines</h3>
                  <p className="text-muted-foreground">AI-generated content for better visibility</p>
                </div>
                <div className="glass p-8 rounded-2xl text-center hover-glow transform hover:-translate-y-2 transition-bounce">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-business-info to-business-success p-4 pulse-glow">
                    <span className="text-white font-bold text-xl">📊</span>
                  </div>
                  <h3 className="font-semibold text-xl mb-3 text-foreground">Business Analytics</h3>
                  <p className="text-muted-foreground">Comprehensive performance insights</p>
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
      <footer className="glass border-t border-border/30 mt-20">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2025 GrowthProAI - Empowering local businesses with AI-driven insights
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
