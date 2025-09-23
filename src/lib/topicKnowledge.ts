export interface TopicKnowledge {
  what: string;
  why: string;
  how: string;
}

export const topicKnowledge = {
  llm: {
    what: "Large Language Models are AI systems trained on vast amounts of text data to understand and generate human-like language through neural network architectures.",
    why: "LLMs are needed to enable computers to understand, process, and generate natural language at scale, powering applications like chatbots, content creation, and language translation.",
    how: "Build LLMs by: 1) Collecting massive text datasets, 2) Training transformer neural networks on this data, 3) Fine-tuning for specific tasks and domains."
  } as TopicKnowledge,

  promptEngineering: {
    what: "Prompt Engineering is the practice of designing and optimizing text inputs (prompts) to get desired outputs from AI language models effectively.",
    why: "It's essential because the quality and specificity of prompts directly impacts AI model performance, accuracy, and usefulness in real-world applications.",
    how: "Master prompt engineering by: 1) Learning prompt structure (context, instruction, examples), 2) Practicing different techniques (few-shot, chain-of-thought), 3) Iterating and testing for optimal results."
  } as TopicKnowledge,

  rag: {
    what: "Retrieval Augmented Generation combines information retrieval with text generation, allowing AI models to access external knowledge when generating responses.",
    why: "RAG is crucial for providing up-to-date, accurate information and reducing hallucinations by grounding AI responses in verified external sources.",
    how: "Implement RAG by: 1) Creating a knowledge base with embeddings, 2) Building retrieval systems to find relevant information, 3) Integrating retrieved context with generation models."
  } as TopicKnowledge,

  memory: {
    what: "AI Memory Systems enable artificial intelligence to retain and recall information from previous interactions, maintaining context across conversations and sessions.",
    why: "Memory is vital for creating coherent, personalized AI experiences that can build upon past interactions and maintain long-term context understanding.",
    how: "Build memory systems by: 1) Implementing storage mechanisms (buffer, vector, semantic), 2) Creating retrieval and update strategies, 3) Managing memory capacity and relevance scoring."
  } as TopicKnowledge
};