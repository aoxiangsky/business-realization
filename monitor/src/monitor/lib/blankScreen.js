import tracker from "../utils/tracker";
import onload from "../utils/onload";

export default function blankScreen() {
  let wrapperElements = ["html", "body", "#container", ".content.main"];
  let emptyPoints = 0;
  function getSelector(element) {
    if (element.id) {
      return `#${element.id}`;
    } else if (element.className) {
      // a b c
      element.className
        .split(" ")
        .filter((item) => !!item)
        .join(".");
      return `.${element.className}`;
    } else {
      return element.nodeName.toLowerCase();
    }
  }
  function isWrapper(element) {
    if (!!element) {
      let selector = getSelector(element);
      if (wrapperElements.indexOf(selector) !== -1) {
        emptyPoints++;
      }
    }
  }
  onload(function () {
    let i = 1;
    while (i <= 9) {
      let xElements = document.elementFromPoint(
        (window.innerWidth * i) / 10,
        window.innerHeight / 2
      );
      let yElements = document.elementFromPoint(
        window.innerWidth / 2,
        (window.innerHeight * i) / 10
      );
      isWrapper(xElements[0]);
      isWrapper(yElements[0]);
      i += 1;
    }

    if (emptyPoints >= 16) {
      let centerElements = document.elementFromPoint(
        window.innerWidth / 2,
        window.innerHeight / 2
      );
      tracker.send({
        kind: "stability",
        type: "blank",
        emptyPoints,
        screen: window.screen.width + "X" + window.screen.height,
        viewPoint: window.innerWidth + "X" + window.innerHeight,
        selector: getSelector(centerElements),
      });
    }
  });
}
