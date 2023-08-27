/* 
脚本功能: 获取 bing面板cookie,用于lowking脚本

操作步骤: 
1、
直接重写的规则资源加入即可 https://raw.githubusercontent.com/MCdasheng/QuantumultX/main/Scripts/myScripts/bingPoint.cookie.js

或者QX配置中加入如下内容  
[rewrite local]
^https\:\/\/rewards\.bing\.com url script-request-header https://raw.githubusercontent.com/MCdasheng/QuantumultX/main/Scripts/myScripts/bingPoint.cookie.js
[MITM]
hostname = rewards.bing.com

2、web访问 https://rewards.bing.com 登录 提示成功获取cookie即可

3、去掉规则资源重写前面的√即可

4、在boxjs里可看到抓取的cookie
*/

const $ = init();

const ck = $request.headers["Cookie"];
$.msg("Bing积分", "🎉面板cookie获取成功,请禁用脚本");
$.log("🎉面板cookie获取成功");
$.log(ck);
$.setdata("bingPointCookieKey", ck);
$.log("testCookie...");
$.log($.getdata("bingPointCookieKey"));
$.done();

function init() {
  isSurge = () => {
    return undefined === this.$httpClient ? false : true;
  };
  isQuanX = () => {
    return undefined === this.$task ? false : true;
  };
  getdata = (key) => {
    if (isSurge()) return $persistentStore.read(key);
    if (isQuanX()) return $prefs.valueForKey(key);
  };
  setdata = (key, val) => {
    if (isSurge()) return $persistentStore.write(key, val);
    if (isQuanX()) return $prefs.setValueForKey(val, key); // 注意！
  };
  msg = (title, subtitle, body) => {
    if (isSurge()) $notification.post(title, subtitle, body);
    if (isQuanX()) $notify(title, subtitle, body);
  };
  log = (message) => console.log(message);
  get = (url, cb) => {
    if (isSurge()) {
      $httpClient.get(url, cb);
    }
    if (isQuanX()) {
      url.method = "GET";
      $task.fetch(url).then((resp) => cb(null, {}, resp.body));
    }
  };
  post = (url, cb) => {
    if (isSurge()) {
      $httpClient.post(url, cb);
    }
    if (isQuanX()) {
      url.method = "POST";
      $task.fetch(url).then((resp) => cb(null, {}, resp.body));
    }
  };
  done = (value = {}) => {
    $done(value);
  };
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done };
}
