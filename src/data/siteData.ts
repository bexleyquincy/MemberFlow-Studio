import founderStoryImg from '../assets/images/founder_story_speaking_1794571670334.jpg';
import classroomDesignHubImg from '../assets/images/classroom_design_hub_1794571671497.jpg';
import landingRealEstateImg from '../assets/images/landing_realestate_community_1794571671436.jpg';
import landingApparelImg from '../assets/images/landing_apparel_community_1794571672541.jpg';
import whyChooseGrowthImg from '../assets/images/why_choose_growth_3d_1794571672462.jpg';
import servicesOnboardingImg from '../assets/images/services_onboarding_ui_1794571674072.jpg';
import avatarSarahImg from '../assets/images/avatar_sarah_mitchell_1794571673583.jpg';
import avatarDavidImg from '../assets/images/avatar_david_harrison_1794571674316.jpg';
import avatarJessicaImg from '../assets/images/avatar_jessica_brown_1794571675652.jpg';

export const GLAM_CRAFTER_CLASSROOM_URL =
  'https://i.ibb.co/twQ11fFX/The-Glam-Crafter-Empire-Classroom.png';
export const DY_SALSA_CLASSROOM_URL =
  'https://i.ibb.co/Q3f07sKw/DY-Salsa-Dance-Academy-Classroom.png';
export const DY_SALSA_LANDING_URL =
  'https://i.ibb.co/pBkd0cCS/DY-Salsa-Dance-Academy-Landing-Page.png';

export const HOME_HERO_DEFAULT_IMAGE =
  '/assets/aistudio/MemberFlow_Studio_Community_Growth_Landing_Page_650bab7d.png';
export const SERVICES_HERO_DEFAULT_IMAGE =
  '/assets/aistudio/MemberFlow_Studio_Services_Showcase_353900ae.png';
export const PORTFOLIO_HERO_DEFAULT_IMAGE =
  '/assets/aistudio/MemberFlow_Studio_Portfolio_Showcase_3b2ddf1e.png';
export const FOUNDER_HERO_IMAGE =
  '/assets/aistudio/Skool_Community_Growth_Dashboard_1f90cb40.png';
export const FOUNDER_STORY_IMAGE = founderStoryImg;
export const CLASSROOM_DESIGN_HUB_IMAGE = classroomDesignHubImg;
export const LANDING_REAL_ESTATE_IMAGE = landingRealEstateImg;
export const LANDING_APPAREL_IMAGE = landingApparelImg;
export const WHY_CHOOSE_GROWTH_IMAGE = whyChooseGrowthImg;
export const SERVICES_ONBOARDING_IMAGE = servicesOnboardingImg;

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  externalUrl?: string;
  highlight?: string;
  services?: string;
  overview?: string;
  details?: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  deliverables: string[];
  iconName: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  quote: string;
  rating: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ServiceShowcaseBlock {
  tag: string;
  title: string;
  description: string;
  bullets: string[];
  ctaText: string;
  imageUrl: string;
}

export interface SiteConfig {
  brandName: string;
  brandSubtext: string;
  founderName: string;
  founderTitle: string;
  founderBio: string;
  founderStory: string;
  tagline: string;
  positioning: string;
  contactEmail: string;
  founderHeroImage: string;
  founderStoryImage: string;
  founderVideoUrl: string;
  seo: {
    title: string;
    description: string;
  };
  theme: {
    accentColor: string;
    showAmbientGlow: boolean;
  };
  sectionVisibility: {
    showPlatformsStrip: boolean;
    showHomeServices: boolean;
    showHomePortfolio: boolean;
    showWhyChooseUs: boolean;
    showTestimonials: boolean;
    showFaq: boolean;
    showCaseStudy: boolean;
    showFounderPhilosophy: boolean;
    showFounderSkills: boolean;
    showFounderProcess: boolean;
  };
  navigation: {
    homeLabel: string;
    servicesLabel: string;
    portfolioLabel: string;
    aboutLabel: string;
    faqLabel: string;
    ctaLabel: string;
  };
  footer: {
    description: string;
    specialtyPrimary: string;
    specialtySecondary: string;
    copyrightText: string;
    foundedByText: string;
  };
  socials: {
    linkedin: string;
    instagram: string;
    youtube: string;
    x: string;
    facebook: string;
  };
  metrics: {
    membersSupported: string;
    membersLabel: string;
    clientSatisfaction: string;
    satisfactionLabel: string;
    growthStrategies: string;
    growthLabel: string;
    majorProjects: string;
    majorProjectsLabel: string;
  };
  homePage: {
    heroEyebrow: string;
    heroHeadlineLine1: string;
    heroHeadlineLine2: string;
    heroHighlightWord: string;
    heroSubtitle: string;
    heroPrimaryCta: string;
    heroSecondaryCta: string;
    heroImage: string;
    heroBadgeTopTitle: string;
    heroBadgeTopSubtitle: string;
    heroBadgeMidTitle: string;
    heroBadgeMidSubtitle: string;
    heroScriptText: string;
    platformsHeading: string;
    platformsList: string[];
    servicesEyebrow: string;
    servicesHeading: string;
    servicesSubtitle: string;
    servicesCtaText: string;
    portfolioEyebrow: string;
    portfolioHeading: string;
    portfolioHighlight: string;
    portfolioSubtitle: string;
    portfolioCtaText: string;
    whyEyebrow: string;
    whyHeading: string;
    whySubtitle: string;
    whyCtaText: string;
    whyGrowthImage: string;
    whyEngineTitle: string;
    whyEngineDescription: string;
    whyStat1Label: string;
    whyStat1Value: string;
    whyStat2Label: string;
    whyStat2Value: string;
    whyCards: Array<{ title: string; description: string }>;
    testimonialsEyebrow: string;
    testimonialsHeading: string;
    testimonialsHighlight: string;
    testimonialsSubtitle: string;
    faqEyebrow: string;
    faqHeading: string;
    faqSubtitle: string;
    ctaBadge: string;
    ctaHeading: string;
    ctaSubtitle: string;
    ctaButtonText: string;
  };
  servicesPage: {
    heroEyebrow: string;
    heroHeadlineLine1: string;
    heroHeadlineLine2: string;
    heroHighlightWord: string;
    heroSubtitle: string;
    heroPrimaryCta: string;
    heroSecondaryCta: string;
    heroImage: string;
    heroIndicators: Array<{ title: string; subtitle: string }>;
    coreEyebrow: string;
    coreHeading: string;
    coreSubtitle: string;
    detailsEyebrow: string;
    detailsHeading: string;
    detailsHighlight: string;
    detailsSubtitle: string;
    blocks: ServiceShowcaseBlock[];
    processEyebrow: string;
    processHeading: string;
    processSubtitle: string;
    processImage: string;
    processSteps: Array<{ title: string; description: string }>;
    ctaHeading: string;
    ctaSubtitle: string;
    ctaButtonText: string;
  };
  portfolioPage: {
    heroEyebrow: string;
    heroHeadlineLine1: string;
    heroHighlightWord: string;
    heroSubtitle: string;
    heroPrimaryCta: string;
    heroSecondaryCta: string;
    heroImage: string;
    heroBadge1: string;
    heroBadge2: string;
    classroomsEyebrow: string;
    classroomsHeading: string;
    classroomsSubtitle: string;
    landingsEyebrow: string;
    landingsHeading: string;
    landingsSubtitle: string;
    caseStudyEyebrow: string;
    caseStudyHeading: string;
    caseStudyCtaText: string;
    caseStudyBullets: string[];
    metric3Value: string;
    metric3Label: string;
    metric4Value: string;
    metric4Label: string;
    ctaHeading: string;
    ctaSubtitle: string;
    ctaButtonText: string;
  };
  aboutPage: {
    heroEyebrow: string;
    heroHeadlineLine1: string;
    heroHeadlineLine2: string;
    heroHighlightWord: string;
    heroPrimaryCta: string;
    heroSecondaryCta: string;
    heroQuoteText: string;
    heroGreetingPrefix: string;
    heroRoleCallout: string;
    storyEyebrow: string;
    storyHeading: string;
    storyImageBadgeRole: string;
    storyCtaText: string;
    storyPillars: string[];
    philosophyEyebrow: string;
    philosophyHeading: string;
    philosophyHighlight: string;
    philosophySubtitle: string;
    philosophyCards: Array<{ title: string; description: string }>;
    skillsEyebrow: string;
    skillsHeading: string;
    skillsDescription: string;
    skillsImage: string;
    skillsCtaText: string;
    skillsList: string[];
    processEyebrow: string;
    processHeading: string;
    processHighlight: string;
    processSubtitle: string;
    processSteps: Array<{ title: string; description: string }>;
    ctaHeading: string;
    ctaSubtitle: string;
    ctaButtonText: string;
  };
}

export const INITIAL_SITE_CONFIG: SiteConfig = {
  brandName: 'MemberFlow',
  brandSubtext: 'STUDIO',
  founderName: 'Testimony Samuel',
  founderTitle: 'Founder & Community Systems Specialist',
  founderBio:
    'I help Skool community owners build, organize and grow thriving communities through strategic setup, better member experiences and ongoing support.',
  founderStory: `My journey started with a deep interest in online communities and a desire to help people connect, learn and grow.

Today, through MemberFlow Studio, I focus on helping community owners create better-organized Skool experiences, improve their classroom structures and make their communities easier and more enjoyable for members to navigate.

I believe a successful community is about more than simply having a platform. It's about creating an environment where people understand where to start, know what to do next and feel encouraged to participate.`,
  tagline: 'Better Systems. Stronger Communities.',
  positioning: 'Skool Community Setup, Management, Member Experience and Growth',
  contactEmail: 'femizydasilver@gmail.com',
  founderHeroImage: FOUNDER_HERO_IMAGE,
  founderStoryImage: FOUNDER_STORY_IMAGE,
  founderVideoUrl: '',
  seo: {
    title: 'MemberFlow Studio — Skool Community Setup, Management & Growth',
    description:
      'MemberFlow Studio helps Skool community owners build, organize, manage and grow thriving online communities through expert setup, structured classrooms, and strategic growth.'
  },
  theme: {
    accentColor: '#2563EB',
    showAmbientGlow: true
  },
  sectionVisibility: {
    showPlatformsStrip: true,
    showHomeServices: true,
    showHomePortfolio: true,
    showWhyChooseUs: true,
    showTestimonials: true,
    showFaq: true,
    showCaseStudy: true,
    showFounderPhilosophy: true,
    showFounderSkills: true,
    showFounderProcess: true
  },
  navigation: {
    homeLabel: 'Home',
    servicesLabel: 'Services',
    portfolioLabel: 'Portfolio',
    aboutLabel: 'About',
    faqLabel: 'FAQ',
    ctaLabel: 'Get in Touch'
  },
  footer: {
    description:
      'We empower Skool community hosts to build, organize, manage, and scale thriving digital ecosystems.',
    specialtyPrimary: 'Primary Specialty: Skool Communities',
    specialtySecondary: 'Also supporting: Circle, Kajabi, Mighty Networks',
    copyrightText: 'MemberFlow Studio. All rights reserved.',
    foundedByText: 'Founded by Testimony Samuel'
  },
  socials: {
    linkedin: 'https://linkedin.com/in/testimony-samuel',
    instagram: 'https://instagram.com/memberflowstudio',
    youtube: 'https://youtube.com/@memberflowstudio',
    x: 'https://x.com/memberflowstudio',
    facebook: 'https://facebook.com/memberflowstudio'
  },
  metrics: {
    membersSupported: '500+',
    membersLabel: 'Community Members Supported',
    clientSatisfaction: '100%',
    satisfactionLabel: 'Client Satisfaction',
    growthStrategies: 'Real Strategies',
    growthLabel: 'Growth Strategies',
    majorProjects: '4+',
    majorProjectsLabel: 'Major Projects Delivered'
  },
  homePage: {
    heroEyebrow: 'Skool Community Experts',
    heroHeadlineLine1: 'Better Systems.',
    heroHeadlineLine2: 'Stronger',
    heroHighlightWord: 'Communities.',
    heroSubtitle:
      'We help Skool community owners build, organize, manage and grow thriving communities through expert setup, engaging classrooms and strategic growth.',
    heroPrimaryCta: 'Explore Our Services',
    heroSecondaryCta: 'Watch Our Work',
    heroImage: HOME_HERO_DEFAULT_IMAGE,
    heroBadgeTopTitle: 'Grow Your',
    heroBadgeTopSubtitle: 'Community',
    heroBadgeMidTitle: 'Engage',
    heroBadgeMidSubtitle: 'More Members',
    heroScriptText: 'Build. Grow. Thrive.',
    platformsHeading: 'Trusted by Community Owners Across Industries:',
    platformsList: ['Skool', 'Wix', 'Squarespace', 'Circle.so', 'Mighty Networks', 'Kajabi'],
    servicesEyebrow: 'Our Services',
    servicesHeading: 'End-to-End Skool Community Solutions',
    servicesSubtitle:
      'From setup to growth, we provide everything you need to create a powerful, engaging and profitable community.',
    servicesCtaText: 'View All Services',
    portfolioEyebrow: 'Our Portfolio',
    portfolioHeading: 'See Our Work',
    portfolioHighlight: 'in Action',
    portfolioSubtitle:
      "Explore real examples of Skool classrooms and stunning landing pages we've created.",
    portfolioCtaText: 'View Full Portfolio',
    whyEyebrow: 'Why Choose Us',
    whyHeading: 'Your Success is Our Priority',
    whySubtitle:
      'We go beyond setup. We partner with you to build a community that lasts and grows.',
    whyCtaText: "Let's Build Together",
    whyGrowthImage: WHY_CHOOSE_GROWTH_IMAGE,
    whyEngineTitle: 'Community Growth Engine',
    whyEngineDescription:
      'Transform passive spectators into engaged members with systematic gamification and structured learning paths.',
    whyStat1Label: 'Member Retention',
    whyStat1Value: 'High Engagement',
    whyStat2Label: 'Course Completion',
    whyStat2Value: 'Structured Paths',
    whyCards: [
      {
        title: 'Expertise',
        description: 'Focused knowledge of community systems and growth.'
      },
      {
        title: 'Tailored Solutions',
        description: "Strategies customized for your community's exact goals."
      },
      {
        title: 'Dedicated Support',
        description: 'Real people, real support whenever you need assistance.'
      },
      {
        title: 'Proven Results',
        description: 'Turn your community into an engaging, profitable business.'
      }
    ],
    testimonialsEyebrow: 'What Our Clients Say',
    testimonialsHeading: 'Real Results.',
    testimonialsHighlight: 'Happy Clients.',
    testimonialsSubtitle:
      'Hear from hosts who transformed their Skool communities with MemberFlow Studio.',
    faqEyebrow: 'Answers & Clarifications',
    faqHeading: 'Frequently Asked Questions',
    faqSubtitle: 'Everything you need to know about partnering with MemberFlow Studio.',
    ctaBadge: 'Ready to Level Up?',
    ctaHeading: 'Ready to Level Up Your Skool Community?',
    ctaSubtitle:
      "Let's turn your community into a thriving, engaging and profitable space.",
    ctaButtonText: 'Contact Us Today'
  },
  servicesPage: {
    heroEyebrow: 'Our Services',
    heroHeadlineLine1: 'Complete Skool',
    heroHeadlineLine2: 'Community',
    heroHighlightWord: 'Solutions',
    heroSubtitle:
      'From setup to growth, we provide the expertise and support you need to build, manage and scale thriving online communities.',
    heroPrimaryCta: 'Explore Our Services',
    heroSecondaryCta: 'Watch How It Works',
    heroImage: SERVICES_HERO_DEFAULT_IMAGE,
    heroIndicators: [
      { title: 'Expert Support', subtitle: 'Every Step of the Way' },
      { title: 'Proven Strategies', subtitle: 'for Real Growth' },
      { title: 'Trusted by', subtitle: 'Community Owners' }
    ],
    coreEyebrow: 'What We Offer',
    coreHeading: 'Our Core Services',
    coreSubtitle: 'Everything you need to build, manage and grow a successful Skool community.',
    detailsEyebrow: 'Service Details',
    detailsHeading: 'In-Depth Services',
    detailsHighlight: 'for Maximum Impact',
    detailsSubtitle: "Get expert solutions tailored to your community's unique needs.",
    blocks: [
      {
        tag: 'Block A — Foundation',
        title: 'Skool Community Setup & Classroom Architecture',
        description:
          'From initial group settings and permissions to full curriculum layout, we construct an intuitive learning space that keeps students engaged and prevents drop-off.',
        bullets: [
          'Custom thumbnail graphics and unified color styling',
          'Sequential course progression and resource attachments',
          'Clear category guidelines that eliminate discussion clutter'
        ],
        ctaText: 'Build My Classroom',
        imageUrl: DY_SALSA_CLASSROOM_URL
      },
      {
        tag: 'Block B — Retention',
        title: 'Member Onboarding & Active Engagement Systems',
        description:
          'First impressions dictate whether members stay for months or vanish in days. We craft welcome checklists, automated introductions, and community gamification.',
        bullets: [
          '3-step "Start Here" orientation flow for quick wins',
          'Weekly prompts, member spotlights, and win-sharing routines',
          'Leaderboard rewards and level unlock strategies'
        ],
        ctaText: 'Improve Engagement',
        imageUrl: SERVICES_ONBOARDING_IMAGE
      },
      {
        tag: 'Block C — Scaling',
        title: 'Community Management, Social Media & Growth',
        description:
          'Free up your time as a founder. We handle moderation, daily community operations, announcement broadcasting, and strategic social funnel generation.',
        bullets: [
          'Daily queue moderation and spam suppression',
          'Organic social-to-Skool lead funnel architecture',
          'Dedicated routine operational reports and metrics'
        ],
        ctaText: 'Scale My Community',
        imageUrl: GLAM_CRAFTER_CLASSROOM_URL
      }
    ],
    processEyebrow: 'Our Process',
    processHeading: 'How It Works',
    processSubtitle: 'Getting started is simple. Just follow these easy steps:',
    processImage: WHY_CHOOSE_GROWTH_IMAGE,
    processSteps: [
      {
        title: 'Share Your Goals',
        description:
          'Tell us about your community, audience, current bottlenecks, and what you want to achieve with your Skool group.'
      },
      {
        title: 'Get a Strategy',
        description:
          'Receive a custom action plan tailored to your community needs, covering classroom architecture, onboarding, and growth.'
      },
      {
        title: 'See the Results',
        description:
          'We implement and organize everything. Watch your members navigate seamlessly, engage actively, and grow sustainably.'
      }
    ],
    ctaHeading: 'Ready to Transform Your Skool Community?',
    ctaSubtitle: "Let's build, grow and manage your community together.",
    ctaButtonText: 'Contact Us Today'
  },
  portfolioPage: {
    heroEyebrow: 'Our Portfolio',
    heroHeadlineLine1: 'See Our Work',
    heroHighlightWord: 'in Action',
    heroSubtitle:
      "Explore real examples of Skool classrooms and community landing pages we've designed, organized and optimized for growth.",
    heroPrimaryCta: 'Discuss Your Project',
    heroSecondaryCta: 'Watch Our Work',
    heroImage: PORTFOLIO_HERO_DEFAULT_IMAGE,
    heroBadge1: 'Premium Designs',
    heroBadge2: 'Real Results',
    classroomsEyebrow: 'Skool Classroom Designs',
    classroomsHeading: 'Professional Classroom Setups',
    classroomsSubtitle:
      'Organized, beautiful and engaging classrooms that keep your members focused and coming back.',
    landingsEyebrow: 'Community Landing Pages',
    landingsHeading: 'High-Converting Landing Pages',
    landingsSubtitle:
      'Stunning, conversion-focused landing pages that attract the right audience and turn visitors into active members.',
    caseStudyEyebrow: 'Featured Case Study',
    caseStudyHeading: 'From Vision to a Thriving Community',
    caseStudyCtaText: 'View Case Study Details',
    caseStudyBullets: [
      'Complete Skool Setup',
      'Organized Classrooms & Custom Thumbnails',
      'Engaging Member Experience & 3-Step Onboarding',
      'Growth-Focused Design & Funnels'
    ],
    metric3Value: 'Creative',
    metric3Label: 'Tailored Solutions',
    metric4Value: 'Growth Driven',
    metric4Label: 'Retention Focused',
    ctaHeading: 'Ready to Get Similar Results?',
    ctaSubtitle: "Let's create a stunning community experience for you.",
    ctaButtonText: 'Contact Us Today'
  },
  aboutPage: {
    heroEyebrow: 'About MemberFlow Studio',
    heroHeadlineLine1: 'Building Communities',
    heroHeadlineLine2: 'That',
    heroHighlightWord: 'Grow.',
    heroPrimaryCta: "Let's Work Together",
    heroSecondaryCta: 'Watch My Story',
    heroQuoteText:
      'A platform without structure is noise; with deliberate systems, it becomes transformational.',
    heroGreetingPrefix: "Hi, I'm",
    heroRoleCallout: 'Founder & Community Architect',
    storyEyebrow: 'My Story',
    storyHeading: 'From Passion to Purpose',
    storyImageBadgeRole: 'Skool Community Specialist',
    storyCtaText: 'Explore What I Do',
    storyPillars: [
      'Community Growth Expert',
      'Skool Setup & Management',
      'Member Experience Specialist',
      'Digital Growth Strategist'
    ],
    philosophyEyebrow: 'My Philosophy',
    philosophyHeading: 'Better Communities.',
    philosophyHighlight: 'Greater Impact.',
    philosophySubtitle:
      'I believe online communities can transform lives, build real connections and create lasting value when they are well structured, thoughtfully managed and designed around their members.',
    philosophyCards: [
      {
        title: 'Quality Over Quantity',
        description:
          'Focus on creating meaningful member experiences rather than simply chasing raw follower numbers.'
      },
      {
        title: 'Members First',
        description:
          'Make it effortless for members to find content, participate in discussions, and feel heard.'
      },
      {
        title: 'Continuous Improvement',
        description:
          'Consistently test engagement strategies, refine module pathways, and improve retention loops.'
      },
      {
        title: 'Long-Term Partnership',
        description:
          'Build relationships centered around reliable support, transparent advice, and shared success.'
      }
    ],
    skillsEyebrow: 'My Expertise',
    skillsHeading: 'Skills & Capabilities',
    skillsDescription:
      'With a practical, community-focused approach, I bring together the skills needed to create organized, engaging and growth-ready community experiences.',
    skillsImage: CLASSROOM_DESIGN_HUB_IMAGE,
    skillsCtaText: 'Explore My Services',
    skillsList: [
      '01. Skool Community Setup',
      '02. Classroom & Course Management',
      '03. Member Onboarding Architecture',
      '04. Engagement & Experience Improvement',
      '05. Social Media Management',
      '06. Community Growth Strategy'
    ],
    processEyebrow: 'My Process',
    processHeading: 'A Simple Process.',
    processHighlight: 'Real Results.',
    processSubtitle:
      'I follow a clear and proven process to deliver exceptional community experiences.',
    processSteps: [
      {
        title: 'Discover',
        description:
          'Understand your goals. We start by learning about your audience, current setup, and the challenges you want to solve.'
      },
      {
        title: 'Build',
        description:
          'Set up, organize and implement solutions—from classroom architecture to onboarding flows and engagement mechanisms.'
      },
      {
        title: 'Grow',
        description:
          'Optimize and support. We ensure smooth day-to-day operations and execute initiatives that maintain long-term retention.'
      }
    ],
    ctaHeading: "Let's Build Your Dream Community Together.",
    ctaSubtitle: 'Ready to create a better Skool community experience? Let’s discuss your goals today.',
    ctaButtonText: 'Contact Me Today'
  }
};

export const INITIAL_CLASSROOM_PROJECTS: Project[] = [
  {
    id: 'classroom-01',
    title: 'The Glam Crafter Empire Classroom',
    category: 'Premium Community Classroom',
    description:
      'Multi-tiered craft masterclass with categorized visual resource libraries, downloadable patterns, and weekly project workshops.',
    imageUrl: GLAM_CRAFTER_CLASSROOM_URL,
    highlight: 'Modern Classroom Setup',
    services: 'Community setup, course upload, lesson structuring, engagement badges',
    overview:
      'Transformed an overwhelming video archive into a pristine structured learning pathway that members love.'
  },
  {
    id: 'classroom-02',
    title: 'DY Salsa Dance Academy Classroom',
    category: 'Skool Classroom Design',
    description:
      'A vibrant, structured online dance academy organized with clear sequential course levels, video modules, and practice drills.',
    imageUrl: DY_SALSA_CLASSROOM_URL,
    highlight: 'Engaging & Organized',
    services: 'Classroom architecture, curriculum hierarchy, course thumbnail design',
    overview:
      'Revamped the entire curriculum structure to eliminate student drop-off and make step-by-step progress effortless.'
  },
  {
    id: 'classroom-03',
    title: 'Design & Creativity Hub Classroom',
    category: 'Creative Community Classroom',
    description:
      'Design workshops, portfolio review spaces, and software workflow tutorials structured for active daily member engagement.',
    imageUrl: CLASSROOM_DESIGN_HUB_IMAGE,
    highlight: 'Learning Experience',
    services: 'Course organization, weekly challenge threads, onboarding videos'
  },
  {
    id: 'classroom-04',
    title: 'Creator Community Masterclass',
    category: 'Course Organization',
    description:
      'Streamlined creator monetization course modules with step-by-step action sheets and companion video series.',
    imageUrl: SERVICES_ONBOARDING_IMAGE,
    highlight: 'Course Upload & Structuring',
    services: 'Content upload, thumbnail branding, category tagging'
  }
];

export const INITIAL_LANDING_PAGE_PROJECTS: Project[] = [
  {
    id: 'landing-01',
    title: 'DY Salsa Dance Academy Landing Page',
    category: 'Dance & Fitness Community',
    description:
      'Vibrant conversion-focused landing page showcasing dance programs, step-by-step beginner tracks, and instant community membership.',
    imageUrl: DY_SALSA_LANDING_URL,
    highlight: 'High-Converting Page',
    services: 'Landing page UI/UX, responsive layout, offer positioning, member conversion flow'
  },
  {
    id: 'landing-02',
    title: 'Evergreen Real Estate Community Landing Page',
    category: 'Real Estate Community',
    description:
      'High-converting investor portal landing page designed with clear value propositions, interactive tools showcase, and trust signals.',
    imageUrl: LANDING_REAL_ESTATE_IMAGE,
    highlight: 'Investor Portal Funnel',
    services: 'Landing page UI/UX, responsive layout, lead capture, community pitch'
  },
  {
    id: 'landing-03',
    title: 'The Glam Crafter Empire Landing Page',
    category: 'Digital Creator Community',
    description:
      'Chic, premium sales and community landing page presenting membership tiers, exclusive digital resources, and member perks.',
    imageUrl: GLAM_CRAFTER_CLASSROOM_URL,
    highlight: 'Premium Landing Page',
    services: 'Community positioning, sales page architecture, visual branding'
  },
  {
    id: 'landing-04',
    title: 'Design & Apparel Community Landing Page',
    category: 'Design & Apparel Community',
    description:
      'Bold streetwear creator hub showcasing print-on-demand resources, mockups, and private manufacturer connections.',
    imageUrl: LANDING_APPAREL_IMAGE,
    highlight: 'Brand Presentation',
    services: 'Apparel community branding, value messaging, conversion optimization'
  }
];

export const FEATURED_CASE_STUDY: Project = {
  id: 'featured-glam-crafter',
  title: 'The Glam Crafter Empire — From Vision to a Thriving Community',
  category: 'Community Setup & Growth',
  description:
    'How we transformed a scattered content library into a fully branded, thriving Skool community with high onboarding completion and daily active discussions.',
  imageUrl: GLAM_CRAFTER_CLASSROOM_URL,
  highlight: 'Complete Skool Transformation',
  services: 'Community setup, course upload, landing page design, and growth/marketing',
  overview:
    'The client had exceptional content but members felt overwhelmed navigating raw files. MemberFlow Studio structured four distinct course levels, designed custom thumbnails, created a welcoming 3-step onboarding pipeline, and built a dedicated landing page.',
  details:
    'Resulted in 100% positive student feedback on course clarity, zero support tickets regarding lost content, and effortless member navigation.'
};

export const CORE_SERVICES: ServiceItem[] = [
  {
    id: 'service-01',
    number: '01',
    title: 'Community Setup',
    description:
      'Launch a professional, well-structured Skool community that is easy to navigate and ready for members.',
    iconName: 'Settings',
    deliverables: [
      'Community configuration & settings',
      'Branding & visual organization',
      'About page setup & founder bio',
      'Community categories & topic channels',
      'Community rules & moderation policy',
      'Welcome post & announcement structure'
    ]
  },
  {
    id: 'service-02',
    number: '02',
    title: 'Classroom & Course Setup',
    description:
      'Turn your classroom into an organized learning environment that makes it easy for members to access and follow your content.',
    iconName: 'BookOpen',
    deliverables: [
      'Classroom structure & learning pathways',
      'Course uploads & media formatting',
      'Module & lesson organization',
      'Course thumbnails & visual graphics',
      'Learning-path clarity & progression',
      'Resource downloads & cheat-sheet linking'
    ]
  },
  {
    id: 'service-03',
    number: '03',
    title: 'Member Onboarding',
    description:
      'Create a welcoming and straightforward experience that helps new members understand where to start and what to do next.',
    iconName: 'Compass',
    deliverables: [
      'Interactive welcome experiences',
      'New-member instructions & checklist',
      'Getting-started resources & orientation',
      'Pinned onboarding welcome posts',
      'Member navigation & tour guidance',
      'First-week activation prompts'
    ]
  },
  {
    id: 'service-04',
    number: '04',
    title: 'Community Management',
    description:
      'Keep your community organized, supported and actively managed so owners can focus on delivering value.',
    iconName: 'Users',
    deliverables: [
      'Daily discussion monitoring & cleanup',
      'Content calendar & weekly announcements',
      'Member support & question triage',
      'Active community moderation & safety',
      'Gamification & leaderboard management',
      'Routine operational systems'
    ]
  },
  {
    id: 'service-05',
    number: '05',
    title: 'Engagement & Experience',
    description:
      'Help members become more involved by creating a community experience that encourages participation and meaningful interaction.',
    iconName: 'Sparkles',
    deliverables: [
      'Weekly engagement prompts & questions',
      'Community win celebrations & spotlights',
      'Live event schedule & calendar setup',
      'Member-to-member interaction initiatives',
      'Point system & level unlocking incentives',
      'Feedback loops & experience surveys'
    ]
  },
  {
    id: 'service-06',
    number: '06',
    title: 'Community Growth & Social Media',
    description:
      "Strengthen your community's visibility and support its growth through strategic marketing and social media management.",
    iconName: 'TrendingUp',
    deliverables: [
      'Social media content planning',
      'Community teaser & promo distribution',
      'Audience positioning & offer clarity',
      'Lead magnet to Skool funnel setup',
      'Organic referral & invite campaigns',
      'Growth roadmap & retention analysis'
    ]
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-01',
    name: 'Sarah Mitchell',
    role: 'Community Owner & Creative Mentor',
    avatarUrl: avatarSarahImg,
    quote:
      'MemberFlow Studio transformed our Skool community. The setup, engagement structure, and classroom layout are amazing! Our students actually finish courses now.',
    rating: 5
  },
  {
    id: 'test-02',
    name: 'David Harrison',
    role: 'Coach & Digital Creator',
    avatarUrl: avatarDavidImg,
    quote:
      'Professional, reliable and highly skilled. Our community is now more organized and active than ever before. Testimony knows Skool inside out.',
    rating: 5
  },
  {
    id: 'test-03',
    name: 'Jessica Brown',
    role: 'Business Strategist & Community Host',
    avatarUrl: avatarJessicaImg,
    quote:
      'The best Skool community support we have ever had. Seamless onboarding, gorgeous thumbnails, and strategic advice that drove real engagement.',
    rating: 5
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-01',
    question: 'What is MemberFlow Studio?',
    answer:
      'MemberFlow Studio is a specialized community systems studio founded by Testimony Samuel. We help Skool community owners build, organize, manage, and scale high-engagement online communities.'
  },
  {
    id: 'faq-02',
    question: 'How does the working process with Testimony Samuel work?',
    answer:
      'We follow a simple 3-stage process: Discover (understanding your goals and audience), Build (setting up classrooms, onboarding, and community structure), and Support & Grow (ongoing management and member engagement).'
  },
  {
    id: 'faq-03',
    question: 'Can you organize an existing messy Skool community?',
    answer:
      'Absolutely. We specialize in reorganizing existing communities, categorizing courses, rebuilding classroom pathways, and designing custom thumbnails so your members find everything intuitively.'
  },
  {
    id: 'faq-04',
    question: 'Do you create community landing pages?',
    answer:
      'Yes! We design high-converting, branded community landing pages that clearly communicate the value of your group, establish trust, and turn visitors into active members.'
  },
  {
    id: 'faq-05',
    question: 'How do we get started?',
    answer:
      'Click "Get in Touch" or "Contact Us Today" to send a direct project inquiry. We will review your goals and schedule a discovery discussion.'
  }
];

export function isExpiredOrLegacyImageUrl(url?: string): boolean {
  if (!url || !url.trim()) return true;
  return url.includes('img.sanishtech.com') || url.includes('images.unsplash.com');
}

function cleanImageUrl(val: string | undefined, fallback: string): string {
  return isExpiredOrLegacyImageUrl(val) ? fallback : (val as string);
}

export function sanitizeSiteConfig(saved: Partial<SiteConfig>): SiteConfig {
  const merged: SiteConfig = {
    ...INITIAL_SITE_CONFIG,
    ...saved,
    seo: { ...INITIAL_SITE_CONFIG.seo, ...(saved.seo || {}) },
    theme: { ...INITIAL_SITE_CONFIG.theme, ...(saved.theme || {}) },
    sectionVisibility: {
      ...INITIAL_SITE_CONFIG.sectionVisibility,
      ...(saved.sectionVisibility || {})
    },
    navigation: { ...INITIAL_SITE_CONFIG.navigation, ...(saved.navigation || {}) },
    footer: { ...INITIAL_SITE_CONFIG.footer, ...(saved.footer || {}) },
    socials: { ...INITIAL_SITE_CONFIG.socials, ...(saved.socials || {}) },
    metrics: { ...INITIAL_SITE_CONFIG.metrics, ...(saved.metrics || {}) },
    homePage: { ...INITIAL_SITE_CONFIG.homePage, ...(saved.homePage || {}) },
    servicesPage: { ...INITIAL_SITE_CONFIG.servicesPage, ...(saved.servicesPage || {}) },
    portfolioPage: { ...INITIAL_SITE_CONFIG.portfolioPage, ...(saved.portfolioPage || {}) },
    aboutPage: { ...INITIAL_SITE_CONFIG.aboutPage, ...(saved.aboutPage || {}) }
  };

  merged.founderHeroImage = cleanImageUrl(merged.founderHeroImage, FOUNDER_HERO_IMAGE);
  merged.founderStoryImage = cleanImageUrl(merged.founderStoryImage, FOUNDER_STORY_IMAGE);
  merged.homePage.heroImage = cleanImageUrl(merged.homePage.heroImage, HOME_HERO_DEFAULT_IMAGE);
  merged.homePage.whyGrowthImage = cleanImageUrl(
    merged.homePage.whyGrowthImage,
    WHY_CHOOSE_GROWTH_IMAGE
  );
  merged.servicesPage.heroImage = cleanImageUrl(
    merged.servicesPage.heroImage,
    SERVICES_HERO_DEFAULT_IMAGE
  );
  merged.servicesPage.processImage = cleanImageUrl(
    merged.servicesPage.processImage,
    WHY_CHOOSE_GROWTH_IMAGE
  );
  merged.servicesPage.blocks = (merged.servicesPage.blocks || INITIAL_SITE_CONFIG.servicesPage.blocks).map(
    (block, i) => ({
      ...INITIAL_SITE_CONFIG.servicesPage.blocks[i],
      ...block,
      imageUrl: cleanImageUrl(
        block.imageUrl,
        INITIAL_SITE_CONFIG.servicesPage.blocks[i]?.imageUrl || CLASSROOM_DESIGN_HUB_IMAGE
      )
    })
  );
  merged.portfolioPage.heroImage = cleanImageUrl(
    merged.portfolioPage.heroImage,
    PORTFOLIO_HERO_DEFAULT_IMAGE
  );
  merged.aboutPage.skillsImage = cleanImageUrl(
    merged.aboutPage.skillsImage,
    CLASSROOM_DESIGN_HUB_IMAGE
  );

  return merged;
}

export function sanitizeProjects(
  saved: Project[],
  defaults: Project[],
  fallbackImage: string
): Project[] {
  const defaultById = new Map(defaults.map((p) => [p.id, p]));
  return saved.map((item) => {
    const def = defaultById.get(item.id);
    if (isExpiredOrLegacyImageUrl(item.imageUrl)) {
      return def ? { ...def } : { ...item, imageUrl: fallbackImage };
    }
    return item;
  });
}

export function sanitizeFeaturedCaseStudy(saved: Partial<Project>): Project {
  const merged = { ...FEATURED_CASE_STUDY, ...saved };
  merged.imageUrl = cleanImageUrl(merged.imageUrl, FEATURED_CASE_STUDY.imageUrl);
  return merged;
}

export function sanitizeTestimonials(saved: Testimonial[]): Testimonial[] {
  const defaultById = new Map(INITIAL_TESTIMONIALS.map((t) => [t.id, t]));
  return saved.map((item) => {
    const def = defaultById.get(item.id);
    if (isExpiredOrLegacyImageUrl(item.avatarUrl)) {
      return {
        ...item,
        avatarUrl: def ? def.avatarUrl : INITIAL_TESTIMONIALS[0].avatarUrl
      };
    }
    return item;
  });
}
