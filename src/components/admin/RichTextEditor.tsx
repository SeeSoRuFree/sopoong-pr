'use client';

import { useEffect, useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({
  content,
  onChange,
  placeholder = '내용을 입력하세요...',
}: RichTextEditorProps) {
  const editorRef = useRef<Editor>(null);
  const isInitialMount = useRef(true);

  // 외부에서 content가 변경될 때 에디터 업데이트
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (editorRef.current) {
      const editorInstance = editorRef.current.getInstance();
      const currentContent = editorInstance.getHTML();
      if (content !== currentContent) {
        editorInstance.setHTML(content || '');
      }
    }
  }, [content]);

  const handleChange = () => {
    if (editorRef.current) {
      const editorInstance = editorRef.current.getInstance();
      const html = editorInstance.getHTML();
      onChange(html);
    }
  };

  return (
    <div className="toast-editor-wrapper">
      <Editor
        ref={editorRef}
        initialValue={content || ''}
        previewStyle="vertical"
        height="500px"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        placeholder={placeholder}
        onChange={handleChange}
        toolbarItems={[
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task', 'indent', 'outdent'],
          ['table', 'image', 'link'],
          ['code', 'codeblock'],
        ]}
        hideModeSwitch={false}
      />
      <style jsx global>{`
        .toast-editor-wrapper {
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          overflow: hidden;
        }
        .toastui-editor-defaultUI {
          border: none !important;
        }
        .toastui-editor-defaultUI .toastui-editor-md-tab-container {
          background-color: #f9fafb !important;
        }
        .ProseMirror {
          font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif !important;
          font-size: 16px !important;
          line-height: 1.8 !important;
          letter-spacing: -0.02em !important;
        }
        .ProseMirror p {
          margin-bottom: 1rem !important;
          word-break: keep-all !important;
        }
        .ProseMirror h1, .ProseMirror h2, .ProseMirror h3 {
          font-weight: 700 !important;
          margin-top: 1.5rem !important;
          margin-bottom: 0.75rem !important;
        }
        .ProseMirror blockquote {
          border-left: 4px solid var(--color-primary, #3258ee) !important;
          padding-left: 1rem !important;
          margin: 1.5rem 0 !important;
          color: #666 !important;
          background: #f5f5f7 !important;
          padding: 1rem 1.5rem !important;
          border-radius: 0 8px 8px 0 !important;
        }
        .ProseMirror img {
          max-width: 100% !important;
          height: auto !important;
          border-radius: 8px !important;
        }
        .ProseMirror a {
          color: var(--color-primary, #3258ee) !important;
          text-decoration: underline !important;
        }
      `}</style>
    </div>
  );
}
