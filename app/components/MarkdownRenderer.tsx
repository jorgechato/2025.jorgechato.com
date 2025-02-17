import { useTheme } from '@/components/core/ThemeProvider';
import Markdown from 'markdown-to-jsx';
import mermaid from 'mermaid';
import { useEffect, useRef } from 'react';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: resolvedTheme === 'light' ? 'default' : 'dark',
    });

    rootRef.current?.querySelectorAll('pre code').forEach(async (block) => {
      if (block.className.includes('mermaid')) {
        await mermaid.run({ nodes: [block as HTMLElement] });
      }
    });
  }, [content, resolvedTheme]);

  return (
    <div ref={rootRef}>
      <Markdown
        options={{
          forceBlock: true,
          overrides: {
            a: {
              component: ({ children, ...props }) => (
                <a {...props} target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              ),
            },
          },
        }}
        className="custom-md text-left"
      >
        {content}
      </Markdown>
    </div>
  );
}
