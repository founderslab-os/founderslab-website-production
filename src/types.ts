export interface ImpactMetric {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  category: 'institutions' | 'students' | 'startups' | 'mentors' | 'events';
  description?: string;
}

export interface Program {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  tagline: string;
  description: string;
  impactMetrics: { label: string; value: string }[];
  keyBenefits: string[];
  targetAudience: string[];
  curriculumPhases: { phase: string; title: string; desc: string }[];
  illustrationType: 'student' | 'pharma' | 'industry';
  colorGradient: string;
  imageUrl?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  keyDeliverables: string[];
  targetOutcome: string;
}

export interface VentureStory {
  id: string;
  name: string;
  institution: string;
  category: 'Pharma / Health' | 'DeepTech & AI' | 'AgriTech' | 'CleanTech' | 'EdTech';
  founders: string;
  status: 'Revenue Generating' | 'Patented Prototype' | 'Pre-Incubated' | 'Seed Funded';
  revenueOrFunding?: string;
  description: string;
  impactHighlights: string[];
  imageUrl?: string;
}

export interface PartnerItem {
  id: string;
  name: string;
  category: 'University' | 'Corporate & CSR' | 'Incubator & Govt' | 'Investor Network';
  location?: string;
  logoText: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  role: string;
  date: string;
  readTime: string;
  category: 'Institutional Transformation' | 'Research Commercialization' | 'PharmaPreneurship' | 'NIRF & NAAC';
  imageSeed: string;
  imageUrl?: string;
}

export interface ReadinessScoreResult {
  score: number;
  tier: 'Emerging Innovator' | 'Progressive Campus' | 'National Innovation Hub' | 'Global Research Incubator';
  summary: string;
  strengths: string[];
  recommendedPrograms: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  date?: string;
  campusOrCity?: string;
  description?: string;
  imageUrl: string;
  images?: string[];
  highlightBadge?: string;
  keyOutcome?: string;
  participantsCount?: string;
  tags?: string[];
}

export interface CeoCareerHighlight {
  id: string;
  period: string;
  role: string;
  organization: string;
  location: string;
  description: string;
  iconType?: 'target' | 'building' | 'briefcase' | 'award' | 'graduation';
}

export interface CeoLeadershipPillar {
  id: string;
  title: string;
  description: string;
  iconType?: 'graduation' | 'users' | 'lightbulb' | 'award' | 'target' | 'compass';
}

export interface CeoStatMetric {
  id: string;
  value: string;
  label: string;
  colorClass?: string;
}

export interface CeoProfile {
  name: string;
  primaryTitle: string;
  organizationName: string;
  location: string;
  photoUrl: string;
  badgeText: string;
  availabilityStatus: string;
  
  // Social & contact links
  linkedinUrl: string;
  whatsappNumber: string;
  whatsappMessage: string;
  email: string;
  phone: string;
  
  // Hero intro
  taglineBadge: string;
  heroHeadline: string;
  heroBioParagraph1: string;
  heroBioParagraph2: string;
  
  // 4 metrics
  metrics: CeoStatMetric[];
  
  // Main detailed biography
  bioSectionBadge: string;
  bioSectionHeading: string;
  bioParagraph1: string;
  bioParagraph2: string;
  bioParagraph3: string;
  mottoHeading: string;
  mottoText: string;
  
  // Career milestones
  careerHighlights: CeoCareerHighlight[];
  
  // 4 Strategic Pillars
  pillarsBadge: string;
  pillarsHeading: string;
  pillarsSubheading: string;
  pillars: CeoLeadershipPillar[];
  
  // Executive quote
  quoteText: string;
  quoteAuthor: string;
  quoteTitle: string;
  
  // Engagement
  engagementBadge: string;
  engagementHeading: string;
  engagementDescription: string;
  engagementBullet1: string;
  engagementBullet2: string;
  engagementBullet3: string;
}

