import { QuizQuestion } from '@/types';

export const topicQuizzes = {
  llm: [
    // Multiple Choice Questions
    {
      question_id: "llm_mc_1",
      question_text: "What does LLM stand for?",
      options: ["Large Learning Machine", "Large Language Model", "Linear Logic Module", "Logical Language Method"],
      correct_answer: "Large Language Model",
      explanation: "LLM stands for Large Language Model, which refers to AI models trained on vast amounts of text data."
    },
    {
      question_id: "llm_mc_2",
      question_text: "Which architecture is primarily used in modern LLMs?",
      options: ["CNN (Convolutional Neural Network)", "RNN (Recurrent Neural Network)", "Transformer", "LSTM"],
      correct_answer: "Transformer",
      explanation: "The Transformer architecture, introduced in 2017, is the foundation for most modern LLMs."
    },
    {
      question_id: "llm_mc_3",
      question_text: "What is a token in the context of LLMs?",
      options: ["A security key", "A basic unit of text processing", "A neural network layer", "A training parameter"],
      correct_answer: "A basic unit of text processing",
      explanation: "Tokens are the basic units that LLMs process, which can be words, parts of words, or characters."
    },
    {
      question_id: "llm_mc_4",
      question_text: "What parameter controls the randomness of LLM outputs?",
      options: ["Learning rate", "Temperature", "Batch size", "Context window"],
      correct_answer: "Temperature",
      explanation: "Temperature controls the randomness and creativity of LLM outputs - higher values make outputs more random."
    },
    {
      question_id: "llm_mc_5",
      question_text: "What is the maximum amount of text an LLM can process at once called?",
      options: ["Token limit", "Context window", "Memory buffer", "Input size"],
      correct_answer: "Context window",
      explanation: "The context window defines the maximum amount of text an LLM can consider simultaneously."
    },
    // Reasoning Questions
    {
      question_id: "llm_reason_1",
      question_text: "Explain the main steps in the LLM text generation process.",
      options: ["Input tokenization → Model processing → Output generation → Detokenization", "Data collection → Training → Fine-tuning → Deployment", "Encoding → Attention → Decoding → Formatting", "Preprocessing → Classification → Regression → Postprocessing"],
      correct_answer: "Input tokenization → Model processing → Output generation → Detokenization",
      explanation: "The LLM process involves: 1) Converting text to tokens, 2) Processing through neural network layers, 3) Generating probability distributions, 4) Converting back to readable text."
    },
    {
      question_id: "llm_reason_2",
      question_text: "Why do LLMs sometimes produce hallucinations (false information)?",
      options: ["They're trained on incorrect data only", "They generate plausible text based on patterns, not facts", "They have memory corruption", "They're designed to be creative"],
      correct_answer: "They generate plausible text based on patterns, not facts",
      explanation: "LLMs are trained to predict the next likely token based on patterns in training data, which can lead to plausible-sounding but factually incorrect outputs."
    },
    {
      question_id: "llm_reason_3",
      question_text: "What are the key differences between pre-training and fine-tuning in LLMs?",
      options: ["Pre-training uses small datasets, fine-tuning uses large ones", "Pre-training learns general patterns, fine-tuning adapts to specific tasks", "Pre-training is faster, fine-tuning is slower", "Pre-training uses GPUs, fine-tuning uses CPUs"],
      correct_answer: "Pre-training learns general patterns, fine-tuning adapts to specific tasks",
      explanation: "Pre-training teaches the model general language understanding from massive datasets, while fine-tuning adapts the model for specific tasks or domains."
    },
    {
      question_id: "llm_reason_4",
      question_text: "Why is the attention mechanism crucial for LLM performance?",
      options: ["It reduces computational costs", "It allows models to focus on relevant parts of input text", "It prevents overfitting", "It increases training speed"],
      correct_answer: "It allows models to focus on relevant parts of input text",
      explanation: "Attention mechanisms enable LLMs to selectively focus on different parts of the input when generating each output token, crucial for understanding context and relationships."
    },
    {
      question_id: "llm_reason_5",
      question_text: "What factors determine the quality and capabilities of an LLM?",
      options: ["Only the size of training data", "Model architecture, training data quality, computational resources, and training techniques", "Just the number of parameters", "Only the fine-tuning process"],
      correct_answer: "Model architecture, training data quality, computational resources, and training techniques",
      explanation: "LLM performance depends on multiple factors: sophisticated architecture (like Transformers), high-quality diverse training data, sufficient computational power, and advanced training methodologies."
    }
  ] as QuizQuestion[],

  promptEngineering: [
    // Multiple Choice Questions
    {
      question_id: "prompt_mc_1",
      question_text: "What is prompt engineering?",
      options: ["Training AI models", "Crafting effective inputs for AI models", "Building AI hardware", "Programming AI algorithms"],
      correct_answer: "Crafting effective inputs for AI models",
      explanation: "Prompt engineering is the practice of designing and optimizing prompts to get desired outputs from AI models."
    },
    {
      question_id: "prompt_mc_2",
      question_text: "Which technique involves providing examples in the prompt?",
      options: ["Zero-shot prompting", "Few-shot prompting", "Chain-of-thought", "Role prompting"],
      correct_answer: "Few-shot prompting",
      explanation: "Few-shot prompting provides a few examples of the desired input-output pattern within the prompt."
    },
    {
      question_id: "prompt_mc_3",
      question_text: "What is chain-of-thought prompting?",
      options: ["Linking multiple prompts", "Encouraging step-by-step reasoning", "Using emotional language", "Repeating the same prompt"],
      correct_answer: "Encouraging step-by-step reasoning",
      explanation: "Chain-of-thought prompting encourages the model to show its reasoning process step by step."
    },
    {
      question_id: "prompt_mc_4",
      question_text: "Which prompt element helps establish the AI's behavior and tone?",
      options: ["Examples", "System role", "Temperature setting", "Context length"],
      correct_answer: "System role",
      explanation: "System role instructions help establish how the AI should behave, its personality, and communication style."
    },
    {
      question_id: "prompt_mc_5",
      question_text: "What is the purpose of delimiters in prompts?",
      options: ["To make text colorful", "To separate different sections clearly", "To increase token count", "To confuse the model"],
      correct_answer: "To separate different sections clearly",
      explanation: "Delimiters like ### or --- help clearly separate different sections of a prompt for better structure."
    },
    // Reasoning Questions
    {
      question_id: "prompt_reason_1",
      question_text: "Why is specificity important in prompt engineering?",
      options: ["It makes prompts longer", "It reduces ambiguity and improves output quality", "It increases processing time", "It makes prompts more complex"],
      correct_answer: "It reduces ambiguity and improves output quality",
      explanation: "Specific prompts reduce ambiguity, helping the model understand exactly what's expected, leading to more accurate and relevant outputs."
    },
    {
      question_id: "prompt_reason_2",
      question_text: "What are the key components of an effective prompt?",
      options: ["Only the main question", "Context, instruction, examples, and constraints", "Just examples and questions", "Only system messages"],
      correct_answer: "Context, instruction, examples, and constraints",
      explanation: "Effective prompts typically include: context (background info), clear instructions, examples (when helpful), and constraints (format, length, etc.)."
    },
    {
      question_id: "prompt_reason_3",
      question_text: "How does prompt engineering differ from traditional programming?",
      options: ["No difference at all", "Uses natural language instead of code syntax", "Only works with specific models", "Requires special hardware"],
      correct_answer: "Uses natural language instead of code syntax",
      explanation: "Prompt engineering uses natural language to communicate with AI models, unlike traditional programming which uses formal syntax and logic structures."
    },
    {
      question_id: "prompt_reason_4",
      question_text: "What strategies help prevent prompt injection attacks?",
      options: ["Using longer prompts", "Input validation, sanitization, and clear boundaries", "Only using simple prompts", "Avoiding all user input"],
      correct_answer: "Input validation, sanitization, and clear boundaries",
      explanation: "Preventing prompt injection requires validating user inputs, sanitizing potentially malicious content, and establishing clear boundaries between instructions and user data."
    },
    {
      question_id: "prompt_reason_5",
      question_text: "Why might different prompts produce varying results with the same model?",
      options: ["Models are inconsistent", "Prompts influence context interpretation and activation patterns", "Random number generation", "Hardware differences"],
      correct_answer: "Prompts influence context interpretation and activation patterns",
      explanation: "Different prompts activate different patterns in the model's neural network, leading to variations in how the model interprets context and generates responses."
    }
  ] as QuizQuestion[],

  rag: [
    // Multiple Choice Questions
    {
      question_id: "rag_mc_1",
      question_text: "What does RAG stand for?",
      options: ["Rapid AI Generation", "Retrieval Augmented Generation", "Random Algorithm Generator", "Recursive Analysis Gateway"],
      correct_answer: "Retrieval Augmented Generation",
      explanation: "RAG stands for Retrieval Augmented Generation, combining information retrieval with text generation."
    },
    {
      question_id: "rag_mc_2",
      question_text: "What is the primary purpose of chunking in RAG?",
      options: ["To compress data", "To break documents into manageable pieces", "To encrypt information", "To speed up processing"],
      correct_answer: "To break documents into manageable pieces",
      explanation: "Chunking breaks large documents into smaller, manageable pieces that can be effectively processed and retrieved."
    },
    {
      question_id: "rag_mc_3",
      question_text: "Which type of database is commonly used for storing embeddings in RAG?",
      options: ["Relational database", "Vector database", "Graph database", "Document database"],
      correct_answer: "Vector database",
      explanation: "Vector databases are optimized for storing and searching high-dimensional embeddings used in RAG systems."
    },
    {
      question_id: "rag_mc_4",
      question_text: "What is the role of embeddings in RAG?",
      options: ["To store raw text", "To represent semantic meaning numerically", "To compress files", "To encrypt data"],
      correct_answer: "To represent semantic meaning numerically",
      explanation: "Embeddings convert text into numerical vectors that capture semantic meaning, enabling similarity searches."
    },
    {
      question_id: "rag_mc_5",
      question_text: "In RAG, what happens during the retrieval phase?",
      options: ["Text is generated", "Relevant documents are found", "Models are trained", "Data is deleted"],
      correct_answer: "Relevant documents are found",
      explanation: "The retrieval phase searches for and returns the most relevant documents based on the user's query."
    },
    // Reasoning Questions
    {
      question_id: "rag_reason_1",
      question_text: "Why is chunking necessary in RAG systems?",
      options: ["To save storage space", "To fit within context windows and improve retrieval precision", "To make processing faster", "To reduce costs"],
      correct_answer: "To fit within context windows and improve retrieval precision",
      explanation: "Chunking ensures text fits within model context windows and improves retrieval precision by creating focused, semantically coherent segments."
    },
    {
      question_id: "rag_reason_2",
      question_text: "What are the main steps in a RAG pipeline?",
      options: ["Train → Test → Deploy", "Index → Retrieve → Generate", "Input → Process → Output", "Load → Transform → Store"],
      correct_answer: "Index → Retrieve → Generate",
      explanation: "RAG workflow: 1) Index documents into searchable format, 2) Retrieve relevant information based on query, 3) Generate response using retrieved context."
    },
    {
      question_id: "rag_reason_3",
      question_text: "How does RAG improve upon traditional LLM responses?",
      options: ["Makes responses faster", "Provides access to current and specific information", "Reduces model size", "Eliminates all errors"],
      correct_answer: "Provides access to current and specific information",
      explanation: "RAG enhances LLM responses by incorporating up-to-date, domain-specific information from external knowledge bases, reducing hallucinations."
    },
    {
      question_id: "rag_reason_4",
      question_text: "What challenges exist in RAG implementation?",
      options: ["Only technical complexity", "Retrieval quality, chunking strategy, embedding model selection, and latency", "Just storage costs", "Only model training"],
      correct_answer: "Retrieval quality, chunking strategy, embedding model selection, and latency",
      explanation: "RAG faces multiple challenges: ensuring high-quality retrieval, optimal chunking strategies, choosing appropriate embedding models, and managing response latency."
    },
    {
      question_id: "rag_reason_5",
      question_text: "Why might retrieval quality vary in RAG systems?",
      options: ["Random variation", "Embedding model quality, chunk size, and semantic similarity matching", "Hardware limitations", "User preferences"],
      correct_answer: "Embedding model quality, chunk size, and semantic similarity matching",
      explanation: "Retrieval quality depends on how well the embedding model captures semantics, appropriate chunk sizing, and the effectiveness of similarity matching algorithms."
    }
  ] as QuizQuestion[],

  memory: [
    // Multiple Choice Questions
    {
      question_id: "memory_mc_1",
      question_text: "What is conversational memory in AI?",
      options: ["Hardware storage", "Ability to remember previous interactions", "Model training data", "Code repository"],
      correct_answer: "Ability to remember previous interactions",
      explanation: "Conversational memory allows AI systems to maintain context and remember previous parts of a conversation."
    },
    {
      question_id: "memory_mc_2",
      question_text: "Which type of memory stores the entire conversation history?",
      options: ["Buffer memory", "Summary memory", "Vector memory", "Conversation buffer memory"],
      correct_answer: "Conversation buffer memory",
      explanation: "Conversation buffer memory stores the complete history of interactions in a conversation."
    },
    {
      question_id: "memory_mc_3",
      question_text: "What is the main advantage of summary memory?",
      options: ["Perfect recall", "Reduced token usage", "Faster processing", "Better accuracy"],
      correct_answer: "Reduced token usage",
      explanation: "Summary memory condenses conversation history, reducing the number of tokens needed while preserving key information."
    },
    {
      question_id: "memory_mc_4",
      question_text: "In vector-based memory, how is information typically stored?",
      options: ["As raw text", "As numerical embeddings", "As code", "As images"],
      correct_answer: "As numerical embeddings",
      explanation: "Vector-based memory stores information as numerical embeddings that capture semantic meaning."
    },
    {
      question_id: "memory_mc_5",
      question_text: "What happens when memory reaches its capacity limit?",
      options: ["System crashes", "Old information is removed or compressed", "Processing stops", "Memory expands automatically"],
      correct_answer: "Old information is removed or compressed",
      explanation: "When memory reaches capacity, systems typically remove oldest information or compress existing memories."
    },
    // Reasoning Questions
    {
      question_id: "memory_reason_1",
      question_text: "What are the main types of memory in AI systems?",
      options: ["Only short-term and long-term", "Buffer, summary, vector, and episodic memory", "Just working memory", "Only persistent storage"],
      correct_answer: "Buffer, summary, vector, and episodic memory",
      explanation: "AI systems use various memory types: buffer (stores recent interactions), summary (compressed history), vector (semantic storage), and episodic (specific events)."
    },
    {
      question_id: "memory_reason_2",
      question_text: "Why is memory management crucial for AI conversations?",
      options: ["To save money only", "To maintain context, coherence, and stay within token limits", "Just for storage", "Only for speed"],
      correct_answer: "To maintain context, coherence, and stay within token limits",
      explanation: "Effective memory management ensures conversations remain coherent, contextually relevant, and operate within computational constraints."
    },
    {
      question_id: "memory_reason_3",
      question_text: "How does semantic memory differ from episodic memory?",
      options: ["No difference", "Semantic stores facts/knowledge, episodic stores specific experiences", "Semantic is faster", "Episodic is more accurate"],
      correct_answer: "Semantic stores facts/knowledge, episodic stores specific experiences",
      explanation: "Semantic memory stores general knowledge and facts, while episodic memory stores specific events and experiences with temporal context."
    },
    {
      question_id: "memory_reason_4",
      question_text: "What strategies help optimize memory usage in long conversations?",
      options: ["Store everything permanently", "Summarization, importance scoring, and selective retention", "Delete all old messages", "Use unlimited storage"],
      correct_answer: "Summarization, importance scoring, and selective retention",
      explanation: "Optimal memory management uses summarization to compress information, scores importance to prioritize content, and selectively retains the most relevant information."
    },
    {
      question_id: "memory_reason_5",
      question_text: "How does working memory relate to context windows in LLMs?",
      options: ["They're completely unrelated", "Working memory operates within context window constraints", "Working memory is always larger", "Context windows replace working memory"],
      correct_answer: "Working memory operates within context window constraints",
      explanation: "Working memory in AI must operate within the model's context window limitations, requiring efficient strategies to maintain relevant information within these bounds."
    }
  ] as QuizQuestion[],

  agentArchitecture: [
    // Multiple Choice Questions
    {
      question_id: "agent_mc_1",
      question_text: "What are the four main components of agent architecture?",
      options: ["Input, Output, Processing, Storage", "Perception, Reasoning, Memory, Action", "Collection, Analysis, Decision, Execution", "Interface, Logic, Database, API"],
      correct_answer: "Perception, Reasoning, Memory, Action",
      explanation: "Agent architecture consists of four interconnected components: Perception (capturing data), Reasoning & Planning (decision-making), Memory (storing experiences), and Action (executing tasks)."
    },
    {
      question_id: "agent_mc_2",
      question_text: "What distinguishes agents from simple LLMs?",
      options: ["Agents are faster", "Agents have goal-pursuit, memory, and explicit reasoning", "Agents use more tokens", "Agents are cheaper to run"],
      correct_answer: "Agents have goal-pursuit, memory, and explicit reasoning",
      explanation: "Unlike LLMs that simply predict next tokens, agents autonomously pursue goals with episodic and semantic memory, explicit reasoning (CoT, ToT, Reflection), and dynamic tool use."
    },
    {
      question_id: "agent_mc_3",
      question_text: "Which reasoning framework is best for complex tasks requiring foresight?",
      options: ["ReAct", "Plan-and-Execute", "DPPM", "Chain-of-Thought"],
      correct_answer: "Plan-and-Execute",
      explanation: "Plan-and-Execute uses Sequential Decomposition to create upfront plans for complex tasks requiring foresight, unlike ReAct's interleaved approach for simpler dynamic tasks."
    },
    {
      question_id: "agent_mc_4",
      question_text: "What is the primary advantage of multimodal perception over text-based perception?",
      options: ["Lower cost", "Ability to interact with visual interfaces and GUIs", "Faster processing", "Less complexity"],
      correct_answer: "Ability to interact with visual interfaces and GUIs",
      explanation: "Multimodal perception using VLM/MM-LLM enables agents to interact with visual interfaces and GUIs, enhanced by Set-of-Mark operations and Accessibility Trees for precise GUI automation."
    },
    {
      question_id: "agent_mc_5",
      question_text: "Which memory architecture provides the most sophisticated multi-layered approach?",
      options: ["Context-window based", "Working memory buffers", "Vector stores like Zep", "Memory stack like Mem0"],
      correct_answer: "Memory stack like Mem0",
      explanation: "Mem0 provides the most sophisticated memory stack with multi-layered architecture including extraction, importance scoring, conflict resolution, and intelligent memory management across user, session, and agent levels."
    },
    // Reasoning Questions
    {
      question_id: "agent_reason_1",
      question_text: "How do agents differ from workflows in handling tasks?",
      options: ["No difference", "Agents adapt dynamically while workflows follow fixed sequences", "Workflows are more intelligent", "Agents are just faster workflows"],
      correct_answer: "Agents adapt dynamically while workflows follow fixed sequences",
      explanation: "Agents adapt their strategies based on environmental feedback with dynamic tool use and reasoning, while workflows execute predetermined fixed sequences with limited adaptability."
    },
    {
      question_id: "agent_reason_2",
      question_text: "What are the three main types of perception approaches in agent architecture?",
      options: ["Fast, medium, slow", "Text-based, tool-augmented, multimodal", "Visual, audio, tactile", "Simple, complex, hybrid"],
      correct_answer: "Text-based, tool-augmented, multimodal",
      explanation: "The three perception approaches are: text-based (chat interfaces, low cost), tool-augmented (APIs, databases, sensors), and multimodal (VLM/MM-LLM for GUI automation with Set-of-Mark and Accessibility Trees)."
    },
    {
      question_id: "agent_reason_3",
      question_text: "Why is the DPPM reasoning framework useful?",
      options: ["It's the simplest", "It enables parallel execution and avoids cascading errors", "It's the cheapest", "It requires no planning"],
      correct_answer: "It enables parallel execution and avoids cascading errors",
      explanation: "DPPM (Decompose-Parallel Planning-Merge) enables parallel execution of independent subtasks and avoids cascading errors by allowing independent processing before merging results."
    },
    {
      question_id: "agent_reason_4",
      question_text: "What role does reflection play in agent reasoning?",
      options: ["It slows down processing", "It enables error recovery and improved decision-making", "It replaces all other reasoning", "It only works for simple tasks"],
      correct_answer: "It enables error recovery and improved decision-making",
      explanation: "Reflection enables agents to learn from mistakes through after-execution analysis and anticipatory 'Devil's Advocate' evaluation, improving decision-making and error recovery in critical tasks."
    },
    {
      question_id: "agent_reason_5",
      question_text: "How does memory progression typically work in agent architecture?",
      options: ["Random selection", "Progressive sophistication from context-window to memory stacks", "Always start with the most complex", "Memory type doesn't matter"],
      correct_answer: "Progressive sophistication from context-window to memory stacks",
      explanation: "Memory implementation typically progresses from simple context-window based → working buffers → external stores (Redis) → vector stores (Zep) → reflective loops (MemGPT) → memory stacks (Mem0), increasing in sophistication and capability."
    },
    {
      question_id: "agent_reason_6",
      question_text: "What is the purpose of the $fromAI() function in n8n agent actions?",
      options: ["To train models", "To enable dynamic parameter values from LLM outputs", "To store data", "To generate random values"],
      correct_answer: "To enable dynamic parameter values from LLM outputs",
      explanation: "The $fromAI() function in n8n enables structured tool-calling by allowing tool parameters to receive dynamic values directly from the LLM's reasoning and decision-making process."
    },
    {
      question_id: "agent_reason_7",
      question_text: "What are the four types of information stored in agent memory?",
      options: ["Files, images, code, data", "Experiences, procedures, knowledge, user information", "Past, present, future, conditional", "Input, output, process, error"],
      correct_answer: "Experiences, procedures, knowledge, user information",
      explanation: "Agent memory stores four information types: Experiences (successes/failures), Procedures (reusable workflows), Knowledge (external facts), and User information (preferences, background, activities)."
    },
    {
      question_id: "agent_reason_8",
      question_text: "When should you choose ReAct over Plan-and-Execute reasoning?",
      options: ["Always use ReAct", "For simple dynamic tasks with lower latency needs", "For complex multi-step planning", "When transparency isn't important"],
      correct_answer: "For simple dynamic tasks with lower latency needs",
      explanation: "ReAct (interleaved decomposition) is ideal for simple dynamic tasks with lower latency requirements and adaptability to real-time feedback, while Plan-and-Execute is better for complex tasks requiring upfront planning."
    }
  ] as QuizQuestion[]
};