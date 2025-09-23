'use client';

import { useState } from 'react';
import Link from 'next/link';
import { sampleDiagramQuestions } from '@/lib/sampleDiagrams';
import DiagramQuestion from '@/components/DiagramQuestion';

export default function TestDiagramsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const currentQuestion = sampleDiagramQuestions[currentIndex];

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = answer;
    setAnswers(newAnswers);

    // Move to next question or show completion
    if (currentIndex < sampleDiagramQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert('All diagrams completed! Check console for answers.');
      console.log('Answers:', newAnswers);
    }
  };

  return (
    <div className="min-h-screen surface-gradient py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="text-primary-600 hover:text-primary-700 mb-8 inline-flex items-center font-medium transition-fast">
          ← Back to Home
        </Link>

        <div className="bg-white rounded-2xl shadow-elevated border-subtle p-12 fade-in">
          <div className="mb-12">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl heading-primary text-gradient">
                Interactive Diagram Assessment
              </h1>
              <span className="text-sm text-neutral-600 bg-neutral-100 px-4 py-2 rounded-full font-medium">
                Question {currentIndex + 1} of {sampleDiagramQuestions.length}
              </span>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-2">
              <div
                className="gradient-accent h-2 rounded-full transition-smooth"
                style={{ width: `${((currentIndex + 1) / sampleDiagramQuestions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-8 leading-relaxed">
              {currentQuestion.question_text}
            </h2>

            {currentQuestion.diagram_data && (
              <DiagramQuestion
                diagramData={currentQuestion.diagram_data}
                onAnswer={handleAnswer}
              />
            )}
          </div>

          {/* Show previous answers */}
          {answers.length > 0 && (
            <div className="mt-8 bg-slate-50 rounded-xl p-6">
              <h3 className="font-bold text-slate-800 mb-4">Previous Answers:</h3>
              {answers.map((answer, index) => (
                <div key={index} className="mb-2">
                  <span className="font-medium">Q{index + 1}:</span> {answer}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}