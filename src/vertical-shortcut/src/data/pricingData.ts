import { PricingTier } from '../types/types-index';

// Pricing tier data for the landing page
export const pricingTiers: PricingTier[] = [
  {
    name: "Blueprint",
    price: "£2,600",
    description: "Perfect for founders ready to take their first step into vertical content creation.",
    buttonText: "Get Blueprint",
    buttonLink: "#pricing-blueprint",
    color: "#3b82f6",
    features: [
      "Founder Strategy Modules",
      "Basic Content Pipeline",
      "Production Checklists",
      "3 Core Monetization Tactics",
      "DIY Implementation Guide"
    ]
  },
  {
    name: "Builder",
    price: "£4,600",
    description: "The complete system for serious founders ready to dominate short-form content.",
    buttonText: "Get Foundations",
    buttonLink: "#pricing-builder",
    popular: true,
    color: "#10b981",
    features: [
      "Everything in Blueprint",
      "Full Team Training Modules",
      "Advanced Content Strategy",
      "Complete Delegation Framework",
      "6 Monetization Channels",
      "3 Months Email Support",
      "Monthly Strategy Calls"
    ]
  },
  {
    name: "The Viral Growth Engine",
    price: "£7,600",
    description: "The ultimate authority-building system with hands-on implementation support.",
    buttonText: "Get Accelerate",
    buttonLink: "#pricing-accelerate",
    color: "#f59e0b",
    features: [
      "Everything in Builder",
      "Done-For-You Implementation",
      "Custom Content Calendar",
      "Advanced PR Strategy",
      "Direct Creator Connections",
      "VIP Slack Access",
      "Weekly Acceleration Calls",
      "6 Months Priority Support"
    ]
  }
];