import React, { useState, useEffect } from 'react';
import { CATEGORIES } from './constants';
import { NewsCategory, NewsResponse, LoadingState } from './types';
import { fetchNews } from './services/geminiService';
import NewsCard from './components/NewsCard';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<NewsCategory>(CATEGORIES[0]);
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [newsData, setNewsData] = useState<NewsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load initial category
  useEffect(() => {
    loadCategory(CATEGORIES[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadCategory = async (category: NewsCategory) => {
    setActiveCategory(category);
    setLoadingState(LoadingState.LOADING);
    setError(null);
    setNewsData(null);

    try {
      const data = await fetchNews(category);
      setNewsData(data);
      setLoadingState(LoadingState.SUCCESS);
    } catch (err) {
      setError("Unable to fetch the latest headlines. Please try again later.");
      setLoadingState(LoadingState.ERROR);
    }
  };

  // Format date like a newspaper: "Monday, October 24, 2023"
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-news-paper font-sans text-news-black flex flex-col">
      
      {/* MASTHEAD SECTION */}
      <header className="bg-news-paper pt-8 pb-4 px-4 flex flex-col items-center border-b border-black relative">
        
        {/* Top tiny bar */}
        <div className="w-full max-w-6xl flex justify-between text-xs uppercase font-bold text-gray-500 tracking-widest mb-4">
           <div className="hidden md:block">Vol. CLXXII . . . No. 59,782</div>
           <div className="text-center md:text-right">New York • London • Tokyo • Paris</div>
        </div>

        {/* Main Title */}
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-center mb-4 leading-none text-news-black">
          The WorldPress
        </h1>

        {/* Date Line */}
        <div className="w-full max-w-6xl border-t-2 border-b border-black py-2 mt-2 flex flex-col md:flex-row justify-between items-center text-sm font-serif italic md:not-italic">
           <div className="font-bold uppercase tracking-widest text-xs md:text-sm">{today}</div>
           <div className="text-gray-600 text-xs mt-1 md:mt-0">"All the News That's Fit to Aggregate"</div>
           <div className="font-bold uppercase tracking-widest text-xs md:text-sm mt-1 md:mt-0">Daily Edition</div>
        </div>
      </header>

      {/* STICKY NAVIGATION */}
      <nav className="sticky top-0 z-50 bg-news-paper/95 backdrop-blur border-b border-gray-300 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 overflow-x-auto no-scrollbar">
          <ul className="flex md:justify-center space-x-6 md:space-x-8 min-w-max py-3">
            {CATEGORIES.map((category) => (
              <li key={category.id}>
                <button
                  onClick={() => loadCategory(category)}
                  className={`text-xs md:text-sm uppercase tracking-wider font-bold transition-colors duration-200 pb-1 border-b-2 ${
                    activeCategory.id === category.id
                      ? 'text-news-black border-news-black'
                      : 'text-gray-500 border-transparent hover:text-news-accent hover:border-gray-300'
                  }`}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 md:py-12">
        
        {/* Category Header */}
        <div className="mb-8 text-center">
           <span className="inline-block py-1 px-3 border border-black text-xs font-bold uppercase tracking-widest mb-3">
             Section: {activeCategory.name}
           </span>
           {loadingState === LoadingState.SUCCESS && (
              <p className="text-gray-500 text-sm italic font-serif">
                Live briefing sourced from global outlets
              </p>
           )}
        </div>

        {/* Loading State */}
        {loadingState === LoadingState.LOADING && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-news-black rounded-full animate-spin mb-4"></div>
            <p className="font-serif text-lg text-gray-600 italic">Fetching the latest dispatch...</p>
          </div>
        )}

        {/* Error State */}
        {loadingState === LoadingState.ERROR && (
          <div className="bg-red-50 border-l-4 border-red-800 p-6 max-w-2xl mx-auto my-12">
            <h3 className="text-red-800 font-bold font-serif text-xl mb-2">Transmission Error</h3>
            <p className="text-red-700 mb-4">{error}</p>
            <button 
              onClick={() => loadCategory(activeCategory)}
              className="text-xs font-bold uppercase tracking-widest text-red-800 border-b border-red-800 hover:text-black hover:border-black transition-all"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Success State */}
        {loadingState === LoadingState.SUCCESS && newsData && (
          <div className="animate-fade-in">
            <NewsCard 
              markdown={newsData.markdown} 
              sources={newsData.groundingChunks} 
            />
            
            <div className="mt-12 border-t border-gray-300 pt-8 text-center">
              <p className="font-serif text-2xl font-bold italic text-gray-300">
                ***
              </p>
            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-[#f0f0f0] border-t border-gray-300 mt-auto py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="font-serif text-2xl font-bold mb-4 text-gray-800">The WorldPress</h2>
          <div className="text-xs text-gray-500 uppercase tracking-widest space-y-2">
            <p>&copy; {new Date().getFullYear()} WorldPress Aggregator</p>
            <p>Powered by Gemini 2.5 Flash • Google Search Grounding</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;