import { QuizQuestion } from '@/types';

export const sampleDiagramQuestions: QuizQuestion[] = [
  {
    question_id: "diagram_neural_network",
    question_text: "Complete the neural network diagram by labeling the missing layers:",
    question_type: "diagram",
    correct_answer: "input:Input Layer;hidden1:Hidden Layer 1;hidden2:Hidden Layer 2;output:Output Layer",
    explanation: "A basic neural network consists of an input layer, one or more hidden layers, and an output layer.",
    difficulty: "beginner",
    diagram_data: {
      type: "neural-network",
      nodes: [
        { id: "input", x: 15, y: 50, type: "input" },
        { id: "hidden1", x: 40, y: 30, type: "hidden" },
        { id: "hidden2", x: 40, y: 70, type: "hidden" },
        { id: "output", x: 85, y: 50, type: "output" }
      ],
      connections: [
        { from: "input", to: "hidden1" },
        { from: "input", to: "hidden2" },
        { from: "hidden1", to: "output" },
        { from: "hidden2", to: "output" }
      ],
      missing_labels: ["input", "hidden1", "hidden2", "output"]
    }
  },
  {
    question_id: "diagram_ml_pipeline",
    question_text: "Label the missing steps in this machine learning pipeline:",
    question_type: "diagram",
    correct_answer: "data:Data Collection;preprocess:Preprocessing;train:Model Training;evaluate:Evaluation",
    explanation: "A typical ML pipeline includes data collection, preprocessing, model training, and evaluation phases.",
    difficulty: "intermediate",
    diagram_data: {
      type: "process",
      nodes: [
        { id: "data", x: 20, y: 50, type: "input" },
        { id: "preprocess", x: 40, y: 50, type: "process" },
        { id: "train", x: 60, y: 50, type: "process" },
        { id: "evaluate", x: 80, y: 50, type: "output" }
      ],
      connections: [
        { from: "data", to: "preprocess", label: "raw data" },
        { from: "preprocess", to: "train", label: "clean data" },
        { from: "train", to: "evaluate", label: "model" }
      ],
      missing_labels: ["data", "preprocess", "train", "evaluate"]
    }
  },
  {
    question_id: "diagram_transformer",
    question_text: "Complete the transformer architecture diagram:",
    question_type: "diagram",
    correct_answer: "input:Input Embeddings;encoder:Encoder;decoder:Decoder;output:Output",
    explanation: "Transformer architecture consists of input embeddings, encoder blocks, decoder blocks, and output generation.",
    difficulty: "advanced",
    diagram_data: {
      type: "architecture",
      nodes: [
        { id: "input", x: 25, y: 80, type: "input" },
        { id: "encoder", x: 25, y: 50, type: "process" },
        { id: "decoder", x: 75, y: 50, type: "process" },
        { id: "output", x: 75, y: 20, type: "output" }
      ],
      connections: [
        { from: "input", to: "encoder" },
        { from: "encoder", to: "decoder", label: "context" },
        { from: "decoder", to: "output" }
      ],
      missing_labels: ["input", "encoder", "decoder", "output"]
    }
  },
  {
    question_id: "diagram_rag_system",
    question_text: "Label the components of this RAG (Retrieval Augmented Generation) system:",
    question_type: "diagram",
    correct_answer: "query:User Query;retrieval:Document Retrieval;augment:Context Augmentation;generate:Response Generation",
    explanation: "RAG systems retrieve relevant documents, augment the query with context, and generate informed responses.",
    difficulty: "intermediate",
    diagram_data: {
      type: "flowchart",
      nodes: [
        { id: "query", x: 20, y: 30, type: "input" },
        { id: "retrieval", x: 50, y: 30, type: "process" },
        { id: "augment", x: 50, y: 70, type: "process" },
        { id: "generate", x: 80, y: 50, type: "output" }
      ],
      connections: [
        { from: "query", to: "retrieval" },
        { from: "retrieval", to: "augment", label: "documents" },
        { from: "augment", to: "generate", label: "context" },
        { from: "query", to: "generate", label: "query" }
      ],
      missing_labels: ["query", "retrieval", "augment", "generate"]
    }
  }
];