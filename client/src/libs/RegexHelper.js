/**
 * @fileName    : RegexHelper.js
 * @author      : 박찬우
 * @description : 정규표현식을 통해 검사 수행
 */

/** 정규표현식에 대한 검사 실패시 에러 발생 참조 */
import BadRequestException from './BadRequestException';

class RegexHelper {

  /** TODO: 입력값의 존재 여부 검사 */
  value(field, msg) {
    const content = field.value;

    if (
      content === false ||
      content === undefined ||
      content === null ||
      (typeof content === 'string' && content.trim().length === 0)
    ) {
      throw new BadRequestException(msg, field);
    }

    return true;
  };

  /** TODO: 두 값이 동일한지 검사 */
  compare(origin, compare, msg) {
    this.value(origin);
    this.value(compare);

    let value1 = origin.value.trim();
    let value2 = compare.value.trim();

    if(value1 !== value2) {
      throw new BadRequestException(msg, compare);
    }

    return true;
  };

  /** - - - - - - - - - - - - - - - - - - 입력값에 대한 정규표현식 검사 */
  field(field, msg, regex) {
    this.value(field, msg);

    // 입력값에 대한 정규표현식 검사
    if(!regex.test(field.value.trim())) {
      throw new BadRequestException(msg, field);
    }
    
    return true;
  };

  /** TODO: 아이디 입력값에 대한 정규표현식 - 영문 소문자, 숫자, 4~10자리 */
  idCheck(field, msg) {
    return this.field(field, msg, /^[a-z0-9]{4,10}$/);
  };

  /** TODO: 비밀번호 입력값에 대한 정규표현식 - 영문 대/소문자+숫자+특수문자, 8~20자리 */
  pwCheck(field, msg) {
    return this.field(field, msg, /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*_+]).{8,20}$/);
  };

  /** TODO: 이름 입력값에 대한 정규표현식 - 영문, 한글, 2~10자리 */
  nameCheck(field, msg) {
    return this.field(field, msg, /^[a-z가-힣]{2,10}$/);
  };

  /** TODO: 이메일 입력값에 대한 정규표현식  */
  emailCheck(field, msg) {
    return this.field(field, msg, /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i);
  };

  /** TODO: 핸드폰 입력값에 대한 정규표현식 */
  cellphone(field, msg) {
    return this.field(field, msg, /^01([0|1|6|7|8|9])([0-9]{4})([0-9]{4})$/);
  }
};

export default new RegexHelper();