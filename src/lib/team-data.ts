export type Member = {
  name: string;
  avatar: string;
  dataAiHint: string;
  role: string;
  skills: string[];
  interests: string[];
  discord: string;
  isYou?: boolean;
};

export type Team = {
  id: string;
  name: string;
  description: string;
  members: Member[];
};

export const teams: Team[] = [
  {
    id: 'innovators',
    name: 'The Innovators',
    description: 'Focused on building next-gen developer tools with AI.',
    members: [
      {
        name: 'Alex Johnson',
        avatar: 'https://placehold.co/100x100.png',
        dataAiHint: "man portrait",
        role: 'Frontend Developer',
        skills: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'AI'],
        interests: ['AI Apps', 'Developer Tools', 'Design Systems'],
        discord: '#',
        isYou: true,
      },
      {
        name: 'Brenda Smith',
        avatar: 'https://placehold.co/100x100.png',
        dataAiHint: "woman portrait",
        role: 'Backend Developer',
        skills: ['Node.js', 'Python', 'PostgreSQL', 'Docker', 'AI'],
        interests: ['Data Science', 'Machine Learning', 'APIs'],
        discord: '#',
      },
      {
        name: 'Charlie Brown',
        avatar: 'https://placehold.co/100x100.png',
        dataAiHint: "person portrait",
        role: 'UI/UX Designer',
        skills: ['Figma', 'User Research', 'Prototyping', 'Accessibility'],
        interests: ['Mobile Design', 'Minimalism', 'User Psychology'],
        discord: '#',
      },
    ],
  },
  {
    id: 'data-wizards',
    name: 'Data Wizards',
    description: 'Harnessing the power of data with ML and beautiful visualizations.',
    members: [
      {
        name: 'David Lee',
        avatar: 'https://placehold.co/100x100.png',
        dataAiHint: "man portrait",
        role: 'Data Scientist',
        skills: ['Python', 'TensorFlow', 'scikit-learn', 'Pandas'],
        interests: ['NLP', 'Computer Vision', 'Big Data'],
        discord: '#',
      },
      {
        name: 'Emily White',
        avatar: 'https://placehold.co/100x100.png',
        dataAiHint: "woman portrait",
        role: 'Data Engineer',
        skills: ['Spark', 'Kafka', 'Airflow', 'SQL'],
        interests: ['ETL Pipelines', 'Cloud Architecture', 'Real-time Data'],
        discord: '#',
      },
      {
        name: 'Frank Green',
        avatar: 'https://placehold.co/100x100.png',
        dataAiHint: "person portrait",
        role: 'Frontend Developer',
        skills: ['D3.js', 'React', 'TypeScript', 'GraphQL'],
        interests: ['Data Visualization', 'Interactive Dashboards', 'User Experience'],
        discord: '#',
      },
    ],
  },
  {
    id: 'cloud-pioneers',
    name: 'Cloud Pioneers',
    description: 'Building scalable and resilient applications on the cloud.',
    members: [
      {
        name: 'Grace Hall',
        avatar: 'https://placehold.co/100x100.png',
        dataAiHint: "woman portrait",
        role: 'Cloud Architect',
        skills: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD'],
        interests: ['Serverless', 'Microservices', 'DevOps'],
        discord: '#',
      },
      {
        name: 'Henry King',
        avatar: 'https://placehold.co/100x100.png',
        dataAiHint: "man portrait",
        role: 'Full-Stack Developer',
        skills: ['Go', 'React', 'gRPC', 'MongoDB'],
        interests: ['Distributed Systems', 'Performance Optimization', 'Security'],
        discord: '#',
      },
      {
        name: 'Ivy Adams',
        avatar: 'https://placehold.co/100x100.png',
        dataAiHint: "person portrait",
        role: 'SRE',
        skills: ['Prometheus', 'Grafana', 'Ansible', 'Linux'],
        interests: ['Observability', 'Automation', 'Incident Response'],
        discord: '#',
      },
    ],
  },
];

export const myTeamId = 'innovators';
