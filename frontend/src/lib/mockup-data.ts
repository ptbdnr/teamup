import { Team, Project, User } from './types';

export const mockupUsers: User[] = [
    {
      id: '1',
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
      id: '2',
      name: 'Brenda Smith',
      avatar: 'https://placehold.co/100x100.png',
      dataAiHint: "woman portrait",
      role: 'Backend Developer',
      skills: ['Node.js', 'Python', 'PostgreSQL', 'Docker', 'AI'],
      interests: ['Data Science', 'Machine Learning', 'APIs'],
      discord: '#',
    },
    {
      id: '3',
      name: 'Charlie Brown',
      avatar: 'https://placehold.co/100x100.png',
      dataAiHint: "person portrait",
      role: 'UI/UX Designer',
      skills: ['Figma', 'User Research', 'Prototyping', 'Accessibility'],
      interests: ['Mobile Design', 'Minimalism', 'User Psychology'],
      discord: '#',
    },
    {
      id: '4',
      name: 'David Lee',
      avatar: 'https://placehold.co/100x100.png',
      dataAiHint: "man portrait",
      role: 'Data Scientist',
      skills: ['Python', 'TensorFlow', 'scikit-learn', 'Pandas'],
      interests: ['NLP', 'Computer Vision', 'Big Data'],
      discord: '#',
    },
    {
      id: '5',
      name: 'Emily White',
      avatar: 'https://placehold.co/100x100.png',
      dataAiHint: "woman portrait",
      role: 'Data Engineer',
      skills: ['Spark', 'Kafka', 'Airflow', 'SQL'],
      interests: ['ETL Pipelines', 'Cloud Architecture', 'Real-time Data'],
      discord: '#',
    },
    {
      id: '6',
      name: 'Frank Green',
      avatar: 'https://placehold.co/100x100.png',
      dataAiHint: "person portrait",
      role: 'Frontend Developer',
      skills: ['D3.js', 'React', 'TypeScript', 'GraphQL'],
      interests: ['Data Visualization', 'Interactive Dashboards', 'User Experience'],
      discord: '#',
    },
    {
      id: '7',
      name: 'Grace Hall',
      avatar: 'https://placehold.co/100x100.png',
      dataAiHint: "woman portrait",
      role: 'Cloud Architect',
      skills: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD'],
      interests: ['Serverless', 'Microservices', 'DevOps'],
      discord: '#',
    },
    {
      id: '8',
      name: 'Henry King',
      avatar: 'https://placehold.co/100x100.png',
      dataAiHint: "man portrait",
      role: 'Full-Stack Developer',
      skills: ['Go', 'React', 'gRPC', 'MongoDB'],
      interests: ['Distributed Systems', 'Performance Optimization', 'Security'],
      discord: '#',
    },
    {
      id: '9',
      name: 'Ivy Adams',
      avatar: 'https://placehold.co/100x100.png',
      dataAiHint: "person portrait",
      role: 'SRE',
      skills: ['Prometheus', 'Grafana', 'Ansible', 'Linux'],
      interests: ['Observability', 'Automation', 'Incident Response'],
      discord: '#',
    },    
];

export const mockupProjects: Project[] = [
    {
      id: 'innovators-app',
      name: 'Innovators AI App',
      shortDescription: 'A web application showcasing the AI capabilities built by the team.',
      longDescription: 'This project is a web application that leverages AI to provide innovative solutions for users. It includes features such as personalized recommendations, intelligent search, and data visualization.',
      teamId: 'innovators',
      graphCoordinates: {
        result: 0.7,
        method: 0.6,
        social: 0.1,
      }
    },
    {
      id: 'data-wizards-dashboard',
      name: 'Data Wizards Dashboard',
      shortDescription: 'Interactive dashboards for visualizing data insights.',
      longDescription: 'This project focuses on creating interactive dashboards that allow users to visualize and analyze data insights. It includes features such as real-time data updates, customizable views, and advanced filtering options.',
      teamId: 'data-wizards',
      graphCoordinates: {
        result: 0.1,
        method: 0.9,
        social: 0.1,
      }
    },
    {
      id: 'cloud-pioneers-platform',
      name: 'Cloud Pioneers Platform',
      shortDescription: 'A scalable cloud platform for deploying and managing applications.',
      longDescription: 'This project is a cloud platform that provides tools for deploying and managing applications at scale. It includes features such as automated scaling, monitoring, and deployment pipelines.',
      teamId: 'cloud-pioneers',
      graphCoordinates: {
        result: 0.5,
        method: 0.5,
        social: 0.7,
      }
    },
  ]
  
  export const mockupTeams: Team[] = [
    {
      id: 'innovators',
      name: 'InovTeam',
      userIds: ['1', '2', '3'],
    },
    {
      id: 'data-wizards',
      name: 'WizzTeam',
      userIds: ['4', '5', '6'],
    },
    {
      id: 'cloud-pioneers',
      name: 'ThePioneers',
      userIds: ['7', '8', '9'],
    },
  ];
  
  export const myTeamId = 'innovators';