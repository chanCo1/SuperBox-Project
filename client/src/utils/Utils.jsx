
/** 
 * @description 후기 수정 시간 업데이트
 * @param a 기존시간
 * @param b 바뀐시간
 */
const setTime = (a, b) => {
  const originTime = new Date(a);
  const updateTime = new Date(b);

  // heroku의 cleardb는 미국 시간을 기준으로 timezone이 형성 되는데
  // root 계정을 제공하지 않아 timezone을 수정할 수 없어서 프론트단에서 +9를 해서 현재 시간에 맞춤..
  // too many connections 에러가 너무 자주 발생해서 max connection 이랑 wait_timeout을
  // 수정하고 싶은데 root계정에 접근할 수 없으니 이건 뭐..
  // 담에는 cleardb 안쓸래..
  const originHour = originTime.getHours() + 9;
  const originMinutes = originTime.getMinutes();

  const updateHour = updateTime.getHours() + 9;
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
  else if(name.length < 6) return name.replace(/(?<=.{4})./gi, "*");
  else if(name.length < 7) return name.replace(/(?<=.{5})./gi, "*");
};


/** 
 * @discription 내일 날짜 구하는 함수
 * @return yyyy-mm-dd 
 */
const tomorrow = () => {
  // data 객체 생성
  const date = new Date();
  // date 객체에서 현재 년도를 구한다
  const year = date.getFullYear();
  // date 객체에서 현재 월을 구한다 (getMonth는 0부터 시작하기 때문에 +1을 해준다)
  let month = date.getMonth() + 1;
  // date 객체에서 오늘 날짜를 구한다
  const today = date.getDate();
  // 오늘 날짜에 +1을 하여 내일 날짜를 구한다
  let tomorrow = today + 1;
  
  // 해당 월의 마지막 날이면?
  // -> month를 다음달로 변경, tomorrow는 다음달 1일로 변경
  if(new Date(year, month, 0).getDate() === today) {
    // 다음달로 넘기기 위해 +2를 한다 (month는 0부터 시작하기 때문에 이번달을 구할 땐 +1, 다음달은 +2)
    month = date.getMonth() + 2;
    // 오늘날짜 - (오늘날짜 -1)을 한 날짜로 변경 (31일 이면 30을 빼 1이 남도록 한다, 월의 1일)
    tomorrow = date.getDate() - (date.getDate() - 1);
  }

  return `${year}-` + (month > 9 ? `${month}-` : `0${month}-`) + (tomorrow > 9 ? tomorrow : `0${tomorrow}`);
};

export { setTime, nameMasking, tomorrow };