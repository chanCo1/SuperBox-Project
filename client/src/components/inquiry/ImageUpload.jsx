/**
 * 이미지 파일 업로드를 위한 컴포넌트
 */

/** 패키지 참조 */
import React, { memo, useCallback, useEffect, useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import axios from '../../config/axios';

// 컴포넌트 참조
import Spinner from '../Spinner';

import { MdOutlineDriveFolderUpload } from 'react-icons/md';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const ImageUploadContainer = styled.div`
  border: 1px solid #bcbcbc;
  border-radius: 5px;
  padding: 30px 60px;
  color: #404040;

  fieldset {
    text-align: center;
    border: 1px solid #bcbcbc;
    border-radius: 5px;
    padding: 20px;

    label {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 20px 10px;
      font-size: 0.9rem;
      cursor: pointer;

      .upload-icon {
        font-size: 3.5rem;
      }
      &:hover {
        color: blue;
      }
    }

    .img-preview-wrap {
      display: flex;

      .img-preview {
        width: 50%;
        padding: 20px 20px 20px 50px;
        /* display: inline-block; */
        /*flex-wrap: wrap;
        justify-content: space-evenly; */

        .upload-img-wrap {
          position: relative;
          border: 1px dashed #bcbcbc;

          img {
            width: 100%;
            height: 30vh;

            ${(props) => props.state && css` opacity: .5;`}
          }

          .close-btn {
            position: absolute;
            top: 2%;
            right: 1%;
            font-size: 1.5rem;
            color: #bcbcbc;
            cursor: pointer;

            &:hover {
              color: #404040;
            }
          }
        }

        button {
          width: 100%;
          padding: 10px;
          border: none;
          border-radius: 0 0 5px 5px;
          background-color: #e9edf4;
          cursor: pointer;
        }
      }

      .file-name {
        display: flex;
        width: 50%;
        padding: 20px;
        justify-content: space-evenly;
        flex-direction: column;
        word-break: break-all;

        .file-confirm {
          
          p {
            margin-bottom: 10px;
          }
          
          button {
            padding: 5px 20px;
            border: 1px solid #f3b017;
            border-radius: 10px;
            cursor: pointer;
            background-color: #fff;
            color: #404040;
            margin: 0 5px;

            &:hover {
              background-color: #f3b017;
              color: #fff;
            }
          }
        }
      }
    }
  }
`;

const ImageUpload = memo(({ setUploadImg, setConfirm }) => {
  // formData 사용
  const formData = new FormData();

  // 보여줄 이미지 상태값 관리
  const [showImgFiles, setShowImgFiles] = useState('');
  // 백엔드에 보낼 이미지 상태값
  const [formDataImg, setFormDataImg] = useState('');

  const [count, setCount] = useState('0/1');
  const [imgConfirm, setImgConfirm] = useState(false);

  const imgRef = useRef();
  
  useEffect(() => {
    setConfirm(imgConfirm);
  }, [imgConfirm, setConfirm])

  // 백엔드 통신 로딩 상태
  const [isLoading, setIsLoading] = useState(false);

  // 이미지 선택
  const fileSelect = useCallback((e) => {
    e.preventDefault();

    const file = e.target.files[0];
    setShowImgFiles(URL.createObjectURL(file));
    setFormDataImg(file);

    setCount('1/1');
    setImgConfirm(true);
  }, []);

  // // formData에 저장
  // useEffect(() => {
  //   formData.append('imgFile', formDataImg);
  //   for (const i of formData) console.log('!!!formData >>> ', i);
  // }, [formDataImg]);

  // 이미지 업로드
  const uploadFile = useCallback(
    async (e) => {
      e.preventDefault();

      formData.append('imgFile', formDataImg);
      for (const i of formData) console.log('!!!formData >>> ', i);

      try {
        setIsLoading(true)
        const response = await axios.post('api/image/upload', formData);
        console.log(response.data.filePath.path);
        setUploadImg(response.data.filePath.path);
        setImgConfirm(false);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }

      const imgRefStyle = imgRef.current.style;
      imgRefStyle.opacity = 0.5;
    },
    [formDataImg, setUploadImg]
  );

  // 삭제
  const deleteFile = useCallback(
    (e) => {
      e.preventDefault();

      URL.revokeObjectURL(showImgFiles);
      setShowImgFiles('');
      setFormDataImg('');
      setCount('0/1');

      const imgRefStyle = imgRef.current.style;
      imgRefStyle.opacity = 1;
    },
    [showImgFiles]
  );

  return (
    <>
      <Spinner visible={isLoading} />
      <ImageUploadContainer>
        <fieldset>
          <legend>
            <label htmlFor="imageUpload" onChange={fileSelect}>
              <MdOutlineDriveFolderUpload className="upload-icon" />
              여기를 클릭하면 이미지 파일을 첨부할 수 있어요
              <input
                type="file"
                id="imageUpload"
                name="imageUpload"
                accept="image/*"
                // multiple
                style={{ display: 'none' }}
              />
            </label>
          </legend>

          <div>{count}</div>

          <div className="img-preview-wrap">
            <div className="img-preview">
              {showImgFiles && (
                <>
                  <div className="upload-img-wrap">
                    <img src={showImgFiles} alt={showImgFiles} ref={imgRef} />
                    {imgConfirm && (
                      <AiOutlineCloseCircle className="close-btn" onClick={deleteFile} />
                    )}
                  </div>
                </>
              )}
            </div>
            {formDataImg && (
              <div className="file-name">
                <p>파일: {formDataImg.name}</p>
                {imgConfirm && (
                  <div className='file-confirm'>
                    <p>이 이미지를 사용할까요?</p>
                    <button onClick={uploadFile}>네</button>
                    <button onClick={deleteFile}>아니요</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </fieldset>
      </ImageUploadContainer>
    </>
  );
});

export default ImageUpload;







// 다중 이미지..
// const ImageUpload = memo(({ setUploadImg }) => {

//   const formData = new FormData();

//   // // 보여줄 이미지 상태값 관리
//   const [showImgFiles, setShowImgFiles] = useState([]);
//   // 백엔드에 보낼 이미지 상태값
//   const [formDataImg, setFormDataImg] = useState([]);
//   // console.log('formDataImg >>> ',formDataImg);

//   // useEffect(() => {
//   //   setUploadImg(formDataImg);
//   // }, [formDataImg, setUploadImg]);

//   const fileUplaod = async (e) => {
//     e.preventDefault();

//     // 업로드할 이미지
//     const file = e.target.files;
//     // console.log('그냥 file >>> ', file);

//     // file의 첫번째 배열만 상태값으로 사용
//     setFormDataImg([...formDataImg, file[0]]); // 이건 array

//     // 보여줄 이미지
//     const showImgList = [...showImgFiles];

//     // 이미지 미리보기 상태값 갱신
//     for (let i = 0; i < file.length; i++) {
//       const imgUrl = URL.createObjectURL(file);
//       showImgList.push(imgUrl);
//     }
//     setShowImgFiles(showImgList);
//   };

// const deleteFile = useCallback((id) => {
//   setShowImgFiles(showImgFiles.filter((v, i) => i !== id));
//   setFormDataImg(formDataImg.filter((v,i) => i !== id));
// }, [formDataImg, showImgFiles]);

//   const uploadTest = async (e) => {
//     e.preventDefault();

//     // formData
//     for (let i = 0; i < formDataImg.length; i++) {
//       formData.append('imgFile', formDataImg[i]);
//     }

//     for (const i of formData) console.log('!!!formData >>> ', i);

//     // 백엔드에 비동기 처리
//     try {
//       const response = await axios.post('api/image/upload', formData);
//       console.log(response);

//       for(let i = 0; i < response.data.filePath.length; i++) {
//         setUploadImg(response.data.filePath)
//       }

//     } catch(err) {
//       console.error(err);
//     }
//   };

//   return (
//     <ImageUploadContainer>
//       <fieldset>
//         <legend>
//           <label htmlFor="imageUpload" onChange={fileUplaod}>
//             <MdOutlineDriveFolderUpload className="upload-icon" />
//             여기를 클릭하면 이미지 파일을 첨부할 수 있어요
//             <input
//               type="file"
//               id="imageUpload"
//               name="imageUpload"
//               accept="image/*"
//               // multiple
//               style={{ display: 'none' }}
//             />
//           </label>
//         </legend>
//         <div className="img-preview">
//           {showImgFiles &&
//             showImgFiles.map((image, i) => (
//               <div className="upload-img-wrap" key={i}>
//                 <img src={image} alt={`${image}-${i}`} />
//                 <AiOutlineCloseCircle
//                   className="close-btn"
//                   onClick={(e) => deleteFile(i)}
//                 />
//               </div>
//             ))}
//             {/* {formDataImg && formDataImg.map((v, i) => (
//               <div key={i}>
//                 <p key={i}>{v.name}</p>
//                 <AiOutlineCloseCircle
//                   className="close-btn"
//                   onClick={(e) => deleteFile(i)}
//                 />
//               </div>
//             ))} */}
//         </div>
//       </fieldset>
//       <button onClick={uploadTest}>테스트</button>
//     </ImageUploadContainer>
//   );
// });

// export default ImageUpload;
