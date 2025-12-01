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
  } as TopicKnowledge,

  agentArchitecture: {
    what: "Agent Architecture defines how autonomous AI agents are built with four interconnected components: Perception (the agent's 'eyes and ears' for capturing data via text, APIs, or visual interfaces), Reasoning & Planning (the agent's 'brain' using frameworks like ReAct, Plan-and-Execute, or DPPM with reflection), Memory (storing experiences, procedures, knowledge, and user preferences across 7 architecture patterns from simple context windows to intelligent memory stacks like Mem0), and Action (the agent's 'arms and legs' executing through structured tool-calling, GUI automation, or code generation).",
    why: "Agent Architecture is critical because it distinguishes true autonomous systems from simple LLMs or workflows. Agents pursue goals independently with episodic and semantic memory, explicit reasoning (CoT, ToT, Reflection), and dynamic tool use, enabling complex task handling, contextual intelligence across sessions, error recovery through reflection mechanisms, and scalability to enterprise applications. Unlike workflows with fixed sequences or LLMs with no memory, agents adapt strategies based on environmental feedback and learn from past experiences.",
    how: "Build agent architectures by: 1) Choosing perception approach (text-based for chat, tool-augmented for APIs/databases/sensors, multimodal with VLM/MM-LLM for GUI automation enhanced by Set-of-Mark or Accessibility Trees), 2) Selecting reasoning framework (ReAct for simple dynamic tasks, Plan-and-Execute for complex foresight-requiring tasks, DPPM for parallel execution, plus multi-plan generation and reflection for critical tasks), 3) Implementing memory progressively (context-window → working buffers → external stores like Redis → vector stores like Zep → reflective loops like MemGPT → memory stack like Mem0), 4) Configuring actions with structured tool parameters using dynamic values from the LLM."
  } as TopicKnowledge
};