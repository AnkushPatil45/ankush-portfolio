// ============================================================
//  PatilOS - single source of truth for all site content.
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
    "Cloud Engineer, Toronto. I design and secure cloud infrastructure the way I was trained to - assuming someone will try to break it. Behind that: a software-engineering background, security-operations experience at one of Canada's largest insurers, and a 2026 season that ended in gold (Skills Ontario) and silver (Skills Canada Nationals) in cloud computing.",
  ethos:
    "Good infrastructure is mostly restraint - spend where it buys real resilience, save where it doesn't, lock access down by default, and keep everything in code so there are no surprises at 2 a.m. The goal isn't the most impressive diagram. It's the system nobody has to think about.",
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
    tag: 'PRODUCTION AWS',
    blurb:
      'Production-grade AWS e-commerce infrastructure built for House of North - multi-AZ ECS Fargate behind CloudFront + WAF, Aurora and ElastiCache in private subnets, KMS throughout, GitHub Actions CI/CD, all in Terraform.',
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

export type Job = {
  title: string;
  meta: string;
  year: string;
  context: string;
  scope: string;
  bullets: string[];
  tags: string[];
};
export const experience: Job[] = [
  {
    title: 'Cyber Security Analyst - Intact (Co-op)',
    meta: 'Toronto, ON · Hybrid',
    year: '2025',
    context: "Intact - Canada's largest property & casualty insurer · enterprise security operations",
    scope: 'Endpoint application control, sensor hygiene, and data-protection support in a hybrid enterprise SOC.',
    bullets: [
      'CyberArk Application Control: analyzed and categorized 100,000+ Windows and 30,000+ macOS applications (allow / block / validate) to shape least-privilege policies governing which software can run and install on endpoints.',
      'Improved CrowdStrike endpoint hygiene across a 50,000+ device estate - surfaced unmanaged assets (no sensor installed) and outdated sensor versions, restoring protected, current coverage.',
      'Remediated MFA enforcement gaps across ~500 user accounts and delivered monthly compliance reporting to IT leadership.',
      'Provided operational support to the Data Protection team, helping keep endpoint protection comprehensive.',
      'Researched and co-presented a Lunch & Learn on AI-driven social engineering, sharing practical insight on an emerging threat across the security org.',
      'Deepening expertise via CrowdStrike University and Varonis training; pursuing the CrowdStrike Falcon Administrator certification.',
    ],
    tags: ['CyberArk Application Control', 'CrowdStrike Falcon', 'Endpoint hygiene', 'MFA', 'Data protection', 'Least privilege'],
  },
  {
    title: 'Software Engineer - Persistent Systems',
    meta: 'Pune · On-site',
    year: '2022 - 2023',
    context: 'Persistent Systems - global IT services & digital engineering firm',
    scope: 'Security-focused engineering across enterprise infrastructure - monitoring, automation, and database hardening.',
    bullets: [
      'Monitored authentication, system, and network logs in Splunk SIEM to detect brute-force attempts and anomalous access patterns across distributed infrastructure.',
      'Automated network-exposure scanning with Python and PowerShell, flagging unauthorized open ports and generating daily security-posture reports for infrastructure teams.',
      'Hardened the data layer with SQL Server TDE and role-based access control (RBAC), enforcing least-privilege data access.',
      'Supported incident response - isolating affected servers via firewall rules, analyzing traffic in Wireshark, and driving post-incident security improvements.',
    ],
    tags: ['Splunk SIEM', 'Python', 'PowerShell', 'SQL Server TDE', 'RBAC', 'Wireshark'],
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
  security: 'CrowdStrike Falcon · CyberArk Application Control · Splunk SIEM · least privilege',
  azure: 'Azure Arc · P2S VPN · Azure SQL · Cosmos DB · ZRS',
  code: 'Python · PowerShell · SQL',
};
