// Local mock data layer — replaces the previous Supabase-backed data source.
// This app is a static frontend demo, so all "queries" are simple in-memory
// lookups over the arrays below instead of network calls.

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon_name: string;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
}

export interface Task {
  id: string;
  name: string;
  slug: string;
  description: string;
  is_popular: boolean;
  sort_order: number;
  created_at: string;
}

export interface Tool {
  id: string;
  name: string;
  slug: string;
  description: string;
  website_url: string;
  logo_url: string | null;
  pricing_type: 'Free' | 'Freemium' | 'Paid' | 'Free Trial';
  created_at: string;
}

export interface CategoryWithCount extends Category {
  tool_count: number;
}

export interface TaskWithCount extends Task {
  tool_count: number;
}

const now = new Date().toISOString();

export const categories: Category[] = [
  { id: 'cat-writing', name: 'Writing', slug: 'writing', description: 'Draft, edit, and polish text with AI assistance.', icon_name: 'PenLine', is_featured: true, sort_order: 1, created_at: now },
  { id: 'cat-image', name: 'Image Generation', slug: 'image-generation', description: 'Create original art, photos, and illustrations from text.', icon_name: 'ImageIcon', is_featured: true, sort_order: 2, created_at: now },
  { id: 'cat-video', name: 'Video', slug: 'video', description: 'Generate, edit, and enhance video content.', icon_name: 'Video', is_featured: true, sort_order: 3, created_at: now },
  { id: 'cat-coding', name: 'Coding', slug: 'coding', description: 'AI pair programmers and code generation tools.', icon_name: 'Code2', is_featured: true, sort_order: 4, created_at: now },
  { id: 'cat-design', name: 'Design', slug: 'design', description: 'UI, product, and graphic design assistants.', icon_name: 'Palette', is_featured: true, sort_order: 5, created_at: now },
  { id: 'cat-productivity', name: 'Productivity', slug: 'productivity', description: 'Automate workflows and get more done.', icon_name: 'Zap', is_featured: true, sort_order: 6, created_at: now },
  { id: 'cat-marketing', name: 'Marketing', slug: 'marketing', description: 'Campaigns, copy, and content for growth.', icon_name: 'Megaphone', is_featured: true, sort_order: 7, created_at: now },
  { id: 'cat-audio', name: 'Audio & Music', slug: 'audio-music', description: 'Generate music, voiceovers, and sound effects.', icon_name: 'Music', is_featured: true, sort_order: 8, created_at: now },
  { id: 'cat-research', name: 'Research', slug: 'research', description: 'Search, summarize, and synthesize information.', icon_name: 'Search', is_featured: false, sort_order: 9, created_at: now },
  { id: 'cat-business', name: 'Business', slug: 'business', description: 'Tools for operations, sales, and strategy.', icon_name: 'Briefcase', is_featured: false, sort_order: 10, created_at: now },
  { id: 'cat-education', name: 'Education', slug: 'education', description: 'Learn new skills and tutor with AI.', icon_name: 'GraduationCap', is_featured: false, sort_order: 11, created_at: now },
  { id: 'cat-chatbots', name: 'Chatbots', slug: 'chatbots', description: 'Conversational assistants for any use case.', icon_name: 'MessageCircle', is_featured: false, sort_order: 12, created_at: now },
];

export const tasks: Task[] = [
  { id: 'task-blog', name: 'Write blog posts', slug: 'write-blog-posts', description: 'Draft long-form articles and blog content.', is_popular: true, sort_order: 1, created_at: now },
  { id: 'task-image', name: 'Generate images', slug: 'generate-images', description: 'Turn text prompts into original images.', is_popular: true, sort_order: 2, created_at: now },
  { id: 'task-code', name: 'Write and debug code', slug: 'write-and-debug-code', description: 'Get help writing, reviewing, and fixing code.', is_popular: true, sort_order: 3, created_at: now },
  { id: 'task-video-edit', name: 'Edit videos', slug: 'edit-videos', description: 'Cut, enhance, and produce video content.', is_popular: true, sort_order: 4, created_at: now },
  { id: 'task-summarize', name: 'Summarize documents', slug: 'summarize-documents', description: 'Condense long documents into key points.', is_popular: true, sort_order: 5, created_at: now },
  { id: 'task-voiceover', name: 'Create voiceovers', slug: 'create-voiceovers', description: 'Generate natural-sounding narration.', is_popular: true, sort_order: 6, created_at: now },
  { id: 'task-social', name: 'Write social media posts', slug: 'write-social-media-posts', description: 'Create captions and posts for social platforms.', is_popular: true, sort_order: 7, created_at: now },
  { id: 'task-design-ui', name: 'Design interfaces', slug: 'design-interfaces', description: 'Prototype and design app and web interfaces.', is_popular: false, sort_order: 8, created_at: now },
  { id: 'task-meeting', name: 'Transcribe meetings', slug: 'transcribe-meetings', description: 'Turn spoken meetings into searchable text.', is_popular: false, sort_order: 9, created_at: now },
  { id: 'task-email', name: 'Draft emails', slug: 'draft-emails', description: 'Write clear, effective emails quickly.', is_popular: false, sort_order: 10, created_at: now },
  { id: 'task-music', name: 'Compose music', slug: 'compose-music', description: 'Generate original music tracks.', is_popular: false, sort_order: 11, created_at: now },
  { id: 'task-research-web', name: 'Research a topic', slug: 'research-a-topic', description: 'Search and synthesize information from the web.', is_popular: false, sort_order: 12, created_at: now },
  { id: 'task-presentation', name: 'Build presentations', slug: 'build-presentations', description: 'Turn ideas into polished slide decks.', is_popular: false, sort_order: 13, created_at: now },
  { id: 'task-tutor', name: 'Tutor a subject', slug: 'tutor-a-subject', description: 'Get personalized explanations and practice.', is_popular: false, sort_order: 14, created_at: now },
];

export const tools: Tool[] = [
  { id: 'tool-chatgpt', name: 'ChatGPT', slug: 'chatgpt', description: 'A versatile conversational AI for writing, coding, research, and more.', website_url: 'https://chat.openai.com', logo_url: null, pricing_type: 'Freemium', created_at: now },
  { id: 'tool-claude', name: 'Claude', slug: 'claude', description: 'An AI assistant built for thoughtful writing, analysis, and coding help.', website_url: 'https://claude.ai', logo_url: null, pricing_type: 'Freemium', created_at: now },
  { id: 'tool-jasper', name: 'Jasper', slug: 'jasper', description: 'AI copywriting platform for marketing teams and content creators.', website_url: 'https://www.jasper.ai', logo_url: null, pricing_type: 'Paid', created_at: now },
  { id: 'tool-copyai', name: 'Copy.ai', slug: 'copy-ai', description: 'Generate marketing copy, blog posts, and social captions in seconds.', website_url: 'https://www.copy.ai', logo_url: null, pricing_type: 'Freemium', created_at: now },
  { id: 'tool-grammarly', name: 'Grammarly', slug: 'grammarly', description: 'AI writing assistant for grammar, clarity, and tone.', website_url: 'https://www.grammarly.com', logo_url: null, pricing_type: 'Freemium', created_at: now },
  { id: 'tool-midjourney', name: 'Midjourney', slug: 'midjourney', description: 'Generate strikingly detailed images from text prompts.', website_url: 'https://www.midjourney.com', logo_url: null, pricing_type: 'Paid', created_at: now },
  { id: 'tool-dalle', name: 'DALL·E', slug: 'dalle', description: 'OpenAI\'s text-to-image model for original artwork and illustrations.', website_url: 'https://openai.com/dall-e-3', logo_url: null, pricing_type: 'Freemium', created_at: now },
  { id: 'tool-stablediffusion', name: 'Stable Diffusion', slug: 'stable-diffusion', description: 'Open-source image generation model you can run or host yourself.', website_url: 'https://stability.ai', logo_url: null, pricing_type: 'Free', created_at: now },
  { id: 'tool-leonardo', name: 'Leonardo AI', slug: 'leonardo-ai', description: 'Fine-tuned image generation for game assets and concept art.', website_url: 'https://leonardo.ai', logo_url: null, pricing_type: 'Freemium', created_at: now },
  { id: 'tool-runway', name: 'Runway', slug: 'runway', description: 'AI video generation and editing suite for creators.', website_url: 'https://runwayml.com', logo_url: null, pricing_type: 'Freemium', created_at: now },
  { id: 'tool-pika', name: 'Pika', slug: 'pika', description: 'Text and image-to-video generation platform.', website_url: 'https://pika.art', logo_url: null, pricing_type: 'Freemium', created_at: now },
  { id: 'tool-capcut', name: 'CapCut', slug: 'capcut', description: 'AI-powered video editor with auto captions and effects.', website_url: 'https://www.capcut.com', logo_url: null, pricing_type: 'Free', created_at: now },
  { id: 'tool-descript', name: 'Descript', slug: 'descript', description: 'Edit video and audio by editing text, with AI transcription.', website_url: 'https://www.descript.com', logo_url: null, pricing_type: 'Freemium', created_at: now },
  { id: 'tool-github-copilot', name: 'GitHub Copilot', slug: 'github-copilot', description: 'AI pair programmer that suggests code as you type.', website_url: 'https://github.com/features/copilot', logo_url: null, pricing_type: 'Paid', created_at: now },
  { id: 'tool-cursor', name: 'Cursor', slug: 'cursor', description: 'An AI-first code editor built for pair programming with AI.', website_url: 'https://www.cursor.com', logo_url: null, pricing_type: 'Freemium', created_at: now },
  { id: 'tool-replit', name: 'Replit AI', slug: 'replit-ai', description: 'Build, run, and deploy apps with an AI coding agent.', website_url: 'https://replit.com', logo_url: null, pricing_type: 'Freemium', created_at: now },
  { id: 'tool-figma-ai', name: 'Figma AI', slug: 'figma-ai', description: 'AI-assisted design tools built into Figma.', website_url: 'https://www.figma.com', logo_url: null, pricing_type: 'Freemium', created_at: now },
  { id: 'tool-galileo', name: 'Galileo AI', slug: 'galileo-ai', description: 'Generate editable UI designs from text descriptions.', website_url: 'https://www.usegalileo.ai', logo_url: null, pricing_type: 'Paid', created_at: now },
  { id: 'tool-uizard', name: 'Uizard', slug: 'uizard', description: 'Turn sketches and prompts into UI mockups instantly.', website_url: 'https://uizard.io', logo_url: null, pricing_type: 'Freemium', created_at: now },
  { id: 'tool-notion-ai', name: 'Notion AI', slug: 'notion-ai', description: 'Writing, summarizing, and Q&A built into your Notion workspace.', website_url: 'https://www.notion.so/product/ai', logo_url: null, pricing_type: 'Paid', created_at: now },
  { id: 'tool-zapier-ai', name: 'Zapier AI', slug: 'zapier-ai', description: 'Automate workflows across apps with AI-powered steps.', website_url: 'https://zapier.com', logo_url: null, pricing_type: 'Freemium', created_at: now },
  { id: 'tool-otter', name: 'Otter.ai', slug: 'otter-ai', description: 'Real-time meeting transcription and summarization.', website_url: 'https://otter.ai', logo_url: null, pricing_type: 'Freemium', created_at: now },
  { id: 'tool-elevenlabs', name: 'ElevenLabs', slug: 'elevenlabs', description: 'Realistic AI voice generation and text-to-speech.', website_url: 'https://elevenlabs.io', logo_url: null, pricing_type: 'Freemium', created_at: now },
  { id: 'tool-suno', name: 'Suno', slug: 'suno', description: 'Generate original songs from a text prompt.', website_url: 'https://suno.com', logo_url: null, pricing_type: 'Freemium', created_at: now },
  { id: 'tool-udio', name: 'Udio', slug: 'udio', description: 'AI music generation for full songs in any style.', website_url: 'https://www.udio.com', logo_url: null, pricing_type: 'Freemium', created_at: now },
  { id: 'tool-perplexity', name: 'Perplexity', slug: 'perplexity', description: 'AI-powered answer engine with cited sources.', website_url: 'https://www.perplexity.ai', logo_url: null, pricing_type: 'Freemium', created_at: now },
  { id: 'tool-gamma', name: 'Gamma', slug: 'gamma', description: 'Generate polished presentations and docs from a prompt or outline.', website_url: 'https://gamma.app', logo_url: null, pricing_type: 'Freemium', created_at: now },
  { id: 'tool-khanmigo', name: 'Khanmigo', slug: 'khanmigo', description: 'AI tutor from Khan Academy for students and teachers.', website_url: 'https://www.khanmigo.ai', logo_url: null, pricing_type: 'Paid', created_at: now },
  { id: 'tool-character-ai', name: 'Character.AI', slug: 'character-ai', description: 'Create and chat with custom AI characters.', website_url: 'https://character.ai', logo_url: null, pricing_type: 'Freemium', created_at: now },
  { id: 'tool-intercom-fin', name: 'Intercom Fin', slug: 'intercom-fin', description: 'AI customer support agent that resolves tickets automatically.', website_url: 'https://www.intercom.com/fin', logo_url: null, pricing_type: 'Paid', created_at: now },
];

// tool <-> category associations
export const toolCategories: { tool_id: string; category_id: string }[] = [
  { tool_id: 'tool-chatgpt', category_id: 'cat-writing' },
  { tool_id: 'tool-chatgpt', category_id: 'cat-coding' },
  { tool_id: 'tool-chatgpt', category_id: 'cat-chatbots' },
  { tool_id: 'tool-chatgpt', category_id: 'cat-research' },
  { tool_id: 'tool-claude', category_id: 'cat-writing' },
  { tool_id: 'tool-claude', category_id: 'cat-coding' },
  { tool_id: 'tool-claude', category_id: 'cat-chatbots' },
  { tool_id: 'tool-claude', category_id: 'cat-research' },
  { tool_id: 'tool-jasper', category_id: 'cat-writing' },
  { tool_id: 'tool-jasper', category_id: 'cat-marketing' },
  { tool_id: 'tool-copyai', category_id: 'cat-writing' },
  { tool_id: 'tool-copyai', category_id: 'cat-marketing' },
  { tool_id: 'tool-grammarly', category_id: 'cat-writing' },
  { tool_id: 'tool-midjourney', category_id: 'cat-image' },
  { tool_id: 'tool-midjourney', category_id: 'cat-design' },
  { tool_id: 'tool-dalle', category_id: 'cat-image' },
  { tool_id: 'tool-stablediffusion', category_id: 'cat-image' },
  { tool_id: 'tool-leonardo', category_id: 'cat-image' },
  { tool_id: 'tool-leonardo', category_id: 'cat-design' },
  { tool_id: 'tool-runway', category_id: 'cat-video' },
  { tool_id: 'tool-pika', category_id: 'cat-video' },
  { tool_id: 'tool-capcut', category_id: 'cat-video' },
  { tool_id: 'tool-descript', category_id: 'cat-video' },
  { tool_id: 'tool-descript', category_id: 'cat-audio' },
  { tool_id: 'tool-github-copilot', category_id: 'cat-coding' },
  { tool_id: 'tool-cursor', category_id: 'cat-coding' },
  { tool_id: 'tool-replit', category_id: 'cat-coding' },
  { tool_id: 'tool-figma-ai', category_id: 'cat-design' },
  { tool_id: 'tool-galileo', category_id: 'cat-design' },
  { tool_id: 'tool-uizard', category_id: 'cat-design' },
  { tool_id: 'tool-notion-ai', category_id: 'cat-productivity' },
  { tool_id: 'tool-notion-ai', category_id: 'cat-writing' },
  { tool_id: 'tool-zapier-ai', category_id: 'cat-productivity' },
  { tool_id: 'tool-zapier-ai', category_id: 'cat-business' },
  { tool_id: 'tool-otter', category_id: 'cat-productivity' },
  { tool_id: 'tool-otter', category_id: 'cat-business' },
  { tool_id: 'tool-elevenlabs', category_id: 'cat-audio' },
  { tool_id: 'tool-suno', category_id: 'cat-audio' },
  { tool_id: 'tool-udio', category_id: 'cat-audio' },
  { tool_id: 'tool-perplexity', category_id: 'cat-research' },
  { tool_id: 'tool-gamma', category_id: 'cat-productivity' },
  { tool_id: 'tool-gamma', category_id: 'cat-business' },
  { tool_id: 'tool-khanmigo', category_id: 'cat-education' },
  { tool_id: 'tool-character-ai', category_id: 'cat-chatbots' },
  { tool_id: 'tool-intercom-fin', category_id: 'cat-business' },
  { tool_id: 'tool-intercom-fin', category_id: 'cat-chatbots' },
];

// tool <-> task associations
export const toolTasks: { tool_id: string; task_id: string }[] = [
  { tool_id: 'tool-chatgpt', task_id: 'task-blog' },
  { tool_id: 'tool-chatgpt', task_id: 'task-code' },
  { tool_id: 'tool-chatgpt', task_id: 'task-email' },
  { tool_id: 'tool-chatgpt', task_id: 'task-research-web' },
  { tool_id: 'tool-claude', task_id: 'task-blog' },
  { tool_id: 'tool-claude', task_id: 'task-code' },
  { tool_id: 'tool-claude', task_id: 'task-summarize' },
  { tool_id: 'tool-claude', task_id: 'task-email' },
  { tool_id: 'tool-jasper', task_id: 'task-blog' },
  { tool_id: 'tool-jasper', task_id: 'task-social' },
  { tool_id: 'tool-copyai', task_id: 'task-blog' },
  { tool_id: 'tool-copyai', task_id: 'task-social' },
  { tool_id: 'tool-grammarly', task_id: 'task-blog' },
  { tool_id: 'tool-grammarly', task_id: 'task-email' },
  { tool_id: 'tool-midjourney', task_id: 'task-image' },
  { tool_id: 'tool-dalle', task_id: 'task-image' },
  { tool_id: 'tool-stablediffusion', task_id: 'task-image' },
  { tool_id: 'tool-leonardo', task_id: 'task-image' },
  { tool_id: 'tool-runway', task_id: 'task-video-edit' },
  { tool_id: 'tool-pika', task_id: 'task-video-edit' },
  { tool_id: 'tool-capcut', task_id: 'task-video-edit' },
  { tool_id: 'tool-descript', task_id: 'task-video-edit' },
  { tool_id: 'tool-descript', task_id: 'task-meeting' },
  { tool_id: 'tool-descript', task_id: 'task-voiceover' },
  { tool_id: 'tool-github-copilot', task_id: 'task-code' },
  { tool_id: 'tool-cursor', task_id: 'task-code' },
  { tool_id: 'tool-replit', task_id: 'task-code' },
  { tool_id: 'tool-figma-ai', task_id: 'task-design-ui' },
  { tool_id: 'tool-galileo', task_id: 'task-design-ui' },
  { tool_id: 'tool-uizard', task_id: 'task-design-ui' },
  { tool_id: 'tool-notion-ai', task_id: 'task-summarize' },
  { tool_id: 'tool-notion-ai', task_id: 'task-blog' },
  { tool_id: 'tool-zapier-ai', task_id: 'task-email' },
  { tool_id: 'tool-otter', task_id: 'task-meeting' },
  { tool_id: 'tool-otter', task_id: 'task-summarize' },
  { tool_id: 'tool-elevenlabs', task_id: 'task-voiceover' },
  { tool_id: 'tool-suno', task_id: 'task-music' },
  { tool_id: 'tool-udio', task_id: 'task-music' },
  { tool_id: 'tool-perplexity', task_id: 'task-research-web' },
  { tool_id: 'tool-perplexity', task_id: 'task-summarize' },
  { tool_id: 'tool-gamma', task_id: 'task-presentation' },
  { tool_id: 'tool-khanmigo', task_id: 'task-tutor' },
  { tool_id: 'tool-character-ai', task_id: 'task-tutor' },
  { tool_id: 'tool-intercom-fin', task_id: 'task-email' },
];

// ---------------------------------------------------------------------------
// Query helpers — small synchronous "data access" functions that stand in
// for what used to be Supabase queries. Pages call these inside their
// existing useFetch() wrappers, so the async shape of the code didn't need
// to change.
// ---------------------------------------------------------------------------

const delay = <T,>(value: T): Promise<T> => Promise.resolve(value);

export function fetchAllCategories(): Promise<Category[]> {
  const sorted = [...categories].sort((a, b) => a.sort_order - b.sort_order);
  return delay(sorted);
}

export function fetchFeaturedCategories(): Promise<Category[]> {
  const sorted = categories
    .filter((c) => c.is_featured)
    .sort((a, b) => a.sort_order - b.sort_order);
  return delay(sorted);
}

export function fetchCategoryBySlug(slug: string): Promise<Category | null> {
  return delay(categories.find((c) => c.slug === slug) ?? null);
}

export function fetchAllTasks(): Promise<Task[]> {
  const sorted = [...tasks].sort((a, b) => a.sort_order - b.sort_order);
  return delay(sorted);
}

export function fetchPopularTasks(): Promise<Task[]> {
  const sorted = tasks
    .filter((t) => t.is_popular)
    .sort((a, b) => a.sort_order - b.sort_order);
  return delay(sorted);
}

export function fetchTaskBySlug(slug: string): Promise<Task | null> {
  return delay(tasks.find((t) => t.slug === slug) ?? null);
}

export function countToolsForCategory(categoryId: string): number {
  return toolCategories.filter((tc) => tc.category_id === categoryId).length;
}

export function countToolsForTask(taskId: string): number {
  return toolTasks.filter((tt) => tt.task_id === taskId).length;
}

export function fetchToolsForCategory(categoryId: string): Promise<Tool[]> {
  const toolIds = toolCategories
    .filter((tc) => tc.category_id === categoryId)
    .map((tc) => tc.tool_id);
  const result = tools
    .filter((t) => toolIds.includes(t.id))
    .sort((a, b) => a.name.localeCompare(b.name));
  return delay(result);
}

export function fetchToolsForTask(taskId: string): Promise<Tool[]> {
  const toolIds = toolTasks
    .filter((tt) => tt.task_id === taskId)
    .map((tt) => tt.tool_id);
  const result = tools
    .filter((t) => toolIds.includes(t.id))
    .sort((a, b) => a.name.localeCompare(b.name));
  return delay(result);
}

export function fetchTotalToolsCount(): Promise<number> {
  return delay(tools.length);
}
