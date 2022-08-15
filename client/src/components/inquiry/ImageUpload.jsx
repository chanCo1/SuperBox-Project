/**
 * 이미지 파일 업로드를 위한 컴포넌트
 */

/** 패키지 참조 */
import React, { memo, useCallback, useState } from 'react';
import styled from 'styled-components';

import { MdOutlineDriveFolderUpload } from 'react-icons/md';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const ImageUploadContainer = styled.div`
  border: 1px solid #bcbcbc;
  border-radius: 5px;
  padding: 30px;
  color: #404040;

  fieldset {
    text-align: center;
    border: 1px dashed #999;

    label {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 20px 10px;
      font-size: .9rem;
      cursor: pointer;

      .upload-icon {
        font-size: 3.5rem;
      }

      &:hover {
        color: blue;
      }
    }

    .img-preview {
      text-align: left;

      .upload-img-wrap {
        width: 30%;
        margin: 10px 20px;

        img {
          width: 100%;
          height: 20vh;
          border: 1px dashed #000;
        }

        .close-btn {
          position: absolute;
          font-size: 1.5rem;
          color: #bcbcbc;
          cursor: pointer;

          &:hover {
            color: #404040;
          }
        }
      }
    }
  }
`;

const ImageUpload = memo(() => {
  const [files, setFiles] = useState('');
  console.log(files);

  const fileUplaod = (e) => {
    e.preventDefault();

    const files = e.target.files[0];
    console.log(files);

    const formData = new FormData();
    formData.append('file', files);

    // 파일미리보기
    setFiles(URL.createObjectURL(files));
  };

  const deleteFile = (e) => {
    URL.revokeObjectURL(files);
    setFiles('');
  };

  return (
    <ImageUploadContainer>
      <fieldset>
        <legend>
          <label htmlFor="imageUpload">
            <MdOutlineDriveFolderUpload className="upload-icon" />
            여기를 클릭하면 이미지 파일을 첨부할 수 있어요
          </label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={fileUplaod}
            multiple
            style={{ display: 'none' }}
          />
        </legend>
        <div className="img-preview">
          {files && (
            <div className="upload-img-wrap">
              <img src={files} alt="" />
              <AiOutlineCloseCircle className="close-btn" onClick={deleteFile} />
            </div>
          )}
        </div>
      </fieldset>
    </ImageUploadContainer>
  );
});

export default ImageUpload;
