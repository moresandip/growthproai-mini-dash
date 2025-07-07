// API service to replace mock API with real backend calls

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const USE_MOCK = !import.meta.env.VITE_API_URL && window.location.hostname !== 'localhost';

interface BusinessDataRequest {
  name: string;
  location: string;
}

interface BusinessDataResponse {
  rating: number;
  reviews: number;
  headline: string;
  timestamp?: string;
}

interface HeadlineResponse {
  headline: string;
  timestamp?: string;
}

class ApiService {
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || 
        `HTTP ${response.status}: ${response.statusText}`
      );
    }

    return response.json();
  }

  // Mock data for fallback
  private async mockDelay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private generateMockHeadline(name: string, location: string): string {
    const templates = [
      "Why {name} is {location}'s Best Kept Secret in 2025",
      "{name}: The Future of Excellence in {location}",
      "Discover Why {name} is Revolutionizing {location}",
      "Local Love: How {name} Became {location}'s Favorite",
      "{name} - Where Quality Meets Community in {location}",
    ];
    const template = templates[Math.floor(Math.random() * templates.length)];
    return template.replace(/{name}/g, name).replace(/{location}/g, location);
  }

  async getBusinessData(data: BusinessDataRequest): Promise<BusinessDataResponse> {
    // Use mock data if backend is not available (for deployment preview)
    if (USE_MOCK) {
      await this.mockDelay(1500);
      return {
        rating: Number((3.8 + Math.random() * 1.2).toFixed(1)),
        reviews: Math.floor(50 + Math.random() * 500),
        headline: this.generateMockHeadline(data.name, data.location),
      };
    }

    return this.makeRequest<BusinessDataResponse>('/business-data', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async regenerateHeadline(name: string, location: string): Promise<string> {
    // Use mock data if backend is not available (for deployment preview)
    if (USE_MOCK) {
      await this.mockDelay(800);
      return this.generateMockHeadline(name, location);
    }

    const params = new URLSearchParams({
      name: name.trim(),
      location: location.trim(),
    });

    const response = await this.makeRequest<HeadlineResponse>(
      `/regenerate-headline?${params}`
    );
    
    return response.headline;
  }

  // Health check method for deployment verification
  async healthCheck(): Promise<{ status: string; message: string }> {
    const url = `${API_BASE_URL.replace('/api', '')}/health`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Backend health check failed');
    }
    
    return response.json();
  }
}

export const apiService = new ApiService();