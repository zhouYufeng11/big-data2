/**
 * 节流
 * fn 是需要执行的函数
 * wait 是时间间隔
 */
export const throttle = (fn: any, wait = 1500) => {
  // 上一次执行 fn 的时间
  let previous = 0
  // 将 throttle 处理结果当作函数返回
  return (...args: any[]) => {
    // 获取当前时间，转换成时间戳，单位毫秒
    let now = +new Date()
    // 将当前时间和上一次执行函数的时间进行对比
    // 大于等待时间就把 previous 设置为当前时间并执行函数 fn
    if (now - previous > wait) {
      previous = now
      fn(args)
    }
  }
}

/**
 * 年月日周
 * @param dateTime  new Date()
 * @returns {}
 */
export const formatterDay = (dateTime?: Date) => {
  let now: Date = dateTime || new Date();
  let year = now.getFullYear();
  let month = (now.getMonth() + 1 < 10 ? '0' : '') + `${now.getMonth() + 1}`;
  let day = (now.getDate() < 10 ? '0' : '') + `${now.getDate()}`;
  let current = now.toLocaleTimeString();
  let week = now.getDay();
  let weekStr = '星期';
  switch (week) {
    case 0:
      weekStr += '日';
      break;
    case 1:
      weekStr += '一';
      break;
    case 2:
      weekStr += '二';
      break;
    case 3:
      weekStr += '三';
      break;
    case 4:
      weekStr += '四';
      break;
    case 5:
      weekStr += '五';
      break;
    case 6:
      weekStr += '六';
      break;
  }
  return { day: `${year}.${month}.${day}`, week: weekStr }
}

/**
 * 当前时间
 * @param dateTime  new Date()
 * @returns string
 */
export const formatterTime = (dateTime?: Date) => {
  let now: Date = dateTime || new Date();
  return now.toLocaleTimeString()
}

/**
 * 深拷贝
 * @param orig Object
 * @returns new Objec
 */
export const deepClone = (orig: any) => {
  let copy: any = Object.create(Object.getPrototypeOf(orig))
  Object.getOwnPropertyNames(orig)
    .forEach(ele => {
      // 获取到每个属性的所有描述，然后重新定义对象的属性并返回此对象。
      let desc: any = Object.getOwnPropertyDescriptor(orig, ele);
      Object.defineProperty(copy, ele, desc)
    });
  return copy;
}

/**
 * 小数点后六位
 * @param num Number
 * @returns num Number
 */
export const formatterLngLat = (num: number) => {
  return Number(num.toFixed(6))
}



export const autoRefresh = (delay: number) => {
  // const delay = 5 * 1000;
  let timer: any = null;

  function timeout(delay: any) {
    return setInterval(function callback() {
      window.location.reload(); // window.history.go(0);
      clearInterval(timer); //  清除上一次的定时器
      timer = setInterval(callback, delay);
    }, delay);  
  }

  //  判断 5 min 之后是否有操作进行，如果没有强制刷新页面
  timer = timeout(delay);
  //  判断用户是否进行操作
  document.body.addEventListener('mousemove', trobble(handleMouseMove, delay));
  //  判断用户是否进行案件操作
  document.body.addEventListener('keydown', trobble(handleKeyDown, delay))

  function handleMouseMove(ev: any) {
    window.location.reload();
    //  循环
    timer = timeout(delay);
  }

  function handleKeyDown(ev: any) {
    window.location.reload();
    timer = timeout(delay);
  }

  //  防抖
  function trobble (callback: any, wait: any) {
    return function(...args: any[]) {
      if(timer) clearTimeout(timer);
      
      timer = setTimeout(() => {
        callback.apply(this, args);
        timer = null;
      }, wait );
    }
  }
}

/**
 * 日期
 * @param now
 * @returns
 */
 export const formatDateStr = (now?: any) => {
  if (!now) {
    now = new Date();
  }
  let year = now.getFullYear();
  let month = now.getMonth() + 1 < 10 ? ('0' + (now.getMonth() + 1)) : (now.getMonth() + 1);
  let day = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();
  return `${year}-${month}-${day}`
}


/**
 * 日期
 * @param now
 * @returns
 */
 export const formatDateLong = (now?: any) => {
  if (!now) {
    now = new Date();
  }
  let year = now.getFullYear();
  let month = now.getMonth() + 1 < 10 ? ('0' + (now.getMonth() + 1)) : (now.getMonth() + 1);
  let day = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();
  return `${year}${month}${day}`
}


/**
 * 日期时间
 * @param now
 * @returns
 */
export const formatTime = (now?: any) => {
  if (!now) {
    now = new Date();
  }
  let year = now.getFullYear();
  let month = now.getMonth() + 1 < 10 ? ('0' + (now.getMonth() + 1)) : (now.getMonth() + 1);
  let day = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();
  let hours = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
  let minutes = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
  let second = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();
  return `${year}-${month}-${day} ${hours}:${minutes}:${second}`
}

// 处理日期格式
export function formatDate(payload: any, type: any = ''){
	const timeout = 1000*60*60*24; //	获取一天的毫秒
	payload = Date.now() - ( payload * timeout );
	const d = new Date(payload);
	
	let month: any = d.getMonth() + 1;
	if(month < 10) month = '0' + month;
	let day: any = d.getDate();
	if(day < 10) day = '0' + day; 

  //格式化
  if(type == '') {
	  return d.getFullYear() + '' + month + '' + day;
  } else if(type == '-') {
    return d.getFullYear() + '-' + month + '-' + day;
  }
	
}

//  生成随机字符串 - 拼接坐标
export function formDataCoordinate(str: any, num: number = 1) {
  let formatStr = String(str);
  const random = String( parseInt(Math.random() * Math.pow(10, num)) );

  try {
    let [ pointFrout, pointEnd ] = formatStr.split('.');
    pointEnd = pointEnd.slice(0, 6);

    const fillZero = 6 - pointEnd.length;

    for(var i = 0; i < fillZero; i++ ) {
      pointEnd += '0';
    }

    formatStr = pointFrout + '.' + pointEnd;
  } catch( ev ) {}

  formatStr = formatStr.slice(0, -num) + random;

  return Number(formatStr);
}

//  数据切片
export function splitPoint(start: any, end: any, data: any) {
  return data.slice(start, end);
}

//  处理日周月传参
export function timeSlotChange (val: any) {
  let startTime, endTime;
  let now = new Date(); //当前日期 
  let nowDayOfWeek = now.getDay(); //今天本周的第几天 
  let nowDay = now.getDate(); //当前日 
  let nowMonth = now.getMonth(); //当前月 
  let nowYear = now.getFullYear(); //当前年 
  let jd=Math.ceil((nowMonth + 1) / 3)


  switch (val) {
    case 1:
      startTime = new Date(nowYear, nowMonth, nowDay)
      endTime = new Date(nowYear, nowMonth, nowDay)
      break;
    case 2:
      startTime = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1)
      endTime = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 7)
      break;
    case 3:
      startTime = new Date(nowYear, nowMonth, 1)
      endTime = new Date(nowYear, nowMonth + 1, 0)
      break;
  }
  return {
    startTime: formatDateStr(startTime),
    endTime: formatDateStr(endTime)
  }
}


/**
 * const { jwd, id } = item;

        if(jwd !== null) {
          const [ jd, wd ] = jwd.split(',');
          const jj = String(formDataCoordinate(jd, 5))
          const ww = String(formDataCoordinate(wd, 5));
          
          await info({id, jd: jj, wd: ww});
        }
*/