import { ImpactMetric, Program, ServiceItem, VentureStory, PartnerItem, BlogPost, GalleryItem } from '../types';

export const ALL_IMPACT_METRICS: ImpactMetric[] = [
  { id: 'm1', label: 'Partner Institutions', value: 10, suffix: '+', category: 'institutions', description: 'Prominent Higher Education Institutions transformed into innovation hubs' },
  { id: 'm3', label: 'Students Reached', value: 43000, suffix: '+', category: 'students', description: 'Students engaged through experiential innovation bootcamps' },
  { id: 'm5', label: 'Startup Ideas Registered', value: 2100, suffix: '+', category: 'startups', description: 'Evaluated problem statements and venture proposals' },
  { id: 'm6', label: 'Ideas Pre-Incubated', value: 520, suffix: '+', category: 'startups', description: 'Student & faculty teams undergoing structured prototyping' },
  { id: 'm7', label: 'Working Prototypes', value: 300, suffix: '+', category: 'startups', description: 'Functional hardware, software & biotech Minimum Viable Products' },
  { id: 'm8', label: 'Product-Market Fit Validations', value: 150, suffix: '+', category: 'startups', description: 'Prototypes tested with real enterprise & consumer users' },
  { id: 'm9', label: 'Registered Startups', value: 23, category: 'startups', description: 'Formally incorporated Private Limited ventures' },
  { id: 'm10', label: 'Revenue Generating Startups', value: 14, category: 'startups', description: 'Student & faculty enterprises actively monetization-ready' },
  { id: 'm11', label: 'Startup Mentors', value: 250, category: 'mentors', description: 'Vetted founders and venture builder advisors' },
  { id: 'm12', label: 'Faculty Mentors', value: 190, suffix: '+', category: 'mentors', description: 'Trained academic mentors guiding research-led startups' },
  { id: 'm13', label: 'Industry Mentors', value: 47, category: 'mentors', description: 'Corporate leaders, R&D chiefs & CXOs' },
  { id: 'm14', label: 'Innovation Workshops', value: 180, suffix: '+', category: 'events', description: 'Hands-on design thinking and IP masterclasses' },
  { id: 'm15', label: 'Faculty Development Programs', value: 60, suffix: '+', category: 'events', description: 'Specialized bootcamps empowering professors to become innovation catalysts' },
  { id: 'm16', label: 'Entrepreneurship Development Programs', value: 240, category: 'events', description: 'Intensive venture building modules across campus hubs' },
  { id: 'm17', label: 'Technology Talks', value: 462, category: 'events', description: 'Keynotes by global tech leaders, researchers, and venture capitalists' },
  { id: 'm18', label: 'Think Tank Sessions', value: 16, category: 'events', description: 'High-level roundtables with Vice Chancellors & Ministry Leaders' },
];

export const FLAGSHIP_PROGRAMS: Program[] = [
  {
    id: 'young-founderslab',
    title: 'Young FoundersLab',
    subtitle: 'Nurturing Student Innovators from Classroom to Commercial Venture',
    badge: ' flagship student venture builder ',
    tagline: 'Transforming Student Minds into Nation-Building Entrepreneurs',
    description: 'An end-to-end multi-tier venture building track designed specifically for undergraduate and postgraduate students. Young FoundersLab combines design thinking, customer discovery, rapid prototyping, and seed pitch preparation inside university campuses.',
    impactMetrics: [
      { label: 'Ideas Evaluated', value: '2,100+' },
      { label: 'Prototypes Built', value: '300+' },
      { label: 'Registered Ventures', value: '23' }
    ],
    keyBenefits: [
      'Comprehensive 4-stage ideation to incorporation roadmap',
      'Direct 1-on-1 access to 250+ startup founders & seed investors',
      'Makerspace & rapid prototyping facility setup inside campus',
      'Integration with academic credits & startup policy compliance'
    ],
    targetAudience: [
      'Engineering, Arts & Science Students',
      'Campus Entrepreneurship Cells (E-Cells)',
      'University Incubation Managers'
    ],
    curriculumPhases: [
      { phase: 'Phase 01', title: 'Problem Discovery & Design Thinking', desc: 'Identifying high-impact market pain points and validating problem gravity.' },
      { phase: 'Phase 02', title: 'Rapid Prototyping & MVP Lab', desc: 'Transforming napkin sketches into functional digital or hardware prototypes.' },
      { phase: 'Phase 03', title: 'Product-Market Fit & Beta Launch', desc: 'Deploying pilot solutions with early adopter customers and capturing traction metrics.' },
      { phase: 'Phase 04', title: 'Incorporation & Seed Pitch Day', desc: 'Registering Pvt Ltd entities, filing provisional patents, and pitching to Angel Networks.' }
    ],
    illustrationType: 'student',
    colorGradient: 'from-[#0B2E6B] to-[#1565C0]',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pharmapreneur',
    title: 'FoundersLab PharmaPreneur Program',
    subtitle: 'Commercializing Life Sciences, MedTech & Pharmaceutical Innovations',
    badge: ' specialized bio-pharma accelerator ',
    tagline: 'Pioneering Drug Discovery, MedTech & Healthcare Startups',
    description: "India's premier specialized program bridging pharmaceutical academic research with global healthcare commercialization. Designed to transform patent filings, lab formulations, and clinical insights into high-value spin-off startups.",
    impactMetrics: [
      { label: 'Pharma Ideas', value: '380+' },
      { label: 'Patents Facilitated', value: '45+' },
      { label: 'Bio Ventures', value: '8' }
    ],
    keyBenefits: [
      'Regulatory guidance (CDSCO, FDA pathways, CE marking)',
      'Lab-to-market technology transfer frameworks for faculty & PhD scholars',
      'Connects with top pharma CEOs, clinical trial partners & biotech VC funds',
      'Patent landscaping and bio-incubation infrastructure setup'
    ],
    targetAudience: [
      'Pharmacy & Life Sciences Institutions',
      'PhD Researchers & Faculty Innovators',
      'Biotech & Biomedical Engineering Colleges'
    ],
    curriculumPhases: [
      { phase: 'Phase 01', title: 'Lab Research Monetization Audit', desc: 'Evaluating patents, synthesis formulas, and clinical trial feasibility.' },
      { phase: 'Phase 02', title: 'Regulatory & IP Protection', desc: 'Navigating patent filings, freedom-to-operate checks, and CDSCO compliance.' },
      { phase: 'Phase 03', title: 'Clinical Validation & Pilot Batching', desc: 'Building prototype diagnostics, medical devices, or novel delivery systems.' },
      { phase: 'Phase 04', title: 'Pharma Corporate Licensing & Spin-Off', desc: 'Securing licensing agreements with pharmaceutical conglomerates or VC funding.' }
    ],
    illustrationType: 'pharma',
    colorGradient: 'from-[#1565C0] to-[#0284C7]',
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'industry-readiness',
    title: 'Industry Readiness Program',
    subtitle: 'Aligning Academic Curriculum with Fortune 500 Industry Innovation Demands',
    badge: ' industry-academia bridge ',
    tagline: 'Creating Market-Ready Tech Leaders & Industry-Backed Founders',
    description: 'A transformative immersion program that bridges the gap between traditional academic degrees and high-stakes corporate innovation. Students solve real enterprise challenges provided by industry partners, gaining founder-level problem-solving mastery.',
    impactMetrics: [
      { label: 'Corporate Partners', value: '47' },
      { label: 'Tech Talks', value: '462' },
      { label: 'Industry Mentors', value: '47' }
    ],
    keyBenefits: [
      'Live Industry Hackathons and corporate problem-statement solving',
      'Executive mentoring from CTOs, Product VPs, and Fortune 500 leaders',
      'Direct talent pipeline for corporate R&D labs and startup venture arms',
      'NIRF Innovation Ranking & NAAC Accreditation Score enhancement'
    ],
    targetAudience: [
      'Engineering & Technology Universities',
      'Business Schools & Management Institutes',
      'Corporate CSR & Innovation Directors'
    ],
    curriculumPhases: [
      { phase: 'Phase 01', title: 'Corporate Challenge Mapping', desc: 'Receiving live problem statements directly from CXOs and R&D heads.' },
      { phase: 'Phase 02', title: 'Cross-Functional Sprint Teams', desc: 'Forming multi-disciplinary student pods guided by senior industry mentors.' },
      { phase: 'Phase 03', title: 'Enterprise Prototype Demonstration', desc: 'Building enterprise-grade software/hardware solutions with code audits.' },
      { phase: 'Phase 04', title: 'Venture Spin-out / Corporate Acquisition', desc: 'Transitioning top solutions into corporate-backed ventures or direct hires.' }
    ],
    illustrationType: 'industry',
    colorGradient: 'from-[#0B2E6B] to-[#F57C00]',
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80'
  }
];

export const CORE_SERVICES: ServiceItem[] = [
  {
    id: 's1',
    title: 'Innovation Ecosystem Development',
    shortDesc: 'End-to-end physical & digital campus innovation hub architecture.',
    fullDesc: 'We partner with university boards to establish world-class Innovation Centers, Makerspaces, and E-Cells. We craft institutional policies, mentor networks, and student engagement models tailored for multi-year campus transformation.',
    iconName: 'Building2',
    keyDeliverables: ['Institutional Innovation Policy Setup', 'Makerspace & Prototyping Lab Design', 'Innovation Council Formation'],
    targetOutcome: 'Transforms campus from degree-granting institute to vibrant venture engine.'
  },
  {
    id: 's2',
    title: 'Startup Incubation',
    shortDesc: 'Structured pre-incubation to incubation management for student & faculty startups.',
    fullDesc: 'Comprehensive incubation support providing legal incorporation, accounting, IP protection, co-working space design, seed grant facilitation, and pitch-deck preparation for high-potential student ventures.',
    iconName: 'Rocket',
    keyDeliverables: ['0-to-1 Incubation SOPs', 'Seed Grant Management System', 'Legal & Accounting Desk'],
    targetOutcome: 'Achieves higher startup survival rates & scalable business models.'
  },
  {
    id: 's3',
    title: 'Research Commercialization',
    shortDesc: 'Converting lab patents and academic papers into marketable commercial products.',
    fullDesc: 'Unlocking millions in unmonetized academic research. We audit university IP portfolios, conduct market feasibility studies, and connect professors with venture capital or industry licensing partners.',
    iconName: 'Microscope',
    keyDeliverables: ['IP Audit & Monetization Index', 'Tech Transfer Office (TTO) Setup', 'Industry Licensing Deals'],
    targetOutcome: 'Generates recurring licensing revenue and faculty-led spin-offs.'
  },
  {
    id: 's4',
    title: 'Faculty Development Programs',
    shortDesc: 'Empowering professors to become innovation mentors and research entrepreneurs.',
    fullDesc: 'Specialized 60+ FDP modules equipping faculty with modern venture mentorship skills, patent filing strategies, grant writing, and Faculty-Student joint startup models under National Innovation Policy.',
    iconName: 'GraduationCap',
    keyDeliverables: ['Faculty Innovation Bootcamps', 'Joint Startup Governance Guidelines', 'Research Grant Masterclasses'],
    targetOutcome: 'Creates 190+ active faculty mentors driving campus research.'
  },
  {
    id: 's5',
    title: 'Innovation Consulting',
    shortDesc: 'Strategic advisory for Vice Chancellors, Chairmen & Institutional Trustees.',
    fullDesc: 'Strategic roadmap development for institutional leadership aiming for top NIRF Innovation rankings, NAAC A++ accreditation, ARIIA ratings, and global university partnerships.',
    iconName: 'Compass',
    keyDeliverables: ['NIRF & ARIIA Innovation Roadmap', 'Campus Benchmark Audit', 'Trustee Executive Briefings'],
    targetOutcome: 'Elevates institutional prestige, rankings, and student admissions appeal.'
  },
  {
    id: 's6',
    title: 'Industry Collaboration',
    shortDesc: 'Bridging campus R&D labs with corporate innovation hubs & Fortune 500 CEOs.',
    fullDesc: 'Facilitating MoU agreements, corporate-sponsored research labs, joint hackathons, and corporate accelerator programs with top tech, pharma, and industrial firms.',
    iconName: 'Handshake',
    keyDeliverables: ['Corporate MoU Execution', 'Industry-Sponsored Labs', 'Live Corporate Challenge Hacks'],
    targetOutcome: 'Provides real-world industry problems and corporate R&D funding.'
  },
  {
    id: 's7',
    title: 'Patent Facilitation',
    shortDesc: 'Streamlined IP searching, provisional drafting, and international filing.',
    fullDesc: 'Demystifying the patent process for students and faculty. Rapid novelty searches, patent drafting assistance, and filing coordination with registered patent attorneys.',
    iconName: 'FileCheck2',
    keyDeliverables: ['Prior Art Novelty Search', 'Provisional Patent Drafting', 'PCT International Filing Support'],
    targetOutcome: 'Accelerates campus patent yield and technology defensibility.'
  },
  {
    id: 's8',
    title: 'Investor Connect',
    shortDesc: 'Direct pipeline to Angel Investors, VC funds, and Government Seed Schemes.',
    fullDesc: 'Curated pitch days and demo days connecting validated university ventures with Angel Networks, Seed Funds, Family Offices, and Government Grant Agencies (BIRAC, TIDE 2.0, NIDHI-PRAYAS).',
    iconName: 'TrendingUp',
    keyDeliverables: ['Demo Day Curation', 'Venture Capital Readiness Review', 'Grant Application Assistance'],
    targetOutcome: 'Unlocks seed capital for pre-incubated campus ventures.'
  },
  {
    id: 's9',
    title: 'Startup India Facilitation',
    shortDesc: 'Seamless alignment with DPIIT, Startup India schemes, and government incentives.',
    fullDesc: 'Guiding university incubators and startups through official DPIIT recognition, tax exemption applications, government seed fund schemes, and national innovation awards.',
    iconName: 'Award',
    keyDeliverables: ['DPIIT Recognition Filing', 'Seed Fund Scheme Integration', 'Tax Exemption Advisory'],
    targetOutcome: 'Maximizes government grants and regulatory benefits.'
  },
  {
    id: 's10',
    title: 'Entrepreneurship Development',
    shortDesc: 'Campus-wide EDP bootcamps, hackathons, and founder speaker series.',
    fullDesc: 'High-energy campus engagement programs that spark an entrepreneurial mindset across 50,000+ students through ideathons, founder talks, and hands-on venture simulations.',
    iconName: 'Zap',
    keyDeliverables: ['240+ EDP Bootcamps', 'National Ideathons', 'Tech Talk Keynote Series'],
    targetOutcome: 'Drives mass student participation and culture shift.'
  }
];

export const FEATURED_VENTURES: VentureStory[] = [
  {
    id: 'v1',
    name: 'PharmNano Synthetics',
    institution: 'Leading Pharma University, Hyderabad',
    category: 'Pharma / Health',
    founders: 'Dr. A. Sharma (Faculty) & S. Reddy (PG Scholar)',
    status: 'Revenue Generating',
    revenueOrFunding: '₹1.2 Cr Annual Revenue / Patented Formulation',
    description: 'Developed an innovative nanocarrier delivery system that enhances bioavailability of hydrophobic drugs by 340%.',
    impactHighlights: ['2 Indian Patents Granted', 'CDSCO Phase 1 Clear', 'Licensed to Top Pharma House']
  },
  {
    id: 'v2',
    name: 'AgriSense Robotics',
    institution: 'Engineering Institute of Technology',
    category: 'AgriTech',
    founders: 'K. Varma & P. Nair (Final Year B.Tech)',
    status: 'Seed Funded',
    revenueOrFunding: '₹45 Lakhs Angel Grant / 150+ Farms Deployed',
    description: 'AI-powered autonomous drone swarm for early pest detection and targeted micro-spraying in commercial crops.',
    impactHighlights: ['Reduced Pesticide Usage by 40%', 'Winner of National AgTech Challenge', 'Commercialized in 3 States']
  },
  {
    id: 'v3',
    name: 'BioCleantech Solutions',
    institution: 'State Technological University',
    category: 'CleanTech',
    founders: 'R. Kulkarni (M.Tech) & Team',
    status: 'Revenue Generating',
    revenueOrFunding: '₹85 Lakhs Enterprise Contracts',
    description: 'Enzymatic treatment system converting industrial distillery waste into bio-hydrogen and organic fertilizers.',
    impactHighlights: ['Zero Liquid Discharge Compliant', '5 Industrial Units Installed', 'Pre-Incubated at FoundersLab']
  },
  {
    id: 'v4',
    name: 'MedAI Diagnostics',
    institution: 'Health Sciences & Tech Campus',
    category: 'DeepTech & AI',
    founders: 'S. Mehra & Dr. V. Rao',
    status: 'Patented Prototype',
    revenueOrFunding: '₹30 Lakhs BIRAC Grant',
    description: 'Portable point-of-care optical device for instant screening of diabetic retinopathy using embedded neural networks.',
    impactHighlights: ['98.4% Diagnostic Accuracy', 'Provisional Patent Filed', 'Tested on 5,000+ Patients']
  }
];

export const PARTNERS_LIST: PartnerItem[] = [
  { id: 'p1', name: 'JNTU Hyderabad Network Institutions', category: 'University', location: 'Hyderabad, Telangana', logoText: 'JNTUH Hub' },
  { id: 'p2', name: 'Sultan Ul Uloom Educational Society', category: 'University', location: 'Hyderabad', logoText: 'SUUES' },
  { id: 'p3', name: 'G. Pulla Reddy College of Pharmacy', category: 'University', location: 'Hyderabad', logoText: 'GPRCP' },
  { id: 'p4', name: 'Vignan University & Allied Campuses', category: 'University', location: 'Andhra Pradesh', logoText: 'VIGNAN' },
  { id: 'p5', name: 'Pharma & Biotech Industry Guild', category: 'Corporate & CSR', location: 'National', logoText: 'Pharm Guild' },
  { id: 'p6', name: 'Startup India & DPIIT Ecosystem', category: 'Incubator & Govt', location: 'New Delhi', logoText: 'Startup India' },
  { id: 'p7', name: 'T-Hub & Ecosystem Collaborators', category: 'Incubator & Govt', location: 'Hyderabad', logoText: 'T-Hub Network' },
  { id: 'p8', name: 'Telangana Academy for Skill and Knowledge', category: 'Incubator & Govt', location: 'Telangana', logoText: 'TASK' },
  { id: 'p9', name: 'Angel Investor Consortium India', category: 'Investor Network', location: 'Pan-India', logoText: 'AICI' },
  { id: 'p10', name: 'Global Tech & CSR Foundations', category: 'Corporate & CSR', location: 'Global', logoText: 'CSR Alliance' }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'How Indian Universities Can Build $100M Innovation Ecosystems',
    excerpt: 'A comprehensive roadmap for Vice Chancellors and Chairmen to transition from conventional degree factories into self-sustaining venture powerhouses.',
    content: 'For decades, Indian higher education focused on rote curriculum delivery and placement statistics. Today, the global paradigm has shifted toward research commercialization, patent generation, and student-led enterprises. By adopting a structured campus innovation framework—combining makerspaces, faculty spin-off guidelines, and seed funding pipelines—institutions can multiply their brand value, secure NIRF top ranks, and generate long-term licensing revenue.',
    author: 'FoundersLab Advisory Board',
    role: 'Ecosystem Strategy Team',
    date: 'July 18, 2026',
    readTime: '6 min read',
    category: 'Institutional Transformation',
    imageSeed: 'university',
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'b2',
    title: 'The PharmaPreneur Revolution: Unlocking Academic Bio-Patents in India',
    excerpt: 'Why pharmaceutical and life sciences colleges are sitting on goldmines of unmonetized research, and how lab-to-market acceleration works.',
    content: 'India is known as the pharmacy of the world, yet a vast majority of drug formulation patents generated inside university labs never reach clinical application. The FoundersLab PharmaPreneur framework addresses regulatory compliance, CDSCO pathways, and corporate technology licensing, enabling professors and PhD scholars to build venture-backed pharma spin-offs.',
    author: 'Dr. S. R. Murthy',
    role: 'Head of Bio-Pharma Commercialization',
    date: 'June 29, 2026',
    readTime: '8 min read',
    category: 'PharmaPreneurship',
    imageSeed: 'pharma',
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'b3',
    title: 'Maximizing NIRF Innovation Rankings & NAAC A++ Ratings Through Startup Ecosystems',
    excerpt: 'A strategic guide for Directors on turning E-Cells and Incubators into highest-scoring accreditation drivers.',
    content: 'Accreditation bodies like NAAC and NIRF now allocate substantial weightage to innovation metrics, provisional patent filings, student startups registered, and industry funding. Implementing an active campus startup policy creates an automated data trail that elevates institution rankings while inspiring incoming student cohorts.',
    author: 'FoundersLab Research Wing',
    role: 'Academic Quality Advisory',
    date: 'May 14, 2026',
    readTime: '5 min read',
    category: 'NIRF & NAAC',
    imageSeed: 'ranking',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80'
  }
];

export const WHY_FOUNDERSLAB_COMPARISON = [
  {
    feature: 'Program Scope',
    traditional: '1-Day or 2-Day Motivational Speeches',
    founderslab: 'End-to-End Multi-Year Campus Ecosystem Blueprint'
  },
  {
    feature: 'Outcome Focus',
    traditional: 'Participation Certificates & Attendance Records',
    founderslab: 'Registered Pvt Ltd Startups, Working Prototypes & Revenues'
  },
  {
    feature: 'Faculty Role',
    traditional: 'Passive Workshop Coordinators',
    founderslab: 'Trained Faculty Mentors & Co-Founders of Research Spin-Offs'
  },
  {
    feature: 'IP & Patents',
    traditional: 'Unused Research Papers in Library Archives',
    founderslab: 'Active Patent Filings, FTO Reports & Tech Transfer Licensing'
  },
  {
    feature: 'Industry Access',
    traditional: 'Theoretical Guest Lectures',
    founderslab: 'Live Corporate Hackathons, Fortune 500 Mentors & Seed Funds'
  },
  {
    feature: 'Institutional Impact',
    traditional: 'Temporary Event Buzz',
    founderslab: 'NIRF Top Rank Escalation, NAAC A++ & Brand Distinction'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g_thub',
    title: 'FoundersLab First Anniversary at T-Hub',
    category: 'Events',
    date: 'July 21, 2024',
    campusOrCity: 'Hyderabad',
    description: 'FoundersLab celebrated its first anniversary on July 21, 2024, at the T-Hub facility in Hyderabad. Key Dignitaries: Mr. Jayesh Ranjan I.A.S. (Special Chief Secretary, Government of Telangana), Mr. Jayesh Sanghvi (Managing Partner, EY Hyderabad Office), Mr. Srinivas Rao Mahankali - MSR (CEO of T-Hub).',
    imageUrl: '/T-HUB_GRP.jpeg',
    tags: ['Anniversary', 'T-Hub', 'Hyderabad']
  },
  {
    id: 'g0',
    title: 'FoundersLab Inauguration',
    category: 'Events',
    date: 'July 9, 2023',
    campusOrCity: 'Hyderabad',
    description: 'FoundersLab in Hyderabad was inaugurated by Sri K.T. Rama Rao, the Telangana State IT and Industries Minister, to ignite the spirit of youth entrepreneurship and transform colleges into hubs of startup excellence.',
    imageUrl: '/KTR_GRP_PIC.jpeg',
    tags: ['Inauguration', 'Leadership', 'Hyderabad']
  },
  {
    id: 'g_pes',
    title: 'PES College of Engineering Orientation',
    category: 'Events',
    date: 'September 7, 2026',
    campusOrCity: 'Aurangabad',
    description: 'From Engineering Students to Future Innovators & Entrepreneurs! The last two days at PES College of Engineering have been all about innovation, entrepreneurship, skills and possibilities for students across B.Tech 1st, 2nd, 3rd and 4th years. Sakuntala Kasaragadda (PhD) , Founder & CEO, FoundersLab, led an engaging orientation for the 1st-year B.Tech students, encouraging them to look beyond classrooms and examinations—to identify problems, build skills, explore ideas and create solutions. Together with Director Sathya Peddapally, she spent two days interacting with students across all four years, creating awareness about the opportunities available through the PESCOE Incubation Foundation. [Read More]',
    imageUrl: '/PES_GRP_1.jpeg',
    tags: ['Orientation', 'Students', 'Aurangabad']
  },
  {
    id: 'g1',
    title: 'Smart Campus Hackathon',
    category: 'Hackathons',
    date: 'February 2026',
    campusOrCity: 'Hyderabad Hub',
    description: 'Student developer teams building prototype solutions during the annual 36-hour sprint.',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80'
    ],
    tags: ['Hackathon', 'Coding', 'Teams']
  },
  {
    id: 'g2',
    title: 'Autonomous AgriDrone Testing',
    category: 'Prototypes',
    date: 'January 2026',
    campusOrCity: 'Campus Farm Fields',
    description: 'Field demonstration of student-developed autonomous spraying drone.',
    imageUrl: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=1200&q=80'
    ],
    tags: ['Drone', 'Hardware', 'Field Test']
  },
  {
    id: 'g3',
    title: 'Incubation Centre Makerspace',
    category: 'Campus & Labs',
    date: 'November 2025',
    campusOrCity: 'Central Campus Hub',
    description: 'Student startup workspace equipped with 3D printers and electronics benches.',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80'
    ],
    tags: ['Incubator', 'Makerspace', 'Campus']
  },
  {
    id: 'g4',
    title: 'Startup Pitch & Demo Day',
    category: 'Events',
    date: 'December 2025',
    campusOrCity: 'Convention Auditorium',
    description: 'Student founders presenting prototypes and venture ideas to mentors and investors.',
    imageUrl: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80'
    ],
    tags: ['Demo Day', 'Pitch', 'Students']
  },
  {
    id: 'g5',
    title: 'Nanotech & Bio Formulation Lab',
    category: 'Prototypes',
    date: 'October 2025',
    campusOrCity: 'R&D Laboratory',
    description: 'Student and researcher teams conducting formulation and testing trials.',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    tags: ['Research', 'Lab', 'Testing']
  },
  {
    id: 'g6',
    title: 'Design Thinking Workshop',
    category: 'Workshops',
    date: 'March 2026',
    campusOrCity: 'Design Studio',
    description: 'Collaborative product ideation, user journey mapping, and rapid wireframing session.',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    tags: ['Workshop', 'Design', 'Prototyping']
  },
  {
    id: 'g7',
    title: 'Robotics & Hardware Lab',
    category: 'Prototypes',
    date: 'September 2025',
    campusOrCity: 'Hardware Workshop',
    description: 'Hands-on PCB assembly, soldering, and sensor calibration by engineering teams.',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
    tags: ['Robotics', 'Hardware', 'Electronics']
  },
  {
    id: 'g8',
    title: 'Institutional Excellence Awards',
    category: 'Events',
    date: 'January 2026',
    campusOrCity: 'Auditorium',
    description: 'Recognition ceremony honoring campus innovation leaders and student founders.',
    imageUrl: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=1200&q=80',
    tags: ['Awards', 'Celebration', 'Campus']
  },
  {
    id: 'g9',
    title: 'Women in Tech & Leadership Meet',
    category: 'Events',
    date: 'December 2025',
    campusOrCity: 'Executive Hall',
    description: 'Mentorship roundtables and collaborative discussions for female student entrepreneurs.',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
    tags: ['Leadership', 'Mentorship', 'Community']
  },
  {
    id: 'g11',
    title: 'Intellectual Property & Patent Seminar',
    category: 'Workshops',
    date: 'August 2025',
    campusOrCity: 'Seminar Hall',
    description: 'Faculty and research scholars reviewing provisional filing guidelines and prior-art documentation.',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
    tags: ['Patents', 'Seminar', 'Faculty']
  },
  {
    id: 'g12',
    title: 'Student Venture Grant Distribution',
    category: 'Events',
    date: 'February 2026',
    campusOrCity: 'Campus Hub',
    description: 'Formal cheque and certificate presentation for student prototype grant recipients.',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    tags: ['Grants', 'Students', 'Recognition']
  }
];

