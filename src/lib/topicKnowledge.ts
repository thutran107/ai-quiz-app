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
    what: `Agent Architecture defines how autonomous AI agents are built with four interconnected components working together:

🔍 **PERCEPTION SYSTEM** (The Agent's "Eyes & Ears")
Three main approaches for processing environmental data:
• Text-Based Perception: Low computational cost, ideal for chat and text-driven interactions using LLMs
• Tool-Augmented Perception: Extends capabilities through APIs (web search, databases, sensors) for domain-specific and real-time data
• Multimodal Perception: Processes text + visual inputs (images/videos) using VLMs/MM-LLMs for GUI interaction where no API exists
   - Enhanced with Set-of-Mark (SoM) operations to annotate images with explicit markers
   - Can use Accessibility Trees or HTML for structured webpage interactions

🧠 **REASONING & PLANNING SYSTEM** (The Agent's "Brain")
Two main planning frameworks:
• Decomposition First: Plan upfront, then execute
   - Sequential (Plan-and-Execute, ReWoO): For tasks requiring foresight, predictability & transparency
   - DPPM (Decompose-Parallel Planning-Merge): Complex tasks executed in parallel, then merged
• Interleaved Decomposition (ReAct): Alternates between reasoning and action dynamically
   - Lower latency, adapts to feedback, natural exploration
Advanced techniques:
• Multi-Plan Generation & Selection: Generate multiple candidate plans, use voting mechanisms (CoT-SC, Tree of Thoughts)
• Reflection: Agent self-critiques planning/execution to improve future performance
   - After execution: Learn from completed tasks
   - Before execution: "Devil's Advocate" anticipatory reflection

💾 **MEMORY SYSTEM**
Information Types to Store:
• Short-term: Experiences (success/failed attempts), Procedures (reusable workflows)
• Long-term: Knowledge (external facts), User information (preferences, background, activities)

Seven Memory Architecture Patterns:
1. Context-Window-Based: Raw conversation history (last k turns) - simple but limited
2. Working Memory Buffers: Structured JSON state (goals, plans, action results) for decision-making
3. State Retention via External Stores: Redis/Supabase for persistence beyond RAM, enables thread resumption
4. Vector Store: RAG-based semantic search for relevant memory retrieval (e.g., Zep with Graph RAG)
5. Reflective Memory Loops: Memory Manager Agent summarizes raw logs into compressed units (MemGPT/Letta)
6. Memory Stack: Multi-layered system (working memory → session cache → multi-session cache → persistent store) with intelligent management (Mem0)
7. Model-Level Memory: Incorporate memories into model weights via fine-tuning/LoRA

🦾 **ACTION SYSTEM** (The Agent's "Arms & Legs")
How agents execute in the world:
• Structured Tool-Calling via API: Define tool parameters, let LLM decide values dynamically
• Visual Interface Automation: Interact with GUIs where no API exists
• Coding: Generate and execute code to accomplish tasks

**KEY DISTINCTION: Agents vs. Workflows vs. LLMs**
• LLM: Predicts next token, no goal pursuit, no memory, implicit reasoning, no world action
• Workflow: Executes defined sequences, partial memory (static vars), no reasoning, fixed actions
• Agent: Pursues goals autonomously, episodic + semantic memory, explicit reasoning (CoT/ToT/Reflexion), dynamic tool use, high adaptivity`,

    why: `Agent Architecture is critical for building truly autonomous AI systems because:

**1. Goal-Oriented Autonomy**: Unlike LLMs (reactive) or workflows (predefined), agents actively pursue objectives with minimal human intervention, adapting strategies based on environmental feedback and past experiences.

**2. Complex Task Handling**: Real-world problems require multi-step reasoning, dynamic replanning, and learning from failures—capabilities only agent architectures provide through integrated perception-reasoning-memory-action loops.

**3. Contextual Intelligence**: Memory systems allow agents to maintain context across sessions, remember user preferences, learn from past mistakes, and provide personalized experiences that improve over time.

**4. Scalability & Robustness**: Proper architecture enables agents to:
• Handle unpredictable environments through multimodal perception
• Recover from errors via reflection mechanisms
• Optimize performance through parallel execution (DPPM)
• Scale to enterprise use cases with persistent memory and state management

**5. Human-AI Collaboration**: Well-designed agents can explain their reasoning, show their planning process (transparency), and work alongside humans in complex domains like coding, research, and decision-making.`,

    how: `Build agent architectures by following this systematic approach:

**STEP 1: Design the Perception System**
Choose based on your use case:
• Text-based: Start here for chat, customer support, simple Q&A (lowest cost)
• Tool-augmented: Add when you need current data (web search), domain expertise (databases), or physical sensors
• Multimodal: Required for GUI automation (browser agents), image/video analysis
   → Enhance with SoM for better visual grounding
   → Use Accessibility Trees for structured web interactions

**STEP 2: Select the Reasoning Framework**
Match framework to task complexity:
• **ReAct (Interleaved)**: Simple, dynamic tasks
   - Implementation: LLM decides action → Execute → Feed results back → Loop
   - Best for: Chatbots, simple tool use, exploratory tasks
   - Example: Langchain ReAct agent (single AI agent node in n8n)

• **Plan-and-Execute (Sequential)**: Complex tasks requiring foresight
   - Implementation: Planner generates tasks → Agent Executor runs each → Replanner adjusts → Repeat
   - Best for: Multi-step research, systematic workflows
   - Example: Langchain Plan-and-Execute (multiple AI nodes/subagents)

• **DPPM (Parallel)**: Complex tasks with independent subtasks
   - Implementation: Decompose → Execute all in parallel → Merge results
   - Best for: Large-scale analysis, avoiding cascading errors
   - Setup: Use subworkflows running in parallel

**Advanced**: Add Multi-Plan Generation (Tree of Thoughts) + Reflection for critical tasks

**STEP 3: Implement Memory Architecture**
Progressive complexity:
1. **Start Simple**: Context-window (n8n Simple Memory, Langchain BufferWindowMemory)
2. **Add Structure**: Working Memory Buffers (Flowise State variables) for JSON-based state tracking
3. **Enable Persistence**: External stores (Redis) for thread resumption
4. **Scale Up**: Vector stores (Zep) for semantic memory search
5. **Production-Grade**: Memory Stack (Mem0) with extraction, scoring, conflict resolution, and lifecycle management

Design Questions:
• What to store? Goals, plans, observations, user preferences
• When to update? After tool calls, new goals, contradictions, milestones
• How to integrate? System prompts, dedicated messages, tool inputs, or condensed summaries

**STEP 4: Configure the Action System**
Tool integration:
• Define tool parameters with clear descriptions
• Use $fromAI() in n8n to let agents determine parameter values dynamically
• Provide fallback values for robustness
• Test tool calling with different LLMs (vary in accuracy)

**STEP 5: Test & Iterate**
• Start with simple tasks, gradually increase complexity
• Monitor for cascading errors (sequential) or high costs (interleaved)
• Add reflection loops for self-improvement
• Implement guardrails and validation

**Example Implementation Stack**:
• Perception: Multimodal LLM (GPT-4V, Claude with vision)
• Reasoning: Plan-and-Execute with Reflection
• Memory: Mem0 for long-term + Redis for state retention
• Action: n8n tools with $fromAI() for dynamic parameters
• Framework: Langchain or n8n for orchestration`
  } as TopicKnowledge
};