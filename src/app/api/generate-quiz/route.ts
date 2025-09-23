import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { QuizQuestion } from '@/types';

async function extractTextFromFile(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();

  // Handle PDF files - for now, let's require TXT files only
  if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
    throw new Error('PDF files are not currently supported. Please convert to TXT format and try again.');
  }

  // Handle plain text files
  if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
    return new TextDecoder().decode(buffer);
  }

  // For other file types, try to decode as text
  if (file.name.endsWith('.docx') || file.name.endsWith('.pptx')) {
    throw new Error('DOCX and PPTX files are not currently supported. Please convert to TXT format and try again.');
  }

  // Default: try to decode as text
  return new TextDecoder().decode(buffer);
}

export async function POST(request: NextRequest) {
  try {
    console.log('API route called');

    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY not found');
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const level = formData.get('level') as string;
    const components = formData.get('components') as string;
    const scoring = formData.get('scoring') as string;

    console.log('File received:', file?.name, file?.size);
    console.log('Quiz customization:', { level, components, scoring });

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Check file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large. Maximum size is 10MB.' }, { status: 400 });
    }

    // Extract text from file
    const content = await extractTextFromFile(file);

    if (!content || content.trim().length < 100) {
      return NextResponse.json({
        error: 'File content is too short or could not be extracted. Please ensure the file contains readable text.'
      }, { status: 400 });
    }

    // Generate quiz using Gemini
    console.log('Initializing Gemini API...');
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    console.log('Gemini API initialized successfully');

    // Parse components if provided
    let selectedComponents = ['multiple-choice']; // default
    if (components) {
      try {
        selectedComponents = JSON.parse(components);
      } catch (e) {
        console.error('Error parsing components:', e);
      }
    }

    // Build prompt based on customization
    const levelDescriptions = {
      'Beginner': 'basic concepts and fundamental understanding',
      'Intermediate': 'applied knowledge and practical scenarios',
      'Advanced': 'expert-level analysis and complex problem-solving'
    };

    const componentInstructions = {
      'multiple-choice': 'Generate multiple choice questions with 4 options each (exactly one correct answer)',
      'fill-blank': 'Generate fill-in-the-blank questions with clear context and single correct answers',
      'reasoning': 'Generate reasoning questions requiring brief explanations or step-by-step solutions',
      'diagram': 'Generate interactive diagram questions with visual elements and missing labels that users must fill in'
    };

    const selectedInstructions = selectedComponents.map(comp => componentInstructions[comp as keyof typeof componentInstructions]).filter(Boolean);

    const prompt = `
Analyze the following document content and generate a customized quiz based on the user's preferences.

QUIZ SPECIFICATIONS:
- Level: ${level || 'Intermediate'} (focus on ${levelDescriptions[level as keyof typeof levelDescriptions] || 'applied knowledge'})
- Components requested: ${selectedComponents.join(', ')}
- Scoring distribution: ${scoring || '30/30/30/10'}
- Total questions: 8-12 based on content complexity

QUESTION TYPES TO INCLUDE:
${selectedInstructions.join('\n')}

FORMAT REQUIREMENTS:
Return valid JSON only (no markdown formatting). IMPORTANT: Include "options" array ONLY for multiple-choice questions:

{
  "questions": [
    {
      "question_id": "q1",
      "question_text": "Question text here",
      "question_type": "multiple-choice",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correct_answer": "Option B",
      "explanation": "Brief explanation",
      "difficulty": "${level?.toLowerCase() || 'intermediate'}"
    },
    {
      "question_id": "q2",
      "question_text": "Fill in the blank: AI models use _____ to understand language.",
      "question_type": "fill-blank",
      "correct_answer": "neural networks",
      "explanation": "Neural networks process language patterns",
      "difficulty": "${level?.toLowerCase() || 'intermediate'}"
    },
    {
      "question_id": "q3",
      "question_text": "Explain why attention mechanisms are important in transformers.",
      "question_type": "reasoning",
      "correct_answer": "Attention mechanisms allow models to focus on relevant parts of input when generating output, enabling better context understanding and long-range dependencies.",
      "explanation": "Key reasoning points about selective attention",
      "difficulty": "${level?.toLowerCase() || 'intermediate'}"
    },
    {
      "question_id": "q4",
      "question_text": "Complete the neural network diagram by labeling the missing components:",
      "question_type": "diagram",
      "correct_answer": "input_layer:Input Layer;hidden_layer:Hidden Layer;output_layer:Output Layer",
      "explanation": "Standard neural network has input, hidden, and output layers",
      "difficulty": "${level?.toLowerCase() || 'intermediate'}",
      "diagram_data": {
        "type": "neural-network",
        "nodes": [
          {"id": "input_layer", "x": 20, "y": 50, "type": "input"},
          {"id": "hidden_layer", "x": 50, "y": 50, "type": "hidden"},
          {"id": "output_layer", "x": 80, "y": 50, "type": "output"}
        ],
        "connections": [
          {"from": "input_layer", "to": "hidden_layer"},
          {"from": "hidden_layer", "to": "output_layer"}
        ],
        "missing_labels": ["input_layer", "hidden_layer", "output_layer"]
      }
    }
  ]
}

CONTENT ANALYSIS REQUIREMENTS:
- Questions should test ${levelDescriptions[level as keyof typeof levelDescriptions] || 'applied knowledge'}
- Ensure questions are relevant to the provided content
- Distribute questions according to the requested scoring paradigm
- For fill-blank questions, use "_____" to indicate blanks
- For reasoning questions, expect brief 2-3 sentence answers

DIAGRAM QUESTION REQUIREMENTS (when diagram type is selected):
- Create visual diagrams with missing labels that users must identify
- Use diagram types: "flowchart", "process", "hierarchy", "neural-network", or "architecture"
- Position nodes using x,y coordinates (0-100 scale)
- Node types: "input", "process", "output", "decision", "hidden"
- Include "diagram_data" object with nodes, connections, and missing_labels array
- Correct answer format: "node_id:Label;node_id:Label" for multiple missing labels
- Base diagrams on concepts mentioned in the uploaded content
- Common AI diagram examples:
  * Neural networks: input → hidden → output layers
  * ML pipelines: data → preprocessing → model → evaluation
  * LLM architecture: input → embedding → transformer → output
  * RAG systems: query → retrieval → augmentation → generation

Document content:
${content.substring(0, 4000)}
`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    try {
      // Clean the response to extract JSON
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }

      const quizData = JSON.parse(jsonMatch[0]);

      // Validate the response structure
      if (!quizData.questions || !Array.isArray(quizData.questions)) {
        throw new Error('Invalid quiz structure');
      }

      // Validate each question
      const validatedQuestions: QuizQuestion[] = quizData.questions.map((q: unknown, index: number) => {
        const question = q as Record<string, unknown>;

        // Basic validation - all questions must have text and correct answer
        if (!question.question_text || !question.correct_answer) {
          throw new Error(`Invalid question structure at index ${index}: missing question_text or correct_answer`);
        }

        const questionType = (question.question_type as string) || 'multiple-choice';

        // For multiple choice questions, validate options
        if (questionType === 'multiple-choice') {
          if (!question.options || !Array.isArray(question.options) || question.options.length !== 4) {
            throw new Error(`Invalid multiple choice question at index ${index}: must have exactly 4 options`);
          }
        }

        return {
          question_id: (question.question_id as string) || `q${index + 1}`,
          question_text: question.question_text as string,
          question_type: questionType as 'multiple-choice' | 'fill-blank' | 'reasoning' | 'diagram',
          options: questionType === 'multiple-choice' ? question.options as [string, string, string, string] : undefined,
          correct_answer: question.correct_answer as string,
          explanation: (question.explanation as string) || '',
          difficulty: (question.difficulty as string) || level?.toLowerCase() || 'intermediate',
          diagram_data: questionType === 'diagram' ? question.diagram_data as unknown : undefined
        };
      });

      return NextResponse.json({ questions: validatedQuestions });

    } catch (parseError) {
      console.error('Error parsing Gemini response:', parseError);
      return NextResponse.json({
        error: 'Failed to generate valid quiz questions. Please try with different content.'
      }, { status: 500 });
    }

  } catch (error) {
    console.error('Error generating quiz:', error);
    return NextResponse.json({
      error: 'An error occurred while generating the quiz. Please try again.'
    }, { status: 500 });
  }
}