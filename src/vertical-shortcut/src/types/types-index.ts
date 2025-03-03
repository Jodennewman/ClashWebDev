// Type definitions for the Vertical Shortcut landing page

export interface PricingTier {
  name: string;
  price: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  features: string[];
  popular?: boolean;
  color: string;
}

export interface Module {
  category: string;
  title: string;
  description: string;
  icon: string;
}