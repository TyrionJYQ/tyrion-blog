/**
 * timesmap转化为需要格式的时间
 * @method formatDate
 * @param {obj} {date: 日期對象或timesmap, pattern: 格式化參數}
 * @return {string}格式化后的日期
 */
function getFormatDate(obj) {
  let { date, pattern = 'yyyy-MM-dd hh:mm:ss'} = obj;
  try {
    if(!date) return '';
    // 如果傳入的date是timesmap格式，則轉化為日期對象
    (typeof date !== 'object') && (typeof date === 'number') && (date = new Date(date));
    const o = {
      "M+": date.getMonth() + 1,                 //月份 
      "d+": date.getDate(),                    //日 
      "h+": date.getHours(),                   //小时 
      "m+": date.getMinutes(),                 //分 
      "s+": date.getSeconds(),                 //秒 
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
      "S": date.getMilliseconds()             //毫秒 
    };
    if (/(y+)/.test(pattern))
      pattern = pattern.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(pattern))
        pattern = pattern.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return pattern; 

  }catch(e) {
    console.log(e,'时间转化失败')
    return date;
  }
}


export { getFormatDate};