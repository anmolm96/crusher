"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getDomPath(el) {
    const stack = [];
    while (el.parentNode != null) {
        let sibCount = 0;
        let sibIndex = 0;
        for (let i = 0; i < el.parentNode.childNodes.length; i++) {
            const sib = el.parentNode.childNodes[i];
            if (sib.nodeName == el.nodeName) {
                if (sib === el) {
                    sibIndex = sibCount;
                }
                sibCount++;
            }
        }
        if (el.hasAttribute("id") && el.id != "") {
            stack.unshift(`${el.nodeName.toLowerCase()}#${el.id}`);
        }
        else if (sibCount > 1) {
            stack.unshift(`${el.nodeName.toLowerCase()}:eq(${sibIndex})`);
        }
        else {
            stack.unshift(el.nodeName.toLowerCase());
        }
        el = el.parentNode;
    }
    return stack.slice(1); // removes the html element
}
exports.default = (element) => getDomPath(element).join(" > ");
//# sourceMappingURL=domPath.js.map