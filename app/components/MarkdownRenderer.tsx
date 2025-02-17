import Markdown from 'markdown-to-jsx';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
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
  );
}
