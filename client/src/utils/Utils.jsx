
/** 
 * @description 후기 수정 시간 업데이트
 * @param a 기존시간
 * @param b 바뀐시간
 */
const setTime = (a, b) => {

  const originTime = new Date(a);
  const updateTime = new Date(b);

  const originHour = originTime.getHours();
  const originMinutes = originTime.getMinutes();

  const updateHour = updateTime.getHours();
  const updateMinutes = updateTime.getMinutes();


  if(a !== b) {
    return new Date(b).toLocaleString().substring(0, 12) + 
    (updateHour > 9 ? ` ${updateHour}` : ` 0${updateHour}`) + ':' +
    (updateMinutes > 9 ? updateMinutes : `0${updateMinutes}`) + ' ·수정됨';

  } else {
    return new Date(a).toLocaleString().substring(0, 12) + 
    (originHour > 9 ? ` ${originHour}` : ` 0${originHour}`) + ':' +
    (originMinutes > 9 ? originMinutes : `0${originMinutes}`);
  }
};

/** 
 * @description 이름 마스킹
 * @param name 사용할 이름
 */
const nameMasking = (name) => {
  if(name.length < 3) return name.replace(/(?<=.{1})./gi, "*");
  else if(name.length < 4) return name.replace(/(?<=.{2})./gi, "*");
  else if(name.length < 5) return name.replace(/(?<=.{3})./gi, "*");
};


/** 
 * @discription 내일 날짜 구하는 함수 -> yyyy-mm-dd 
 */
const tomorrow = () => {
  const date = new Date();
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  const today = date.getDate();
  let tomorrow = date.getDate() + 1;
  
  // 해당 월의 마지막 날이면?
  // -> month를 다음달로 변경, tomorrow는 다음달 1일로 변경
  if(new Date(year, month, 0).getDate() === today) {
    month = + date.getMonth() + 2;
    tomorrow = date.getDate(0) - (date.getDate() -1);
  }

  return `${year}-` + (month > 9 ? month : `0${month}`) + (tomorrow > 9 ? tomorrow : `-0${tomorrow}`);
};

export { setTime, nameMasking, tomorrow };