// API service to replace mock API with real backend calls

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

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

  async getBusinessData(data: BusinessDataRequest): Promise<BusinessDataResponse> {
    return this.makeRequest<BusinessDataResponse>('/business-data', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async regenerateHeadline(name: string, location: string): Promise<string> {
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