/**
 * toast Editor 수정 컴포넌트
 */
import React, { useRef, memo, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from '../config/axios';
import Swal from 'sweetalert2';

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

/** 스타일 */
const EditorContainer = styled.div`
  img { width: 40%; }
`;

const ToastEditor2 = memo(({ reviewOrigin }) => {

  const editorRef = useRef();

  useEffect(() => {
    editorRef.current?.getInstance().setHTML(reviewOrigin);
  }, [reviewOrigin])

  return (
    <EditorContainer>
      <Editor
        placeholder="내용을 입력해주세요."
        previewStyle="vertical" // 미리보기 스타일 지정
        height="600px" // 에디터 창 높이
        initialEditType="wysiwyg" // 초기 입력모드 설정(디폴트 markdown)
        initialValue=" " // 초기 값
        plugins={[colorSyntax, fontSize]} // 플러그인 사용
        useCommandShortcut={true} // 단축키 설정
        language="ko-KR" // 언어 설정 -> 초기 값은 영어
        toolbarItems={[
          // 툴바 옵션 설정
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task', 'indent', 'outdent'],
          ['table', 'image'],
          ['code', 'codeblock'],
          ['scrollSync'],
        ]}
        ref={editorRef}
        // onChange={onChange}
        // hooks={{ addImageBlobHook: onImageUpload }} // blobhook 사용해서 백엔드 통신
      />
    </EditorContainer>
  );
});

export default ToastEditor2;
