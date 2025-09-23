export interface DiagramData {
  type: 'flowchart' | 'process' | 'hierarchy' | 'neural-network' | 'architecture';
  nodes: Array<{
    id: string;
    label?: string; // undefined for missing labels
    x: number;
    y: number;
    type?: 'input' | 'process' | 'output' | 'decision' | 'hidden';
  }>;
  connections: Array<{
    from: string;
    to: string;
    label?: string;
  }>;
  missing_labels: string[]; // IDs of nodes with missing labels
}

export interface QuizQuestion {
  question_id: string;
  question_text: string;
  question_type?: 'multiple-choice' | 'fill-blank' | 'reasoning' | 'diagram';
  options?: [string, string, string, string]; // for multiple-choice only
  correct_answer: string;
  explanation?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  diagram_data?: DiagramData; // for diagram questions
}

export interface QuizSession {
  session_id: string;
  questions: QuizQuestion[];
  user_answers: string[];
  score: number;
  total_questions: number;
  created_at: string;
}

export interface AITerm {
  term: string;
  definition: string;
}