## 为什么要做前端监控

- 要更快发现问题和解决问题
- 做产品的决策依据
- 提升前端工程师的技术深度和广度，打造简历亮点
- 为业务扩展提供了更多可能性

## 前端监控目标

### 稳定性

| JS 错误  | JS 执行错误或者 promise 异常 |
| -------- | ---------------------------- |
| 资源异常 | script,link 等资源加载异常   |
| 接口错误 | ajax 或 fetch 请求接口异常   |
| 白屏     | 页面空白                     |

### 用户体验

| 错误名称                                     | 备注                                                                                               |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| 加载时间                                     | 各个阶段的加载时间                                                                                 |
| TTFB（time to first byte）（首字节时间）     | 是指浏览器发起第一个请求到数据返回第一个字节所消耗的事件，这个时间包含了网络请求时间，后端处理时间 |
| FB（First Paint）（首次绘制）                | 首次绘制包括了任何用户自定义的背景绘制，它是将第一个像素点绘制到屏幕的时刻                         |
| FCP（First Content Paint）(首次内容绘制)     | 首次内容绘制是浏览器将第一个 DOM 渲染到屏幕的时间，可以是任何文本、图像、SVG 等的时间              |
| FMP（First Meaning paint）（首次有意义绘制） | 首次有意义绘制是页面可用性的量度标准                                                               |
| FID（First Input Delay）(首次输入延迟)       | 用户首次和页面交互到页面相应交互的时间                                                             |
| 卡顿                                         | 超过 50ms 的长任务                                                                                 |

### 业务（business）

| 错误名称     | 备注                               |
| ------------ | ---------------------------------- |
| PV           | page view 即页面浏览量或点击量     |
| UV           | 指访问某个站点的不同 IP 地址的人数 |
| 页面停留时间 | 用户在每一个页面的停留时间         |

## 前端监控流程

- 前端埋点
- 数据上报
- 分析和计算，将采集到的数据进行加工汇总
- 可视化展示，将数据按各种维度进行展示
- 监控报警，发现问题后按一定的条件出发报警

### 常见的埋点方案

1. 代码埋点

- 代码埋点：就是以嵌入代码的形式进行埋点，比如需要监控用户的点击事件，会选择在用户点击时，插入一段代码，保存这个监听行为或者直接将监听行为以某一种数据格式直接传给服务器端
- 优点是可以在任何时刻，精确的发送或保存所需要的数据信息
- 缺点是工作量大

2. 可视化埋点

- 通过可视化交互的手段，代替代码埋点
- 通过业务代码和埋点代码分离，提供一个可视化交互的页面，输入为业务代码，通过这个可视化系统，可以在业务代码中自定义的增加埋点事件等，最后输出的代码耦合了业务代码和埋点代码
- 可视化埋点其实是用系统来代替手工插入埋点代码

3. 无痕埋点

- 前端的任意一个事件都被绑定一个标识，所有的事件都别记录下来
- 通过定期上传记录文件，配合文件解析，解析出来我们想要的数据，并生成可视化报告提供专业人员分析
- 无痕埋点的优点是菜鸡全量数据，不会出现漏埋和误埋等现象
- 缺点是给数据传输和服务器增加压力，也无法灵活定制数据结构

**关于日志服务**

日志服务（Log Service,简称 SLS）是针对日志数据一站式服务，用户无需开发就能快捷完成数据采集，消费，投递以及查询分析等功能，帮助提升运维，运营效率，建立 DT 时代海量日志处理能力。

[阿里云日志服务文档](https://help.aliyun.com/document_detail/120218.html)

## 加载时间

- Perdormance Timing
- DOMContentLoaded
- FMP

### 加载时间阶段含义

| 字段                  | 含义                                                                                                                                                               |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| navagationStart       | 初始化页面，在同一个浏览器上下文中前一个页面 unload 的时间戳，如果没有前一个页面的 unload，则与 fetchStart 值相等                                                  |
| redirectStart         | 第一个 HTTP 重定向发生的时间，有跳转且是同域的重定向，否则为 0                                                                                                     |
| redirectEnd           | 最后一个重定向完成时的时间，否则为 0                                                                                                                               |
| fetchStart            | 浏览器准备好使用 http 请求获取文档的时间，这发生在检查缓存之前                                                                                                     |
| domainLookupStart     | DNS 域名开始查询的时间，如果有本地的缓存或 keep-alive 则时间为 0                                                                                                   |
| domainLookupEnd       | DNS 域名结束查询的时间                                                                                                                                             |
| connectStart          | TCP 开始建立连接的时间，如果是持久连接，则于 fetchStart 值相等                                                                                                     |
| secureConnectionStart | https 连接开始的时间，如果不是安全连接则为 0                                                                                                                       |
| connectEnd            | TCP 完成握手的时间，如果是持持久连接则与 fetchStart 值相等                                                                                                         |
| requestStart          | HTTP 请求读取真是文档开始的时间，包括从本地缓存读取                                                                                                                |
| requestEnd            | HTTP 请求读取真实文档结束的时间，包括从本地缓存中读取                                                                                                              |
| responseStart         | 返回浏览器从服务器收到（或本地缓存读取）第一个字节时的 Unix 毫秒时间戳                                                                                             |
| responseEnd           | 返回浏览器从服务器收到（或从本地缓存读取）最后一个字节 Unix 毫秒时间戳                                                                                             |
| unloadEventStart      | 前一个页面的 unload 的时间戳，如果没有则为 0                                                                                                                       |
| unloadEventEnd        | 与 unloadEventStart 相对应，返回的是 unload 函数执行完成的时间戳                                                                                                   |
| domLoading            | 返回当前网页 DOM 结构开始解析时时间戳，此时 document.readyState 变成 loading,并将抛出 readyStateChange 事件                                                        |
| domInteractive        | 返回当前网页 DOM 结构结束解析，开始加载内嵌资源的时间戳，document.readyState 变成 interactive，并抛出事件，注意只是 DOM 解析完成，这时候并没有开始加载网页中的资源 |

### 加载时间阶段计算

| 字段           | 描述                                 | 计算方式                                              | 意义                                                                                                                |
| -------------- | ------------------------------------ | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| upload         | 前一个页面卸载耗时                   | unloadEventEnd-unloadEventStart                       | -                                                                                                                   |
| redirect       | 重定向耗时                           | redirectEnd-redirectStart                             | 重定向的时间                                                                                                        |
| appCache       | 缓存耗时                             | domainLookupStart-fetchStart                          | 读取缓存的时间                                                                                                      |
| dns            | DNS 解析耗时                         | domainLookupEnd-domainLookupStart                     | 可观察域名解析服务器是否正常                                                                                        |
| tcp            | TCP 连接耗时                         | connectEnd-connectStart                               | 建立连接的耗时                                                                                                      |
| ssl            | SSL 安全连接耗时                     | connectEnd-secureConnectionStart                      | 反应数据安全连接建立耗时                                                                                            |
| tttfb          | Time to First Byte(TTFB)网络请求耗时 | responseStart-requestStart                            | TTFB 是发出页面请求到接收到应答数据第一个字节所花费的毫秒数                                                         |
| response       | 响应数据传输耗时                     | responseEnd-responseStart                             | 观察网络是否正常                                                                                                    |
| dom            | DOM 解析耗时                         | domInteractive-responseEnd                            | 观察 DOM 结构是否合理，是否有 JS 阻塞页面解析                                                                       |
| dcl            | DOMContentLoaded 事件耗时            | domContentLoadedEventEnd - domContentLoadedEventStart | 当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，而无需等待样式表、图像和子框架的完全加载。 |
| resources      | 资源加载耗时                         | domComplete-domContentLoadedEventEnd                  | 可观察文档流是否过大                                                                                                |
| domReady       | DOM 阶段渲染耗时                     | domContentLoadedEventEnd-fetchStart                   | DOM 树和页面资源加载完成时间,会触发 domContentLoaded 事件                                                           |
| 首次渲染耗时   | 首次渲染耗时                         | responseEnd-fetchStart                                | 加载文档看到第一帧非空图像时间，也叫白屏时间                                                                        |
| 首次可交互时间 | 首次可交互时间                       | domInteractive - fetchStart                           | DOM 树解析完成时间，此时 document.readyState 为 interactive                                                         |
| 首包时间耗时   | 首包时间                             | responseStart-domainLookupStart                       | DNS 解析到响应返回给浏览器第一个字节的时间                                                                          | 页面完全加载时间 | 页面完全加载时间 | loadEventStart-fetchStart |
| onLoad         | onLoad 事件耗时                      | loadEventEnd-loadEventStart                           |

### 性能指标

| 字段 | 描述                                     | 备注                                                                                                      |
| ---- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| FP   | First Paint（首次绘制）                  | 包括了任何用户自定义的背景绘制，它是首先将像素绘制到屏幕的时刻                                            |
| FCP  | First Content Paint（首次内容绘制）      | 是浏览器将第一个 DOM 渲染到屏幕的时间，可能是文本、图像、SVG 等，这其实就是白屏时间                       |
| FMP  | First Meaningful Paint（首次有意义绘制） | 页面有意义的内容渲染的时间 element.setAttribute('elementtiming','meaningful');                                 |
| LCP  | Largets Contentful Paint（最大内容渲染） | 代表在 viewport 中最大的页面元素加载时间                                                                  |
| DCL  | DomContentLoaded（DOM 加载完成）         | 当 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，无需等待样式表、图像和子框架的完成加载 |
| L    | （onload）                               | 当依赖的资源全部加载完毕之后才会触发                                                                      |
| TTI  | Time to interactive 可交互时间           | 用于标记应用已进行视觉渲染并能可靠响应用户输入的时间点                                                    |
| FID  | First Input Delay 首次输入延迟           | 用户首次和页面交互（单击连接，点击按钮等）到页面响应交互的时间                                            |
