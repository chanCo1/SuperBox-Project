
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
    (updateHour > 10 ? updateHour : `0${updateHour}`) + ':' +
    (updateMinutes > 10 ? updateMinutes : `0${updateMinutes}`) + ' 수정됨';

  } else {
    return new Date(a).toLocaleString().substring(0, 12) + 
    (originHour > 10 ? originHour : `0${originHour}`) + ':' +
    (originMinutes > 10 ? originMinutes : `0${originMinutes}`);
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

export { setTime, nameMasking };