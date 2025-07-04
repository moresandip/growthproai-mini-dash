// Mock API to simulate backend functionality
// This replaces the need for an actual Express backend for the frontend demo

interface BusinessDataRequest {
  name: string;
  location: string;
}

interface BusinessDataResponse {
  rating: number;
  reviews: number;
  headline: string;
}

// Simulated headlines for different business types and locations
const headlineTemplates = [
  "Why {name} is {location}'s Best Kept Secret in 2025",
  "{name}: The Future of Excellence in {location}",
  "Discover Why {name} is Revolutionizing {location}",
  "Local Love: How {name} Became {location}'s Favorite",
  "{name} - Where Quality Meets Community in {location}",
  "The Story Behind {location}'s Most Trusted {name}",
  "From Hidden Gem to {location} Legend: The {name} Journey",
  "Why {name} is Setting New Standards in {location}",
  "{name}: Your {location} Destination for Excellence",
  "Breaking: {name} Transforms the {location} Experience"
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApiService = {
  async getBusinessData(data: BusinessDataRequest): Promise<BusinessDataResponse> {
    // Simulate network delay
    await delay(1500);
    
    // Generate somewhat realistic but varied data
    const rating = Number((3.8 + Math.random() * 1.2).toFixed(1));
    const reviews = Math.floor(50 + Math.random() * 500);
    
    // Pick a random headline template and substitute placeholders
    const template = headlineTemplates[Math.floor(Math.random() * headlineTemplates.length)];
    const headline = template
      .replace(/{name}/g, data.name)
      .replace(/{location}/g, data.location);
    
    return {
      rating,
      reviews,
      headline
    };
  },

  async regenerateHeadline(name: string, location: string): Promise<string> {
    // Simulate shorter delay for regeneration
    await delay(800);
    
    // Pick a different headline template
    const template = headlineTemplates[Math.floor(Math.random() * headlineTemplates.length)];
    return template
      .replace(/{name}/g, name)
      .replace(/{location}/g, location);
  }
};