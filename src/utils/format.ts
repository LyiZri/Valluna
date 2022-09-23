import CountryValue from '@/assets/json/language.json';
// 示例方法，没有实际意义
export function trim(str: string) {
  return str.trim();
}
export function timestampToTime(data: string) {
  let date = new Date(Number(data));
  
  let Y = date.getFullYear() + "-";
  let M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  let D = date.getDate() + " ";
  let h = date.getHours() + ":";
  let m = date.getMinutes() + ":";
  let s = date.getSeconds();
  return Y + M + D;
}

export function getCountryName(code:string){
  let contryValue = '-'
  CountryValue.map((item,index)=>{
    if(code == item.code){
      contryValue =  item.english
    }
  })
  return contryValue
}
export function getCountryId(name:string){
  let coutryId = ''
  CountryValue.map((item,index)=>{
    if(item.english == name){
      console.log(item);
      coutryId = item.code
      console.log(coutryId);
    }
  })
  console.log(name,coutryId);
  if (coutryId == ''){
    return name
  }
  return coutryId
}