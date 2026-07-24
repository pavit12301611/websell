export interface WebsiteTemplate {
  id: string;
  title: string;
  category: 'SaaS' | 'E-Commerce' | 'AI Startup' | 'Portfolio' | 'Real Estate' | 'Crypto';
  description: string;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  tags: string[];
  defaultConfig: {
    brandName: string;
    headline: string;
    subheadline: string;
    primaryColor: string;
    buttonText: string;
    heroImage: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
  };
  codePackageSummary: {
    filesCount: number;
    languages: string[];
    framework: string;
    size: string;
  };
}

export interface PurchaseOrder {
  id: string;
  templateId: string;
  templateTitle: string;
  amount: number;
  gmail: string;
  purchasedAt: string;
  customConfig: WebsiteTemplate['defaultConfig'];
  downloadUrl: string;
  codeSnippet: string;
}

export interface EmailMessage {
  id: string;
  to: string;
  subject: string;
  body: string;
  codeSnippet: string;
  downloadLink: string;
  timestamp: string;
}
