export const projects = [
  {
    title: "Personal Voice Assistant  ",
    tech: ["Livekit", "FastAPI", "Reactjs", "Docker"],
    desc: "A production-ready personal voice-based AI assistant that uses SST and TTS to answer user queries , with intelligent trunhandling and VAD support",
    features: [
      "Automatic Turnhandling",
      "Supports web search and Tool calling",
      "Uses websockets for persistant connection",
    ],
    icon: "Bot",
    color: "#3D6B8C",
    category: "ai",
  },
  {
    title: "LLM Chatbot Fine-tuning Pipeline",
    tech: ["PyTorch", "Hugging Face", "LoRA", "Weights & Biases"],
    desc: "End-to-end pipeline for fine-tuning LLMs on custom instruction datasets with experiment tracking and evaluation.",
    features: [
      "QLoRA 4-bit quantization for memory-efficient training",
      "Automated hyperparameter search with Optuna",
      "BLEU/ROUGE evaluation and human feedback logging",
    ],
    icon: "Bot",
    color: "#B1D2C8",
    category: "ai",
  },
  {
    title: "Multi-Label Text Classifier",
    tech: ["PyTorch", "Scikit-learn", "NLTK", "Streamlit"],
    desc: "A multi-label text classification system supporting 15+ categories with an interactive web interface for real-time predictions.",
    features: [
      "Custom tokenizer with TF-IDF + word embeddings",
      "Ensemble of BERT + BiLSTM models",
      "Interactive confusion matrix and explainability dashboard",
    ],
    icon: "BarChart",
    color: "#7A8A94",
    category: "ml",
  },
  {
    title: "ML Model Deployment Platform",
    tech: ["FastAPI", "Docker", "MLflow", "GitHub Actions"],
    desc: "A modular platform for training, versioning, and deploying ML models with CI/CD pipelines and model registry.",
    features: [
      "Automated model versioning with MLflow Tracking",
      "Containerized microservices with Docker Compose",
      "CI/CD via GitHub Actions with automated testing",
    ],
    icon: "Wrench",
    color: "#F59E0B",
    category: "ml",
  },
];

export const projectCategories = [
  { value: "all", label: "All Projects" },
  { value: "ai", label: "LLM & AI" },
  { value: "ml", label: "Machine Learning" },
];
