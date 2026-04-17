import type { Project, Experience, Education, Achievement, Certification, Publication, Skill , InspirationItem } from '@/types'

export const siteConfig = {
  name: 'Mahmudul Haque Sakib',
  handle: 'SAKIB0004',
  title: 'AI/ML Engineer & Research Enthusiast',
  tagline: 'Building intelligent systems — from CNNs and Transformers to production-ready RAG pipelines.',
  bio: `I'm a Computer Science & Engineering graduate from East West University, Dhaka, specializing in Machine Learning, Natural Language Processing, and Computer Vision. I design and deploy end-to-end ML systems — from raw data to interactive, production-ready applications. I'm drawn to problems at the intersection of deep learning and real-world utility, particularly in medical AI, multilingual NLP, and retrieval-augmented generation.`,
  email: 'mahmudulhaque540@gmail.com',
  altEmail: 'mhsakib0004@gmail.com',
  phone: '01980284400',
  location: 'Dhaka, Bangladesh',
  github: 'https://github.com/SAKIB0004',
  linkedin: 'https://www.linkedin.com/in/mhsakib0004/',
  kaggle: 'https://www.kaggle.com/mhsakib4',
  codeforces: 'https://codeforces.com/profile/L0K11',
  codechef: 'https://www.codechef.com/users/mhsakib_12',
  availableForWork: true,
  resumeUrl: '/Mahmudul_Haque_Sakib_CV_ML.pdf',
}

export const projects: Project[] = [
  {
    id: 'medibot',
    title: 'MediBot — Source-Grounded Medical QA',
    description:
      'A portfolio-ready medical RAG assistant that answers questions from textbook content using Pinecone retrieval, Groq-powered generation, and a Streamlit chat interface.',
    problem:
      'Medical QA systems can hallucinate when they answer without evidence. MediBot reduces that risk by grounding responses in retrieved textbook chunks and applying safety-oriented fallback behavior.',
    features: [
      'RAG pipeline powered by Pinecone, LangChain, and Groq',
      'Medical book-only answering with source-grounded retrieval',
      'Similarity-threshold fallback for low-confidence queries',
      'Conversation-aware Streamlit chat UX with source display',
      'Dockerized deployment support with AWS EC2/ECR compatibility',
    ],
    tech: [
      'Python',
      'LangChain',
      'Pinecone',
      'Groq',
      'Streamlit',
      'Docker',
      'AWS',
    ],
    contribution:
      'Built the end-to-end applied GenAI pipeline, including ingestion, retrieval, response guardrails, chat UX, and deployment-ready structure.',
    github: 'https://github.com/SAKIB0004/Gen_AI_MediBot',
    category: 'nlp',
    featured: true,
    status: 'Featured',
  },
  {
    id: 'taskbot-sql-agent',
    title: 'TaskBot SQL Agent',
    description:
      'An AI-powered task management assistant that lets users manage a SQLite database through natural language instead of writing SQL manually.',
    problem:
      'Structured task data is difficult for non-technical users to manage directly through SQL or rigid interfaces. TaskBot makes task operations conversational and accessible.',
    features: [
      'Natural-language task management with SQL-backed CRUD operations',
      'LangChain + LangGraph memory for conversational interactions',
      'SQLite persistent storage for tasks',
      'Streamlit chat interface with modular project architecture',
      'Reset support for table state and task ID sequence',
    ],
    tech: [
      'Python',
      'LangChain',
      'LangGraph',
      'SQLite',
      'Streamlit',
      'Groq',
    ],
    contribution:
      'Designed the agent flow, memory-aware SQL interaction pattern, app structure, and UI-to-database execution pipeline.',
    github: 'https://github.com/SAKIB0004/taskbot-sql-agent',
    category: 'nlp',
    featured: true,
    status: 'Featured',
  },
  {
    id: 'rag-document-search',
    title: 'RAG Document Search',
    description:
      'An agentic document-question-answering system that ingests files, indexes them in FAISS, and returns grounded answers through a Streamlit interface.',
    problem:
      'Reading long documents manually is slow and inefficient. This project turns uploaded documents into a searchable knowledge base with retrieval-grounded answers.',
    features: [
      'Document ingestion for PDFs, URLs, and text files',
      'Recursive chunking and embedding workflow',
      'FAISS vector store for semantic retrieval',
      'LangGraph-based orchestration with retriever-first answering',
      'Optional Wikipedia fallback and expandable source viewer',
    ],
    tech: [
      'Python',
      'LangGraph',
      'LangChain',
      'FAISS',
      'Streamlit',
      'Groq',
      'Hugging Face',
    ],
    contribution:
      'Implemented the modular RAG pipeline, retrieval workflow, answering agent, and user-facing application structure.',
    github: 'https://github.com/SAKIB0004/RAG-Document-Search',
    category: 'nlp',
    featured: true,
    status: 'Featured',
  },
  {
    id: 'travel-planner',
    title: 'Travel Planner Using LangGraph and FastAPI',
    description:
      'A graph-based multi-agent travel planning system that combines smart trip parsing with real-world APIs for weather, country data, currency, and distance-aware planning.',
    problem:
      'Travel planning is time-consuming when users have to combine destination research, budget estimation, transportation, weather, and itinerary logic manually.',
    features: [
      'Multi-agent planner with coordinator and specialist agents',
      'Smart parsing for duration, destination, cities, budget, and interests',
      'Real-data integrations for weather, country info, exchange rates, and maps',
      'FastAPI backend with Streamlit frontend',
      'Caching and fallback design for more reliable responses',
    ],
    tech: [
      'Python',
      'LangGraph',
      'FastAPI',
      'Streamlit',
      'Groq',
      'REST APIs',
      'Caching',
    ],
    contribution:
      'Built the planning workflow, integrated real external data sources, and structured the app as a production-style agentic system.',
    github: 'https://github.com/SAKIB0004/Travel-Planner-Using-LangGraph-and-FastApi',
    category: 'nlp',
    featured: true,
    status: 'Featured',
  },
  {
    id: 'lemon-leaf-disease-detection',
    title: 'Lemon Leaf Disease Detection — Ensemble CNN + XAI',
    description:
      'An end-to-end plant disease classification project using multiple CNN backbones, weighted ensembling, and Grad-CAM/Ablation-CAM for interpretability.',
    problem:
      'Plant disease identification often requires expert knowledge and careful image inspection. This system automates lemon leaf disease classification with explainable predictions.',
    features: [
      'Multiple CNN backbones including ResNet50, EfficientNet-B0, MobileNetV2, and DenseNet121',
      'Weighted ensemble learning for final prediction',
      'Grad-CAM and Ablation-CAM visual explanations',
      'Standard classification evaluation workflow',
      'ImageFolder-compatible training and testing structure',
    ],
    tech: [
      'PyTorch',
      'Torchvision',
      'ResNet50',
      'EfficientNet',
      'DenseNet',
      'Grad-CAM',
      'Ablation-CAM',
    ],
    contribution:
      'Implemented the full computer-vision workflow, from multi-model training and ensemble design to XAI-based interpretation.',
    github: 'https://github.com/SAKIB0004/lemon-leaf-disease-detection-ensemble-xai',
    category: 'cv',
    featured: true,
    status: 'Featured',
  },
  {
    id: 'quickanswer-serper-agent',
    title: 'QuickAnswer Serper Agent',
    description:
      'A streaming AI web-search assistant that combines a Groq-hosted LLM, live Google Serper search, LangGraph memory, and a clean Streamlit chat interface.',
    problem:
      'Standard chatbot demos rely too heavily on static model knowledge and often lack maintainable architecture. QuickAnswer adds real-time web search and modular design for fresher answers.',
    features: [
      'Live Google Serper search integration',
      'Thread-based short-term memory with LangGraph',
      'Streaming token-by-token responses',
      'Modular production-style codebase',
      'Streamlit chat interface with reusable service layers',
    ],
    tech: [
      'Python',
      'Streamlit',
      'LangChain',
      'LangGraph',
      'Groq',
      'Google Serper API',
    ],
    contribution:
      'Built the modular tool-augmented assistant, including memory flow, search integration, and streaming UI architecture.',
    github: 'https://github.com/SAKIB0004/google_src_agent',
    category: 'nlp',
    featured: true,
    status: 'Featured',
  },
  {
    id: 'bangla-emotion-classification-xai',
    title: 'Bangla Emotion Classification with Transformers + XAI',
    description:
      'A multilingual NLP project for Bangla emotion classification using transformer fine-tuning and SHAP-based interpretability.',
    problem:
      'Emotion classification in Bangla is challenging because it is a relatively low-resource language. This project explores multilingual transformer models with explainability.',
    features: [
      'mBERT and XLM-RoBERTa fine-tuning',
      'Bangla text preprocessing workflow',
      'Comparative evaluation across transformer models',
      'SHAP-based interpretability for model understanding',
    ],
    tech: [
      'Python',
      'Transformers',
      'mBERT',
      'XLM-RoBERTa',
      'SHAP',
      'Hugging Face',
    ],
    contribution:
      'Worked on model selection, fine-tuning, preprocessing, evaluation, and interpretability analysis for Bangla NLP.',
    github: 'https://github.com/SAKIB0004/emotion-classification-with-transformers-xai',
    category: 'nlp',
    featured: false,
    status: 'Additional Project',
  },
  {
    id: 'market-assistant-bot',
    title: 'Market Assistant Bot',
    description:
      'A finance-oriented assistant for Telegram that delivers educational investing guidance and safe market commentary through a FastAPI + Groq backend.',
    problem:
      'Users often want investing help, but open-ended financial assistants can become unsafe by drifting into direct advice. This project applies guardrails and mode-based routing for safer responses.',
    features: [
      'Telegram bot interface with FastAPI webhook backend',
      'Investment coach mode for educational concepts',
      'Market commentary mode for neutral summaries',
      'Safety and compliance guardrails against stock-pick behavior',
      'Free-tier friendly deployment design',
    ],
    tech: [
      'Python',
      'FastAPI',
      'Groq',
      'Telegram Bot API',
      'Prompt Engineering',
      'Safety Guardrails',
    ],
    contribution:
      'Designed the mode-routing logic, safety behavior, prompt flow, and Telegram-to-LLM integration.',
    github: 'https://github.com/SAKIB0004/Market_Assistant_Bot',
    category: 'nlp',
    featured: false,
    status: 'Additional Project',
  },
  {
    id: 'langchain-web-search',
    title: 'LangChain Web Search',
    description:
      'A conversational AI search assistant that augments a Groq-powered LLM with DuckDuckGo, Arxiv, and Wikipedia tools inside a Streamlit interface.',
    problem:
      'A plain chatbot struggles when users need recent web information, academic paper lookup, or grounded general-knowledge retrieval. This project solves that with tool-augmented search.',
    features: [
      'Conversational search UI built with Streamlit',
      'DuckDuckGo web search integration',
      'Arxiv paper search and Wikipedia lookup',
      'Chat history support with visible tool traces',
      'Modular codebase for maintainability and extension',
    ],
    tech: [
      'Python',
      'Streamlit',
      'LangChain',
      'Groq',
      'DuckDuckGo',
      'Arxiv API',
      'Wikipedia API',
    ],
    contribution:
      'Built the agent-plus-tools workflow, UI structure, and modular code organization for a portfolio-ready search assistant.',
    github: 'https://github.com/SAKIB0004/Langchain-Web-Search',
    category: 'nlp',
    featured: false,
    status: 'Additional Project',
  },
]

export const experience: Experience[] = [
  {
    id: 'uta-ewu',
    role: 'Undergraduate Teaching Assistant',
    organization: 'East West University',
    duration: 'March 2025 – June 2025',
    location: 'Dhaka, Bangladesh',
    type: 'Part-time',
    responsibilities: [
      'Conducted programming lab sessions covering MS Office, HTML, and foundational computing for 50+ undergraduate students.',
      'Supported debugging and code review, improving student performance in practical assessments.',
      'Maintained academic documentation and coordinated closely with faculty to ensure seamless course delivery.',
      'Assisted students with technical questions and provided structured feedback to improve learning outcomes.',
    ],
  },
]

export const education: Education[] = [
  {
    id: 'ewu-cse',
    degree: 'B.Sc. in Computer Science and Engineering',
    major: 'Data Science',
    institution: 'East West University',
    duration: 'Feb 2022 – Dec 2025',
    location: 'Dhaka, Bangladesh',
    gpa: '3.68 / 4.00',
  },
  {
    id: 'nmc-hsc',
    degree: 'Higher Secondary Certificate (HSC)',
    major: 'Science',
    institution: 'Narsingdi Model College',
    duration: '2020',
    location: 'Narsingdi, Bangladesh',
    gpa: '4.83 / 5.00',
  },
  {
    id: 'bhuim-ssc',
    degree: 'Secondary School Certificate (SSC)',
    major: 'Science',
    institution: 'Bhuim High School',
    duration: '2018',
    location: 'Narsingdi, Bangladesh',
    gpa: '4.78 / 5.00',
  },
]

export const achievements: Achievement[] = [
  {
    id: 'merit-scholarship',
    title: 'Merit Scholarship',
    organization: 'East West University',
    year: '2025',
    description:
      'Awarded for maintaining a GPA of 3.90+ across three consecutive semesters — recognizing sustained academic excellence.',
    type: 'scholarship',
  },
  {
    id: 'medha-lalon',
    title: 'Medha Lalon Scholarship',
    organization: 'East West University',
    year: '2024',
    description:
      'Awarded for maintaining a GPA of 3.50+ across three consecutive semesters in Computer Science & Engineering.',
    type: 'scholarship',
  },
  {
    id: 'codeforces-pupil',
    title: 'Pupil Rank — Codeforces',
    organization: 'Codeforces',
    year: '2024',
    description:
      'Achieved Pupil rank (1255 rating) on Codeforces, solving 700+ algorithmic problems across competitive programming platforms.',
    type: 'competition',
    link: 'https://codeforces.com/profile/L0K11',
  },
  {
    id: 'codechef-2star',
    title: '2★ Rating — CodeChef',
    organization: 'CodeChef',
    year: '2024',
    description:
      'Earned a 2-star rating (1535) on CodeChef through consistent competitive programming performance.',
    type: 'competition',
    link: 'https://www.codechef.com/users/mhsakib_12',
  },
  {
    id: 'icida-acceptance',
    title: 'Research Accepted — ICIDA 2025',
    organization: 'ICIDA 2025 International Conference',
    year: '2025',
    description:
      'First-authored research on kidney stone detection with explainable AI accepted at the International Conference on Intelligent Data Analysis (ICIDA 2025).',
    type: 'award',
  },
]

/**
 * Featured certifications IDs in priority order (for homepage display)
 * These 6 certifications appear first and prominently on the homepage
 */
export const featuredCertificationIds = [
  'ai-engineer-for-data-scientists-associate',
  'rag-for-generative-ai-applications-specialization',
  'advanced-rag-vector-databases-retrievers',
  'agentic-ai-with-langchain-and-langgraph',
  'build-ai-agents-using-mcp',
  'fundamentals-of-building-ai-agents',
]

export const certifications: Certification[] = [
  {
    id: 'ai-engineer-for-data-scientists-associate',
    title: 'AI Engineer for Data Scientists Associate',
    organization: 'DataCamp',
    issuer: 'DataCamp',
    issueDate: '2026-04-12',
    description:
      'Associate-level certification focused on applying AI engineering concepts in practical data science workflows.',
    image: '/certificates/ai-engineer-for-data-scientists-associate.png',
    credentialId: 'AEDS0016556238778',
    skills: ['AI Engineering', 'Data Science', 'Model Development', 'Applied AI'],
    featured: true,
  },
  {
  id: 'rag-for-generative-ai-applications-specialization',
  title: 'RAG for Generative AI Applications',
  organization: 'Coursera',
  issuer: 'IBM',
  issueDate: '2026-04-05',
  description:
    'Specialization focused on building GenAI applications with Retrieval-Augmented Generation (RAG), covering vector search, retrievers, and end-to-end RAG workflows.',
  image: '/certificates/rag-for-generative-ai-applications-specialization.png',
  verifyUrl: 'https://coursera.org/verify/specialization/ZEW0KORZ0KJU',
  credentialId: 'ZEW0KORZ0KJU',
  skills: [
    'RAG',
    'Generative AI',
    'Vector Databases',
    'Retrievers',
    'LangChain',
    'FAISS',
    'ChromaDB'
  ],
  featured: true
  },
  {
    id: 'what-is-generative-ai',
    title: 'What Is Generative AI?',
    organization: 'LinkedIn Learning',
    issuer: 'LinkedIn Learning',
    issueDate: '2024-06-26',
    description:
      'Introductory course covering the fundamentals of generative AI, core concepts, and practical tools.',
    image: '/certificates/what-is-generative-ai.png',
    credentialId: 'e7e78c79d200abc9542ed36a5405e8397c0f3ccc24ece87d2f43e141ebd8d9a5',
    skills: ['Generative AI Tools', 'Artificial Intelligence (AI)', 'Generative AI'],
    featured: false,
  },
  {
    id: 'generative-ai-thoughtful-online-search',
    title: 'Generative AI: The Evolution of Thoughtful Online Search',
    organization: 'LinkedIn Learning',
    issuer: 'LinkedIn Learning',
    issueDate: '2024-06-28',
    description:
      'Course on how generative AI is reshaping search, discovery, and AI-assisted information retrieval.',
    image: '/certificates/generative-ai-thoughtful-online-search.png',
    credentialId: '5b32251922300b53a4d3d789bcd4b96defa435e5277d8c6ca63ed7f7b154e7b1',
    skills: ['Search Engine Technology', 'AI for Business', 'Generative AI'],
    featured: false,
  },
  {
    id: 'supervised-machine-learning-regression-classification',
    title: 'Supervised Machine Learning: Regression and Classification',
    organization: 'Coursera',
    issuer: 'DeepLearning.AI & Stanford Online',
    issueDate: '2026-01-28',
    description:
      'Foundational machine learning course covering supervised learning, regression, and classification.',
    image: '/certificates/supervised-machine-learning-regression-classification.png',
    verifyUrl: 'https://coursera.org/verify/B8K17C0MOAFQ',
    credentialId: 'B8K17C0MOAFQ',
    skills: ['Supervised Learning', 'Regression', 'Classification', 'Machine Learning'],
    featured: true,
  },
  {
    id: 'develop-generative-ai-applications-get-started',
    title: 'Develop Generative AI Applications: Get Started',
    organization: 'Coursera',
    issuer: 'IBM',
    issueDate: '2026-02-05',
    description:
      'Introductory IBM course on building generative AI applications and understanding their core workflow.',
    image: '/certificates/develop-generative-ai-applications-get-started.png',
    verifyUrl: 'https://coursera.org/verify/QTZPP0P3CZKK',
    credentialId: 'QTZPP0P3CZKK',
    skills: ['Generative AI', 'AI Applications', 'Prompting', 'IBM Skills Network'],
    featured: false,
  },
  {
    id: 'build-rag-applications-get-started',
    title: 'Build RAG Applications: Get Started',
    organization: 'Coursera',
    issuer: 'IBM',
    issueDate: '2026-02-07',
    description:
      'IBM course introducing the foundations of retrieval-augmented generation and practical RAG application design.',
    image: '/certificates/build-rag-applications-get-started.png',
    verifyUrl: 'https://coursera.org/verify/92C81LYV76QY',
    credentialId: '92C81LYV76QY',
    skills: ['RAG', 'LLM Applications', 'Retrieval', 'Generative AI'],
    featured: false,
  },
  {
    id: 'vector-databases-for-rag-introduction',
    title: 'Vector Databases for RAG: An Introduction',
    organization: 'Coursera',
    issuer: 'IBM',
    issueDate: '2026-03-16',
    description:
      'Introductory course on vector databases and their role in building retrieval-augmented generation systems.',
    image: '/certificates/vector-databases-for-rag-introduction.png',
    verifyUrl: 'https://coursera.org/verify/8TUZPUHY3MFI',
    credentialId: '8TUZPUHY3MFI',
    skills: ['Vector Databases', 'RAG', 'Embeddings', 'Information Retrieval'],
    featured: false,
  },
  {
    id: 'advanced-rag-vector-databases-retrievers',
    title: 'Advanced RAG with Vector Databases and Retrievers',
    organization: 'Coursera',
    issuer: 'IBM',
    issueDate: '2026-03-26',
    description:
      'Advanced RAG course focused on retrievers, vector database workflows, and stronger retrieval pipelines.',
    image: '/certificates/advanced-rag-vector-databases-retrievers.png',
    verifyUrl: 'https://coursera.org/verify/YJLWLHM748G7',
    credentialId: 'YJLWLHM748G7',
    skills: ['Advanced RAG', 'Retrievers', 'Vector Databases', 'LLM Systems'],
    featured: true,
  },
  {
    id: 'build-multimodal-generative-ai-applications',
    title: 'Build Multimodal Generative AI Applications',
    organization: 'Coursera',
    issuer: 'IBM',
    issueDate: '2026-04-06',
    description:
      'IBM course on building multimodal GenAI applications that combine text and other input modalities.',
    image: '/certificates/build-multimodal-generative-ai-applications.png',
    verifyUrl: 'https://coursera.org/verify/7KKWMJ398PAB',
    credentialId: '7KKWMJ398PAB',
    skills: ['Multimodal AI', 'Generative AI', 'Application Development', 'IBM Skills Network'],
    featured: false,
  },
  {
    id: 'fundamentals-of-building-ai-agents',
    title: 'Fundamentals of Building AI Agents',
    organization: 'Coursera',
    issuer: 'IBM',
    issueDate: '2026-04-07',
    description:
      'Foundational course covering the core concepts, patterns, and workflows behind AI agent development.',
    image: '/certificates/fundamentals-of-building-ai-agents.png',
    verifyUrl: 'https://coursera.org/verify/QQDLCWHO57SP',
    credentialId: 'QQDLCWHO57SP',
    skills: ['AI Agents', 'Agent Workflows', 'LLM Systems', 'IBM Skills Network'],
    featured: false,
  },
  {
    id: 'agentic-ai-with-langchain-and-langgraph',
    title: 'Agentic AI with LangChain and LangGraph',
    organization: 'Coursera',
    issuer: 'IBM',
    issueDate: '2026-04-08',
    description:
      'Hands-on course focused on building agentic AI systems using LangChain and LangGraph.',
    image: '/certificates/agentic-ai-with-langchain-and-langgraph.png',
    verifyUrl: 'https://coursera.org/verify/J4VQB6KR0OUV',
    credentialId: 'J4VQB6KR0OUV',
    skills: ['Agentic AI', 'LangChain', 'LangGraph', 'Workflow Orchestration'],
    featured: true,
  },
  {
    id: 'agentic-ai-with-langgraph-crewai-autogen-beeai',
    title: 'Agentic AI with LangGraph, CrewAI, AutoGen and BeeAI',
    organization: 'Coursera',
    issuer: 'IBM',
    issueDate: '2026-04-09',
    description:
      'Course exploring multiple agent frameworks and design patterns for building modern agentic AI systems.',
    image: '/certificates/agentic-ai-with-langgraph-crewai-autogen-beeai.png',
    verifyUrl: 'https://coursera.org/verify/3Y5W7QI3IF9D',
    credentialId: '3Y5W7QI3IF9D',
    skills: ['LangGraph', 'CrewAI', 'AutoGen', 'BeeAI', 'Agentic AI'],
    featured: true,
  },
  {
    id: 'build-ai-agents-using-mcp',
    title: 'Build AI Agents using MCP',
    organization: 'Coursera',
    issuer: 'IBM',
    issueDate: '2026-04-11',
    description:
      'IBM course focused on building AI agents using MCP and practical agent communication patterns.',
    image: '/certificates/build-ai-agents-using-mcp.png',
    verifyUrl: 'https://coursera.org/verify/BAOOEZQEGL60',
    credentialId: 'BAOOEZQEGL60',
    skills: ['AI Agents', 'MCP', 'Agent Communication', 'IBM Skills Network'],
    featured: true,
  },
]

export const publications: Publication[] = [
  {
    id: 'kidneystone-net',
    title: 'KidneyStoneNet: A Deep Learning Approach for Kidney Stone Detection with Transfer Learning and Explainable AI',
    status: 'Accepted — ICIDA 2025',
    venue: 'International Conference on Intelligent Data Analysis (ICIDA 2025)',
    abstract: 'This paper presents KidneyStoneNet, a CNN-based transfer learning framework for automated kidney stone detection in medical images. We train and evaluate ResNet, DenseNet, and NASNet architectures using PyTorch, integrate explainable AI (XAI) techniques for prediction interpretability, and deploy an interactive Gradio web application for real-time inference. Our approach demonstrates that transfer learning models can provide clinically interpretable, high-performance detection with minimal training data.',
    authors: ['Mahmudul Haque Sakib', 'et al.'],
    tech: ['PyTorch', 'Transfer Learning', 'XAI', 'Grad-CAM', 'Gradio'],
  },
  {
    id: 'medileaf-net',
    title: 'MediLeafNET: An AI-Driven Multimodal System for Medicinal Plant Discovery and Ethnobotanical Knowledge Retrieval in Bangladesh',
    status: 'In Preparation',
    abstract: 'MediLeafNET presents a multimodal AI system combining a custom Vision Transformer (ViT) for medicinal leaf image classification with large language models (BERT, LLaMA) for ethnobotanical knowledge retrieval. Evaluated across 10+ deep learning baselines with cross-validation, the system integrates explainable AI and is deployed as an interactive Gradio application, supporting real-world plant identification in Bangladesh.',
    authors: ['Mahmudul Haque Sakib', 'et al.'],
    tech: ['Vision Transformer', 'BERT', 'LLaMA', 'XAI', 'Gradio', 'Multimodal AI'],
  },
  {
    id: 'absa-smart-devices',
    title: 'Aspect-Based Sentiment Analysis for Smart Devices: A Transformer-Based Approach',
    status: 'In Preparation',
    abstract: 'This work develops a hybrid sentiment analysis framework combining fine-tuned transformer models (BERT, RoBERTa) with auxiliary features for aspect-level classification of IoT and smart device review data. We apply explainable AI techniques and deploy an interactive Gradio application for real-time sentiment inference and interpretation.',
    authors: ['Mahmudul Haque Sakib', 'et al.'],
    tech: ['BERT', 'RoBERTa', 'Sentiment Analysis', 'XAI', 'Transformers', 'Gradio'],
  },
]

export const skills: Skill[] = [
  {
    category: 'AI & Machine Learning',
    icon: '🧠',
    items: [
      { name: 'PyTorch' },
      { name: 'TensorFlow' },
      { name: 'Keras' },
      { name: 'scikit-learn' },
      { name: 'CUDA' },
      { name: 'MLflow' },
    ],
  },
  {
    category: 'LLMs & Generative AI',
    icon: '🤖',
    items: [
      { name: 'LangChain' },
      { name: 'Hugging Face' },
      { name: 'RAG Pipelines' },
      { name: 'FAISS / ChromaDB' },
      { name: 'Prompt Engineering' },
      { name: 'Transformers' },
    ],
  },
  {
    category: 'Computer Vision & NLP',
    icon: '👁️',
    items: [
      { name: 'CNNs / ViT' },
      { name: 'Transfer Learning' },
      { name: 'BERT / RoBERTa' },
      { name: 'YOLOv10' },
      { name: 'Grad-CAM / SHAP' },
      { name: 'Swin Transformer' },
    ],
  },
  {
    category: 'Languages & Tools',
    icon: '💻',
    items: [
      { name: 'Python' },
      { name: 'C / C++' },
      { name: 'Java' },
      { name: 'SQL' },
      { name: 'Dart / Flutter' },
      { name: 'LaTeX' },
    ],
  },
  {
    category: 'Deployment & MLOps',
    icon: '🚀',
    items: [
      { name: 'Docker' },
      { name: 'Streamlit' },
      { name: 'Gradio' },
      { name: 'Hugging Face Spaces' },
      { name: 'REST APIs' },
      { name: 'Git / GitHub' },
    ],
  },
  {
    category: 'Data & Analytics',
    icon: '📊',
    items: [
      { name: 'NumPy / Pandas' },
      { name: 'Matplotlib' },
      { name: 'Power BI' },
      { name: 'MySQL' },
      { name: 'Pinecone' },
      { name: 'Jupyter' },
    ],
  },
]

export const inspirations: InspirationItem[] = [
  {
    id: 'futurama',
    title: 'Futurama',
    poster: '/inspirations/Futurama_Volume_1.webp',
  },
  {
    id: 'gattaca',
    title: 'Gattaca',
    poster: '/inspirations/Gattaca.webp',
  },
  {
    id: 'star-trek-first-contact',
    title: 'Star Trek: First Contact',
    poster: '/inspirations/Star_trek_first_contact.webp',
  },
  {
    id: 'terminator-3-rise-of-the-machines',
    title: 'Terminator 3: Rise of the Machines',
    poster: '/inspirations/Terminator_3_Rise_of_the_Machines.webp',
  },
  {
    id: 'the-thirteenth-floor',
    title: 'The Thirteenth Floor',
    poster: '/inspirations/The Thirteenth Floor.webp',
  },
  {
    id: 'the-matrix',
    title: 'The Matrix',
    poster: '/inspirations/The_Matrix.webp',
  },
  {
    id: 'virus',
    title: 'Virus',
    poster: '/inspirations/Virus.webp',
  },
  {
    id: 'who-am-i',
    title: 'Who Am I',
    poster: '/inspirations/Who_am_i.webp',
  },
]