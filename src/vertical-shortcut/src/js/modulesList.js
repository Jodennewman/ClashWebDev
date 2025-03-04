import feather from 'feather-icons';
const moduleData = [
  // Basic Theory and Practices
  {
    id: 'basic-01',
    track: 'basic',
    category: 'Basic Theory and Practices',
    title: 'The Big Picture on Short Form',
    description: 'Master the fundamental concepts and strategic approach to short-form video content.',
    icon: 'film',
    roles: ['founder', 'writer'],
    submodules: [
      'Platform ecosystem overview',
      'Content consumption patterns',
      'Attention economy principles',
      'Short-form vs traditional content'
    ],
    resources: {
      duration: '18 min',
      templates: 3,
      pdfs: 2
    }
  },
  {
    id: 'basic-02',
    track: 'basic',
    category: 'Basic Theory and Practices',
    title: 'The Script of Sisyphus',
    description: 'Learn content optimization strategies that drive consistent engagement.',
    icon: 'edit-3',
    roles: ['founder', 'writer'],
    submodules: [
      'Efficient content cycling',
      'Systematic content creation',
      'Iteration frameworks',
      'Avoiding burnout in creation'
    ],
    resources: {
      duration: '15 min',
      templates: 2,
      pdfs: 1
    }
  },
  {
    id: 'basic-03',
    track: 'basic',
    category: 'Basic Theory and Practices',
    title: 'Helpful Formats 101',
    description: 'Master proven content formats that consistently perform well across platforms.',
    icon: 'layout',
    roles: ['founder', 'writer', 'editor'],
    submodules: [
      'Top-performing content structures',
      'Format selection strategy',
      'Industry-specific formats',
      'Format adaptation techniques'
    ],
    resources: {
      duration: '22 min',
      templates: 5,
      pdfs: 3
    }
  },
  {
    id: 'basic-04',
    track: 'basic',
    category: 'Basic Theory and Practices',
    title: 'Algorithmic Reality',
    description: 'Understand how platform algorithms work and how to leverage them for growth.',
    icon: 'trending-up',
    roles: ['founder', 'writer'],
    submodules: [
      'Algorithm fundamentals',
      'Key ranking factors',
      'Platform-specific strategies',
      'Algorithm updates adaptation'
    ],
    resources: {
      duration: '25 min',
      templates: 2,
      pdfs: 4
    }
  },
  {
    id: 'basic-05',
    track: 'basic',
    category: 'Basic Theory and Practices',
    title: 'Engagement Metrics 101',
    description: 'Learn to measure and optimize for the metrics that matter to your business goals.',
    icon: 'bar-chart-2',
    roles: ['founder'],
    submodules: [
      'Key performance indicators',
      'Meaningful engagement metrics',
      'Performance benchmarking',
      'Metrics interpretation framework'
    ],
    resources: {
      duration: '20 min',
      templates: 4,
      pdfs: 2
    }
  },
  {
    id: 'basic-06',
    track: 'basic',
    category: 'Basic Theory and Practices',
    title: 'The Frame Itself',
    description: 'Master visual composition principles for vertical video that captures attention.',
    icon: 'square',
    roles: ['videographer', 'editor'],
    submodules: [
      'Vertical composition principles',
      'Visual hierarchy in limited space',
      'Movement and framing techniques',
      'Composition for mobile viewing'
    ],
    resources: {
      duration: '17 min',
      templates: 1,
      pdfs: 3
    }
  },
  {
    id: 'basic-07',
    track: 'basic',
    category: 'Basic Theory and Practices',
    title: 'Scriptwriting 101',
    description: 'Write compelling scripts optimized for short-form vertical content.',
    icon: 'file-text',
    roles: ['founder', 'writer'],
    submodules: [
      'Short-form script structure',
      'Concise messaging techniques',
      'Value delivery in limited time',
      'Script templates by content type'
    ],
    resources: {
      duration: '19 min',
      templates: 6,
      pdfs: 2
    }
  },
  {
    id: 'basic-08',
    track: 'basic',
    category: 'Basic Theory and Practices',
    title: 'Hooking Fundamentals',
    description: 'Master the art of creating hooks that stop the scroll in the first 3 seconds.',
    icon: 'anchor',
    roles: ['founder', 'writer'],
    submodules: [
      'Pattern interruption techniques',
      'Hook formula frameworks',
      'Psychological triggers',
      'Hook testing methodologies'
    ],
    resources: {
      duration: '24 min',
      templates: 5,
      pdfs: 3
    }
  },
  {
    id: 'basic-09',
    track: 'basic',
    category: 'Basic Theory and Practices',
    title: 'Strategy Pillars Topics Buckets',
    description: 'Develop a strategic content framework aligned with business goals.',
    icon: 'layers',
    roles: ['founder', 'writer'],
    submodules: [
      'Content pillar development',
      'Strategic topic selection',
      'Content mapping to business objectives',
      'Long-term content planning'
    ],
    resources: {
      duration: '23 min',
      templates: 4,
      pdfs: 2
    }
  },
  {
    id: 'basic-10',
    track: 'basic',
    category: 'Basic Theory and Practices',
    title: 'The Cardinal Sins and Virtues',
    description: 'Learn what to embrace and what to avoid in short-form content.',
    icon: 'alert-triangle',
    roles: ['founder', 'writer', 'editor', 'videographer'],
    submodules: [
      'Critical content mistakes',
      'Success-driving content elements',
      'Industry-specific best practices',
      'Common misconceptions'
    ],
    resources: {
      duration: '21 min',
      templates: 2,
      pdfs: 3
    }
  },
  {
    id: 'basic-11',
    track: 'basic',
    category: 'Basic Theory and Practices',
    title: 'Starting an Account for Success',
    description: 'Set up your accounts and profiles for maximum visibility and growth.',
    icon: 'user-plus',
    roles: ['founder'],
    submodules: [
      'Profile optimization strategies',
      'Early content approach',
      'Audience building fundamentals',
      'Cross-platform integration'
    ],
    resources: {
      duration: '16 min',
      templates: 3,
      pdfs: 2
    }
  },
  {
    id: 'basic-12',
    track: 'basic',
    category: 'Basic Theory and Practices',
    title: 'Platform Differences',
    description: 'Understand the unique characteristics and requirements of each platform.',
    icon: 'grid',
    roles: ['founder', 'writer', 'editor'],
    submodules: [
      'Platform-specific audience behaviors',
      'Format optimization by platform',
      'Cross-platform content adaptation',
      'Platform specialization strategy'
    ],
    resources: {
      duration: '26 min',
      templates: 4,
      pdfs: 5
    }
  },
  
  // Advanced Theory and Practices
  {
    id: 'advanced-01',
    track: 'advanced',
    category: 'Advanced Theory and Practices',
    title: 'Foundations of Manufacturing Authority',
    description: 'Build authentic expertise and position yourself as a thought leader.',
    icon: 'award',
    roles: ['founder'],
    submodules: [
      'Authority positioning frameworks',
      'Expertise demonstration strategies',
      'Trust-building content patterns',
      'Credibility acceleration techniques'
    ],
    resources: {
      duration: '28 min',
      templates: 3,
      pdfs: 4
    }
  },
  {
    id: 'advanced-02',
    track: 'advanced',
    category: 'Advanced Theory and Practices',
    title: 'Authority and Brand Holism through Short Form',
    description: 'Integrate short-form into your broader brand and authority strategy.',
    icon: 'shield',
    roles: ['founder'],
    submodules: [
      'Brand integration frameworks',
      'Cohesive messaging architecture',
      'Authority stacking principles',
      'Brand consistency systems'
    ],
    resources: {
      duration: '24 min',
      templates: 3,
      pdfs: 2
    }
  },
  {
    id: 'advanced-03',
    track: 'advanced',
    category: 'Advanced Theory and Practices',
    title: 'PR Shaping your Narrative',
    description: 'Control your public narrative and shape your industry positioning.',
    icon: 'mic',
    roles: ['founder'],
    submodules: [
      'Narrative control techniques',
      'Media integration strategy',
      'Strategic positioning frameworks',
      'Reputation management systems'
    ],
    resources: {
      duration: '22 min',
      templates: 4,
      pdfs: 3
    }
  },
  {
    id: 'advanced-04',
    track: 'advanced',
    category: 'Advanced Theory and Practices',
    title: 'Basics on PR and Position',
    description: 'Leverage PR principles to enhance your content strategy.',
    icon: 'radio',
    roles: ['founder', 'writer'],
    submodules: [
      'PR fundamentals for content creators',
      'Media opportunities through content',
      'Positioning strategy development',
      'PR amplification techniques'
    ],
    resources: {
      duration: '20 min',
      templates: 3,
      pdfs: 2
    }
  },
  {
    id: 'advanced-05',
    track: 'advanced',
    category: 'Advanced Theory and Practices',
    title: 'The Founders Paradox',
    description: 'Navigate the unique challenges and opportunities of founder content.',
    icon: 'briefcase',
    roles: ['founder'],
    submodules: [
      'Balancing personal and brand content',
      'Founder authority development',
      'Leadership positioning strategies',
      'Founder storytelling frameworks'
    ],
    resources: {
      duration: '19 min',
      templates: 2,
      pdfs: 3
    }
  },
  {
    id: 'advanced-06',
    track: 'advanced',
    category: 'Advanced Theory and Practices',
    title: 'Handling a Comment Section',
    description: 'Maximize engagement and build community through comment management.',
    icon: 'message-square',
    roles: ['founder', 'writer'],
    submodules: [
      'Strategic comment engagement',
      'Community building through comments',
      'Handling criticism and trolls',
      'Comment section conversion strategies'
    ],
    resources: {
      duration: '15 min',
      templates: 2,
      pdfs: 1
    }
  },
  {
    id: 'advanced-07',
    track: 'advanced',
    category: 'Advanced Theory and Practices',
    title: 'The Importance of Lo-Fi',
    description: 'Leverage lo-fi content for authenticity and higher engagement rates.',
    icon: 'zap',
    roles: ['founder', 'videographer'],
    submodules: [
      'Lo-fi content advantages',
      'Balancing production quality',
      'Authentic content creation',
      'Lo-fi production techniques'
    ],
    resources: {
      duration: '16 min',
      templates: 2,
      pdfs: 1
    }
  },
  {
    id: 'advanced-08',
    track: 'advanced',
    category: 'Advanced Theory and Practices',
    title: 'Introduction',
    description: 'Overview of advanced content strategies for authority building.',
    icon: 'info',
    roles: ['founder'],
    submodules: [
      'Advanced strategy framework',
      'Module pathway overview',
      'Implementation approach',
      'Expected outcomes'
    ],
    resources: {
      duration: '12 min',
      templates: 1,
      pdfs: 1
    }
  },
  {
    id: 'advanced-09',
    track: 'advanced',
    category: 'Advanced Theory and Practices',
    title: 'Script Mastery Optimising for Engagement',
    description: 'Advanced scriptwriting techniques to maximize viewer engagement.',
    icon: 'edit-2',
    roles: ['founder', 'writer'],
    submodules: [
      'Psychological engagement triggers',
      'Advanced script structures',
      'Platform-specific script patterns',
      'Testing and optimizing scripts'
    ],
    resources: {
      duration: '23 min',
      templates: 5,
      pdfs: 3
    }
  },
  {
    id: 'advanced-10',
    track: 'advanced',
    category: 'Advanced Theory and Practices',
    title: 'Advanced Engagement Metrics',
    description: 'Deep dive into measuring and optimizing for meaningful engagement.',
    icon: 'activity',
    roles: ['founder'],
    submodules: [
      'Advanced analytics interpretation',
      'Custom engagement frameworks',
      'Correlation analysis methods',
      'Engagement to revenue mapping'
    ],
    resources: {
      duration: '26 min',
      templates: 4,
      pdfs: 3
    }
  },
  {
    id: 'advanced-11',
    track: 'advanced',
    category: 'Advanced Theory and Practices',
    title: 'Data-Led Iteration',
    description: 'Use analytics to continuously improve your content strategy.',
    icon: 'bar-chart-2',
    roles: ['founder'],
    submodules: [
      'Data-driven decision making',
      'Content performance analysis',
      'Testing frameworks',
      'Continuous improvement cycles'
    ],
    resources: {
      duration: '24 min',
      templates: 5,
      pdfs: 3
    }
  },
  
  // Delegation modules
  {
    id: 'delegation-01',
    track: 'delegation',
    category: 'Delegation',
    title: 'Introduction to Delegation',
    description: 'Learn how to effectively delegate content creation while maintaining quality.',
    icon: 'users',
    roles: ['founder'],
    submodules: [
      'Delegation readiness assessment',
      'Team structure planning',
      'Role definition and documentation',
      'Quality control frameworks'
    ],
    resources: {
      duration: '22 min',
      templates: 5,
      pdfs: 4
    }
  },
  {
    id: 'delegation-02',
    track: 'delegation',
    category: 'Delegation',
    title: 'First Bottlenecks',
    description: 'Identify and overcome the initial challenges in content delegation.',
    icon: 'filter',
    roles: ['founder'],
    submodules: [
      'Common delegation obstacles',
      'Bottleneck identification',
      'Systematic solution approaches',
      'Process flow optimization'
    ],
    resources: {
      duration: '19 min',
      templates: 4,
      pdfs: 3
    }
  },
  {
    id: 'delegation-03',
    track: 'delegation',
    category: 'Delegation',
    title: 'Creation of the Creative Team',
    description: 'Build and manage an effective content creation team.',
    icon: 'users',
    roles: ['founder'],
    submodules: [
      'Team composition planning',
      'Hiring strategy',
      'Role definition and documentation',
      'Team onboarding frameworks'
    ],
    resources: {
      duration: '25 min',
      templates: 7,
      pdfs: 4
    }
  },
  {
    id: 'delegation-04',
    track: 'delegation',
    category: 'Delegation',
    title: 'Videography Delegated',
    description: 'Successfully delegate video production while maintaining quality.',
    icon: 'video',
    roles: ['founder', 'videographer'],
    submodules: [
      'Videographer briefing templates',
      'Quality standards definition',
      'Equipment and setup guidance',
      'Feedback and iteration process'
    ],
    resources: {
      duration: '21 min',
      templates: 6,
      pdfs: 3
    }
  },
  {
    id: 'delegation-05',
    track: 'delegation',
    category: 'Delegation',
    title: 'How to make the content run itself',
    description: 'Build systems for hands-off content production that maintains quality.',
    icon: 'settings',
    roles: ['founder'],
    submodules: [
      'Content production systems',
      'Quality assurance frameworks',
      'Team empowerment strategies',
      'Automation opportunities',
      'Decision-making frameworks',
      'Founder involvement optimization'
    ],
    resources: {
      duration: '30 min',
      templates: 7,
      pdfs: 5
    }
  },
  {
    id: 'delegation-06',
    track: 'delegation',
    category: 'Delegation',
    title: 'Creating a Team Workflow',
    description: 'Establish efficient workflows that scale content production.',
    icon: 'git-branch',
    roles: ['founder'],
    submodules: [
      'Workflow mapping and optimization',
      'Project management systems',
      'Approval processes',
      'Communication protocols',
      'Deadline management frameworks'
    ],
    resources: {
      duration: '27 min',
      templates: 8,
      pdfs: 4
    }
  },
  
  // Editing modules
  {
    id: 'editing-01',
    track: 'editing',
    category: 'Editing',
    title: 'Editing Basics',
    description: 'Master fundamental editing techniques for short-form video.',
    icon: 'scissors',
    roles: ['editor'],
    submodules: [
      'Software selection and setup',
      'Basic editing techniques',
      'Pacing and rhythm fundamentals',
      'Audio optimization basics',
      'Essential effects and transitions'
    ],
    resources: {
      duration: '23 min',
      templates: 4,
      pdfs: 3
    }
  },
  {
    id: 'editing-02',
    track: 'editing',
    category: 'Editing',
    title: 'Editing Team',
    description: 'Train your editing team to produce scroll-stopping content consistently.',
    icon: 'users',
    roles: ['founder', 'editor'],
    submodules: [
      'Editor hiring and onboarding',
      'Editing team workflows',
      'Style guide development',
      'Feedback systems for editors',
      'Training frameworks for new editors'
    ],
    resources: {
      duration: '27 min',
      templates: 6,
      pdfs: 4
    }
  },
  {
    id: 'editing-03',
    track: 'editing',
    category: 'Editing',
    title: 'Editing Advanced',
    description: 'Take your editing skills to the next level with advanced techniques.',
    icon: 'scissors',
    roles: ['editor'],
    submodules: [
      'Advanced pacing techniques',
      'Visual effects optimization',
      'Advanced transition methods',
      'Color grading for engagement',
      'Audio enhancement techniques'
    ],
    resources: {
      duration: '29 min',
      templates: 5,
      pdfs: 4
    }
  },
  {
    id: 'editing-04',
    track: 'editing',
    category: 'Editing',
    title: 'Podcast Clipping',
    description: 'Transform long-form podcast content into viral short-form clips.',
    icon: 'headphones',
    roles: ['editor', 'podcast'],
    submodules: [
      'Key moment identification',
      'Engaging clip selection criteria',
      'Audio-to-visual transformation',
      'Captions and visual enhancement',
      'Distribution optimization'
    ],
    resources: {
      duration: '24 min',
      templates: 5,
      pdfs: 3
    }
  },
  
  // Monetisation modules
  {
    id: 'monetisation-01',
    track: 'monetisation',
    category: 'Monetisation',
    title: 'Monetisation Basics',
    description: 'Understand the fundamentals of content monetization strategies.',
    icon: 'dollar-sign',
    roles: ['founder'],
    submodules: [
      'Monetization model overview',
      'Revenue stream identification',
      'Basic conversion frameworks',
      'Monetization readiness assessment'
    ],
    resources: {
      duration: '20 min',
      templates: 3,
      pdfs: 2
    }
  },
  {
    id: 'monetisation-02',
    track: 'monetisation',
    category: 'Monetisation',
    title: 'Monetisation Pro',
    description: 'Advanced strategies to convert content viewers into customers and revenue.',
    icon: 'dollar-sign',
    roles: ['founder'],
    submodules: [
      'Content-to-cash conversion models',
      'Funnel integration strategies',
      'Offer presentation frameworks',
      'Monetization content types',
      'Direct and indirect revenue streams',
      'ROI measurement systems'
    ],
    resources: {
      duration: '32 min',
      templates: 7,
      pdfs: 5
    }
  },
  {
    id: 'monetisation-03',
    track: 'monetisation',
    category: 'Monetisation',
    title: 'Monetisation Founder',
    description: 'Founder-specific strategies for building a content-powered business.',
    icon: 'briefcase',
    roles: ['founder'],
    submodules: [
      'Business model integration',
      'Strategic monetization planning',
      'Value ladder development',
      'Premium positioning strategies',
      'Scaling monetization systems'
    ],
    resources: {
      duration: '34 min',
      templates: 6,
      pdfs: 5
    }
  },
  
  // Posting & Scheduling modules
  {
    id: 'posting-01',
    track: 'posting',
    category: 'Posting & Scheduling',
    title: 'P&S Individual',
    description: 'Optimize your posting strategy for maximum reach and engagement.',
    icon: 'calendar',
    roles: ['founder', 'writer'],
    submodules: [
      'Optimal posting times',
      'Platform-specific scheduling',
      'Content calendar development',
      'Consistency strategies',
      'Performance tracking systems'
    ],
    resources: {
      duration: '18 min',
      templates: 5,
      pdfs: 2
    }
  },
  {
    id: 'posting-02',
    track: 'posting',
    category: 'Posting & Scheduling',
    title: 'P&S Founder',
    description: 'Founder-specific posting strategies for authority building.',
    icon: 'calendar',
    roles: ['founder'],
    submodules: [
      'Strategic content sequencing',
      'Authority building posting patterns',
      'Cross-platform coordination',
      'Team scheduling delegation',
      'Long-term scheduling strategy'
    ],
    resources: {
      duration: '22 min',
      templates: 4,
      pdfs: 3
    }
  },
  
  // Repurposing modules
  {
    id: 'repurposing-01',
    track: 'repurposing',
    category: 'Repurposing',
    title: 'Repurposing Normal',
    description: 'Efficiently repurpose content across platforms for maximum reach.',
    icon: 'repeat',
    roles: ['founder', 'writer', 'editor'],
    submodules: [
      'Content transformation frameworks',
      'Platform adaptation techniques',
      'Efficient repurposing workflows',
      'Asset management systems',
      'Repurposing ROI optimization'
    ],
    resources: {
      duration: '25 min',
      templates: 6,
      pdfs: 3
    }
  },
  {
    id: 'repurposing-02',
    track: 'repurposing',
    category: 'Repurposing',
    title: 'Repurposing from LinkedIn',
    description: 'Transform LinkedIn content into material for other platforms efficiently.',
    icon: 'linkedin',
    roles: ['writer', 'editor'],
    featured: true,
    submodules: [
      'LinkedIn to TikTok adaptation',
      'LinkedIn to Instagram optimization',
      'Content chunking strategies',
      'Format-specific modifications',
      'Asset management for repurposing'
    ],
    resources: {
      duration: '24 min',
      templates: 5,
      pdfs: 3
    }
  },
  {
    id: 'repurposing-03',
    track: 'repurposing',
    category: 'Repurposing',
    title: 'Serialisation',
    description: 'Create content series that keep viewers coming back.',
    icon: 'layers',
    roles: ['founder', 'writer'],
    submodules: [
      'Series concept development',
      'Episodic content planning',
      'Audience retention strategies',
      'Cross-episode promotion techniques',
      'Series performance optimization'
    ],
    resources: {
      duration: '21 min',
      templates: 4,
      pdfs: 2
    }
  },
  
  // Research modules
  {
    id: 'research-01',
    track: 'research',
    category: 'Research',
    title: 'Research Basics',
    description: 'Master fundamental research techniques for content creation.',
    icon: 'search',
    roles: ['founder', 'writer'],
    submodules: [
      'Audience research methods',
      'Topic research frameworks',
      'Competitor analysis techniques',
      'Trend identification systems',
      'Research-based content planning'
    ],
    resources: {
      duration: '19 min',
      templates: 4,
      pdfs: 3
    }
  },
  {
    id: 'research-02',
    track: 'research',
    category: 'Research',
    title: 'Research Advanced Tasks',
    description: 'Advanced research techniques for strategic content development.',
    icon: 'search',
    roles: ['founder', 'writer'],
    submodules: [
      'Advanced audience segmentation',
      'Data-driven content opportunity analysis',
      'Competitive positioning research',
      'Trend prediction frameworks',
      'Research-based strategy development'
    ],
    resources: {
      duration: '26 min',
      templates: 5,
      pdfs: 4
    }
  },
  
  // Conversions modules
  {
    id: 'conversions-01',
    track: 'conversions',
    category: 'Conversions',
    title: 'Taking People off Platform',
    description: 'Strategic approaches to move viewers from social platforms to your owned channels.',
    icon: 'external-link',
    roles: ['founder', 'writer'],
    submodules: [
      'Off-platform funnel design',
      'Call-to-action optimization',
      'Value proposition frameworks',
      'Platform-specific strategies',
      'Traffic quality optimization'
    ],
    resources: {
      duration: '24 min',
      templates: 6,
      pdfs: 3
    }
  },
  {
    id: 'conversions-02',
    track: 'conversions',
    category: 'Conversions',
    title: 'Lead Magnets',
    description: 'Create compelling lead magnets that convert viewers into subscribers.',
    icon: 'gift',
    roles: ['founder', 'writer'],
    submodules: [
      'Lead magnet selection framework',
      'Value optimization strategies',
      'Delivery system setup',
      'Lead magnet promotion techniques',
      'Conversion tracking and optimization'
    ],
    resources: {
      duration: '22 min',
      templates: 5,
      pdfs: 4
    }
  },
  {
    id: 'conversions-03',
    track: 'conversions',
    category: 'Conversions',
    title: 'Podcasting',
    description: 'Leverage podcasting to deepen audience relationships and drive conversions.',
    icon: 'mic',
    roles: ['founder', 'podcast'],
    submodules: [
      'Podcast strategy development',
      'Content planning for conversion',
      'Podcast promotion techniques',
      'Listener to customer journeys',
      'Podcast monetization strategies'
    ],
    resources: {
      duration: '28 min',
      templates: 5,
      pdfs: 3
    }
  },
  {
    id: 'conversions-04',
    track: 'conversions',
    category: 'Conversions',
    title: 'YouTube',
    description: 'Master YouTube strategies for audience building and business growth.',
    icon: 'youtube',
    roles: ['founder', 'writer', 'editor'],
    submodules: [
      'YouTube platform strategy',
      'Long-form content optimization',
      'YouTube SEO techniques',
      'Channel growth frameworks',
      'YouTube-specific conversion strategies'
    ],
    resources: {
      duration: '30 min',
      templates: 6,
      pdfs: 4
    }
  },
  {
    id: 'conversions-05',
    track: 'conversions',
    category: 'Conversions',
    title: 'Speaking Engagements',
    description: 'Leverage speaking opportunities to build authority and drive business growth.',
    icon: 'mic',
    roles: ['founder'],
    submodules: [
      'Speaking opportunity identification',
      'Pitch development strategies',
      'Presentation content optimization',
      'Audience conversion techniques',
      'Follow-up systems for maximum ROI'
    ],
    resources: {
      duration: '23 min',
      templates: 5,
      pdfs: 3
    }
  },
  {
    id: 'conversions-06',
    track: 'conversions',
    category: 'Conversions',
    title: 'Outreach and Finding work/clients',
    description: 'Proactive strategies to generate leads and find high-quality clients.',
    icon: 'users',
    roles: ['founder'],
    submodules: [
      'Outreach strategy development',
      'Ideal client identification',
      'Personalized outreach frameworks',
      'Follow-up systems',
      'Relationship nurturing techniques'
    ],
    resources: {
      duration: '26 min',
      templates: 7,
      pdfs: 4
    }
  },
  {
    id: 'conversions-07',
    track: 'conversions',
    category: 'Conversions',
    title: 'Newsletter',
    description: 'Build and monetize an email newsletter as a core business asset.',
    icon: 'mail',
    roles: ['founder', 'writer'],
    submodules: [
      'Newsletter strategy development',
      'Subscriber acquisition techniques',
      'Content optimization for engagement',
      'Monetization frameworks',
      'Growth and scaling systems'
    ],
    resources: {
      duration: '25 min',
      templates: 6,
      pdfs: 4
    }
  },
  {
    id: 'conversions-08',
    track: 'conversions',
    category: 'Conversions',
    title: 'How it builds your business',
    description: 'Integrate content strategy with your overall business growth objectives.',
    icon: 'trending-up',
    roles: ['founder'],
    submodules: [
      'Business integration frameworks',
      'ROI measurement systems',
      'Strategic alignment techniques',
      'Content-driven business models',
      'Long-term growth planning'
    ],
    resources: {
      duration: '29 min',
      templates: 5,
      pdfs: 4
    }
  },
  
  // LinkedIn focused track (highlighted)
  {
    id: 'linkedin-01',
    track: 'linkedin',
    category: 'LinkedIn Strategy',
    title: 'LinkedIn Content Mastery',
    description: 'Specialized strategies for LinkedIn to build B2B authority and connections.',
    icon: 'linkedin',
    roles: ['founder', 'writer'],
    featured: true,
    submodules: [
      'LinkedIn algorithm specifics',
      'B2B content optimization',
      'Professional audience engagement',
      'Authority building on LinkedIn',
      'Connection growth strategies',
      'Content formats for maximum reach'
    ],
    resources: {
      duration: '35 min',
      templates: 8,
      pdfs: 6
    }
  },
  {
    id: 'linkedin-02',
    track: 'linkedin',
    category: 'LinkedIn Strategy',
    title: 'LinkedIn Profile Optimization',
    description: 'Transform your LinkedIn profile into a powerful business development tool.',
    icon: 'user',
    roles: ['founder'],
    featured: true,
    submodules: [
      'Profile optimization strategies',
      'Professional branding techniques',
      'Keyword optimization for visibility',
      'Content showcase methods',
      'Authority signals integration'
    ],
    resources: {
      duration: '22 min',
      templates: 5,
      pdfs: 3
    }
  },
  {
    id: 'linkedin-03',
    track: 'linkedin',
    category: 'LinkedIn Strategy',
    title: 'LinkedIn Engagement Tactics',
    description: 'Master strategic engagement to build relationships and visibility.',
    icon: 'message-circle',
    roles: ['founder', 'writer'],
    featured: true,
    submodules: [
      'Strategic comment frameworks',
      'Relationship building techniques',
      'Visibility enhancement tactics',
      'Network expansion strategies',
      'Engagement automation tools'
    ],
    resources: {
      duration: '26 min',
      templates: 6,
      pdfs: 4
    }
  }
];

// Main functions for module rendering
function initModulesSection() {
  // Render all modules initially
  renderModules('all', 'all');
  
  // Set up filter button event listeners
  document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all filter buttons
      document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Get current active track
      const activeTrack = document.querySelector('.tab-btn.active').dataset.track;
      
      // Get filter value from button
      const filter = this.dataset.filter;
      
      // Render modules with selected filter and track
      renderModules(filter, activeTrack);
    });
  });
  
  // Set up track tab event listeners
  document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all tab buttons
      document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Get current active filter
      const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
      
      // Get track value from button
      const track = this.dataset.track;
      
      // Render modules with selected filter and track
      renderModules(activeFilter, track);
    });
  });
}

function renderModules(roleFilter, trackFilter) {
  const modulesGrid = document.getElementById('modules-grid');
  
  // Clear current modules
  modulesGrid.innerHTML = '';
  
  // Filter modules based on selected filter and track
  let filteredModules = moduleData;
  
  // Filter by role if not 'all'
  if (roleFilter !== 'all') {
    filteredModules = filteredModules.filter(module => 
      module.roles && module.roles.includes(roleFilter)
    );
  }
  
  // Filter by track if not 'all'
  if (trackFilter !== 'all') {
    filteredModules = filteredModules.filter(module => 
      module.track === trackFilter
    );
  }
  
  // Update count of visible modules
  document.getElementById('visible-modules-count').textContent = filteredModules.length;
  
  // If no modules match the filters, show empty state
  if (filteredModules.length === 0) {
    modulesGrid.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🔍</div>
        <div class="empty-state-text">No modules match your current filters</div>
        <button class="empty-state-action" onclick="resetFilters()">Reset Filters</button>
      </div>
    `;
    return;
  }
  
  // Create and append module cards with staggered animation
  filteredModules.forEach((module, index) => {
    const moduleCard = createModuleCard(module);
    modulesGrid.appendChild(moduleCard);
    
    // Add staggered animation
    setTimeout(() => {
      moduleCard.classList.add('fadeIn');
    }, 50 * index);
  });
  
  // Initialize module interaction
  initModuleInteraction();
  
  // Initialize feather icons in the newly created elements
  if (typeof feather !== 'undefined') {
    feather.replace();
  }
}

function createModuleCard(module) {
  // Create module card element
  const card = document.createElement('div');
  card.className = 'module-card';
  card.dataset.id = module.id;
  
  // Add featured class if module is featured
  if (module.featured) {
    card.classList.add('featured');
  }
  
  // Create track tag display
  const trackTag = `<div class="module-track-tag" style="background: ${getTrackColor(module.track)}">${module.category}</div>`;
  
  // Create roles badges HTML
  const rolesBadges = module.roles.map(role => 
    `<span class="role-tag ${role}">
       <i data-feather="${getRoleIcon(role)}" class="role-icon" width="10" height="10"></i> 
       ${getRoleName(role)}
     </span>`
  ).join('');
  
  // Create submodules list HTML
  const submodulesList = module.submodules.map(submodule => 
    `<li>${submodule}</li>`
  ).join('');
  
  // Set the card HTML content
  card.innerHTML = `
    ${trackTag}
    <div class="module-header">
      <div class="module-icon">
        <i data-feather="${module.icon}"></i>
      </div>
      <h3 class="module-title">${module.title}</h3>
    </div>
    <p class="module-description">${module.description}</p>
    <div class="module-meta">
      <div class="module-roles">
        ${rolesBadges}
      </div>
      <div class="module-stats">
        <span>${module.resources.duration}</span>
        <span class="stat-divider">•</span>
        <span>${module.submodules.length} Submodules</span>
        <span class="stat-divider">•</span>
        <span>${module.resources.templates + module.resources.pdfs} Resources</span>
      </div>
    </div>
    <div class="module-expand">
      <button class="expand-btn">View Submodules <span>↓</span></button>
    </div>
    <div class="expanded-content">
      <h4 class="submodules-title">This Module Includes:</h4>
      <ul class="submodules-list">
        ${submodulesList}
      </ul>
    </div>
  `;
  
  return card;
}

function initModuleInteraction() {
  // Set up expand/collapse functionality
  document.querySelectorAll('.expand-btn').forEach(button => {
    button.addEventListener('click', function() {
      const card = this.closest('.module-card');
      card.classList.toggle('expanded');
      
      // Change button text based on state
      this.innerHTML = card.classList.contains('expanded') 
        ? 'Close <span>↑</span>'
        : 'View Submodules <span>↓</span>';
    });
  });
}

function resetFilters() {
  // Reset role filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
  
  // Reset track tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelector('.tab-btn[data-track="all"]').classList.add('active');
  
  // Re-render all modules
  renderModules('all', 'all');
}

// Helper functions for visual elements

function getTrackColor(track) {
  const trackColors = {
    'basic': 'var(--blue)',
    'advanced': 'var(--pink)',
    'delegation': '#8b5cf6',
    'editing': '#fbbf24',
    'monetisation': '#10b981',
    'conversions': '#f472b6',
    'repurposing': '#22c55e',
    'linkedin': 'var(--orange)',
    'research': '#6366f1',
    'posting': '#0ea5e9'
  };
  
  return trackColors[track] || 'var(--blue)';
}

function getRoleIcon(role) {
  const roleIcons = {
    'founder': 'briefcase',
    'writer': 'edit',
    'editor': 'scissors', 
    'videographer': 'camera',
    'podcast': 'mic'
  };
  
  return roleIcons[role] || 'user';
}

function getRoleName(role) {
  const roleNames = {
    'founder': 'Founder',
    'writer': 'Writer',
    'editor': 'Editor',
    'videographer': 'Videographer',
    'podcast': 'Podcast Producer'
  };
  
  return roleNames[role] || role;
}

// Compatibility function for renderModulesList
export function renderModulesList() {
  // Initialize our new module section implementation
  initModulesSection();
  console.log('Modules section initialized via renderModulesList compatibility function');
}

// Make resetFilters available globally for the empty state button
window.resetFilters = resetFilters;