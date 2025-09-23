import { AITerm, QuizQuestion } from '@/types';

export const aiTerms: AITerm[] = [
  {
    term: "API (Application Programming Interface)",
    definition: "Way for different software applications to communicate"
  },
  {
    term: "Artificial Intelligence (AI)",
    definition: "Computer systems that perform tasks typically requiring human intelligence"
  },
  {
    term: "Attention Mechanism",
    definition: "Technique allowing models to focus on relevant parts of input data"
  },
  {
    term: "Context Window",
    definition: "Maximum amount of text an AI model can consider at once"
  },
  {
    term: "Embedding",
    definition: "Numerical representation of text that captures semantic meaning"
  },
  {
    term: "Fine-tuning",
    definition: "Process of training a pre-trained model on specific data for specialized tasks"
  },
  {
    term: "GPT (Generative Pre-trained Transformer)",
    definition: "Type of LLM that generates human-like text"
  },
  {
    term: "Hallucination",
    definition: "When AI generates false or nonsensical information confidently"
  },
  {
    term: "Inference",
    definition: "Process of an AI model making predictions or generating outputs"
  },
  {
    term: "Large Language Model (LLM)",
    definition: "AI model trained on vast text data to understand and generate language"
  },
  {
    term: "Machine Learning (ML)",
    definition: "AI subset where systems learn from data without explicit programming"
  },
  {
    term: "Natural Language Processing (NLP)",
    definition: "AI field focused on understanding human language"
  },
  {
    term: "Neural Network",
    definition: "Computing system inspired by biological neural networks"
  },
  {
    term: "Prompt",
    definition: "Input text given to an AI model to generate a response"
  },
  {
    term: "RAG (Retrieval Augmented Generation)",
    definition: "Technique combining information retrieval with text generation"
  },
  {
    term: "Temperature",
    definition: "Parameter controlling randomness in AI-generated responses"
  },
  {
    term: "Token",
    definition: "Basic unit of text that AI models process (words, parts of words, or characters)"
  },
  {
    term: "Training Data",
    definition: "Information used to teach AI models patterns and knowledge"
  },
  {
    term: "Transformer",
    definition: "Neural network architecture that powers most modern LLMs"
  },
  {
    term: "Vector Database",
    definition: "Database optimized for storing and searching numerical representations of data"
  }
];

export const sampleQuestions: QuizQuestion[] = [
  {
    question_id: "q1",
    question_text: "What does LLM stand for?",
    options: ["Large Learning Machine", "Large Language Model", "Linear Language Method", "Logical Learning Module"],
    correct_answer: "Large Language Model",
    explanation: "LLM stands for Large Language Model, which refers to AI models trained on vast amounts of text data."
  },
  {
    question_id: "q2",
    question_text: "What architecture do most modern LLMs use?",
    options: ["Convolutional Neural Network", "Recurrent Neural Network", "Transformer", "Decision Tree"],
    correct_answer: "Transformer",
    explanation: "The Transformer architecture, introduced in 2017, is the foundation for most modern LLMs."
  },
  {
    question_id: "q3",
    question_text: "What is a token in the context of LLMs?",
    options: ["A security credential", "A basic unit of text processing", "A type of neural network", "A training algorithm"],
    correct_answer: "A basic unit of text processing",
    explanation: "Tokens are the basic units that LLMs process, which can be words, parts of words, or characters."
  },
  {
    question_id: "q4",
    question_text: "What is the context window in an LLM?",
    options: ["The training interface", "The maximum text length the model can process at once", "The output generation area", "The model's memory storage"],
    correct_answer: "The maximum text length the model can process at once",
    explanation: "The context window defines how much text an LLM can consider simultaneously when generating responses."
  },
  {
    question_id: "q5",
    question_text: "What is AI hallucination?",
    options: ["When AI sees images that aren't there", "When AI generates false information confidently", "When AI processing is too slow", "When AI uses too much memory"],
    correct_answer: "When AI generates false information confidently",
    explanation: "AI hallucination occurs when models generate plausible-sounding but incorrect or fabricated information."
  },
  {
    question_id: "q6",
    question_text: "What is fine-tuning in LLMs?",
    options: ["Adjusting the model's speed", "Training a pre-trained model on specific data", "Reducing the model's size", "Improving the user interface"],
    correct_answer: "Training a pre-trained model on specific data",
    explanation: "Fine-tuning involves additional training of a pre-trained model on specific data to improve performance on particular tasks."
  },
  {
    question_id: "q7",
    question_text: "What parameter controls randomness in LLM responses?",
    options: ["Context", "Temperature", "Tokens", "Embedding"],
    correct_answer: "Temperature",
    explanation: "Temperature is a parameter that controls the randomness and creativity of LLM outputs."
  },
  {
    question_id: "q8",
    question_text: "What is an embedding?",
    options: ["A way to install AI models", "A numerical representation of text", "A type of neural network layer", "A training technique"],
    correct_answer: "A numerical representation of text",
    explanation: "Embeddings are numerical representations that capture the semantic meaning of text in a mathematical form."
  },
  {
    question_id: "q9",
    question_text: "What does RAG stand for?",
    options: ["Rapid AI Generation", "Retrieval Augmented Generation", "Random Algorithm Generator", "Recursive Analysis Gateway"],
    correct_answer: "Retrieval Augmented Generation",
    explanation: "RAG combines information retrieval with text generation to provide more accurate and grounded responses."
  },
  {
    question_id: "q10",
    question_text: "What is inference in the context of LLMs?",
    options: ["Drawing logical conclusions from training data", "The process of generating outputs from inputs", "Training the model on new data", "Debugging model errors"],
    correct_answer: "The process of generating outputs from inputs",
    explanation: "Inference is the process where a trained model processes input and generates predictions or outputs."
  }
];