# TeamUP 🤝

# >>> [http://95.179.140.32:3004/](http://95.179.140.32:3004/) <<<

**AI Agent to Form Aligned Teams**

What makes a great team — shared skills, or shared ways of thinking?

Can ideas grow without conversation that challenges and refines them?

Why do we still match by keywords, and brainstorm on blank docs? What if building a team and an idea started with a dialogue — one that understood you, questioned you, and connected you? 

**We're building that dialogue.**

## 🎯 Project Overview

TeamUP is an AI-powered platform that revolutionizes team formation by moving beyond superficial keyword matching to create meaningful dialogue that aligns people based on complementary thinking patterns, shared values, and collaborative potential.

## 🏗️ Repository Structure

This monorepo contains all components of the TeamUP ecosystem:

```
teamup/
├── design/          # Design system, assets, and prototypes
├── frontend/        # React/Next.js web application
├── backend/         # API server and business logic
├── infra/          # Infrastructure as code and deployment configs
├── docs/           # Documentation and project specifications
└── scripts/        # Shared build and development scripts
```

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/your-org/teamup.git
cd teamup

# Install dependencies and start development envionment
setup.sh
```

## 📐 Design

**Location:** [`/design`](./design)

Our design system and visual identity that powers the TeamUP experience.

### What's Inside
- **Design System**: Comprehensive component library and style guide
- **Assets**: Logos, icons, illustrations, and brand materials
- **Prototypes**: Interactive mockups and user flow demonstrations
- **Research**: User research findings and design decisions

### Key Tools
- Figma for design collaboration
- Storybook for component documentation

---

## 🎨 Frontend

**Location:** [`/frontend`](./frontend)

The user-facing web application that delivers the TeamUP experience.

### What's Inside
- **React/Next.js** application with TypeScript
- **Real-time chat** and collaboration features
- **AI dialogue interface** for team formation
- **Responsive design** optimized for all devices

### Key Features
- Interactive team formation wizard
- Real-time messaging and notifications
- Profile management and skill assessment
- Team collaboration workspace

### Tech Stack
- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Headless UI
- **State Management:** Zustand
- **Real-time:** Socket.io
- **Testing:** Jest + React Testing Library

---

## ⚙️ Backend

**Location:** [`/backend`](./backend)

The API server and core business logic powering TeamUP's intelligent matching.

### What's Inside
- **FastAPI application** with automatic OpenAPI docs
- **AI/ML pipeline** for team matching algorithms using LangChain
- **Real-time WebSocket** connections for live collaboration
- **User management** and JWT authentication
- **Team formation** and collaboration logic

### Key Features
- Advanced matching algorithms using NLP and behavioral analysis
- Real-time WebSocket connections for live collaboration
- Scalable microservices architecture
- Comprehensive API documentation

### Tech Stack
- **Framework:** FastAPI
- **Language:** Python 3.11+
- **Database:** PostgreSQL + Redis
- **AI/ML:** OpenAI API + LangChain
- **Real-time:** WebSockets
- **Testing:** pytest + httpx

### Getting Started
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload  # Start development server
pytest                               # Run tests
alembic upgrade head                 # Run database migrations
```

---

## 🚀 Infrastructure

**Location:** [`/infra`](./infra)

Manual deployment configurations and documentation for Vultr Cloud infrastructure.

### What's Inside
- **Vultr Cloud** server configurations and setup guides

### Key Features
- Production-ready server configurations
- Scalable cloud infrastructure on Vultr
- Automated deployment scripts
- Comprehensive monitoring and alerting
- Security hardening and compliance

### Tech Stack
- **Cloud Provider:** Vultr Cloud
- **Deployment:** Manual setup with optional bash scripts

---

## 🛠️ Development Workflow

### Branch Strategy
- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - Individual feature branches
- `hotfix/*` - Critical production fixes

### Commit Convention
We use [Conventional Commits](https://www.conventionalcommits.org/) for consistent versioning:

```
feat(frontend): add team formation wizard
fix(backend): resolve matching algorithm edge case
docs(readme): update deployment instructions
```

### Code Quality
- **ESLint + Prettier** for consistent code formatting
- **Husky** for pre-commit hooks
- **TypeScript** strict mode across all projects
- **Test coverage** minimum 80% for all components

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guide](./CONTRIBUTING.md) for details on our development process, coding standards, and how to submit pull requests.

### Development Setup
1. **Fork** the repository
2. **Clone** your fork locally
3. **Install** dependencies: `npm install`
4. **Create** a feature branch: `git checkout -b feature/amazing-feature`
5. **Make** your changes and add tests
6. **Commit** using conventional commits
7. **Push** to your fork and submit a pull request


## 🚨 Support

- **Issues:** [GitHub Issues](https://github.com/your-org/teamup/issues)
- **Discussions:** [GitHub Discussions](https://github.com/your-org/teamup/discussions)
- **Slack:** #teamup-support (for team members)
- **Email:** support@teamup.ai

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🎉 Acknowledgments

- Our amazing team of designers, developers, and researchers
- The open-source community for incredible tools and inspiration
- Early users and testers who helped shape the product

---

<div align="center">
  <strong>Building the future of team collaboration, one dialogue at a time.</strong>
  <br>
  <sub>Made with ❤️ by the TeamUP team</sub>
</div>