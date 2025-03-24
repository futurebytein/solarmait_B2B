"use client";

import React, { useEffect, useState } from "react";
import { Global, css } from "@emotion/react";
import styled from "@emotion/styled";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Cookies from "js-cookie";
import axios from "axios";

interface CustomEditorProps {
  value: string;
  onChange: (data: string) => void;
}

const EditorWrapper = styled.div`
  position: relative;
  z-index: 1;
  &::before {
    color: rgba(192, 192, 192, 1);
    content: attr(data-placeholder);
    padding: 0 11px;
    position: absolute;
    margin: var(--ck-spacing-large) 0;
    top: 0;
    z-index: -1;
  }
`;

const CustomEditor: React.FC<CustomEditorProps> = ({ value, onChange }) => {
  const [editorData, setEditorData] = useState(value);

  useEffect(() => {
    setEditorData(value);
  }, [value]);

  // Construct the upload URL using your API base URL.
  const uploadUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/upload-blog-image`;

  // ============================
  // Custom Upload Adapter Plugin
  // ============================
  function MyUploadAdapter(loader: any) {
    return {
      upload: () => {
        return new Promise(async (resolve, reject) => {
          try {
            // Retrieve the file from the loader.
            const file = await loader.file;
            const formData = new FormData();
            formData.append("file", file);
            // Optionally, if needed, append additional data (e.g., blog id):
            // formData.append("blog", "YOUR_BLOG_ID");

            // Send the file via POST request.
            const response = await axios.post(uploadUrl, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${Cookies.get("token")}`,
              },
            });

            // Expect your backend to return a JSON object like:
            // { url: "https://yourserver.com/path/to/uploaded-image.jpg" }
            resolve({ default: response.data.url });
          } catch (error) {
            reject(error);
          }
        });
      },
      abort: () => {
        // Optionally implement abort functionality.
      },
    };
  }

  // The plugin that registers the custom upload adapter.
  function MyCustomUploadAdapterPlugin(editor: any) {
    editor.plugins.get("FileRepository").createUploadAdapter = (
      loader: any
    ) => {
      return MyUploadAdapter(loader);
    };
  }

  return (
    <EditorWrapper data-placeholder="Enter text here...">
      <Global
        styles={css`
          :root {
            --ck-border-radius: 4px;
            --ck-color-focus-border: rgba(96, 103, 113, 0.8);
            --ck-color-shadow-inner: rgba(69, 79, 99, 0.2);
            --ck-inner-shadow: 0 0 0 2px var(--ck-color-shadow-inner);
            --ck-spacing-large: var(--ck-spacing-standard);
          }
          .ck.ck-editor__editable_inline {
            border: 1px solid rgba(217, 217, 217, 1);
            color: black !important;
            font-size: 16px;
            transition: all 0.3s;
            background-color: white;
            &:hover {
              border-color: rgba(96, 102, 112, 1);
              border-right-width: 1px !important;
            }
          }
          .ck-editor__editable.ck-read-only {
            background-color: rgba(245, 245, 245, 1);
            opacity: 1;
            cursor: not-allowed;
            color: rgba(0, 0, 0, 0.25);
            &:hover {
              border-color: rgba(217, 217, 217, 1);
            }
          }
        `}
      />
      <CKEditor
        editor={ClassicEditor}
        data={editorData}
        config={{
          licenseKey: process.env.NEXT_PUBLIC_CKEDITOR_LICENSE_KEY,
          // Remove the simpleUpload config and use our custom adapter instead.
          extraPlugins: [MyCustomUploadAdapterPlugin],
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "|",
            "fontSize",
            "fontColor",
            "fontBackgroundColor",
            "|",
            "alignment",
            "|",
            "numberedList",
            "bulletedList",
            "|",
            "blockQuote",
            "insertTable",
            "link",
            "insertImage",
            "mediaEmbed",
            "|",
            "code",
            "codeBlock",
            "undo",
            "redo",
          ],
        }}
        onChange={(_, editor) => {
          const data = editor.getData();
          setEditorData(data);
          onChange(data);
        }}
      />
    </EditorWrapper>
  );
};

export default CustomEditor;
