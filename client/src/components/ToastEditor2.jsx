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

/** 후기 내용 수정을 위한 ToastUi Editor */
const ToastEditor2 = memo(({ reviewContent, reviewOrigin, setReviewOrigin }) => {

  // toast 에디터 DOM 가져오기
  const editorRef = useRef();
  const formData = new FormData();

  // 페이지 마운트 시 기본값을 화면에 나타낸다
  useEffect(() => {
    editorRef.current?.getInstance().setHTML(reviewContent);
  }, [reviewContent])

  /** 수정할 상태값을 부모 컴포넌트로 보낸다 */
  const onChange = useCallback(e => {
    const editorEditData = editorRef.current.getInstance().getHTML();

    if(editorRef.current) {
      setReviewOrigin({ ...reviewOrigin, content: editorEditData });
    };

  }, [reviewOrigin, setReviewOrigin]);

  /** 이미지 업로드 */
  const onImageUpload = async (blob, callback) => {

    // 이미지 객체 추가
    formData.append('imgFile', blob);
    // for(const i of formData) console.log(i);

    try {
      // 비동기 처리
      const response = await axios.post('api/image/upload/multiple', formData);

      // 백엔드에서 전달 받은 파일정보 사용
      const filePath = response.data.filePath;
      
      // 여러 이미지를 사용하려다 보니 이전 이미지까지 같이 불러와진다.
      // -> i 값을 filePath의 길이 -1 값으로 줘서 이전 이미지는 불러오지 않게 처리
      // -> 하지만 이전 이미지의 filename을 읽을 수 없다는 에러가 뜬다 .. 겉으로 보기엔 정상 작동..
      for(let i = filePath.length - 1; i <= filePath.length; i++) {
        callback(`http://localhost:3001/image/${filePath[i].filename}`, `review-image${i}`);
      };
    } catch(err) {

      Swal.fire({
        icon: 'error',
        iconColor: '#f3b017',
        text: err.response.data.result,
        confirmButtonColor: '#f3b017',
        confirmButtonText: '확인',
      });
      // console.log(err.response.data.result);
    }
  };

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
        onChange={onChange}
        hooks={{ addImageBlobHook: onImageUpload }} // blobhook 사용해서 백엔드 통신
      />
    </EditorContainer>
  );
});

export default ToastEditor2;

/** 스타일 */
const EditorContainer = styled.div`
  img { width: 30%; }
`;