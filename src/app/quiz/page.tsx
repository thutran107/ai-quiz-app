'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { sampleQuestions } from '@/lib/data';
import { topicQuizzes } from '@/lib/topicQuizzes';
import { QuizQuestion } from '@/types';
import DiagramQuestion from '@/components/DiagramQuestion';

function QuizPageContent() {
  const searchParams = useSearchParams();
  const topic = searchParams.get('topic');
  const isCustom = searchParams.get('custom');
  const customQuestions = searchParams.get('questions');

  const [quizType, setQuizType] = useState<'select' | 'sample' | 'custom' | 'topic'>('select');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [, setUploadedFile] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentTopic, setCurrentTopic] = useState<string>('');

  // Check for parameters on mount
  const startSampleQuiz = () => {
    setQuestions(sampleQuestions);
    setQuizType('sample');
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setShowResults(false);
    setCurrentTopic('General LLM');
  };

  const startTopicQuiz = useCallback((topicKey: string) => {
    const topicQuestions = topicQuizzes[topicKey as keyof typeof topicQuizzes];
    if (topicQuestions) {
      setQuestions(topicQuestions);
      setQuizType('topic');
      setCurrentQuestionIndex(0);
      setUserAnswers([]);
      setShowResults(false);
      setCurrentTopic(getTopicDisplayName(topicKey));
    }
  }, []);

  useEffect(() => {
    if (isCustom && customQuestions) {
      try {
        const parsedQuestions = JSON.parse(decodeURIComponent(customQuestions));
        setQuestions(parsedQuestions);
        setQuizType('custom');
        setCurrentQuestionIndex(0);
        setUserAnswers([]);
        setShowResults(false);
        setCurrentTopic('Custom Quiz');
      } catch (error) {
        console.error('Error parsing custom questions:', error);
      }
    } else if (topic && topicQuizzes[topic as keyof typeof topicQuizzes]) {
      startTopicQuiz(topic);
    }
  }, [topic, isCustom, customQuestions, startTopicQuiz]);

  const getTopicDisplayName = (topicKey: string) => {
    const topicNames: Record<string, string> = {
      llm: 'Large Language Models',
      promptEngineering: 'Prompt Engineering',
      rag: 'RAG Systems',
      memory: 'AI Memory Systems',
      agentArchitecture: 'Agent Architecture'
    };
    return topicNames[topicKey] || topicKey;
  };

  const handleAnswer = (answer: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    return userAnswers.reduce((score, answer, index) => {
      return answer === questions[index].correct_answer ? score + 1 : score;
    }, 0);
  };

  const resetQuiz = () => {
    setQuizType('select');
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setShowResults(false);
    setQuestions([]);
    setUploadedFile(null);
    setCurrentTopic('');
  };

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file);
    setIsGenerating(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/generate-quiz', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setQuestions(data.questions);
        setQuizType('custom');
        setCurrentQuestionIndex(0);
        setUserAnswers([]);
        setShowResults(false);
      } else {
        alert('Failed to generate quiz. Please try again.');
      }
    } catch (error) {
      console.error('Error generating quiz:', error);
      alert('Error generating quiz. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <div className="min-h-screen surface-gradient py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-primary-600 hover:text-primary-700 mb-8 inline-flex items-center font-medium transition-fast">
            ← Back to Home
          </Link>

          <div className="bg-white rounded-2xl shadow-elevated border-subtle p-12 text-center fade-in">
            <h1 className="text-4xl heading-primary text-gradient mb-8">Quiz Complete!</h1>
            <div className="relative mb-8">
              <div className="text-7xl heading-primary text-gradient mb-6">
                {percentage}%
              </div>
              <p className="text-xl text-neutral-600">
                You scored {score} out of {questions.length} questions correctly
              </p>
            </div>

            <div className="space-y-4 mb-8 text-left">
              {questions.map((question, index) => (
                <div key={question.question_id} className="border border-neutral-200 rounded-xl p-6 shadow-card">
                  <p className="heading-secondary text-neutral-800 mb-4">{question.question_text}</p>
                  <div className="bg-neutral-50 rounded-xl p-4 mb-4">
                    <p className="text-sm text-neutral-600 mb-2">Your answer:</p>
                    <span className={`font-medium ${userAnswers[index] === question.correct_answer ? 'text-secondary-600' : 'text-red-600'}`}>
                      {userAnswers[index]}
                    </span>
                  </div>
                  {userAnswers[index] !== question.correct_answer && (
                    <div className="bg-secondary-50 rounded-xl p-4 mb-4">
                      <p className="text-sm text-secondary-700 mb-2">Correct answer:</p>
                      <span className="font-medium text-secondary-800">{question.correct_answer}</span>
                    </div>
                  )}
                  {question.explanation && (
                    <div className="bg-primary-50 rounded-xl p-4">
                      <p className="text-sm text-primary-600 mb-2">Explanation:</p>
                      <p className="text-sm text-primary-800">{question.explanation}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={resetQuiz}
              className="gradient-accent text-white heading-secondary py-4 px-8 rounded-xl shadow-card-hover interactive-scale transition-smooth"
            >
              Take Another Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (quizType === 'sample' || quizType === 'custom' || quizType === 'topic') {
    const currentQuestion = questions[currentQuestionIndex];

    return (
      <div className="min-h-screen surface-gradient py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-primary-600 hover:text-primary-700 mb-8 inline-flex items-center font-medium transition-fast">
            ← Back to Home
          </Link>

          <div className="bg-white rounded-2xl shadow-elevated border-subtle p-12 fade-in">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl heading-primary text-gradient">
                  {quizType === 'topic' ? `${currentTopic} Quiz` :
                   quizType === 'sample' ? 'Sample LLM Quiz' : 'Custom Quiz'}
                </h1>
                <span className="text-sm text-neutral-600 bg-neutral-100 px-4 py-2 rounded-full font-medium">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div
                  className="gradient-accent h-2 rounded-full transition-smooth"
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl heading-secondary text-neutral-800 mb-8 leading-relaxed">
                {currentQuestion.question_text}
              </h2>

              {/* Multiple Choice Questions */}
              {(!currentQuestion.question_type || currentQuestion.question_type === 'multiple-choice') && currentQuestion.options && (
                <div className="space-y-4">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      className="w-full text-left p-6 border border-neutral-200 rounded-xl hover:bg-primary-50 hover:border-primary-300 transition-smooth shadow-card hover:shadow-card-hover interactive-lift">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-neutral-100 text-neutral-700 font-semibold rounded-full mr-4">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="text-neutral-700 text-lg">{option}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Fill in the Blank Questions */}
              {currentQuestion.question_type === 'fill-blank' && (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Type your answer here..."
                    className="w-full p-4 border border-neutral-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleAnswer((e.target as HTMLInputElement).value);
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      const input = document.querySelector('input[type="text"]') as HTMLInputElement;
                      if (input?.value) {
                        handleAnswer(input.value);
                      }
                    }}
                    className="gradient-accent text-white heading-secondary py-3 px-8 rounded-xl shadow-card-hover interactive-scale transition-smooth"
                  >
                    Submit Answer
                  </button>
                </div>
              )}

              {/* Reasoning Questions */}
              {currentQuestion.question_type === 'reasoning' && (
                <div className="space-y-4">
                  <textarea
                    rows={4}
                    placeholder="Provide your reasoning in 2-3 sentences..."
                    className="w-full p-4 border border-neutral-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  />
                  <button
                    onClick={() => {
                      const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
                      if (textarea?.value) {
                        handleAnswer(textarea.value);
                      }
                    }}
                    className="gradient-accent text-white heading-secondary py-3 px-8 rounded-xl shadow-card-hover interactive-scale transition-smooth"
                  >
                    Submit Reasoning
                  </button>
                </div>
              )}

              {/* Diagram Questions */}
              {currentQuestion.question_type === 'diagram' && (
                <div className="space-y-4">
                  {currentQuestion.diagram_data ? (
                    <DiagramQuestion
                      diagramData={currentQuestion.diagram_data}
                      onAnswer={handleAnswer}
                    />
                  ) : (
                    // Fallback for diagram questions without diagram_data
                    <div className="space-y-4">
                      <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-200">
                        <p className="text-neutral-600 mb-4">For diagram-related questions, please provide your answer based on the context described in the question.</p>
                      </div>
                      <input
                        type="text"
                        placeholder="Label or identify the diagram element..."
                        className="w-full p-4 border border-neutral-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleAnswer((e.target as HTMLInputElement).value);
                          }
                        }}
                      />
                      <button
                        onClick={() => {
                          const input = document.querySelector('input[type="text"]') as HTMLInputElement;
                          if (input?.value) {
                            handleAnswer(input.value);
                          }
                        }}
                        className="gradient-accent text-white heading-secondary py-3 px-8 rounded-xl shadow-card-hover interactive-scale transition-smooth"
                      >
                        Submit Answer
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen surface-gradient py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Link href="/" className="text-primary-600 hover:text-primary-700 mb-8 inline-flex items-center font-medium transition-fast">
          ← Back to Home
        </Link>

        <div className="bg-white rounded-2xl shadow-elevated border-subtle p-12 fade-in">
          <h1 className="text-4xl heading-primary text-gradient mb-6 text-center">Choose Your Learning Path</h1>
          <p className="text-xl text-neutral-600 text-center mb-12 max-w-3xl mx-auto">
            Select how you&apos;d like to test your AI knowledge today
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-neutral-200 rounded-2xl p-8 text-center hover:border-primary-300 transition-smooth shadow-card hover:shadow-card-hover interactive-lift">
              <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl heading-primary text-neutral-800 mb-4">Sample LLM Quiz</h2>
              <p className="text-neutral-600 mb-8 leading-relaxed">
                Test your knowledge with 10 expertly crafted questions about Large Language Models and essential AI concepts.
              </p>
              <button
                onClick={startSampleQuiz}
                className="bg-primary-600 hover:bg-primary-700 text-white heading-secondary py-4 px-8 rounded-xl w-full shadow-card-hover interactive-scale transition-smooth">
                Start Sample Quiz
              </button>
            </div>

            <div className="border border-neutral-200 rounded-2xl p-8 text-center hover:border-accent-300 transition-smooth shadow-card hover:shadow-card-hover interactive-lift">
              <div className="w-20 h-20 bg-accent-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h2 className="text-2xl heading-primary text-neutral-800 mb-4">Custom Quiz</h2>
              <p className="text-neutral-600 mb-8 leading-relaxed">
                Upload your own materials and let our AI generate personalized quiz questions tailored to your content.
              </p>

              {isGenerating ? (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-accent-600 mx-auto mb-6"></div>
                  <p className="text-neutral-600 text-lg heading-secondary">Generating your custom quiz...</p>
                  <p className="text-neutral-500 text-sm mt-2">This may take a few moments</p>
                </div>
              ) : (
                <div>
                  <input
                    type="file"
                    accept=".txt,.pdf"
                    onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="gradient-accent text-white heading-secondary py-4 px-8 rounded-xl cursor-pointer inline-block w-full shadow-card-hover interactive-scale transition-smooth"
                  >
                    📄 Upload TXT/PDF File
                  </label>
                  <p className="text-sm text-accent-600 mt-4">
                    Currently supports TXT and PDF files up to 10MB
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function QuizPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-main flex items-center justify-center"><div className="text-white">Loading...</div></div>}>
      <QuizPageContent />
    </Suspense>
  );
}