/** 후기 수정 시간 업데이트 */
const setTime = (a, b) => {
  if(a !== b) {
    return new Date(b).toLocaleString() + ' 수정됨';
  } else {
    return new Date(a).toLocaleString();
  }
};

/** 이름 마스킹 */
const nameMasking = (name) => {
  if(name.length < 3) return name.replace(/(?<=.{1})./gi, "*");
  else if(name.length < 4) return name.replace(/(?<=.{2})./gi, "*");
  else if(name.length < 5) return name.replace(/(?<=.{3})./gi, "*");
};

export { setTime, nameMasking };