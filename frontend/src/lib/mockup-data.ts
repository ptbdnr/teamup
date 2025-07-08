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
      id: 'ai-powered-chatbot',
      name: 'AI-Powered Chatbot',
      shortDescription: 'A chatbot that uses AI to provide intelligent responses.',
      longDescription: 'This project is an AI-powered chatbot that can understand and respond to user queries in natural language. It leverages machine learning algorithms to improve its responses over time.',
      teamId: '',
      graphCoordinates: {
        result: 0.8,
        method: 0.5,
        social: 0.2,
      }
    },
    {
      id: 'machine-learning-pipeline',
      name: 'Machine Learning Pipeline',
      shortDescription: 'A pipeline for training and deploying machine learning models.',
      longDescription: 'This project focuses on building a robust machine learning pipeline that automates the process of training, validating, and deploying models. It includes features such as data preprocessing, model selection, and performance monitoring.',
      teamId: '',
      graphCoordinates: {
        result: 0.6,
        method: 0.8,
        social: 0.1,
      }
    },
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
    {
      id: 'ops-pilot',
      name: 'OpsPilot',
      shortDescription: 'AI-powered personal assistant for email management and scheduling.',
      longDescription: 'OpsPilot enhances productivity and communication for professionals by leveraging AI and automation. It acts as a personal assistant for email management and scheduling, reducing time spent on administrative tasks. Features include intelligent integrations with Google Calendar, Gmail, and Coral Protocol, AI-powered summaries, inbox management, and insightful reports.',
      teamId: '',
      graphCoordinates: {
        result: 0.8,
        method: 0.4,
        social: 0.6,
      }
    },
    {
      id: 'jhadepilot',
      name: 'JHADEPILOT',
      shortDescription: 'AI-powered platform converting ideas to deployable code.',
      longDescription: 'JHADEPILOT is a next-generation AI-powered platform that helps developers convert ideas into working code with automated build, test, and deployment pipelines. Features a multi-agent system with BuildAgent, TestAgent, and DeployAgent working together to generate, test, and deploy production-ready code from simple prompts.',
      teamId: '',
      graphCoordinates: {
        result: 0.9,
        method: 0.8,
        social: 0.2,
      }
    },
    {
      id: 'helpme-study-assistant',
      name: 'HelpMe Study Assistant',
      shortDescription: 'AI-powered study assistant for instant academic answers.',
      longDescription: 'HelpMe – Ask Get Learn is an AI-powered study assistant designed to provide instant, accurate answers to academic questions. Built using the Blackbox API, it simplifies complex topics into clear, understandable responses. Especially aimed at helping students in developing countries who lack access to quality educational resources.',
      teamId: '',
      graphCoordinates: {
        result: 0.7,
        method: 0.5,
        social: 0.9,
      }
    },
    {
      id: 'codesentinel-ai',
      name: 'CodeSentinel AI',
      shortDescription: 'Automated code review assistant for quality and security.',
      longDescription: 'CodeSentinel AI is an automated code review assistant designed to fix slow and error-prone manual reviews. Uses AI technologies like Meta\'s Llama 3 model and Groq API to instantly analyze code for quality, security, and performance. Provides immediate, actionable feedback to reduce project delays and improve code quality.',
      teamId: '',
      graphCoordinates: {
        result: 0.8,
        method: 0.9,
        social: 0.3,
      }
    },
    {
      id: 'ai-developer-dashboard',
      name: 'AI Developer Dashboard Suite',
      shortDescription: 'Next-generation productivity platform for developers.',
      longDescription: 'The AI Developer Dashboard Suite is a comprehensive productivity platform designed to empower developers with advanced AI-powered tools in a unified interface. Built with Next.js, Tailwind CSS, and TypeScript, offering real-time code assistance, intelligent code review, rapid prototyping, and seamless automation for testing and deployment.',
      teamId: '',
      graphCoordinates: {
        result: 0.6,
        method: 0.7,
        social: 0.5,
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