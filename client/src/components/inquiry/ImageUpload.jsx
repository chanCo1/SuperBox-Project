/**
 * 이미지 파일 업로드를 위한 컴포넌트
 */

/** 패키지 참조 */
import React, { memo, useCallback, useEffect, useState } from 'react';
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
    border: 1px solid #bcbcbc;
    border-radius: 5px;

    label {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 20px 10px;
      font-size: .9rem;
      cursor: pointer;

      .upload-icon { font-size: 3.5rem;}
      &:hover { color: blue; }
    }

    .img-preview {
      text-align: left;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;

      .upload-img-wrap {
        position: relative;
        width: 30%;
        margin: 10px;
        border: 1px dashed #bcbcbc;

        img {
          width: 100%;
          height: 20vh;
        }

        .close-btn {
          position: absolute;
          top: 2%;
          right: 1%;
          font-size: 1.5rem;
          color: #bcbcbc;
          cursor: pointer;

          &:hover { color: #404040; }
        }
      }
    }
  }
`;

const ImageUpload = memo(({ setInquiry }) => {

  // 이미지 상태값 관리
  const [imgFiles, setImgFiles] = useState([]);
  
  const fileUplaod = (e) => {
    e.preventDefault();
    
    // 업로드할 이미지
    const file = e.target.files;
    const imgList = [...imgFiles];

    // formData
    const formData = new FormData();
    for(let i = 0; i < file.length; i++) {
      formData.append(`file${i}`, file[i]);
    };

    for(const i of formData) console.log(i);

    // 이미지 미리보기
    for(let i = 0; i < file.length; i++) {
      const imgUrl = URL.createObjectURL(file[i]);
      imgList.push(imgUrl);
    }
    setImgFiles(imgList);

  };
  
  const deleteFile = useCallback((id) => {
    setImgFiles(imgFiles.filter((v,i) => i !== id));
  }, [imgFiles]);

  return (
    <ImageUploadContainer>
      <fieldset>
        <legend>
          <label htmlFor="imageUpload" onChange={fileUplaod}>
            <MdOutlineDriveFolderUpload className="upload-icon" />
            여기를 클릭하면 이미지 파일을 첨부할 수 있어요
            <input
              type="file"
              id="imageUpload"
              name='imageUpload'
              accept="image/*"
              multiple
              style={{ display: 'none' }}
            />
          </label>
        </legend>
        <div className="img-preview">
          {imgFiles && imgFiles.map((image, i) => (
            <div className="upload-img-wrap" key={i}>
              <img src={image} alt={`${image}-${i}`} />
              <AiOutlineCloseCircle className="close-btn" onClick={() => deleteFile(i)} />
            </div>
          ))}
        </div>
      </fieldset>
    </ImageUploadContainer>
  );
});

export default ImageUpload;
