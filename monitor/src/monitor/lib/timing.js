import tracker from "../utils/tracker.js";
import onload from "../utils/onload.js";
import getSelector from "../utils/getSelector.js";
import getLastEvent from "../utils/getLastEvent.js";

export function timing() {
  let FMP, LCP;
  if (PerformanceObserver) {
    new PerformanceObserver((entryList, observer) => {
      let perfEntries = entryList.getEntries();
      FMP = perfEntries[0];
      observer.disconnect(); // 不再观察
    }).observe({ entryTypes: ["element"] }); // 观察页面中有意义的元素

    new PerformanceObserver((entryList, observer) => {
      let perfEntries = entryList.getEntries();
      LCP = perfEntries[0];
      observer.disconnect(); // 不再观察
    }).observe({ entryTypes: ["largest-contentful-paint"] }); // 观察页面中最大的渲染

    // FID计算
    new PerformanceObserver((entryList, observer) => {
      let lastEvent = getLastEvent();
      let firstInput = entryList.getEntries()[0];
      if (firstInput) {
        // processingStart 开始处理的事件
        // startTime 开始点击的时间
        let inputDelay = firstInput.processingStart - firstInput.startTime;
        let duration = firstInput.duration; // 处理的耗时
        if (inputDelay > 0 || duration > 0) {
          tracker.send({
            kind: "experience", // 用户体验指标
            type: "firstInputDelay", // 首次输入延迟
            inputDelay,
            duration, // 处理的事件
            startTime: firstInput.startTime,
            selector: lastEvent
              ? getSelector(lastEvent.path || lastEvent.target)
              : "",
          });
        }
      }
      observer.disconnect(); // 不再观察
    }).observe({ type: "first-input", buffered: true }); // 用户的第一次交互
  }

  onload(function () {
    setTimeout(() => {
      console.log(performance.timing);
      const {
        fetchStart,
        connectStart,
        connectEnd,
        requestStart,
        responseStart,
        responseEnd,
        domLoading,
        domInteractive,
        domContentLoadedEventStart,
        domContentLoadedEventEnd,
        loadEventStart,
      } = performance.timing;

      let FP = performance.getEntriesByName("first-paint")[0];
      let FCP = performance.getEntriesByName("first-contentful-paint")[0];

      // 开始发送性能指标
      console.log(FP);
      console.log(FCP);
      console.log(FMP);
      console.log(LCP);
      tracker.send({
        kind: "experience", // 用户体验指标
        type: "timing", // 统计每个阶段的时间
        connectTime: connectEnd - connectStart, // 连接时间
        ttfbTime: responseStart - requestStart, // 首字节到达时间
        responseTime: responseEnd - responseStart, // 响应的读取时间
        parseDOMTime: loadEventStart - domLoading, // DOM解析的时间
        domContentLoadedTime:
          domContentLoadedEventEnd - domContentLoadedEventStart,
        timeToInteractive: domInteractive - fetchStart, // 首次可交互时间
        loadTime: loadEventStart - fetchStart, // 完整的加载时间
      });
      tracker.send({
        kind: "experience", // 用户体验指标
        type: "paint", // 统计每个阶段的时间
        firstPaint: FP.startTime,
        firstContentfulPaint: FCP.startTime,
        firstMeaningfulPaint: FMP.startTime,
        largestContentfulPaint: LCP.startTime,
      });
    }, 3000);
  });
}
