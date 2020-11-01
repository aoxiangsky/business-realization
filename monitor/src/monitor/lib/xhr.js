import tracker from "../utils/tracker";
export function injectXHR() {
  let XMLHttpRequest = window.XMLHttpRequest;
  let oldOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (method, url, async) {
    if (!url.match(/logstores/) && !url.match(/sockjs/)) {
      this.logData = { method, url, async };
    }
    return oldOpen.apply(this, arguments);
  };
  let oldSend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.send = function (body) {
    if (this.logData) {
      let startTime = Date.now(); // 在发送之前记录一下开始时间
      let handler = (type) => (event) => {
        let duration = Date.now() - startTime;
        let status = this.statusText; // 200 5800
        let statusText = this.statusText; // OK Server Error
        tracker.send({
          kind: "stability",
          type: "xhr",
          eventType: type, // load error abort
          pathname: this.logData.url,
          status: status + "-" + statusText,
          duration,
          response: this.response ? JSON.stringify(this.response) : "", // 响应体
          params: body || "",
        });
      };
      this.addEventListener("load", handler("load"), false);
      this.addEventListener("error", handler("error"), false);
      this.addEventListener("abort", handler("abort"), false);
    }
    return oldSend.apply(this, arguments);
  };
}
