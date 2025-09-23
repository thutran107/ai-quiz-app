'use client';

import React, { useState } from 'react';
import { DiagramData } from '@/types';

interface DiagramQuestionProps {
  diagramData: DiagramData;
  onAnswer: (answer: string) => void;
}

export default function DiagramQuestion({ diagramData, onAnswer }: DiagramQuestionProps) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [answers, setAnswers] = useState<{[nodeId: string]: string}>({});

  const handleNodeClick = (nodeId: string) => {
    if (diagramData.missing_labels.includes(nodeId)) {
      setSelectedNode(nodeId);
      setInputValue(answers[nodeId] || '');
    }
  };

  const handleLabelSubmit = () => {
    if (selectedNode && inputValue.trim()) {
      const newAnswers = { ...answers, [selectedNode]: inputValue.trim() };
      setAnswers(newAnswers);
      setSelectedNode(null);
      setInputValue('');

      // Check if all missing labels are filled
      const allFilled = diagramData.missing_labels.every(id => newAnswers[id]);
      if (allFilled) {
        // Submit combined answer
        const answerString = diagramData.missing_labels
          .map(id => `${id}:${newAnswers[id]}`)
          .join(';');
        onAnswer(answerString);
      }
    }
  };

  const renderNode = (node: { id: string; label?: string; x: number; y: number; type?: string }) => {
    const isMissing = diagramData.missing_labels.includes(node.id);
    const hasAnswer = answers[node.id];
    const isSelected = selectedNode === node.id;

    let nodeClass = "absolute transform -translate-x-1/2 -translate-y-1/2 border-2 rounded-xl p-4 cursor-pointer transition-smooth shadow-card hover:shadow-card-hover ";

    switch (node.type) {
      case 'input':
        nodeClass += "bg-secondary-50 border-secondary-600 hover:bg-secondary-100 ";
        break;
      case 'process':
        nodeClass += "bg-primary-50 border-primary-600 hover:bg-primary-100 ";
        break;
      case 'output':
        nodeClass += "bg-accent-50 border-accent-600 hover:bg-accent-100 ";
        break;
      case 'decision':
        nodeClass += "bg-yellow-50 border-yellow-500 hover:bg-yellow-100 rounded-full ";
        break;
      case 'hidden':
        nodeClass += "bg-neutral-100 border-neutral-400 hover:bg-neutral-200 ";
        break;
      default:
        nodeClass += "bg-neutral-50 border-neutral-300 hover:bg-neutral-100 ";
    }

    if (isMissing) {
      nodeClass += "border-dashed hover:border-red-500 ";
    }

    if (isSelected) {
      nodeClass += "ring-4 ring-primary-300 ";
    }

    return (
      <div
        key={node.id}
        className={nodeClass}
        style={{ left: `${node.x}%`, top: `${node.y}%` }}
        onClick={() => handleNodeClick(node.id)}
      >
        <div className="text-sm font-semibold text-center min-w-16">
          {isMissing ? (
            hasAnswer ? (
              <span className="text-purple-700">{answers[node.id]}</span>
            ) : (
              <span className="text-red-500">?</span>
            )
          ) : (
            <span>{node.label}</span>
          )}
        </div>
      </div>
    );
  };

  const renderConnection = (connection: { from: string; to: string; label?: string }, index: number) => {
    const fromNode = diagramData.nodes.find(n => n.id === connection.from);
    const toNode = diagramData.nodes.find(n => n.id === connection.to);

    if (!fromNode || !toNode) return null;

    const x1 = fromNode.x;
    const y1 = fromNode.y;
    const x2 = toNode.x;
    const y2 = toNode.y;

    // Calculate arrow position
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;

    return (
      <div key={index}>
        {/* Connection line */}
        <div
          className="absolute border-t-2 border-gray-400"
          style={{
            left: `${Math.min(x1, x2)}%`,
            top: `${midY}%`,
            width: `${Math.abs(x2 - x1)}%`,
            transformOrigin: 'left center',
            transform: `rotate(${Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI}deg)`,
          }}
        />
        {/* Arrow head */}
        <div
          className="absolute w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-gray-400"
          style={{
            left: `${x2 - 0.5}%`,
            top: `${y2 - 1}%`,
            transform: `rotate(${Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI}deg)`,
          }}
        />
        {/* Connection label */}
        {connection.label && (
          <div
            className="absolute text-xs bg-white px-2 py-1 rounded border text-gray-600"
            style={{ left: `${midX}%`, top: `${midY - 3}%` }}
          >
            {connection.label}
          </div>
        )}
      </div>
    );
  };

  const getDiagramTitle = () => {
    switch (diagramData.type) {
      case 'flowchart': return '🔄 Process Flowchart';
      case 'process': return '⚙️ Process Diagram';
      case 'hierarchy': return '🏗️ Hierarchy Structure';
      case 'neural-network': return '🧠 Neural Network';
      case 'architecture': return '🏛️ System Architecture';
      default: return '📊 Diagram';
    }
  };

  return (
    <div className="space-y-8">
      {/* Diagram Title */}
      <div className="text-center">
        <h3 className="text-xl heading-secondary text-neutral-800 mb-3">{getDiagramTitle()}</h3>
        <p className="text-neutral-600">Click on the missing labels (marked with ?) to fill them in</p>
      </div>

      {/* Diagram Container */}
      <div className="relative bg-neutral-50 border border-neutral-200 rounded-2xl p-12 min-h-96 shadow-card">
        {/* Render connections first (so they appear behind nodes) */}
        {diagramData.connections.map(renderConnection)}

        {/* Render nodes */}
        {diagramData.nodes.map(renderNode)}
      </div>

      {/* Legend */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-card">
        <h4 className="heading-secondary text-neutral-800 mb-4">Component Legend</h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-secondary-600 border border-secondary-700 rounded mr-3"></div>
            <span className="text-neutral-700 font-medium">Input</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-primary-600 border border-primary-700 rounded mr-3"></div>
            <span className="text-neutral-700 font-medium">Process</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-accent-600 border border-accent-700 rounded mr-3"></div>
            <span className="text-neutral-700 font-medium">Output</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-500 border border-yellow-600 rounded-full mr-3"></div>
            <span className="text-neutral-700 font-medium">Decision</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-50 border-2 border-red-400 border-dashed rounded mr-3"></div>
            <span className="text-neutral-700 font-medium">Missing</span>
          </div>
        </div>
      </div>

      {/* Answer Progress */}
      <div className="bg-primary-50 rounded-xl p-6 border border-primary-200 shadow-card">
        <div className="flex justify-between items-center mb-3">
          <span className="heading-secondary text-primary-800">Progress</span>
          <span className="text-primary-700 font-medium">
            {Object.keys(answers).length} / {diagramData.missing_labels.length} labels completed
          </span>
        </div>
        <div className="w-full bg-primary-200 rounded-full h-3">
          <div
            className="bg-primary-600 h-3 rounded-full transition-smooth"
            style={{
              width: `${(Object.keys(answers).length / diagramData.missing_labels.length) * 100}%`
            }}
          />
        </div>
      </div>

      {/* Input Modal */}
      {selectedNode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-purple-800 mb-4">
              Fill in the label for: {selectedNode}
            </h3>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter the label..."
              className="w-full p-4 border border-purple-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-4"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleLabelSubmit();
                }
              }}
              autoFocus
            />
            <div className="flex gap-3">
              <button
                onClick={handleLabelSubmit}
                disabled={!inputValue.trim()}
                className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all duration-200 ${
                  inputValue.trim()
                    ? 'gradient-accent text-white hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Submit
              </button>
              <button
                onClick={() => {
                  setSelectedNode(null);
                  setInputValue('');
                }}
                className="flex-1 py-3 px-6 rounded-xl font-bold border-2 border-purple-300 text-purple-700 hover:bg-purple-50 transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}