/**
 * @file cookie
 * @param {getCookie} 获取cookie
 * @param {deleteCookie} 删除cookie
 * @param {addCookie} 添加cookie
 */
function addCookie(cookieKey: any, cookieValue: string, overSeconds?: number) {
  document.cookie = `${cookieKey}=${cookieValue};max-age=${overSeconds}`;
}

function deleteCookie(cookieKey: any) {
  addCookie(cookieKey, '', -1);
}

function getCookie(name: string) {
  const cookies = document.cookie;
  const list = cookies.split('; '); // 解析出名/值对列表
  for (let i = 0; i < list.length; i++) {
    const arr = list[i].split('='); // 解析出名和值
    if (arr[0] == name) {
      return decodeURIComponent(arr[1]);
    } // 对cookie值解码
  }
  return '';
}

function isCookieKey(cookieKey: string) {
  const arr = document.cookie.split(';');
  for (let i = 0; i < arr.length; i++) {
    const arr2 = arr[i].split('=');
    if (arr2[0].trim() == cookieKey) {
      return true;
    }
  }
  return false;
}

export { addCookie, getCookie, deleteCookie, isCookieKey };