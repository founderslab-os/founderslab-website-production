import { CeoProfile } from '../types';

export const DEFAULT_CEO_PROFILE: CeoProfile = {
  name: 'Satya Prasad Peddapelli',
  primaryTitle: 'Chief Executive Officer & Co-Founder',
  organizationName: 'FoundersLab',
  location: 'Hyderabad, India',
  photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  badgeText: 'FoundersLab Leadership',
  availabilityStatus: 'Available for Institutional Keynotes & Advisory',

  // Social & Contact
  linkedinUrl: 'https://www.linkedin.com/company/founderslab-india',
  whatsappNumber: '+91 9010207999',
  whatsappMessage: 'Hello Mr. Satya Prasad, I would like to connect regarding FoundersLab campus incubation & entrepreneurship programs.',
  email: 'admin@founderslab.co.in',
  phone: '+91 9010207999',

  // Hero section
  taglineBadge: 'Ecosystem Visionary & Capacity Builder',
  heroHeadline: 'Transforming Campuses into Engines of High-Impact Venture Creation.',
  heroBioParagraph1: 'Satya Prasad Peddapelli is a seasoned entrepreneurship development expert, institutional capacity-building specialist, and digital strategist with more than 16 years of leadership across national institutes, MSME ecosystems, and higher education.',
  heroBioParagraph2: 'Prior to co-founding FoundersLab, he served as a Senior Faculty at the prestigious National Institute of Micro, Small, and Medium Enterprises (ni-msme), under the Ministry of MSME, Government of India. Through FoundersLab, he is executing a mission to turn 100+ Indian university and college campuses into self-sustaining innovation hubs.',

  // 4 quantifiable metrics
  metrics: [
    { id: 'm1', value: '16+', label: 'Years Experience', colorClass: 'text-[#0B2E6B]' },
    { id: 'm2', value: '10,000+', label: 'Founders Mentored', colorClass: 'text-[#F57C00]' },
    { id: 'm3', value: 'ni-msme', label: 'Ex-Senior Faculty', colorClass: 'text-[#1565C0]' },
    { id: 'm4', value: '100+', label: 'Campuses Targeted', colorClass: 'text-emerald-600' }
  ],

  // Executive Story / Detailed Biography
  bioSectionBadge: 'Executive Profile & Journey',
  bioSectionHeading: 'A Decade and a Half Dedicated to Capacity Building & Enterprise',
  bioParagraph1: 'India is experiencing an unprecedented surge in academic excellence and technological literacy; however, the bridge between laboratory research, student ambition, and commercially scalable enterprises has historically remained fragmented. Satya Prasad Peddapelli recognized this systemic gap over 16 years ago.',
  bioParagraph2: 'During his distinguished tenure as Senior Faculty at the National Institute of Micro, Small, and Medium Enterprises (ni-msme), an autonomous apex institution under the Ministry of MSME, Govt. of India, he trained thousands of prospective entrepreneurs, MSME business owners, academic directors, and state ecosystem managers. He designed curriculum modules on digital growth, social commerce, and institutional incubation governance that helped grassroots businesses transition into robust commercial entities.',
  bioParagraph3: 'FoundersLab was founded out of this lived insight: educational institutions should not be mere conduits for campus recruitment—they must be national engines that create wealth, build innovative products, commercialize patent portfolios, and generate high-skilled jobs.',
  mottoHeading: 'FoundersLab Motto Championed by the CEO',
  mottoText: 'BUILD ENTERPRISE • BUILD NATION',

  // Career Highlights Timeline
  careerHighlights: [
    {
      id: 'c1',
      period: '2023 – Present',
      role: 'Chief Executive Officer & Co-Founder',
      organization: 'FoundersLab',
      location: 'Hyderabad, India',
      description: 'Spearheading India\'s dedicated innovation and entrepreneurship ecosystem builder. Architecting institutional transformation frameworks, campus incubators, and the Young Founders Lab across higher education institutions.',
      iconType: 'target'
    },
    {
      id: 'c2',
      period: 'Senior Faculty Tenure',
      role: 'Senior Faculty & Capacity Building Specialist',
      organization: 'National Institute of MSME (ni-msme)',
      location: 'Ministry of MSME, Govt. of India, Hyderabad',
      description: 'Led national entrepreneurship development programs, MSME capacity building, incubation ecosystem strategies, and digital transformation initiatives for aspiring entrepreneurs across India.',
      iconType: 'building'
    },
    {
      id: 'c3',
      period: '16+ Years Track Record',
      role: 'Entrepreneurship & Digital Strategy Advisor',
      organization: 'Academic & MSME Development Ecosystem',
      location: 'Pan-India',
      description: 'Mentored over 10,000+ young innovators, student founders, and small business leaders in market entry, digital strategy, go-to-market architecture, and sustainable venture building.',
      iconType: 'briefcase'
    }
  ],

  // 4 Strategic Pillars
  pillarsBadge: 'Strategic Focus Areas',
  pillarsHeading: 'The CEO\'s 4 Strategic Pillars for Campus Innovation',
  pillarsSubheading: 'How Satya Prasad Peddapelli structures sustainable transformation inside educational institutions.',
  pillars: [
    {
      id: 'p1',
      title: 'Institutional Incubation Architecture',
      description: 'Designing campus incubators from policy formulation to investor readiness, ensuring colleges produce real ventures rather than just academic certificates.',
      iconType: 'graduation'
    },
    {
      id: 'p2',
      title: 'Youth & Aspiring Founder Mentorship',
      description: 'Pioneered programs like the Young Founders Lab (ages 12–25) to inculcate critical problem-solving, commercial acumen, and entrepreneurial resilience early.',
      iconType: 'users'
    },
    {
      id: 'p3',
      title: 'Translating Research into Market Enterprise',
      description: 'Bridging academic intellectual property, student prototypes, and faculty dissertations with commercial viability, angel investors, and enterprise buyers.',
      iconType: 'lightbulb'
    },
    {
      id: 'p4',
      title: 'National MSME & Policy Alignment',
      description: 'Aligning campus innovation with India’s national goals—fostering high-value employment, indigenous manufacturing, and MSME sector competitiveness.',
      iconType: 'award'
    }
  ],

  // Executive Quote
  quoteText: 'We must stop measuring college success purely by placement day statistics. When an institution equips its brightest minds to build enterprises, invent indigenous deeptech, and create employment for thousands, that institution becomes a permanent pillar of nation-building.',
  quoteAuthor: 'Satya Prasad Peddapelli',
  quoteTitle: 'Chief Executive Officer & Co-Founder, FoundersLab',

  // Engagement Section
  engagementBadge: 'Leadership Engagement',
  engagementHeading: 'Engage Satya Prasad Peddapelli for Your Institution',
  engagementDescription: 'Whether you are a College Chairman, Vice Chancellor, Trust Trustee, or Innovation Director looking to establish an incubation policy, audit your campus innovation readiness, or invite the CEO for an institutional keynote address:',
  engagementBullet1: 'Chancellors & Board Advisory',
  engagementBullet2: 'Incubation Policy Blueprints',
  engagementBullet3: 'Keynotes & Summit Addresses'
};
