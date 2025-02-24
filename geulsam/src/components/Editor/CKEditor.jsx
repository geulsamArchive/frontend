import { useState, useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';

import {
  InlineEditor,
  AccessibilityHelp,
  Autoformat,
  AutoLink,
  Autosave,
  Bold,
  Essentials,
  Italic,
  Link,
  Paragraph,
  SelectAll,
  Undo,
  Underline,
  Strikethrough,
  Alignment,
} from 'ckeditor5';

import translations from 'ckeditor5/translations/ko.js';

import 'ckeditor5/ckeditor5.css';

import '../../style/Editor.css';

export default function Editor({ onChange }) {
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);
    return () => setIsLayoutReady(false);
  }, []);

  const editorConfig = {
    toolbar: {
      items: [
        'undo',
        'redo',
        '|',
        'selectAll',
        '|',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        '|',
        'alignment:left',
        'alignment:center',
        'alignment:right',
        'alignment:justify',
        '|',
        'accessibilityHelp',
      ],
      shouldNotGroupWhenFull: false,
    },
    plugins: [
      AccessibilityHelp,
      Autoformat,
      AutoLink,
      Autosave,
      Bold,
      Underline,
      Alignment,
      Strikethrough,
      Essentials,
      Italic,
      Link,
      Paragraph,
      SelectAll,
      Undo,
    ],
    language: 'ko',
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: 'https://',
      decorators: {
        toggleDownloadable: {
          mode: 'manual',
          label: 'Downloadable',
          attributes: {
            download: 'file',
          },
        },
      },
    },
    placeholder: '본문을 입력해주세요.',
    translations: [translations],
  };

  return (
    <div>
      <style>
        {`
                    .ck.ck-editor__editable.ck-focused:not(.ck-editor__nested-editable) {
                        border: none;
                        box-shadow:none;
                    }
                `}
      </style>
      <div className="main-container">
        <div
          className="editor-container editor-container_inline-editor"
          ref={editorContainerRef}
        >
          <div className="editor-container__editor">
            <div ref={editorRef}>
              {isLayoutReady && (
                <CKEditor
                  editor={InlineEditor}
                  config={editorConfig}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    if (onChange) {
                      onChange(data);
                    }
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
