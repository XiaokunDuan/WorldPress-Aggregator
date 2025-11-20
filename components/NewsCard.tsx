import React from 'react';
import ReactMarkdown from 'react-markdown';
import { GroundingChunk } from '../types';

interface NewsCardProps {
  markdown: string;
  sources: GroundingChunk[];
}

const NewsCard: React.FC<NewsCardProps> = ({ markdown, sources }) => {
  return (
    <div className="bg-white md:bg-transparent">
      
      {/* Main Article Body */}
      <article className="prose prose-stone prose-lg max-w-none">
        <ReactMarkdown
          components={{
            // Main Lead Headline
            h2: ({node, ...props}) => (
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-news-black leading-tight mb-6 mt-2 md:text-center" {...props} />
            ),
            // Secondary Headlines
            h3: ({node, ...props}) => (
              <h3 className="font-serif text-xl md:text-2xl font-bold text-news-black border-t border-gray-300 pt-6 mt-8 mb-3 break-inside-avoid-column" {...props} />
            ),
            // Paragraphs - Dropcap logic for first paragraph handled via CSS usually, but here we ensure serif font
            p: ({node, ...props}) => (
              <p className="font-body text-lg leading-relaxed text-gray-800 mb-4 text-justify" {...props} />
            ),
            // Lists
            ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4 space-y-2 font-body text-gray-800" {...props} />,
            li: ({node, ...props}) => <li className="" {...props} />,
            // Blockquotes
            blockquote: ({node, ...props}) => (
              <blockquote className="border-l-4 border-news-accent pl-4 italic font-serif text-xl text-gray-600 my-6 bg-gray-50 py-2 pr-2" {...props} />
            ),
            strong: ({node, ...props}) => <strong className="font-bold text-news-black" {...props} />,
          }}
        >
          {markdown}
        </ReactMarkdown>
      </article>

      {/* Sources / Footnotes Style */}
      {sources.length > 0 && (
        <div className="mt-12 pt-6 border-t-4 border-double border-gray-300">
          <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
            Sources & References
          </h4>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {sources.map((source, index) => (
              source.web && (
                <a
                  key={index}
                  href={source.web.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center text-sm font-serif text-gray-600 hover:text-news-accent transition-colors"
                >
                  <span className="text-xs text-gray-400 mr-1 group-hover:text-news-accent">[{index + 1}]</span>
                  <span className="underline decoration-gray-300 underline-offset-4 group-hover:decoration-news-accent">
                    {source.web.title}
                  </span>
                </a>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsCard;