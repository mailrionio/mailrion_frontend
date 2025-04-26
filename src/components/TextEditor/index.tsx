/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";

interface Props {
  onChange: (content: any) => void;
  value: any;
  loadBody?: any;
}

const TextEditor = ({ onChange, loadBody, value }: Props) => {
  const Quill = ReactQuill.Quill;
  const Font = Quill.import("formats/font");
  Font.whitelist = ["Roboto", "Raleway", "Montserrat", "Lato", "Rubik"];
  Quill.register(Font, true);
  const draft = JSON.parse(localStorage.getItem("drafts") as string);  
  const [body, setBody] = useState(value);
  const editorRef = useRef<ReactQuill>(null);

  const modules = {
    toolbar: [
      [
        {
          font: Font.whitelist,
        },
      ],
      [{ header: [1, 2, 3, 4, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "background",
    "code",
    "script",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  const loadDraft = () => {
    setBody(draft?.body);
    localStorage.removeItem("drafts");
  };

  useEffect(() => {
    if (loadBody) {
      setBody(loadBody);
    }

    if (draft) {
      loadDraft();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [body, loadBody]);

  const handleEditorChange = (value: any) => {
    setBody(value);

    onChange(value);
  };

  return (
    <ReactQuill
      value={value}
      style={{ height: "100%" }}
      onChange={handleEditorChange}
      modules={modules}
      formats={formats}
      className="textarea"
      placeholder="Start typing..."
      theme="snow"
      ref={editorRef}
    />
  );
};

export default TextEditor;

// import "froala-editor/css/froala_editor.pkgd.min.css";
// import "froala-editor/css/froala_style.min.css";
// import "froala-editor/css/plugins/char_counter.min.css";
// import "froala-editor/css/plugins/code_view.min.css";
// import "froala-editor/css/plugins/colors.min.css";
// import "froala-editor/css/plugins/draggable.min.css";
// import "froala-editor/css/plugins/emoticons.min.css";
// import "froala-editor/css/plugins/image.min.css";
// import "froala-editor/css/plugins/line_breaker.min.css";
// import "froala-editor/css/plugins/table.min.css";
// import "froala-editor/css/plugins/video.min.css";
// import "froala-editor/js/froala_editor.pkgd.min.js";
// import "froala-editor/js/plugins.pkgd.min.js";
// import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
// import FroalaEditor from "react-froala-wysiwyg";

// interface TextEditorProps {
//   value: any;
//   onChange: (content: any) => void;
// }

// const TextEditor: React.FC<TextEditorProps> = ({ value, onChange }) => {
//   const editorRef = useRef<FroalaEditor | null>(null);
//   const [content, setContent] = useState<any>(value);

//   useEffect(() => {
//     // Set the initial content when the component mounts
//     setContent(value);
//   }, [value]);

//    useEffect(() => {
//       const timer = setTimeout(() => {
//         const linkElement = [...document.querySelectorAll('a')].find(link => link.textContent === "Unlicensed copy of the Froala Editor. Use it legally by purchasing a license.");
// console.log('linkEl:' + linkElement);
//         if (linkElement instanceof HTMLAnchorElement) {
//             const divWithElement = linkElement.parentElement;
//             if (divWithElement instanceof HTMLDivElement) {
//                 divWithElement.className = "froala-licence";
//             }
//         }

//         }, 1500);

//         return () => clearTimeout(timer);
//     }, []);

//   const handleModelChange = (modelContent: any) => {
//     setContent(modelContent);
//     onChange(modelContent);
//   };
//   const editorOptions = {
//     toolbarButtons: {
//       moreText: {
//         buttons: [
//           "bold",
//           "italic",
//           "underline",
//           "strikeThrough",
//           "subscript",
//           "superscript",
//           "fontSize",
//           "textColor",
//           "backgroundColor",
//         ],
//         buttonsVisible: 5,
//       },
//       moreParagraph: {
//         buttons: [
//           "alignLeft",
//           "alignCenter",
//           "alignRight",
//           "alignJustify",
//           "formatOL",
//           "formatUL",
//           "paragraphFormat",
//         ],
//         buttonsVisible: 3,
//       },
//       moreRich: {
//         buttons: [
//           "insertLink",
//           "insertImage",
//           "insertVideo",
//           "insertTable",
//           "emoticons",
//           "fontAwesome",
//           "specialCharacters",
//         ],
//         buttonsVisible: 6,
//       },
//       moreMisc: {
//         buttons: ["undo", "redo", "fullscreen", "print", "getPDF"],
//         align: "right",
//         buttonsVisible: 4,
//       },
//     },
//   };
//   return (
//     <FroalaEditor

//       tag="textarea"
//       model={content}
//       onModelChange={handleModelChange}
//       ref={editorRef}
//       config={editorOptions}
//     />
//   );
// };

// export default TextEditor;

// import { Editor } from '@tinymce/tinymce-react';
// import { useEffect, useRef } from 'react';

// interface Props {
// 	onChange: (content: any) => void;
// 	value: any;
// 	loadBody?: any;
// }

// const TextEditor = ({ onChange, value, loadBody }: Props) => {
// 	const editorRef = useRef<any>(null);

// 	const getEditorContent = () => {
// 		if (editorRef.current) {
// 			onChange(editorRef.current.getContent());
// 		}
// 	};

// 	useEffect(() => {
// 		if (editorRef.current) {
// 			onChange(editorRef.current.getContent());
// 		}
// 	}, [value, onChange]);

// 	useEffect(() => {
// 		if (loadBody) {
// 			// editorRef.current.setContent(loadBody);
// 		}
// 	}, [loadBody]);

// 	const draft = JSON.parse(localStorage.getItem('drafts') as string);

// 	useEffect(() => {
// 		if (draft) {
// 			// console.log(editorRef.current);

// 			// editorRef.current.setContent(draft);
// 		}
// 	}, [draft]);

// 	return (
// 		<>
// 			<Editor
// 				apiKey="al2q5fwa9ivlbju2o1kj58mvuhk889j76bevdokjubafcwmx"
// 				onInit={(evt, editor) => {
// 					editorRef.current = editor;
// 					if (draft) {
// 						editor.setContent(draft);
// 					}
// 				}}
// 				onEditorChange={getEditorContent}
// 				initialValue="<p>Start typing...</p>"
// 				init={{
// 					height: '100%',

// 					// selector: '#textarea',
// 					// theme: 'modern',
// 					// selector: 'textarea',
// 					menubar: false,
// 					plugins: [
// 						'advlist',
// 						'autolink',
// 						'lists',
// 						'link',
// 						'image',
// 						'charmap',
// 						'preview',
// 						'anchor',
// 						'searchreplace',
// 						'visualblocks',
// 						'code',
// 						'fullscreen',
// 						'insertdatetime',
// 						'media',
// 						'table',
// 						'code',
// 						'help',
// 						'wordcount',
// 					],
// 					toolbar:
// 						'undo redo | blocks | ' +
// 						'bold italic forecolor | alignleft aligncenter ' +
// 						'image media link | code fullscreen | codeblock' +
// 						'alignright alignjustify | bullist numlist outdent indent | ' +
// 						'removeformat | help',
// 					content_style:
// 						'body { font-family:Poppins,Arial,sans-serif; font-size:15px }',
// 				}}
// 			/>
// 		</>
// 	);
// };

// export default TextEditor;

// import { useEffect, useRef } from 'react';
// import tinymce from 'tinymce/tinymce';

// interface Props {
// 	onChange: (content: any) => void;
// 	value: any;
// 	loadBody?: any;
// }

// const TextEditor = ({ value }: Props) => {
// 	const editorRef = useRef(null);
// 		const draft = JSON.parse(localStorage.getItem('drafts') as string);

// 	useEffect(() => {
// 		const currentEditor = editorRef.current;
// 		tinymce.init({
// 			selector: `#myEditor-${Math.random().toString(36).substr(2, 9)}`, // Generate unique ID for each instance
// 			setup: function (editor) {
// 				editorRef.current = editor as any;
// 				editor.on('init', function () {
// 					// Once the editor is initialized, set the initial content
// 					editor.setContent(value);
// 				});
// 			},
// 		});

// 		return () => {
// 			// Clean up the editor instance when component unmounts
// 			if (currentEditor) {
// 				tinymce.remove(currentEditor);
// 			}
// 		};
// 	}, [value]);

// 	return (
// 		<textarea
// 			id={`myEditor-${Math.random().toString(36).substr(2, 9)}`}
// 		></textarea>
// 	);
// };

// export default TextEditor;
