'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';

interface PostContentProps {
  content: string;
}

export function PostContent({ content }: PostContentProps) {
  return (
    <div className="prose prose-invert prose-lg max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-4xl font-black tracking-tight text-white mt-12 mb-6">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-3xl font-bold tracking-tight text-white mt-12 mb-5">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-2xl font-bold tracking-tight text-white mt-8 mb-4">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-xl font-bold tracking-tight text-white mt-6 mb-3">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="text-white/80 text-lg leading-[1.8] mb-6">
              {children}
            </p>
          ),
          a: ({ href, children }) => {
            const isInternal = href?.startsWith('/') || href?.startsWith('#');
            if (isInternal) {
              return (
                <Link
                  href={href || '#'}
                  className="text-[#FF5A36] underline decoration-[#FF5A36]/40 hover:decoration-[#FF5A36] transition-colors"
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
                className="text-[#FF5A36] underline decoration-[#FF5A36]/40 hover:decoration-[#FF5A36] transition-colors"
              >
                {children}
              </a>
            );
          },
          strong: ({ children }) => (
            <strong className="text-white font-bold">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-white/90">{children}</em>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-6 space-y-2 my-6 text-white/80 text-lg leading-relaxed">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-6 space-y-2 my-6 text-white/80 text-lg leading-relaxed">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="pl-1">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-[#FF5A36] pl-6 py-2 my-8 bg-[#0F0F12]/50 rounded-r-lg">
              <div className="text-white/70 italic text-lg leading-relaxed">
                {children}
              </div>
            </blockquote>
          ),
          code: ({ children, className }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="bg-[#0F0F12] text-[#38BDF8] px-1.5 py-0.5 rounded text-sm font-mono">
                  {children}
                </code>
              );
            }
            return (
              <code className="block bg-[#0F0F12] text-white/90 p-4 rounded-lg text-sm font-mono overflow-x-auto border border-[#38BDF8]/20">
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
            <span className="block my-8">
              <img
                src={typeof src === 'string' ? src : ''}
                alt={alt || ''}
                className="rounded-xl w-full"
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