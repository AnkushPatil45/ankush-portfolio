// ============================================================
//  PatilOS - single source of truth for all site content.
//  Every window reads from here. Edit content in ONE place.
// ============================================================

export const profile = {
  name: 'Ankush Patil',
  role: 'Cloud Architect',
  workStatus: 'Open to Cloud Architect roles across Canada and India, on-site or remote',
  available: true,
  email: 'ankushgp@icloud.com',
  github: 'https://github.com/AnkushPatil45',
  githubHandle: 'github.com/AnkushPatil45',
  linkedin: 'https://linkedin.com/in/ankush-p-a47664167',
  linkedinHandle: 'linkedin.com/in/ankush-p',
  gpa: '4.0 / 4.0',
  awsCerts: '3+',
  summary:
    "Cloud Architect. I design, migrate and secure production workloads on AWS and Azure - and I build them assuming someone will try to break them. I led an enterprise migration from on-premises to a containerized AWS platform, and hardened cloud accounts for one of Canada's largest insurers by shifting security into the delivery pipeline. A 2026 season that ended in gold (Skills Ontario) and silver (Skills Canada Nationals) in cloud computing.",
  ethos:
    "Good infrastructure is mostly restraint - spend where it buys real resilience, save where it doesn't, lock access down by default, and keep everything in code so there are no surprises at 2 a.m. The goal isn't the most impressive diagram. It's the system nobody has to think about.",
  disciplines: ['Cloud Architecture', 'Cloud Security', 'Migration & Modernization', 'AI & Cloud Automation'],
} as const;

export type TimelineItem = { title: string; year: string; w: number };
export const education: TimelineItem[] = [
  { title: "B.Tech, Computer Engineering - SVKM's Institute of Technology", year: '2018-22', w: 40 },
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
    event: 'Skills Canada Nationals - representing Ontario',
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
      'A live AWS e-commerce platform built for House of North - storefront on ECS Fargate behind CloudFront + WAF, an Aurora data tier, KMS throughout, and every environment reproducible through Terraform. Includes an automated Amazon Connect voice flow (Lex, Polly, Transcribe) that deflects routine support contacts.',
    stack: ['ECS Fargate', 'Aurora', 'CloudFront', 'WAF', 'KMS', 'Terraform', 'Amazon Connect'],
  },
  {
    slug: 'build-roulette/',
    label: 'build-roulette/ ↗',
    href: 'https://buildroulette.dev',
    tag: 'PERSONAL PROJECT',
    blurb:
      'A side project documenting 5 Engineering Decision Records - the options weighed, trade-offs and final call behind each core design choice. Live at buildroulette.dev.',
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
    title: 'Cloud Security Engineer - Intact',
    meta: 'Hybrid',
    year: '2025',
    context: "Intact - Canada's largest property & casualty insurer · cloud security engineering",
    scope: 'Hardening AWS accounts and shifting security into the delivery pipelines application teams use to provision infrastructure.',
    bullets: [
      'Embedded with the cloud security team to harden AWS accounts and shift security into the pipelines application teams used to provision infrastructure.',
      'Built secure-by-default Terraform baselines enforcing network segmentation, least-privilege IAM and mandatory KMS encryption, so teams provisioned compliant environments without hand-rolled, drift-prone configurations.',
      'Added automated policy checks and security scanning to GitHub Actions pipelines, blocking non-compliant changes - open security groups, unencrypted storage, wildcard IAM - before they reached production.',
      'Remediated open security-scan findings by scoping over-permissive IAM to least-privilege and closing encryption and public-access gaps on S3 and RDS, clearing the backlog ahead of an internal compliance review.',
    ],
    tags: ['Terraform', 'IAM least-privilege', 'KMS', 'GitHub Actions', 'Policy-as-code', 'AWS security'],
  },
  {
    title: 'Cloud Architect - Persistent Systems',
    meta: 'Pune · On-site',
    year: '2022 - 2024',
    context: 'Persistent Systems - global IT services & digital engineering firm',
    scope: 'End-to-end migration of an enterprise retail platform from on-premises to a containerized, highly available AWS architecture.',
    bullets: [
      "Led the end-to-end migration of an enterprise retail client's monolithic on-premises application to AWS - owning the target architecture, migration plan and production cutover after the platform buckled under seasonal traffic.",
      'Re-platformed onto ECS Fargate behind an Application Load Balancer, fronted with CloudFront and AWS WAF, and migrated the database to RDS Aurora via AWS DMS with a rehearsed, near-zero-downtime weekend cutover.',
      'Automated the full stack - networking, compute, data and IAM - with reusable Terraform modules and GitHub Actions CI/CD, taking releases from multi-week cycles to on-demand deployments in under an hour.',
      'Designed multi-AZ high availability with auto-scaling, automated backups and a DR strategy to defined RTO/RPO targets, monitored through CloudWatch dashboards and alarms.',
      'Reduced monthly cloud cost by right-sizing compute and planning reserved capacity, hardening the account with IAM least-privilege and KMS encryption as standard.',
    ],
    tags: ['AWS migration', 'ECS Fargate', 'RDS Aurora', 'Terraform', 'CI/CD', 'Multi-AZ HA', 'DR'],
  },
];

export type Cert = { name: string; year: string };
export const awsCerts: Cert[] = [
  { name: 'Solutions Architect - Associate', year: '2026' },
  { name: 'AI Practitioner', year: '2026' },
  { name: 'Cloud Practitioner', year: '2026' },
];
export const otherCerts: Cert[] = [
  { name: 'Google Cybersecurity Professional Certificate', year: '2023' },
  { name: '28 CrowdStrike certifications · 7 domains', year: '2025' },
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

export const openTo = ['Cloud Architect', 'Solutions Architect', 'Cloud Security Engineer', 'DevOps / Platform'];

export const skills: Record<string, string> = {
  cloud: 'AWS · Azure · ECS Fargate · Amazon EKS · CloudFront · Route 53 · WAF',
  iac: 'Terraform · AWS CDK · CloudFormation · GitHub Actions CI/CD',
  security: 'IAM least-privilege · KMS · policy-as-code · encryption · cost governance',
  data: 'RDS Aurora · ElastiCache · Azure SQL · Cosmos DB · S3',
  ai: 'Amazon Connect · Lex · Polly · Transcribe · Bedrock',
  code: 'Python · PowerShell · Bash · SQL',
};
