'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';

interface PostContentProps {
  content: string;
}

export function PostContent({ content }: PostContentProps) {
  return (
    <div className="max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-16 mb-6 leading-tight">
              {children}
            </h2>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-16 mb-6 leading-tight">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-white mt-12 mb-4 leading-snug">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-lg font-semibold tracking-tight text-white mt-8 mb-3">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="text-base md:text-lg text-white/75 leading-[1.75] mb-5">
              {children}
            </p>
          ),
          a: ({ href, children }) => {
            const isInternal = href?.startsWith('/') || href?.startsWith('#');
            if (isInternal) {
              return (
                <Link
                  href={href || '#'}
                  className="text-[#BFAE85] underline decoration-[#BFAE85]/40 hover:decoration-[#BFAE85] transition-colors"
                >
                  {children}
                </Link>
              );
            }
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#BFAE85] underline decoration-[#BFAE85]/40 hover:decoration-[#BFAE85] transition-colors"
              >
                {children}
              </a>
            );
          },
          strong: ({ children }) => (
            <strong className="text-[#E5DCC0] font-semibold">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-white/90">{children}</em>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-6 space-y-2 my-6 text-base md:text-lg text-white/75 leading-relaxed">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-6 space-y-2 my-6 text-base md:text-lg text-white/75 leading-relaxed">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="pl-1">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-[#BFAE85] pl-6 py-4 my-8 bg-[#0F0F12]/50 rounded-r-lg">
              <div className="text-white/70 italic text-base md:text-lg leading-relaxed">
                {children}
              </div>
            </blockquote>
          ),
          code: ({ children, className }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="bg-[#0F0F12] text-[#BFAE85] px-1.5 py-0.5 rounded text-sm font-mono">
                  {children}
                </code>
              );
            }
            return (
              <code className="block bg-[#0F0F12] text-white/90 p-4 rounded-lg text-sm font-mono overflow-x-auto border border-[#BFAE85]/20">
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="my-6 overflow-x-auto">{children}</pre>
          ),
          hr: () => (
            <hr className="my-12 border-white/10" />
          ),
          img: ({ src, alt }) => (
            <span className="block my-10">
              <img
                src={typeof src === 'string' ? src : ''}
                alt={alt || ''}
                className="rounded-2xl w-full h-auto object-contain"
              />
              {alt && (
                <span className="block text-center text-sm text-white/40 mt-3">
                  {alt}
                </span>
              )}
            </span>
          ),
          table: ({ children }) => (
            <div className="my-8 overflow-x-auto">
              <table className="w-full border-collapse border border-white/10 rounded-lg">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="bg-[#0F0F12] border border-white/10 px-4 py-3 text-left text-white font-bold">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-white/10 px-4 py-3 text-white/80">
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}