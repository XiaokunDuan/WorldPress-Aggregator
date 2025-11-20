import React from 'react';
import { NewsCategory } from './types';

// Icons (Minimalist/Classic style)
const IconGlobe = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconPolitics = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const IconFinance = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconScience = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
  </svg>
);

const IconCulture = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const IconTech = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
  </svg>
);

export const CATEGORIES: NewsCategory[] = [
  {
    id: 'world',
    name: 'World',
    icon: <IconGlobe />,
    description: 'International affairs, conflicts, and diplomacy.',
    prompt: 'Act as an international correspondent. Summarize the most critical global news stories right now. Prioritize reporting from Reuters, Al Jazeera, BBC World, Le Monde, Der Spiegel, and El País. Focus on major geopolitical shifts, conflicts, and international diplomacy.',
  },
  {
    id: 'politics',
    name: 'Politics',
    icon: <IconPolitics />,
    description: 'Policy, elections, and domestic governance.',
    prompt: 'Summarize top political developments, prioritizing depth and analysis. Source from The New York Times, Washington Post, Politico, The Hill, and The Guardian. Focus on legislative changes, elections, and major policy debates.',
  },
  {
    id: 'business',
    name: 'Business',
    icon: <IconFinance />,
    description: 'Markets, economy, and corporate strategy.',
    prompt: 'Provide an executive briefing on global markets and economy. Prioritize sources like The Financial Times, The Wall Street Journal, Bloomberg, The Economist, and Nikkei Asia. Cover stock market movements, central bank policies, and major corporate mergers.',
  },
  {
    id: 'science',
    name: 'Science',
    icon: <IconScience />,
    description: 'Discovery, space, environment, and health.',
    prompt: 'Report on breaking scientific discoveries and environmental news. Source heavily from Nature, Scientific American, National Geographic, Science Magazine, and MIT Technology Review. Cover space exploration, climate change research, and medical breakthroughs.',
  },
  {
    id: 'tech',
    name: 'Technology',
    icon: <IconTech />,
    description: 'Innovation, AI, and silicon valley.',
    prompt: 'Summarize the most important shifts in the technology sector. Prioritize Wired, The Verge, Ars Technica, TechCrunch, and The Information. Focus on Artificial Intelligence advancements, major product launches, and privacy/security updates.',
  },
  {
    id: 'culture',
    name: 'Culture & Ideas',
    icon: <IconCulture />,
    description: 'Arts, essays, criticism, and society.',
    prompt: 'Curate a list of significant cultural conversations and long-form essays. Source from The New Yorker, The Atlantic, Vanity Fair, Rolling Stone, Harper\'s Magazine, and London Review of Books. Focus on literature, art trends, and deep societal analysis.',
  },
];