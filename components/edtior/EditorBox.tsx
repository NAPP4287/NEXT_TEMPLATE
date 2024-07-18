"use client";
// react
import { useState, useEffect, useRef } from "react";
// interface
import { IEditorBoxProps } from "@/types/IProps";
// css
import "@/components/edtior/editor.css";
import "ckeditor5/ckeditor5.css";
import "@/public/css/ckeditor5.css";
// editor
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ClassicEditor } from "ckeditor5";
import { EditorConfig } from "@/components/edtior/DEditor";

const EditorBox = (props: IEditorBoxProps) => {
  const { values, setValues, name } = props;

  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);
    return () => setIsLayoutReady(false);
  }, []);

  return (
    <div>
      <div className="main-container">
        <div
          className="editor-container editor-container_classic-editor"
          ref={editorContainerRef}
        >
          <div className="editor-container__editor">
            <div ref={editorRef}>
              {isLayoutReady && (
                <CKEditor
                  editor={ClassicEditor}
                  config={EditorConfig}
                  data={values.content}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setValues({ ...values, content: data });
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorBox;
