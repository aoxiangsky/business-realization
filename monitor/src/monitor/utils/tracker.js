const host = "cn-shanghai.log.aliyuncs.com";
const project = "testmonitor";
const logStore = "testmonitor-store";
let userAgent = require("user-agent");

function getExtraData() {
  return {
    title: document.title,
    url: location.pathname,
    timestamp: Date.now(),
    userAgent: userAgent.parse(navigator.userAgent).fullName,
  };
}

class SendTracker {
  constructor() {
    this.url = `http://${project}.${host}/logstores/${logStore}/track`; // 上报的路径
    this.xhr = new XMLHttpRequest();
  }
  send(data = {}) {
    let extraData = getExtraData();
    let log = { ...extraData, ...data };
    // 对象的值不能是数字
    for (let key in log) {
      if (typeof log[key] === "number") {
        log[key] = `${log[key]}`;
      }
    }
    console.log("log", log);
    let body = JSON.stringify({
      __logs__: [log],
    });
    this.xhr.open("POST", this.url, true);
    this.xhr.setRequestHeader("Content-Type", "application/json"); // 请求体类型
    this.xhr.setRequestHeader("x-log-apiversion", "0.6.0"); // 版本号
    this.xhr.setRequestHeader("x-log-bodyrawsize", body.length);
    this.xhr.onload = function () {};
    this.xhr.onerror = function (error) {
      // console.log(error);
    };
    this.xhr.send(body);
  }
}

export default new SendTracker();
