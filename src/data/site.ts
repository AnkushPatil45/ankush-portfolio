// ============================================================
//  PatilOS — single source of truth for all site content.
//  Every window reads from here. Edit content in ONE place.
// ============================================================

export const profile = {
  name: 'Ankush Patil',
  role: 'Cloud Engineer',
  location: 'Toronto, Ontario, Canada',
  workStatus: 'Authorized to work in Canada',
  available: true,
  email: 'ankushgp@icloud.com',
  github: 'https://github.com/AnkushPatil45',
  githubHandle: 'github.com/AnkushPatil45',
  linkedin: 'https://linkedin.com/in/ankush-p-a47664167',
  linkedinHandle: 'linkedin.com/in/ankush-p',
  gpa: '4.0 / 4.0',
  awsCerts: '3+',
  summary:
    "I design and secure cloud infrastructure - AWS first, Azure when the job is hybrid. Software engineering background, enterprise security operations experience, and a 2026 competition season that ended with gold at Skills Ontario and silver at the Skills Canada Nationals in cloud computing.",
  ethos:
    'I like systems that survive failure quietly: multi-AZ by default, least privilege everywhere, infrastructure written as code so it builds the same way twice.',
  disciplines: ['Cloud Architecture', 'Cybersecurity', 'AI & Cloud Automation', 'Software Engineering'],
} as const;

export type TimelineItem = { title: string; year: string; w: number };
export const education: TimelineItem[] = [
  { title: "B.Tech, Computer Engineering - SVKM's Institute of Technology", year: '2022', w: 40 },
  { title: 'PG Cybersecurity - Georgian College', year: '2024-25', w: 70 },
  { title: 'Cloud Architecture & Administration - Seneca Polytechnic', year: '2025-26', w: 100 },
];

export type Medal = {
  metal: 'gold' | 'silver';
  label: string;
  event: string;
  year: string;
  note: string;
};
export const medals: Medal[] = [
  {
    metal: 'gold',
    label: 'Gold',
    event: 'Skills Ontario - provincial championships',
    year: '2026',
    note: "First in the province. Timed build, scored rubric, live judges - infrastructure that either works or doesn't.",
  },
  {
    metal: 'silver',
    label: 'Silver',
    event: 'Skills Canada Nationals - Toronto, representing Ontario',
    year: '2026',
    note: 'Second in the country, on a floor where every competitor was a provincial champion.',
  },
];

export type Project = {
  slug: string;
  label: string;
  href?: string;
  tag: string;
  blurb: string;
  stack: string[];
};
export const projects: Project[] = [
  {
    slug: 'house-of-north/',
    label: 'house-of-north/',
    tag: 'SENECA CAPSTONE',
    blurb:
      'Multi-AZ e-commerce on AWS: ECS Fargate behind CloudFront + WAF, Aurora and ElastiCache in private subnets, KMS throughout, GitHub Actions CI/CD - all in Terraform.',
    stack: ['ECS Fargate', 'Aurora', 'ElastiCache', 'WAF', 'KMS', 'CloudFront', 'Terraform'],
  },
  {
    slug: 'build-roulette/',
    label: 'build-roulette/ ↗',
    href: 'https://buildroulette.dev',
    tag: 'PERSONAL PROJECT',
    blurb:
      'A side project about Engineering Decision Records - documenting why systems end up shaped the way they are. Live at buildroulette.dev.',
    stack: ['Engineering Decision Records', 'Content platform'],
  },
  {
    slug: 'eks-irsa/',
    label: 'eks-irsa/',
    tag: 'KUBERNETES',
    blurb:
      'Amazon EKS with IAM Roles for Service Accounts: pod-level cloud identity instead of node-wide credentials. Helm releases, HPA under load.',
    stack: ['Amazon EKS', 'IRSA', 'Helm', 'HPA'],
  },
  {
    slug: 'azure-hybrid/',
    label: 'azure-hybrid/',
    tag: 'HYBRID INFRA',
    blurb:
      'On-prem joined to Azure over P2S VPN, governed via Azure Arc; Azure SQL + Cosmos DB on zone-redundant storage with Recovery Services backup.',
    stack: ['P2S VPN', 'Azure Arc', 'Azure SQL', 'Cosmos DB', 'ZRS', 'Recovery Services'],
  },
];

export type Job = { title: string; meta: string; year: string; bullets: string[] };
export const experience: Job[] = [
  {
    title: 'Cyber Security Analyst - Intact (Co-op)',
    meta: 'Toronto, ON · Hybrid',
    year: '2025',
    bullets: [
      'Administered CrowdStrike Falcon endpoint security - asset visibility and device compliance across the enterprise.',
      'Investigated alerts to root cause; remediated MFA enforcement gaps.',
      'Managed access provisioning across 130,000+ enterprise applications on least privilege.',
      'Delivered monthly compliance reports to IT leadership; ran L1/L2 incident triage.',
    ],
  },
  {
    title: 'Software Engineer - Persistent Systems',
    meta: 'Pune · On-site',
    year: '2022 - 2023',
    bullets: [
      'Monitored Splunk SIEM for brute-force attempts and anomalous access patterns.',
      'Built Python and PowerShell automation for network exposure scanning.',
      'Implemented SQL Server TDE and RBAC; supported incident response.',
    ],
  },
];

export type Cert = { name: string; year: string };
export const awsCerts: Cert[] = [
  { name: 'Solutions Architect - Associate', year: '2026' },
  { name: 'AI Practitioner', year: '2026' },
  { name: 'Cloud Practitioner', year: '2026' },
];
export const otherCerts: Cert[] = [
  { name: 'Google Cybersecurity Professional Certificate', year: '2026' },
  { name: '28 CrowdStrike certifications · 7 domains', year: '2026' },
];

// Badge image basenames (kebab-case files live in src/assets/badges).
export const awsBadges = ['solutions-architect', 'ai-practitioner', 'cloud-practitioner'];
export const trainingBadges = [
  'cloud-architecting',
  'cloud-security-builder',
  'cloud-security-foundations',
  'generative-ai-foundations',
  'cloud-developing',
  'cloud-foundations',
];

export const openTo = ['Cloud Engineer', 'Cloud Security Engineer', 'Solutions Architect', 'DevOps / Platform'];

export const skills: Record<string, string> = {
  cloud: 'AWS · ECS Fargate · EKS/IRSA · CloudFront · WAF · KMS',
  iac: 'Terraform · CI/CD (GitHub Actions)',
  security: 'CrowdStrike Falcon · Splunk SIEM · least privilege · MFA',
  azure: 'Azure Arc · P2S VPN · Azure SQL · Cosmos DB · ZRS',
  code: 'Python · PowerShell · SQL',
};
