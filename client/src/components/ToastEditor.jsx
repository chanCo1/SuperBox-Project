/**
 * toast UI
 */
import React, { useRef, memo, useCallback } from 'react';
import styled from 'styled-components';

// Toast 에디터
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';

// plugin
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';

import fontSize from 'tui-editor-plugin-font-size';
import 'tui-editor-plugin-font-size/dist/tui-editor-plugin-font-size.css';

import chart from '@toast-ui/editor-plugin-chart';
import '@toast-ui/chart/dist/toastui-chart.css';

import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell';
import '@toast-ui/editor-plugin-table-merged-cell/dist/toastui-editor-plugin-table-merged-cell.css';

import uml from '@toast-ui/editor-plugin-uml';

/** 스타일 */
const EditorContainer = styled.div`
  /* .toastui-editor-defaultUI-toolbar {
    background-color: #2A3768;
  } */

  img {
    width: 30%;
  }
`;

const ToastEditor = memo(({ review, setReview }) => {
// export default function ToastEditor() {
  const editorRef = useRef();

  // const editCurrent = editorRef.current.getInstance(); -> 왜 에러가..

  // 부모 컴포넌트로 입력값 전달
  const onChange = useCallback(e => {
    const editorInputData = editorRef.current.getInstance().getHTML();
    // const data = editorRef.current.getInstance().getMarkdown();

    setReview({ ...review, content: editorInputData });
  }, [review, setReview]);

  return (
    <EditorContainer>
      <Editor
        placeholder="내용을 입력해주세요."
        previewStyle="vertical" // 미리보기 스타일 지정
        height="600px" // 에디터 창 높이
        initialEditType="wysiwyg" // 초기 입력모드 설정(디폴트 markdown)
        initialValue=" "
        plugins={[colorSyntax, chart, tableMergedCell, uml, fontSize]}
        useCommandShortcut={true}
        language="ko-KR"
        toolbarItems={[
          // 툴바 옵션 설정
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task', 'indent', 'outdent'],
          ['table', 'image'],
          ['code', 'codeblock']
        ]}
        ref={editorRef}
        onChange={onChange}
      />
    </EditorContainer>
  );
});

export default ToastEditor;

/**
 * wysiwyg
 */

// import React, { useState } from 'react';
// import { Editor } from 'react-draft-wysiwyg';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import styled from 'styled-components';
// import { EditorState } from 'draft-js';

// const MyBlock = styled.div`
//   .wrapper-class {
//     width: 50%;
//     margin: 0 auto;
//     margin-bottom: 4rem;
//   }
//   .editor {
//     height: 500px !important;
//     border: 1px solid #f1f1f1 !important;
//     padding: 5px !important;
//     border-radius: 2px !important;
//   }
// `;

// const Wysiwyg = () => {
//   // useState로 상태관리하기 초기값은 EditorState.createEmpty()
//   // EditorState의 비어있는 ContentState 기본 구성으로 새 개체를 반환 => 이렇게 안하면 상태 값을 나중에 변경할 수 없음.
//   const [editorState, setEditorState] = useState(EditorState.createEmpty());

//   const onEditorStateChange = (editorState) => {
//     // editorState에 값 설정
//     setEditorState(editorState);
//   };

//   return (
//     <MyBlock>
//       <Editor
//         // 에디터와 툴바 모두에 적용되는 클래스
//         wrapperClassName="wrapper-class"
//         // 에디터 주변에 적용된 클래스
//         editorClassName="editor"
//         // 툴바 주위에 적용된 클래스
//         toolbarClassName="toolbar-class"
//         // 툴바 설정
//         toolbar={{
//           // inDropdown: 해당 항목과 관련된 항목을 드롭다운으로 나타낼것인지
//           list: { inDropdown: true },
//           textAlign: { inDropdown: true },
//           link: { inDropdown: true },
//           history: { inDropdown: false },
//         }}
//         placeholder="내용을 작성해주세요."
//         // 한국어 설정
//         localization={{
//           locale: 'ko',
//         }}
//         // 초기값 설정
//         editorState={editorState}
//         // 에디터의 값이 변경될 때마다 onEditorStateChange 호출
//         onEditorStateChange={onEditorStateChange}
//       />
//     </MyBlock>
//   );
// };

// export default Wysiwyg;
