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

export interface SiteConfig {
  brandName: string;
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
  socials: {
    linkedin: string;
    instagram: string;
    youtube: string;
    x: string;
    facebook: string;
  };
  metrics: {
    membersSupported: string;
    clientSatisfaction: string;
    growthStrategies: string;
    majorProjects: string;
  };
}

export const INITIAL_SITE_CONFIG: SiteConfig = {
  brandName: 'MemberFlow Studio',
  founderName: 'Testimony Samuel',
  founderTitle: 'Founder & Community Systems Specialist',
  founderBio: "I help Skool community owners build, organize and grow thriving communities through strategic setup, better member experiences and ongoing support.",
  founderStory: `My journey started with a deep interest in online communities and a desire to help people connect, learn and grow. Today, through MemberFlow Studio, I focus on helping community owners create better-organized Skool experiences, improve their classroom structures and make their communities easier and more enjoyable for members to navigate.

I believe a successful community is about more than simply having a platform. It's about creating an environment where people understand where to start, know what to do next and feel encouraged to participate.`,
  tagline: 'Better Systems. Stronger Communities.',
  positioning: 'Skool Community Setup, Management, Member Experience and Growth',
  contactEmail: 'femizydasilver@gmail.com',
  founderHeroImage: 'https://img.sanishtech.com/u/1b9a49150fc8f17bc1af30c311420a85.png',
  founderStoryImage: 'https://img.sanishtech.com/u/443ac159dcce6c7643714cda0ea75c0e.png',
  founderVideoUrl: '',
  socials: {
    linkedin: 'https://linkedin.com/in/testimony-samuel',
    instagram: 'https://instagram.com/memberflowstudio',
    youtube: 'https://youtube.com/@memberflowstudio',
    x: 'https://x.com/memberflowstudio',
    facebook: 'https://facebook.com/memberflowstudio'
  },
  metrics: {
    membersSupported: '500+',
    clientSatisfaction: '100%',
    growthStrategies: 'Real Strategies',
    majorProjects: '4+'
  }
};

export const INITIAL_CLASSROOM_PROJECTS: Project[] = [
  {
    id: 'classroom-01',
    title: 'DY Salsa Dance Academy Classroom',
    category: 'Skool Classroom Design',
    description: 'A vibrant, structured online dance academy organized with clear sequential course levels, video modules, and practice drills.',
    imageUrl: 'https://img.sanishtech.com/u/b23962d874c57145a61ed60d99809bf2.png',
    highlight: 'Engaging & Organized',
    services: 'Classroom architecture, curriculum hierarchy, course thumbnail design',
    overview: 'Revamped the entire curriculum structure to eliminate student drop-off and make step-by-step progress effortless.'
  },
  {
    id: 'classroom-02',
    title: 'The Glam Crafter Empire Classroom',
    category: 'Premium Community Classroom',
    description: 'Multi-tiered craft masterclass with categorized visual resource libraries, downloadable patterns, and weekly project workshops.',
    imageUrl: 'https://img.sanishtech.com/u/d18df1c25ca09bab0a6239b84996b116.png',
    highlight: 'Modern Classroom Setup',
    services: 'Community setup, course upload, lesson structuring, engagement badges',
    overview: 'Transformed an overwhelming video archive into a pristine structured learning pathway that members love.'
  },
  {
    id: 'classroom-03',
    title: 'Design & Creativity Hub Classroom',
    category: 'Creative Community Classroom',
    description: 'Design workshops, portfolio review spaces, and software workflow tutorials structured for active daily member engagement.',
    imageUrl: 'https://img.sanishtech.com/u/b23962d874c57145a61ed60d99809bf2.png',
    highlight: 'Learning Experience',
    services: 'Course organization, weekly challenge threads, onboarding videos'
  },
  {
    id: 'classroom-04',
    title: 'Creator Community Masterclass',
    category: 'Course Organization',
    description: 'Streamlined creator monetization course modules with step-by-step action sheets and companion video series.',
    imageUrl: 'https://img.sanishtech.com/u/d18df1c25ca09bab0a6239b84996b116.png',
    highlight: 'Course Upload & Structuring',
    services: 'Content upload, thumbnail branding, category tagging'
  }
];

export const INITIAL_LANDING_PAGE_PROJECTS: Project[] = [
  {
    id: 'landing-01',
    title: 'Evergreen Real Estate Community Landing Page',
    category: 'Real Estate Community',
    description: 'High-converting investor portal landing page designed with clear value propositions, interactive tools showcase, and trust signals.',
    imageUrl: 'https://img.sanishtech.com/u/f37e41f7ca3c29592e3dde20e6a5e849.png',
    highlight: 'High-Converting Page',
    services: 'Landing page UI/UX, responsive layout, lead capture, community pitch'
  },
  {
    id: 'landing-02',
    title: 'The Glam Crafter Empire Landing Page',
    category: 'Digital Creator Community',
    description: 'Chic, premium sales and community landing page presenting membership tiers, exclusive digital resources, and member perks.',
    imageUrl: 'https://img.sanishtech.com/u/7b9e61d8e6f0a3f5cf3e3f287d13c677.png',
    highlight: 'Premium Landing Page',
    services: 'Community positioning, sales page architecture, visual branding'
  },
  {
    id: 'landing-03',
    title: 'Design & Apparel Community Landing Page',
    category: 'Design & Apparel Community',
    description: 'Bold streetwear creator hub showcasing print-on-demand resources, mockups, and private manufacturer connections.',
    imageUrl: 'https://img.sanishtech.com/u/d6253575a28ac741cb6d70f4ee7a3f48.png',
    highlight: 'Brand Presentation',
    services: 'Apparel community branding, value messaging, conversion optimization'
  },
  {
    id: 'landing-04',
    title: 'Digital Creator Pro Landing Experience',
    category: 'Sales Page Design',
    description: 'Clean conversion-focused landing page turning YouTube and social media subscribers into engaged recurring members.',
    imageUrl: 'https://img.sanishtech.com/u/b6f1c88dadfc9dcdaa1aa1408c238b2a.png',
    highlight: 'Conversion-Focused Layout',
    services: 'Offer framing, FAQ setup, direct call-to-action flows'
  }
];

export const FEATURED_CASE_STUDY: Project = {
  id: 'featured-glam-crafter',
  title: 'The Glam Crafter Empire — From Vision to a Thriving Community',
  category: 'Community Setup & Growth',
  description: 'How we transformed a scattered content library into a fully branded, thriving Skool community with high onboarding completion and daily active discussions.',
  imageUrl: 'https://img.sanishtech.com/u/d18df1c25ca09bab0a6239b84996b116.png',
  highlight: 'Complete Skool Transformation',
  services: 'Community setup, course upload, landing page design, and growth/marketing',
  overview: 'The client had exceptional content but members felt overwhelmed navigating raw files. MemberFlow Studio structured four distinct course levels, designed custom thumbnails, created a welcoming 3-step onboarding pipeline, and built a dedicated landing page.',
  details: 'Resulted in 100% positive student feedback on course clarity, zero support tickets regarding lost content, and effortless member navigation.'
};

export const CORE_SERVICES: ServiceItem[] = [
  {
    id: 'service-01',
    number: '01',
    title: 'Community Setup',
    description: 'Launch a professional, well-structured Skool community that is easy to navigate and ready for members.',
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
    description: 'Turn your classroom into an organized learning environment that makes it easy for members to access and follow your content.',
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
    description: 'Create a welcoming and straightforward experience that helps new members understand where to start and what to do next.',
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
    description: 'Keep your community organized, supported and actively managed so owners can focus on delivering value.',
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
    description: 'Help members become more involved by creating a community experience that encourages participation and meaningful interaction.',
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
    description: 'Strengthen your community\'s visibility and support its growth through strategic marketing and social media management.',
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
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    quote: 'MemberFlow Studio transformed our Skool community. The setup, engagement structure, and classroom layout are amazing! Our students actually finish courses now.',
    rating: 5
  },
  {
    id: 'test-02',
    name: 'David Harrison',
    role: 'Coach & Digital Creator',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    quote: 'Professional, reliable and highly skilled. Our community is now more organized and active than ever before. Testimony knows Skool inside out.',
    rating: 5
  },
  {
    id: 'test-03',
    name: 'Jessica Brown',
    role: 'Business Strategist & Community Host',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    quote: 'The best Skool community support we have ever had. Seamless onboarding, gorgeous thumbnails, and strategic advice that drove real engagement.',
    rating: 5
  }
];

export const FAQ_ITEMS = [
  {
    question: 'What is MemberFlow Studio?',
    answer: 'MemberFlow Studio is a specialized community systems studio founded by Testimony Samuel. We help Skool community owners build, organize, manage, and scale high-engagement online communities.'
  },
  {
    question: 'How does the working process with Testimony Samuel work?',
    answer: 'We follow a simple 3-stage process: Discover (understanding your goals and audience), Build (setting up classrooms, onboarding, and community structure), and Support & Grow (ongoing management and member engagement).'
  },
  {
    question: 'Can you organize an existing messy Skool community?',
    answer: 'Absolutely. We specialize in reorganizing existing communities, categorizing courses, rebuilding classroom pathways, and designing custom thumbnails so your members find everything intuitively.'
  },
  {
    question: 'Do you create community landing pages?',
    answer: 'Yes! We design high-converting, branded community landing pages that clearly communicate the value of your group, establish trust, and turn visitors into active members.'
  },
  {
    question: 'How do we get started?',
    answer: 'Click "Get in Touch" or "Contact Us Today" to send a direct project inquiry. We will review your goals and schedule a discovery discussion.'
  }
];
