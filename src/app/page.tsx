'use client';

import Link from 'next/link';
import { topicKnowledge } from '@/lib/topicKnowledge';
import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('generate-quiz');
  const [showLearnContent, setShowLearnContent] = useState<{[key: string]: boolean}>({});
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCustomizationForm, setShowCustomizationForm] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [quizCustomization, setQuizCustomization] = useState({
    level: '',
    components: [] as string[],
    scoring: '30/30/30/10'
  });

  const tabs = [
    { id: 'generate-quiz', label: 'Generate Your Own Quiz' },
    { id: 'library-hub', label: 'Library Hub' },
    { id: 'llm', label: 'LLM' },
    { id: 'prompt-engineering', label: 'Prompt Engineering' },
    { id: 'rag', label: 'RAG' },
    { id: 'memory', label: 'Memory' }
  ];

  const topicData = {
    llm: {
      icon: '🤖',
      fullName: 'Large Language Models',
      knowledge: topicKnowledge.llm,
      quizTopic: 'llm',
      description: 'Master the fundamentals of LLMs, architecture, training, and applications'
    },
    'prompt-engineering': {
      icon: '✍️',
      fullName: 'Prompt Engineering',
      knowledge: topicKnowledge.promptEngineering,
      quizTopic: 'promptEngineering',
      description: 'Learn advanced techniques for crafting effective prompts and optimizing AI responses'
    },
    rag: {
      icon: '🔍',
      fullName: 'RAG Systems',
      knowledge: topicKnowledge.rag,
      quizTopic: 'rag',
      description: 'Understand Retrieval-Augmented Generation for enhanced AI knowledge systems'
    },
    memory: {
      icon: '🧠',
      fullName: 'AI Memory Systems',
      knowledge: topicKnowledge.memory,
      quizTopic: 'memory',
      description: 'Explore how AI systems store, retrieve, and utilize information over time'
    },
    'knowledge-graph': {
      icon: '🕸️',
      fullName: 'Knowledge Graphs',
      knowledge: {
        what: 'Knowledge graphs are structured representations of information that organize data as interconnected entities and relationships, enabling AI systems to understand context and make intelligent connections between concepts.',
        why: 'Knowledge graphs provide semantic understanding, enable complex reasoning, improve search accuracy, and allow AI systems to leverage structured knowledge for better decision-making and more accurate responses.',
        how: 'Implement knowledge graphs using graph databases (Neo4j, Amazon Neptune), define entity schemas and relationships, populate with structured data, and integrate with AI models through graph embeddings and graph neural networks.'
      },
      quizTopic: 'knowledgeGraph',
      description: 'Build and utilize knowledge graphs for semantic AI applications and reasoning'
    }
  };

  const toggleLearnContent = (topicId: string) => {
    setShowLearnContent(prev => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setShowCustomizationForm(true);
  };

  const handleComponentToggle = (component: string) => {
    setQuizCustomization(prev => ({
      ...prev,
      components: prev.components.includes(component)
        ? prev.components.filter(c => c !== component)
        : [...prev.components, component]
    }));
  };

  const generateCustomQuiz = async () => {
    if (!uploadedFile) return;

    setIsGenerating(true);

    try {
      const formData = new FormData();
      formData.append('file', uploadedFile);
      formData.append('level', quizCustomization.level);
      formData.append('components', JSON.stringify(quizCustomization.components));
      formData.append('scoring', quizCustomization.scoring);

      const response = await fetch('/api/generate-quiz', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        // Redirect to quiz page with generated questions
        const searchParams = new URLSearchParams();
        searchParams.set('custom', 'true');
        searchParams.set('questions', JSON.stringify(data.questions));
        window.location.href = `/quiz?${searchParams.toString()}`;
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

  const resetForm = () => {
    setUploadedFile(null);
    setShowCustomizationForm(false);
    setQuizCustomization({
      level: '',
      components: [],
      scoring: '30/30/30/10'
    });
  };

  const handleReviewLesson = (topicKey: string) => {
    setSelectedTopic(topicKey);
    setShowReviewModal(true);
  };

  return (
    <div className="min-h-screen surface-gradient">
      {/* Hero Header */}
      <header className="professional-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center fade-in">
            <h1 className="text-7xl heading-primary mb-8 text-white">
              AI Learning Platform
            </h1>
            <p className="text-xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
              Master artificial intelligence concepts through interactive learning, comprehensive assessments, and personalized knowledge tracking
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30 rounded-xl font-semibold transition-smooth interactive-scale shadow-card">
                Get Started
              </button>
              <button className="px-8 py-4 bg-transparent hover:bg-white/10 text-white border border-white/40 rounded-xl font-semibold transition-smooth">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Tab Navigation */}
        <div className="mb-16 slide-up">
          <div className="bg-white shadow-card rounded-2xl border-default p-2">
            <div className="flex flex-wrap gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-xl font-medium transition-smooth ${
                    activeTab === tab.id
                      ? 'gradient-accent text-white shadow-card-hover'
                      : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'generate-quiz' && (
          <section className="bg-white shadow-card rounded-3xl border-subtle p-12 fade-in">
            <div className="text-center mb-12">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary-600 to-accent-600 rounded-2xl flex items-center justify-center shadow-card">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-4xl heading-primary text-gradient mb-6">
                Generate Custom Quiz
              </h2>
              <p className="text-neutral-600 text-xl max-w-3xl mx-auto leading-relaxed">
                Upload your materials and leverage AI to create personalized assessments tailored to your specific content and learning objectives
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200 mb-8">
                <h3 className="text-2xl font-bold text-purple-800 mb-6 text-center">
                  {!showCustomizationForm ? 'Upload Your Content' : 'Customize Your Quiz'}
                </h3>

                {isGenerating ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-6"></div>
                    <h4 className="text-2xl font-bold text-purple-800 mb-2">Generating Your Custom Quiz...</h4>
                    <p className="text-purple-600 text-lg">Our AI is analyzing your content and creating personalized questions</p>
                    <p className="text-purple-500 text-sm mt-2">This may take a few moments</p>
                  </div>
                ) : showCustomizationForm ? (
                  <div className="space-y-8">
                    {/* File Upload Confirmation */}
                    <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">✅</span>
                        <div>
                          <h4 className="font-bold text-green-800">File Uploaded Successfully</h4>
                          <p className="text-green-700 text-sm">{uploadedFile?.name}</p>
                        </div>
                        <button
                          onClick={resetForm}
                          className="ml-auto text-green-600 hover:text-green-800 underline text-sm"
                        >
                          Change File
                        </button>
                      </div>
                    </div>

                    {/* Question 1: Test Level */}
                    <div className="bg-white rounded-xl p-6 border border-purple-200">
                      <h4 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
                        <span className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center mr-3 text-sm">1</span>
                        Which test level do you wish to try?
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                          <button
                            key={level}
                            onClick={() => setQuizCustomization(prev => ({ ...prev, level }))}
                            className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                              quizCustomization.level === level
                                ? 'border-purple-400 bg-purple-50 text-purple-800'
                                : 'border-purple-200 hover:border-purple-300 text-purple-600'
                            }`}
                          >
                            <div className="text-2xl mb-2">
                              {level === 'Beginner' ? '🌱' : level === 'Intermediate' ? '🌿' : '🌳'}
                            </div>
                            <div className="font-semibold">{level}</div>
                            <div className="text-xs mt-1">
                              {level === 'Beginner' ? 'Basic concepts' :
                               level === 'Intermediate' ? 'Applied knowledge' : 'Expert level'}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Question 2: Components */}
                    <div className="bg-white rounded-xl p-6 border border-purple-200">
                      <h4 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
                        <span className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                        Select components you prefer in your test (multiple select)
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { id: 'multiple-choice', label: 'Multiple Choice', icon: '📝', desc: 'Select the best answer' },
                          { id: 'fill-blank', label: 'Fill in the Blank', icon: '📄', desc: 'Complete sentences or phrases' },
                          { id: 'reasoning', label: 'Reasoning Questions', icon: '🧠', desc: 'Provide brief explanations' },
                          { id: 'diagram', label: 'Diagram Fill in the Blank', icon: '📊', desc: 'Label diagrams and charts' }
                        ].map((component) => (
                          <button
                            key={component.id}
                            onClick={() => handleComponentToggle(component.id)}
                            className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                              quizCustomization.components.includes(component.id)
                                ? 'border-purple-400 bg-purple-50 text-purple-800'
                                : 'border-purple-200 hover:border-purple-300 text-purple-600'
                            }`}
                          >
                            <div className="flex items-center">
                              <span className="text-2xl mr-3">{component.icon}</span>
                              <div>
                                <div className="font-semibold">{component.label}</div>
                                <div className="text-xs mt-1">{component.desc}</div>
                              </div>
                              {quizCustomization.components.includes(component.id) && (
                                <span className="ml-auto text-purple-600">✓</span>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Question 3: Scoring */}
                    <div className="bg-white rounded-xl p-6 border border-purple-200">
                      <h4 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
                        <span className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center mr-3 text-sm">3</span>
                        Scoring paradigm for each component
                      </h4>
                      <div className="space-y-3">
                        {[
                          { value: '30/30/30/10', label: 'Balanced (30% MC, 30% Fill, 30% Reasoning, 10% Diagram)', desc: 'Equal focus on all types' },
                          { value: '40/20/30/10', label: 'MC Focus (40% MC, 20% Fill, 30% Reasoning, 10% Diagram)', desc: 'Emphasis on multiple choice' },
                          { value: '25/25/35/15', label: 'Reasoning Focus (25% MC, 25% Fill, 35% Reasoning, 15% Diagram)', desc: 'More analytical questions' },
                          { value: '20/30/30/20', label: 'Practical Focus (20% MC, 30% Fill, 30% Reasoning, 20% Diagram)', desc: 'Applied knowledge emphasis' }
                        ].map((scoring) => (
                          <label
                            key={scoring.value}
                            className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                              quizCustomization.scoring === scoring.value
                                ? 'border-purple-400 bg-purple-50'
                                : 'border-purple-200 hover:border-purple-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="scoring"
                              value={scoring.value}
                              checked={quizCustomization.scoring === scoring.value}
                              onChange={(e) => setQuizCustomization(prev => ({ ...prev, scoring: e.target.value }))}
                              className="mr-4 text-purple-600"
                            />
                            <div>
                              <div className="font-semibold text-purple-800">{scoring.label}</div>
                              <div className="text-sm text-purple-600">{scoring.desc}</div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Generate Button */}
                    <div className="text-center">
                      <button
                        onClick={generateCustomQuiz}
                        disabled={!quizCustomization.level || quizCustomization.components.length === 0}
                        className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 ${
                          quizCustomization.level && quizCustomization.components.length > 0
                            ? 'gradient-accent text-white custom-shadow-lg transform hover:scale-105'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        🚀 Generate Custom Quiz
                      </button>
                      <p className="text-purple-600 text-sm mt-3">
                        Please select a level and at least one component to continue
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-2xl">📄</span>
                        </div>
                        <h4 className="font-bold text-purple-800 mb-2">Upload TXT File</h4>
                        <p className="text-purple-600 text-sm">Plain text documents up to 10MB</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-2xl">🤖</span>
                        </div>
                        <h4 className="font-bold text-purple-800 mb-2">AI Analysis</h4>
                        <p className="text-purple-600 text-sm">Smart content analysis and question generation</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-2xl">📝</span>
                        </div>
                        <h4 className="font-bold text-purple-800 mb-2">Custom Quiz</h4>
                        <p className="text-purple-600 text-sm">5-10 questions tailored to your content</p>
                      </div>
                    </div>

                    <div className="border-2 border-dashed border-purple-300 rounded-xl p-8 text-center hover:border-purple-400 transition-colors duration-200">
                      <input
                        type="file"
                        accept=".txt"
                        onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
                        className="hidden"
                        id="file-upload-tab"
                      />
                      <label
                        htmlFor="file-upload-tab"
                        className="cursor-pointer"
                      >
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-purple-200">
                          <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                        </div>
                        <h4 className="text-xl font-bold text-purple-800 mb-2">Choose File to Upload</h4>
                        <p className="text-purple-600 mb-4">Click here to select your TXT file</p>
                        <div className="inline-block gradient-accent text-white font-bold py-3 px-8 rounded-xl custom-shadow-lg transform hover:scale-105 transition-all duration-200">
                          📄 Select TXT File
                        </div>
                      </label>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                      <h4 className="font-bold text-blue-800 mb-3 flex items-center">
                        <span className="text-xl mr-2">💡</span>
                        Tips for Best Results
                      </h4>
                      <ul className="text-blue-700 space-y-2 text-sm">
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Use well-structured content with clear topics and concepts
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Include at least 500 words for meaningful question generation
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Educational materials, documentation, and articles work best
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {activeTab === 'library-hub' && (
          <section className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-elevated border border-neutral-200 p-12">
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-card">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h2 className="text-4xl heading-primary text-gradient mb-6">
                📚 Library Hub
              </h2>
              <p className="text-neutral-600 text-xl max-w-3xl mx-auto leading-relaxed">
                Explore comprehensive AI topics with interactive lessons, in-depth content, and knowledge assessments
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {Object.entries(topicData).map(([key, topic]) => (
                <div
                  key={key}
                  className="bg-white rounded-2xl border border-neutral-200 shadow-card hover:shadow-card-hover transition-smooth p-8 group hover:border-primary-300"
                >
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-50 to-accent-50 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-primary-200 group-hover:border-primary-400 transition-smooth">
                      <span className="text-3xl">{topic.icon}</span>
                    </div>
                    <h3 className="text-xl heading-secondary text-neutral-800 mb-3">
                      {topic.fullName}
                    </h3>
                    <p className="text-neutral-600 text-sm leading-relaxed">
                      {topic.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={() => handleReviewLesson(key)}
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-4 px-6 rounded-xl transition-smooth shadow-card hover:shadow-card-hover flex items-center justify-center group"
                    >
                      <svg className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
                      </svg>
                      <span className="font-semibold">Review Lesson</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Topic Tabs Content */}
        {activeTab !== 'library-hub' && activeTab !== 'generate-quiz' && topicData[activeTab as keyof typeof topicData] && (
          <section>
            <div className="text-center mb-12">
              <div className="text-6xl mb-4">{topicData[activeTab as keyof typeof topicData].icon}</div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
                {topicData[activeTab as keyof typeof topicData].fullName}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Learn Card */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl custom-shadow-lg p-8 border border-pink-200 hover:border-purple-300 transition-all duration-300">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-blue-200">
                    <span className="text-3xl">📖</span>
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                    Learn
                  </h3>
                  <p className="text-purple-700 mb-6">
                    Understand the fundamentals, importance, and implementation
                  </p>
                </div>

                <button
                  onClick={() => toggleLearnContent(activeTab)}
                  className="w-full gradient-accent text-white font-bold py-4 px-6 rounded-xl custom-shadow-lg transform hover:scale-105 transition-all duration-200 mb-6"
                >
                  {showLearnContent[activeTab] ? 'Hide Knowledge' : 'Show Knowledge'}
                </button>

                {showLearnContent[activeTab] && (
                  <div className="space-y-6 animate-in slide-in-from-top-4 duration-300">
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                      <h4 className="font-bold text-purple-800 mb-3 flex items-center">
                        <span className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center mr-3 text-sm">1</span>
                        What it is
                      </h4>
                      <p className="text-purple-700 leading-relaxed">
                        {topicData[activeTab as keyof typeof topicData].knowledge.what}
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-pink-50 to-blue-50 rounded-xl p-6 border border-pink-200">
                      <h4 className="font-bold text-purple-800 mb-3 flex items-center">
                        <span className="w-8 h-8 bg-pink-200 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                        Why it&apos;s needed
                      </h4>
                      <p className="text-purple-700 leading-relaxed">
                        {topicData[activeTab as keyof typeof topicData].knowledge.why}
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                      <h4 className="font-bold text-purple-800 mb-3 flex items-center">
                        <span className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center mr-3 text-sm">3</span>
                        How to implement
                      </h4>
                      <p className="text-purple-700 leading-relaxed">
                        {topicData[activeTab as keyof typeof topicData].knowledge.how}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Sample Test Card */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl custom-shadow-lg p-8 border border-pink-200 hover:border-purple-300 transition-all duration-300">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-pink-200">
                    <span className="text-3xl">📝</span>
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                    Sample Test
                  </h3>
                  <p className="text-purple-700 mb-6">
                    Test your knowledge with 10 carefully crafted questions
                  </p>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 mb-6 border border-purple-200">
                    <div className="text-sm text-purple-600 space-y-2">
                      <p className="flex items-center justify-center">
                        <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                        5 Multiple Choice Questions
                      </p>
                      <p className="flex items-center justify-center">
                        <span className="w-2 h-2 bg-pink-400 rounded-full mr-2"></span>
                        5 Reasoning Questions
                      </p>
                      <p className="flex items-center justify-center">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                        ~10 minutes
                      </p>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/quiz?topic=${topicData[activeTab as keyof typeof topicData].quizTopic}`}
                  className="block w-full text-center gradient-accent text-white font-bold py-4 px-6 rounded-xl custom-shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  🚀 Start {topicData[activeTab as keyof typeof topicData].fullName} Quiz
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Quick Access Section */}
        <section className="mt-20 bg-white/80 backdrop-blur-sm rounded-3xl custom-shadow-lg p-12 text-center border border-pink-200">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-8">
            Quick Access 🚀
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-purple-200">
                <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">📝 Sample Quiz</h3>
              <p className="text-purple-700 mb-6">Take our general LLM quiz with 10 expertly crafted questions</p>
              <Link
                href="/quiz"
                className="inline-block gradient-accent text-white font-bold py-3 px-8 rounded-xl custom-shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Start Sample Quiz
              </Link>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-pink-200">
                <svg className="w-10 h-10 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent mb-3">🎨 Custom Quiz</h3>
              <p className="text-purple-700 mb-6">Upload your materials and generate personalized AI quizzes</p>
              <Link
                href="/quiz"
                className="inline-block gradient-accent text-white font-bold py-3 px-8 rounded-xl custom-shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Create Custom Quiz
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="gradient-bg text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4">✨ AI Learning Quiz Platform ✨</h3>
            <p className="text-white/80 mb-6">Empowering teams with AI knowledge through interactive learning</p>
            <p className="text-white/60">&copy; 2024 AI Learning Quiz Platform. Built for enterprise AI training with 💜</p>
          </div>
        </div>
      </footer>

      {/* Review Modal */}
      {showReviewModal && selectedTopic && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-2xl">{topicData[selectedTopic as keyof typeof topicData]?.icon}</span>
                  </div>
                  <div>
                    <h2 className="text-3xl heading-primary text-gradient">
                      {topicData[selectedTopic as keyof typeof topicData]?.fullName}
                    </h2>
                    <p className="text-neutral-600">Interactive Lesson Review</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="w-10 h-10 bg-neutral-100 hover:bg-neutral-200 rounded-full flex items-center justify-center transition-smooth"
                >
                  <svg className="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Content */}
              {selectedTopic === 'llm' ? (
                <div className="space-y-12">
                  {/* LLM Section 1: Foundations & Basic Concepts */}
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
                    <h3 className="text-2xl heading-secondary text-blue-800 mb-6 flex items-center">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3 text-white font-bold text-sm">1</div>
                      Foundations & Core Concepts
                    </h3>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="bg-white rounded-xl p-6 shadow-card">
                          <h4 className="text-lg font-bold text-blue-800 mb-3">🎯 What is GPT?</h4>
                          <div className="space-y-3 text-sm">
                            <div className="bg-blue-50 p-3 rounded-lg">
                              <span className="font-semibold text-blue-700">Generative:</span> Generate new text one token at a time
                            </div>
                            <div className="bg-purple-50 p-3 rounded-lg">
                              <span className="font-semibold text-purple-700">Pre-trained:</span> Learned from massive Internet datasets
                            </div>
                            <div className="bg-green-50 p-3 rounded-lg">
                              <span className="font-semibold text-green-700">Transformer:</span> Deep learning neural network architecture
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-card">
                          <h4 className="text-lg font-bold text-blue-800 mb-3">⚡ Key Principles</h4>
                          <ul className="space-y-2 text-sm text-neutral-700">
                            <li className="flex items-start">
                              <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              <strong>Auto-regressive:</strong> Predicts next token based on previous tokens
                            </li>
                            <li className="flex items-start">
                              <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              <strong>Probability Engine:</strong> Uses mathematical probabilities for predictions
                            </li>
                            <li className="flex items-start">
                              <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              <strong>Context Aware:</strong> Considers surrounding text for meaning
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-white rounded-xl p-6 shadow-card">
                        <h4 className="text-lg font-bold text-blue-800 mb-4">🔄 Token Generation Process</h4>
                        <div className="space-y-4">
                          <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded-lg border-l-4 border-blue-500">
                            <div className="font-mono text-sm text-blue-800">Input: &quot;The cat sat on the&quot;</div>
                          </div>
                          <div className="flex justify-center">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                          </div>
                          <div className="space-y-2">
                            <div className="bg-green-100 p-2 rounded text-sm">
                              <span className="font-semibold">mat:</span> 85% probability
                            </div>
                            <div className="bg-yellow-100 p-2 rounded text-sm">
                              <span className="font-semibold">ground:</span> 10% probability
                            </div>
                            <div className="bg-red-100 p-2 rounded text-sm">
                              <span className="font-semibold">moon:</span> 2% probability
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* LLM Section 2: Transformer Architecture & Attention */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200">
                    <h3 className="text-2xl heading-secondary text-purple-800 mb-6 flex items-center">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-3 text-white font-bold text-sm">2</div>
                      Transformer Architecture & Attention Mechanism
                    </h3>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="bg-white rounded-xl p-6 shadow-card">
                          <h4 className="text-lg font-bold text-purple-800 mb-4">🏗️ Architecture Pipeline</h4>
                          <div className="space-y-3">
                            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</div>
                              <span className="text-sm font-medium">Tokenization</span>
                            </div>
                            <div className="flex items-center p-3 bg-green-50 rounded-lg">
                              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</div>
                              <span className="text-sm font-medium">Embedding</span>
                            </div>
                            <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                              <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</div>
                              <span className="text-sm font-medium">Attention</span>
                            </div>
                            <div className="flex items-center p-3 bg-orange-50 rounded-lg">
                              <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">4</div>
                              <span className="text-sm font-medium">MLP (Feed Forward)</span>
                            </div>
                            <div className="flex items-center p-3 bg-pink-50 rounded-lg">
                              <div className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">5</div>
                              <span className="text-sm font-medium">Unembedding</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-card">
                          <h4 className="text-lg font-bold text-purple-800 mb-3">🎯 Attention Mechanism</h4>
                          <div className="space-y-3 text-sm">
                            <div className="bg-purple-50 p-3 rounded-lg">
                              <strong className="text-purple-700">Query-Key-Value:</strong> Tokens ask questions and get context-aware answers
                            </div>
                            <div className="bg-blue-50 p-3 rounded-lg">
                              <strong className="text-blue-700">Multi-Head:</strong> Multiple perspectives of context simultaneously
                            </div>
                            <div className="bg-green-50 p-3 rounded-lg">
                              <strong className="text-green-700">Self-Attention:</strong> Each token gathers context from all other tokens
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-xl p-6 shadow-card">
                        <h4 className="text-lg font-bold text-purple-800 mb-4">🧠 Context Window & Processing</h4>
                        <div className="space-y-4">
                          <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg">
                            <h5 className="font-semibold text-purple-800 mb-2">GPT-3 Specifications</h5>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div className="bg-white p-2 rounded">
                                <span className="font-medium">Dimensions:</span> 12,288
                              </div>
                              <div className="bg-white p-2 rounded">
                                <span className="font-medium">Tokens:</span> 2,048
                              </div>
                              <div className="bg-white p-2 rounded">
                                <span className="font-medium">Parameters:</span> 175B
                              </div>
                              <div className="bg-white p-2 rounded">
                                <span className="font-medium">Layers:</span> 96
                              </div>
                            </div>
                          </div>

                          <div className="bg-gradient-to-r from-blue-100 to-green-100 p-4 rounded-lg">
                            <h5 className="font-semibold text-blue-800 mb-2">Context Processing</h5>
                            <ul className="text-sm space-y-1 text-neutral-700">
                              <li>• Parallel processing enables speed & scalability</li>
                              <li>• All tokens processed simultaneously</li>
                              <li>• Long-range dependencies captured</li>
                              <li>• Context integrated into final vectors</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : selectedTopic === 'prompt-engineering' ? (
                <div className="space-y-12">
                  {/* Prompt Engineering Section 1: Fundamentals & LLM Configurations */}
                  <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 border border-green-200">
                    <h3 className="text-2xl heading-secondary text-green-800 mb-6 flex items-center">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-3 text-white font-bold text-sm">1</div>
                      Fundamentals & LLM Configurations
                    </h3>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="bg-white rounded-xl p-6 shadow-card">
                          <h4 className="text-lg font-bold text-green-800 mb-3">🎯 What is Prompt Engineering?</h4>
                          <p className="text-sm text-neutral-700 mb-4">
                            The process of crafting effective inputs (prompts) to guide LLMs to produce accurate, relevant, and useful outputs.
                          </p>
                          <div className="space-y-2 text-sm">
                            <div className="bg-green-50 p-3 rounded-lg">
                              <span className="font-semibold text-green-700">Reduce Hallucination:</span> Avoid vague or misleading responses
                            </div>
                            <div className="bg-blue-50 p-3 rounded-lg">
                              <span className="font-semibold text-blue-700">Control Usage:</span> Optimize token and API costs
                            </div>
                            <div className="bg-purple-50 p-3 rounded-lg">
                              <span className="font-semibold text-purple-700">Improve Effectiveness:</span> Get better, more targeted results
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-card">
                          <h4 className="text-lg font-bold text-green-800 mb-4">⚙️ Key Configurations</h4>
                          <div className="space-y-3">
                            <div className="bg-blue-50 p-3 rounded-lg">
                              <div className="font-semibold text-blue-700 mb-1">Temperature (0.0-2.0)</div>
                              <div className="text-xs text-blue-600">Controls randomness: Low = focused, High = creative</div>
                            </div>
                            <div className="bg-purple-50 p-3 rounded-lg">
                              <div className="font-semibold text-purple-700 mb-1">Top-P (0.0-1.0)</div>
                              <div className="text-xs text-purple-600">Nucleus sampling: Cumulative probability threshold</div>
                            </div>
                            <div className="bg-green-50 p-3 rounded-lg">
                              <div className="font-semibold text-green-700 mb-1">Max Tokens</div>
                              <div className="text-xs text-green-600">Controls output length and cost</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="bg-white rounded-xl p-6 shadow-card">
                          <h4 className="text-lg font-bold text-green-800 mb-4">🔢 Temperature Effects</h4>
                          <div className="space-y-4">
                            <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-4 rounded-lg border-l-4 border-blue-500">
                              <div className="font-mono text-sm text-blue-800 mb-2">Temperature = 0.2 (Low)</div>
                              <div className="text-xs text-blue-600">Focused, deterministic, factual responses</div>
                            </div>
                            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-4 rounded-lg border-l-4 border-yellow-500">
                              <div className="font-mono text-sm text-yellow-800 mb-2">Temperature = 0.7 (Medium)</div>
                              <div className="text-xs text-yellow-600">Balanced creativity and coherence</div>
                            </div>
                            <div className="bg-gradient-to-r from-red-100 to-pink-100 p-4 rounded-lg border-l-4 border-red-500">
                              <div className="font-mono text-sm text-red-800 mb-2">Temperature = 1.5 (High)</div>
                              <div className="text-xs text-red-600">Highly creative, diverse, unpredictable</div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-card">
                          <h4 className="text-lg font-bold text-green-800 mb-4">📊 Shot Learning Types</h4>
                          <div className="space-y-3">
                            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">0</div>
                              <div>
                                <div className="font-semibold text-blue-700">Zero-Shot</div>
                                <div className="text-xs text-blue-600">Task description only, no examples</div>
                              </div>
                            </div>
                            <div className="flex items-center p-3 bg-green-50 rounded-lg">
                              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</div>
                              <div>
                                <div className="font-semibold text-green-700">One-Shot</div>
                                <div className="text-xs text-green-600">Single example to guide format</div>
                              </div>
                            </div>
                            <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                              <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">N</div>
                              <div>
                                <div className="font-semibold text-purple-700">Few-Shot</div>
                                <div className="text-xs text-purple-600">Multiple examples for complex tasks</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Prompt Engineering Section 2: Advanced Techniques */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200">
                    <h3 className="text-2xl heading-secondary text-purple-800 mb-6 flex items-center">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-3 text-white font-bold text-sm">2</div>
                      Advanced Reasoning Techniques
                    </h3>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="bg-white rounded-xl p-6 shadow-card">
                          <h4 className="text-lg font-bold text-purple-800 mb-4">🧠 Chain of Thought (CoT)</h4>
                          <p className="text-sm text-neutral-700 mb-4">
                            Ask AI to think step-by-step before answering and provide reasoning process.
                          </p>
                          <div className="space-y-3">
                            <div className="bg-purple-50 p-3 rounded-lg">
                              <div className="font-semibold text-purple-700 mb-1">Zero-Shot CoT</div>
                              <div className="text-xs text-purple-600">&quot;Let&apos;s think step by step&quot;</div>
                            </div>
                            <div className="bg-blue-50 p-3 rounded-lg">
                              <div className="font-semibold text-blue-700 mb-1">Few-Shot CoT</div>
                              <div className="text-xs text-blue-600">Examples with reasoning steps</div>
                            </div>
                          </div>
                          <div className="mt-3 text-xs text-neutral-600">
                            Best for: Math, complex decisions, business analysis
                          </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-card">
                          <h4 className="text-lg font-bold text-purple-800 mb-4">🎯 Self-Consistency</h4>
                          <p className="text-sm text-neutral-700 mb-4">
                            Generate multiple reasoning paths and choose majority answer.
                          </p>
                          <div className="space-y-2">
                            <div className="flex items-center p-2 bg-blue-50 rounded">
                              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">1</div>
                              <span className="text-xs">Start with CoT prompt</span>
                            </div>
                            <div className="flex items-center p-2 bg-green-50 rounded">
                              <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">2</div>
                              <span className="text-xs">Sample multiple answers</span>
                            </div>
                            <div className="flex items-center p-2 bg-purple-50 rounded">
                              <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">3</div>
                              <span className="text-xs">Majority vote</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="bg-white rounded-xl p-6 shadow-card">
                          <h4 className="text-lg font-bold text-purple-800 mb-4">🌳 Tree of Thought (ToT)</h4>
                          <p className="text-sm text-neutral-700 mb-4">
                            Explore multiple reasoning paths and backtrack for optimal decisions.
                          </p>
                          <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg">
                            <div className="text-xs text-purple-800 space-y-1">
                              <div>• Consider all possible options at each step</div>
                              <div>• Evaluate and reason about each path</div>
                              <div>• Backtrack when necessary</div>
                              <div>• Choose optimal solution</div>
                            </div>
                          </div>
                          <div className="mt-3 text-xs text-neutral-600">
                            Use for: Strategic planning, code generation, complex problem-solving
                          </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-card">
                          <h4 className="text-lg font-bold text-purple-800 mb-4">⚡ ReAct (Reason & Act)</h4>
                          <p className="text-sm text-neutral-700 mb-4">
                            Combines reasoning with tool use and external data retrieval.
                          </p>
                          <div className="space-y-2">
                            <div className="bg-blue-50 p-2 rounded text-xs">
                              <span className="font-semibold text-blue-700">Thought:</span> LLM reasons step-by-step
                            </div>
                            <div className="bg-green-50 p-2 rounded text-xs">
                              <span className="font-semibold text-green-700">Action:</span> Choose external tool
                            </div>
                            <div className="bg-yellow-50 p-2 rounded text-xs">
                              <span className="font-semibold text-yellow-700">Observation:</span> Read tool results
                            </div>
                            <div className="bg-purple-50 p-2 rounded text-xs">
                              <span className="font-semibold text-purple-700">Repeat:</span> Loop until complete
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 bg-white rounded-xl p-6 shadow-card">
                      <h4 className="text-lg font-bold text-purple-800 mb-4">🛡️ Hallucination Prevention</h4>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-red-50 p-4 rounded-lg text-center">
                          <div className="text-2xl mb-2">🔍</div>
                          <div className="font-semibold text-red-700 mb-1">Trust but Verify</div>
                          <div className="text-xs text-red-600">Cross-reference sources</div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg text-center">
                          <div className="text-2xl mb-2">📋</div>
                          <div className="font-semibold text-blue-700 mb-1">Specify Format</div>
                          <div className="text-xs text-blue-600">Define output structure</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg text-center">
                          <div className="text-2xl mb-2">🎯</div>
                          <div className="font-semibold text-green-700 mb-1">Provide Context</div>
                          <div className="text-xs text-green-600">Include relevant information</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : selectedTopic === 'rag' ? (
                <div className="space-y-12">
                  {/* RAG Section 1: Knowledge Preparation & Vector Database */}
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-200">
                    <h3 className="text-2xl heading-secondary text-orange-800 mb-6 flex items-center">
                      <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center mr-3 text-white font-bold text-sm">1</div>
                      Knowledge Preparation & Vector Database
                    </h3>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="bg-white rounded-xl p-6 shadow-card">
                          <h4 className="text-lg font-bold text-orange-800 mb-3">🎯 What is RAG?</h4>
                          <p className="text-sm text-neutral-700 mb-4">
                            <strong>Retrieval-Augmented Generation:</strong> The model finds relevant documents (context) and LLM generates response using retrieved documents.
                          </p>
                          <div className="space-y-2 text-sm">
                            <div className="bg-orange-50 p-3 rounded-lg">
                              <span className="font-semibold text-orange-700">Why RAG?</span> LLMs lack internal company docs, latest policies, and proprietary knowledge
                            </div>
                            <div className="bg-red-50 p-3 rounded-lg">
                              <span className="font-semibold text-red-700">Token Limits:</span> Prompting with background info quickly hits context limits
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-card">
                          <h4 className="text-lg font-bold text-orange-800 mb-4">📚 Text Chunking</h4>
                          <p className="text-sm text-neutral-700 mb-3">
                            Split long documents into small sections (chunks) for better retrieval.
                          </p>
                          <div className="space-y-2">
                            <div className="bg-blue-50 p-3 rounded-lg text-xs">
                              <div className="font-semibold text-blue-700 mb-1">Optimal Size: 300-500 words</div>
                              <div className="text-blue-600">~500-1000 tokens with 20% overlap</div>
                            </div>
                            <div className="bg-green-50 p-3 rounded-lg text-xs">
                              <div className="font-semibold text-green-700 mb-1">Why Small Chunks?</div>
                              <div className="text-green-600">• Better semantic meaning capture<br/>• Improved retrieval precision<br/>• Faster search performance</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="bg-white rounded-xl p-6 shadow-card">
                          <h4 className="text-lg font-bold text-orange-800 mb-4">🔢 Embedding Generation</h4>
                          <p className="text-sm text-neutral-700 mb-4">
                            Convert text chunks into vector representations for similarity search.
                          </p>
                          <div className="space-y-3">
                            <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-3 rounded-lg">
                              <div className="font-semibold text-purple-700 mb-1">OpenAI text-embedding-3-small</div>
                              <div className="text-xs text-purple-600">1536 dimensions • High quality</div>
                            </div>
                            <div className="bg-gradient-to-r from-green-100 to-teal-100 p-3 rounded-lg">
                              <div className="font-semibold text-green-700 mb-1">BGE (BAAI)</div>
                              <div className="text-xs text-green-600">768/1024 dimensions • Open source</div>
                            </div>
                          </div>
                          <div className="mt-3 text-xs text-neutral-600 bg-neutral-50 p-2 rounded">
                            💡 Bigger size = more detail capture, but more storage space
                          </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-card">
                          <h4 className="text-lg font-bold text-orange-800 mb-4">🗄️ Vector Storage Process</h4>
                          <div className="space-y-3">
                            <div className="flex items-center p-2 bg-blue-50 rounded">
                              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">1</div>
                              <span className="text-xs">Break documents into chunks</span>
                            </div>
                            <div className="flex items-center p-2 bg-green-50 rounded">
                              <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">2</div>
                              <span className="text-xs">Generate embeddings for each chunk</span>
                            </div>
                            <div className="flex items-center p-2 bg-purple-50 rounded">
                              <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">3</div>
                              <span className="text-xs">Store embeddings in vector database</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* RAG Section 2: Context Retrieval & Response Generation */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
                    <h3 className="text-2xl heading-secondary text-blue-800 mb-6 flex items-center">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3 text-white font-bold text-sm">2</div>
                      Context Retrieval & Response Generation
                    </h3>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="bg-white rounded-xl p-6 shadow-card">
                          <h4 className="text-lg font-bold text-blue-800 mb-4">🔍 Similarity Search</h4>
                          <p className="text-sm text-neutral-700 mb-4">
                            Compare user query embeddings with stored document chunks using cosine similarity.
                          </p>
                          <div className="space-y-3">
                            <div className="bg-blue-50 p-3 rounded-lg">
                              <div className="font-semibold text-blue-700 mb-1">Cosine Similarity</div>
                              <div className="text-xs text-blue-600">Measures direction, ignores magnitude<br/>Range: -1 to 1 (1 = most similar)</div>
                            </div>
                            <div className="bg-red-50 p-3 rounded-lg">
                              <div className="font-semibold text-red-700 mb-1">Why Not Dot Product?</div>
                              <div className="text-xs text-red-600">Favors longer vectors over relevance<br/>Penalizes short but relevant chunks</div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-card">
                          <h4 className="text-lg font-bold text-blue-800 mb-4">🔄 RAG Workflow</h4>
                          <div className="space-y-2">
                            <div className="bg-green-50 p-2 rounded text-xs">
                              <span className="font-semibold text-green-700">1. User Query:</span> Convert to embedding
                            </div>
                            <div className="bg-blue-50 p-2 rounded text-xs">
                              <span className="font-semibold text-blue-700">2. Search:</span> Find top matching chunks
                            </div>
                            <div className="bg-purple-50 p-2 rounded text-xs">
                              <span className="font-semibold text-purple-700">3. Context:</span> Provide chunks to LLM
                            </div>
                            <div className="bg-orange-50 p-2 rounded text-xs">
                              <span className="font-semibold text-orange-700">4. Generate:</span> Create final response
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="bg-white rounded-xl p-6 shadow-card">
                          <h4 className="text-lg font-bold text-blue-800 mb-4">🛡️ Fallback Mechanism</h4>
                          <p className="text-sm text-neutral-700 mb-4">
                            When primary RAG search fails or returns no results, system falls back to alternative approaches.
                          </p>
                          <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded-lg">
                            <div className="text-xs space-y-2">
                              <div className="flex items-center">
                                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                                <span>Normal RAG → Retrieve matching chunks</span>
                              </div>
                              <div className="flex items-center">
                                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                                <span>No matches → Fallback triggered</span>
                              </div>
                              <div className="flex items-center">
                                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                                <span>External search tool → Generate answer</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-card">
                          <h4 className="text-lg font-bold text-blue-800 mb-4">⚖️ RAG vs Long Prompt</h4>
                          <div className="grid grid-cols-2 gap-3 text-xs">
                            <div className="bg-green-50 p-3 rounded">
                              <div className="font-semibold text-green-700 mb-1">RAG</div>
                              <div className="text-green-600">
                                • Large, changing content<br/>
                                • Database retrieval<br/>
                                • Short, efficient prompts<br/>
                                • Auto context enrichment
                              </div>
                            </div>
                            <div className="bg-orange-50 p-3 rounded">
                              <div className="font-semibold text-orange-700 mb-1">Long Prompt</div>
                              <div className="text-orange-600">
                                • Small, fixed content<br/>
                                • All data in prompt<br/>
                                • Gets slower as it grows<br/>
                                • Manual updates needed
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 bg-white rounded-xl p-6 shadow-card">
                      <h4 className="text-lg font-bold text-blue-800 mb-4">🎯 Key Takeaway</h4>
                      <div className="bg-gradient-to-r from-blue-100 to-green-100 p-4 rounded-lg text-center">
                        <p className="text-sm font-medium text-blue-800">
                          Use RAG when your knowledge is <span className="font-bold">big or always changing</span>,
                          use long prompts for <span className="font-bold">small, static content</span>.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : selectedTopic === 'memory' ? (
                <div className="space-y-12">
                  {/* Memory Section 1: Short-term Memory & Working Context */}
                  <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-8 border border-teal-200">
                    <h3 className="text-2xl heading-secondary text-teal-800 mb-6 flex items-center">
                      <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center mr-3 text-white font-bold text-sm">1</div>
                      Short-term Memory & Working Context
                    </h3>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="bg-white rounded-xl p-6 shadow-card">
                          <h4 className="text-lg font-bold text-teal-800 mb-3">🤖 AI Model vs AI Agent</h4>
                          <div className="space-y-3 text-sm">
                            <div className="bg-teal-50 p-3 rounded-lg">
                              <span className="font-semibold text-teal-700">AI Model:</span> Stateless, no memory of previous context
                            </div>
                            <div className="bg-cyan-50 p-3 rounded-lg">
                              <span className="font-semibold text-cyan-700">AI Agent:</span> Can have memory, learn during operation, interact with environment
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-card">
                          <h4 className="text-lg font-bold text-teal-800 mb-4">🧠 Why Memory Matters</h4>
                          <div className="space-y-2">
                            <div className="bg-blue-50 p-2 rounded text-xs">
                              <span className="font-semibold text-blue-700">Context Awareness:</span> Understand what happened before
                            </div>
                            <div className="bg-green-50 p-2 rounded text-xs">
                              <span className="font-semibold text-green-700">Learning:</span> Store outcomes, improve decisions
                            </div>
                            <div className="bg-purple-50 p-2 rounded text-xs">
                              <span className="font-semibold text-purple-700">Multitasking:</span> Track multi-step progress
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="bg-white rounded-xl p-6 shadow-card">
                          <h4 className="text-lg font-bold text-teal-800 mb-4">🔧 Short-term Memory Mechanisms</h4>
                          <div className="space-y-3">
                            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</div>
                              <div>
                                <div className="font-semibold text-blue-700">Buffering</div>
                                <div className="text-xs text-blue-600">Store recent messages in context window</div>
                              </div>
                            </div>
                            <div className="flex items-center p-3 bg-green-50 rounded-lg">
                              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</div>
                              <div>
                                <div className="font-semibold text-green-700">Relevance Filtering</div>
                                <div className="text-xs text-green-600">Trim irrelevant info, keep focused content</div>
                              </div>
                            </div>
                            <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                              <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</div>
                              <div>
                                <div className="font-semibold text-purple-700">Summarization</div>
                                <div className="text-xs text-purple-600">Condense conversation history</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-card">
                          <h4 className="text-lg font-bold text-teal-800 mb-4">📊 Memory Management</h4>
                          <div className="bg-gradient-to-r from-teal-100 to-cyan-100 p-4 rounded-lg">
                            <div className="text-xs space-y-2">
                              <div><strong>Capture:</strong> Store in RAM during session</div>
                              <div><strong>Retrieve:</strong> Attention mechanism for relevance</div>
                              <div><strong>Forget:</strong> Drop older info when context full</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Memory Section 2: Long-term Memory Types */}
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-200">
                    <h3 className="text-2xl heading-secondary text-indigo-800 mb-6 flex items-center">
                      <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center mr-3 text-white font-bold text-sm">2</div>
                      Long-term Memory Types
                    </h3>

                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="bg-white rounded-xl p-6 shadow-card">
                        <h4 className="text-lg font-bold text-indigo-800 mb-4">🧩 Semantic Memory</h4>
                        <p className="text-sm text-neutral-700 mb-4">
                          Stores general facts, concepts, and knowledge about the world.
                        </p>
                        <div className="space-y-2">
                          <div className="bg-blue-50 p-2 rounded text-xs">
                            <span className="font-semibold text-blue-700">What:</span> Facts without time/event context
                          </div>
                          <div className="bg-green-50 p-2 rounded text-xs">
                            <span className="font-semibold text-green-700">Purpose:</span> Factual consistency across tasks
                          </div>
                          <div className="bg-orange-50 p-2 rounded text-xs">
                            <span className="font-semibold text-orange-700">Limitation:</span> Static, needs updates
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-xl p-6 shadow-card">
                        <h4 className="text-lg font-bold text-indigo-800 mb-4">📝 Episodic Memory</h4>
                        <p className="text-sm text-neutral-700 mb-4">
                          Stores specific past experiences, events, and interactions with context.
                        </p>
                        <div className="space-y-2">
                          <div className="bg-purple-50 p-2 rounded text-xs">
                            <span className="font-semibold text-purple-700">What:</span> Experiences with timestamps
                          </div>
                          <div className="bg-green-50 p-2 rounded text-xs">
                            <span className="font-semibold text-green-700">Purpose:</span> Personalization & learning
                          </div>
                          <div className="bg-red-50 p-2 rounded text-xs">
                            <span className="font-semibold text-red-700">Limitation:</span> Privacy concerns
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-xl p-6 shadow-card">
                        <h4 className="text-lg font-bold text-indigo-800 mb-4">⚙️ Procedural Memory</h4>
                        <p className="text-sm text-neutral-700 mb-4">
                          Stores how-to knowledge—skills, rules, and procedures.
                        </p>
                        <div className="space-y-2">
                          <div className="bg-teal-50 p-2 rounded text-xs">
                            <span className="font-semibold text-teal-700">What:</span> Skills & automated functions
                          </div>
                          <div className="bg-green-50 p-2 rounded text-xs">
                            <span className="font-semibold text-green-700">Purpose:</span> Efficient task execution
                          </div>
                          <div className="bg-orange-50 p-2 rounded text-xs">
                            <span className="font-semibold text-orange-700">Limitation:</span> Limited adaptability
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 space-y-6">
                      <div className="bg-white rounded-xl p-6 shadow-card">
                        <h4 className="text-lg font-bold text-indigo-800 mb-4">🔍 Long-term Memory Retrieval</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <div className="bg-blue-50 p-3 rounded-lg">
                              <div className="font-semibold text-blue-700 mb-1">Keyword/Metadata Search</div>
                              <div className="text-xs text-blue-600">Filter by user_id, topic, timestamp</div>
                            </div>
                            <div className="bg-green-50 p-3 rounded-lg">
                              <div className="font-semibold text-green-700 mb-1">Semantic Search</div>
                              <div className="text-xs text-green-600">Embedding similarity with cosine distance</div>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="bg-purple-50 p-3 rounded-lg">
                              <div className="font-semibold text-purple-700 mb-1">Knowledge Graph</div>
                              <div className="text-xs text-purple-600">Entity & relation-based search</div>
                            </div>
                            <div className="bg-orange-50 p-3 rounded-lg">
                              <div className="font-semibold text-orange-700 mb-1">RAG Integration</div>
                              <div className="text-xs text-orange-600">Combine retrieval with generation</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-xl p-6 shadow-card">
                        <h4 className="text-lg font-bold text-indigo-800 mb-4">💾 Storage & Management</h4>
                        <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-4 rounded-lg">
                          <div className="grid md:grid-cols-2 gap-4 text-xs">
                            <div>
                              <div className="font-semibold text-indigo-700 mb-2">Storage Location:</div>
                              <div className="text-indigo-600">
                                • Short-term: RAM during session<br/>
                                • Long-term: Hard drives (SSD/HDD)
                              </div>
                            </div>
                            <div>
                              <div className="font-semibold text-purple-700 mb-2">Forgetting Mechanisms:</div>
                              <div className="text-purple-600">
                                • Manual deletion from database<br/>
                                • Expiry rules (e.g., 30-day auto-delete)<br/>
                                • Overwriting with new information
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : selectedTopic === 'knowledge-graph' ? (
                <div className="space-y-12">
                  {/* Knowledge Graph Section 1: Core Concepts & Components */}
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-200">
                    <h3 className="text-2xl heading-secondary text-emerald-800 mb-6 flex items-center">
                      <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center mr-3 text-white font-bold text-sm">1</div>
                      Core Concepts & Graph Components
                    </h3>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="bg-white rounded-xl p-6 shadow-card">
                          <h4 className="text-lg font-bold text-emerald-800 mb-3">🎯 What is a Knowledge Graph?</h4>
                          <p className="text-sm text-neutral-700 mb-4">
                            A database that stores information in <strong>nodes and edges</strong>. Both nodes and edges have properties. Edges have direction and types.
                          </p>
                          <div className="space-y-2 text-sm">
                            <div className="bg-emerald-50 p-3 rounded-lg">
                              <span className="font-semibold text-emerald-700">Structured Data:</span> Interconnected entities and relationships
                            </div>
                            <div className="bg-teal-50 p-3 rounded-lg">
                              <span className="font-semibold text-teal-700">Semantic Understanding:</span> Context-aware AI reasoning
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-card">
                          <h4 className="text-lg font-bold text-emerald-800 mb-4">🔗 Graph Components</h4>
                          <div className="space-y-3">
                            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">N</div>
                              <div>
                                <div className="font-semibold text-blue-700">Nodes (Entities)</div>
                                <div className="text-xs text-blue-600">Data records representing people, things, concepts</div>
                              </div>
                            </div>
                            <div className="flex items-center p-3 bg-green-50 rounded-lg">
                              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">E</div>
                              <div>
                                <div className="font-semibold text-green-700">Edges (Relationships)</div>
                                <div className="text-xs text-green-600">Directional connections between nodes</div>
                              </div>
                            </div>
                            <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                              <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">P</div>
                              <div>
                                <div className="font-semibold text-purple-700">Properties</div>
                                <div className="text-xs text-purple-600">Additional info: string, integer, array, boolean</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="bg-white rounded-xl p-6 shadow-card">
                          <h4 className="text-lg font-bold text-emerald-800 mb-4">🌐 Example Graph Structure</h4>
                          <div className="bg-gradient-to-r from-emerald-100 to-teal-100 p-4 rounded-lg">
                            <div className="text-center mb-4">
                              <div className="inline-flex items-center space-x-3">
                                <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center">
                                  <span className="text-xs font-bold">An La</span>
                                </div>
                                <div className="flex flex-col items-center">
                                  <span className="text-xs bg-white px-2 py-1 rounded">knows</span>
                                  <span className="text-xs text-gray-500">since 2022</span>
                                </div>
                                <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                                  <span className="text-xs font-bold">Chrissy</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="inline-flex items-center space-x-3">
                                <div className="w-12 h-12 bg-pink-200 rounded-full flex items-center justify-center">
                                  <span className="text-xs font-bold">Memory</span>
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-xs bg-white px-2 py-1 rounded mb-1">teaches</span>
                                  <span className="text-xs bg-white px-2 py-1 rounded">attends</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mt-3 text-xs text-neutral-600 bg-neutral-50 p-2 rounded">
                            <strong>Triple Format:</strong> (Person)-[Teaches]→(Session)←[Attends]-(Person)
                          </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-card">
                          <h4 className="text-lg font-bold text-emerald-800 mb-4">📊 KG Terminology</h4>
                          <div className="space-y-2 text-xs">
                            <div className="bg-blue-50 p-2 rounded">
                              <span className="font-semibold text-blue-700">Entity:</span> A person, company, location, or product
                            </div>
                            <div className="bg-green-50 p-2 rounded">
                              <span className="font-semibold text-green-700">Triple:</span> Subject → Predicate → Object format
                            </div>
                            <div className="bg-purple-50 p-2 rounded">
                              <span className="font-semibold text-purple-700">Subject:</span> The entity being described
                            </div>
                            <div className="bg-orange-50 p-2 rounded">
                              <span className="font-semibold text-orange-700">Predicate:</span> The relationship or property
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Knowledge Graph Section 2: GraphRAG vs RAG & Implementation */}
                  <div className="bg-gradient-to-br from-violet-50 to-indigo-50 rounded-2xl p-8 border border-violet-200">
                    <h3 className="text-2xl heading-secondary text-violet-800 mb-6 flex items-center">
                      <div className="w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center mr-3 text-white font-bold text-sm">2</div>
                      GraphRAG Implementation & Advanced Capabilities
                    </h3>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="bg-white rounded-xl p-6 shadow-card">
                          <h4 className="text-lg font-bold text-violet-800 mb-4">🚫 When RAG Fails</h4>
                          <p className="text-sm text-neutral-700 mb-4">
                            Traditional RAG struggles with complex relationships and multi-hop reasoning.
                          </p>
                          <div className="space-y-2">
                            <div className="bg-red-50 p-2 rounded text-xs">
                              <span className="font-semibold text-red-700">Missing:</span> Complex relationships
                            </div>
                            <div className="bg-orange-50 p-2 rounded text-xs">
                              <span className="font-semibold text-orange-700">Limited:</span> Multi-hop reasoning
                            </div>
                            <div className="bg-yellow-50 p-2 rounded text-xs">
                              <span className="font-semibold text-yellow-700">Poor:</span> Entity disambiguation
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-card">
                          <h4 className="text-lg font-bold text-violet-800 mb-4">🔄 GraphRAG Process</h4>
                          <div className="space-y-2">
                            <div className="flex items-center p-2 bg-blue-50 rounded">
                              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">1</div>
                              <span className="text-xs">Extract entities & relationships</span>
                            </div>
                            <div className="flex items-center p-2 bg-green-50 rounded">
                              <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">2</div>
                              <span className="text-xs">Build knowledge graph</span>
                            </div>
                            <div className="flex items-center p-2 bg-purple-50 rounded">
                              <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">3</div>
                              <span className="text-xs">Detect communities (Leiden algorithm)</span>
                            </div>
                            <div className="flex items-center p-2 bg-orange-50 rounded">
                              <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">4</div>
                              <span className="text-xs">Graph search & retrieval</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="bg-white rounded-xl p-6 shadow-card">
                          <h4 className="text-lg font-bold text-violet-800 mb-4">⚖️ GraphRAG vs Traditional RAG</h4>
                          <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-3 text-xs">
                              <div className="bg-green-50 p-3 rounded">
                                <div className="font-semibold text-green-700 mb-1">GraphRAG</div>
                                <div className="text-green-600">
                                  • Graph-based relationships<br/>
                                  • Connected knowledge network<br/>
                                  • Relationship-based reasoning<br/>
                                  • Excellent multi-hop
                                </div>
                              </div>
                              <div className="bg-orange-50 p-3 rounded">
                                <div className="font-semibold text-orange-700 mb-1">Traditional RAG</div>
                                <div className="text-orange-600">
                                  • Flat vector search<br/>
                                  • Individual chunks<br/>
                                  • Similarity-based<br/>
                                  • Limited multi-hop
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-card">
                          <h4 className="text-lg font-bold text-violet-800 mb-4">🔍 Retrieval Techniques</h4>
                          <div className="space-y-3">
                            <div className="bg-blue-50 p-3 rounded-lg">
                              <div className="font-semibold text-blue-700 mb-1">Entity-based</div>
                              <div className="text-xs text-blue-600">BFS graph traversal from query entities</div>
                            </div>
                            <div className="bg-green-50 p-3 rounded-lg">
                              <div className="font-semibold text-green-700 mb-1">Community-based</div>
                              <div className="text-xs text-green-600">Global search across clustered communities</div>
                            </div>
                            <div className="bg-purple-50 p-3 rounded-lg">
                              <div className="font-semibold text-purple-700 mb-1">Text-to-Cypher</div>
                              <div className="text-xs text-purple-600">Convert queries to graph query language</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 space-y-6">
                      <div className="bg-white rounded-xl p-6 shadow-card">
                        <h4 className="text-lg font-bold text-violet-800 mb-4">🛠️ Implementation Stack</h4>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="bg-emerald-50 p-4 rounded-lg text-center">
                            <div className="text-2xl mb-2">🗄️</div>
                            <div className="font-semibold text-emerald-700 mb-1">Graph Databases</div>
                            <div className="text-xs text-emerald-600">Neo4j, Memgraph, GraphRAG</div>
                          </div>
                          <div className="bg-blue-50 p-4 rounded-lg text-center">
                            <div className="text-2xl mb-2">🔗</div>
                            <div className="font-semibold text-blue-700 mb-1">Frameworks</div>
                            <div className="text-xs text-blue-600">LlamaIndex, Langchain, LightRAG</div>
                          </div>
                          <div className="bg-purple-50 p-4 rounded-lg text-center">
                            <div className="text-2xl mb-2">🌐</div>
                            <div className="font-semibold text-purple-700 mb-1">Query Languages</div>
                            <div className="text-xs text-purple-600">Cypher, SPARQL, Gremlin</div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-xl p-6 shadow-card">
                        <h4 className="text-lg font-bold text-violet-800 mb-4">🎯 Key Use Cases</h4>
                        <div className="bg-gradient-to-r from-violet-100 to-indigo-100 p-4 rounded-lg">
                          <div className="grid md:grid-cols-2 gap-4 text-xs">
                            <div>
                              <div className="font-semibold text-violet-700 mb-2">Enterprise Applications:</div>
                              <div className="text-violet-600">
                                • Complex microservices reasoning<br/>
                                • IT asset relationships<br/>
                                • Multi-source data integration<br/>
                                • Legal document analysis
                              </div>
                            </div>
                            <div>
                              <div className="font-semibold text-indigo-700 mb-2">AI Enhancement:</div>
                              <div className="text-indigo-600">
                                • Long-term memory as graphs<br/>
                                • Agent collaboration networks<br/>
                                • Knowledge base evolution<br/>
                                • Semantic search improvement
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Other topics: what/why/how structure */
                <div className="space-y-8">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
                    <h3 className="text-2xl heading-secondary text-blue-800 mb-6 flex items-center">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3 text-white font-bold text-sm">?</div>
                      What it is
                    </h3>
                    <div className="bg-white rounded-xl p-6 shadow-card">
                      <p className="text-neutral-700 leading-relaxed">
                        {topicData[selectedTopic as keyof typeof topicData]?.knowledge.what}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 border border-green-200">
                    <h3 className="text-2xl heading-secondary text-green-800 mb-6 flex items-center">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-3 text-white font-bold text-sm">!</div>
                      Why it&apos;s needed
                    </h3>
                    <div className="bg-white rounded-xl p-6 shadow-card">
                      <p className="text-neutral-700 leading-relaxed">
                        {topicData[selectedTopic as keyof typeof topicData]?.knowledge.why}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200">
                    <h3 className="text-2xl heading-secondary text-purple-800 mb-6 flex items-center">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-3 text-white font-bold text-sm">⚡</div>
                      How to implement
                    </h3>
                    <div className="bg-white rounded-xl p-6 shadow-card">
                      <p className="text-neutral-700 leading-relaxed">
                        {topicData[selectedTopic as keyof typeof topicData]?.knowledge.how}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
