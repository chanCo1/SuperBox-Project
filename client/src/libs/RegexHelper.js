/**
 * @fileName    : RegexHelper.js
 * @author      : 박찬우
 * @description : 정규표현식을 통해 검사 수행
 */

/** 정규표현식에 대한 검사 실패시 에러 발생 참조 */
import BadRequestException from './BadRequestException';

class RegexHelper {
  // 입력값의 존재 여부 검사
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
};

export default new RegexHelper();
