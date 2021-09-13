import observer from "./computedStyleObserver";


let convertToUnparsed = (px) => {
  return new CSSUnparsedValue([`${px.value}px`]);
}

let makePixel = (px) => {
  return px && px != "auto" ? (typeof CSS != "undefined" ? CSS.px(px) : `${px}px`) : (typeof CSS != "undefined" ? new CSSUnparsedValue([`auto`]) : `auto`);
}

let convert = (px) => {
  return px && px != "auto" ? (typeof CSSNumericValue.parse != "undefined" ? CSSNumericValue.parse(px) : px) : (typeof CSS != "undefined" ? new CSSUnparsedValue([`auto`]) : `auto`);
}

//Returns true if it is a DOM node
function isNode(o){
  return (
    typeof Node === "object" ? o instanceof Node : 
    o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
  );
}

//Returns true if it is a DOM element    
function isElement(o){
  return (
    typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
    o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
);
}

let propMap = {
  "--content-box-width": (computed)=>{
    let boxSizing = computed.getPropertyValue("box-sizing");
    let width = computed.getPropertyValue("width").match(/\d+/);
    let paddingLeft = computed.getPropertyValue("padding-left").match(/\d+/);
    let paddingRight = computed.getPropertyValue("padding-right").match(/\d+/);
    let borderLeftWidth = computed.getPropertyValue("border-left-width").match(/\d+/);
    let borderRightWidth = computed.getPropertyValue("border-right-width").match(/\d+/);
    if (boxSizing == "content-box") { return makePixel(width); };
    if (boxSizing == "padding-box") { return makePixel(width - paddingLeft - paddingRight); };
    if (boxSizing == "border-box") { return makePixel(width - paddingLeft - paddingRight - borderLeftWidth - borderRightWidth); };
    return makePixel(width);
  },
  "--content-box-height": (computed)=>{
    let boxSizing = computed.getPropertyValue("box-sizing");
    let height = computed.getPropertyValue("height").match(/\d+/);
    let paddingTop = computed.getPropertyValue("padding-top").match(/\d+/);
    let paddingBottom = computed.getPropertyValue("padding-bottom").match(/\d+/);
    let borderTopWidth = computed.getPropertyValue("border-top-width").match(/\d+/);
    let borderBottomWidth = computed.getPropertyValue("border-bottom-width").match(/\d+/);
    if (boxSizing == "content-box") { return makePixel(height); };
    if (boxSizing == "padding-box") { return makePixel(height - paddingTop - paddingBottom); };
    if (boxSizing == "border-box") { return makePixel(height - paddingTop - paddingBottom - borderTopWidth - borderBottomWidth); };
    return makePixel(height);
  },
  "--border-box-width": (computed)=>{
    let boxSizing = computed.getPropertyValue("box-sizing");
    let width = computed.getPropertyValue("width").match(/\d+/);
    let paddingLeft = computed.getPropertyValue("padding-left").match(/\d+/);
    let paddingRight = computed.getPropertyValue("padding-right").match(/\d+/);
    let borderLeftWidth = computed.getPropertyValue("border-left-width").match(/\d+/);
    let borderRightWidth = computed.getPropertyValue("border-right-width").match(/\d+/);
    if (boxSizing == "content-box") { return makePixel(width + borderLeftWidth + borderRightWidth + paddingLeft + paddingRight); };
    if (boxSizing == "padding-box") { return makePixel(width + borderLeftWidth + borderRightWidth); };
    if (boxSizing == "border-box") { return makePixel(width); };
    return makePixel(width);
  },
  "--border-box-height": (computed)=>{
    let boxSizing = computed.getPropertyValue("box-sizing");
    let height = computed.getPropertyValue("height").match(/\d+/);
    let paddingTop = computed.getPropertyValue("padding-top").match(/\d+/);
    let paddingBottom = computed.getPropertyValue("padding-bottom").match(/\d+/);
    let borderTopWidth = computed.getPropertyValue("border-top-width").match(/\d+/);
    let borderBottomWidth = computed.getPropertyValue("border-bottom-width").match(/\d+/);
    if (boxSizing == "content-box") { return makePixel(height + paddingTop + paddingBottom + borderTopWidth + borderBottomWidth); };
    if (boxSizing == "padding-box") { return makePixel(height + borderTopWidth + borderBottomWidth); };
    if (boxSizing == "border-box") { return makePixel(height); };
    return makePixel(height);
  },
  "--padding-box-width": (computed)=>{
    let boxSizing = computed.getPropertyValue("box-sizing");
    let width = computed.getPropertyValue("width").match(/\d+/);
    let paddingLeft = computed.getPropertyValue("padding-left").match(/\d+/);
    let paddingRight = computed.getPropertyValue("padding-right").match(/\d+/);
    let borderLeftWidth = computed.getPropertyValue("border-left-width").match(/\d+/);
    let borderRightWidth = computed.getPropertyValue("border-right-width").match(/\d+/);
    if (boxSizing == "content-box") { return makePixel(width + paddingLeft + paddingRight); };
    if (boxSizing == "padding-box") { return makePixel(width); };
    if (boxSizing == "border-box") { return makePixel(width - borderLeftWidth - borderRightWidth); };
    return makePixel(width);
  },
  "--padding-box-height": (computed)=>{
    let boxSizing = computed.getPropertyValue("box-sizing");
    let height = computed.getPropertyValue("height").match(/\d+/);
    let paddingTop = computed.getPropertyValue("padding-top").match(/\d+/);
    let paddingBottom = computed.getPropertyValue("padding-bottom").match(/\d+/);
    let borderTopWidth = computed.getPropertyValue("border-top-width").match(/\d+/);
    let borderBottomWidth = computed.getPropertyValue("border-bottom-width").match(/\d+/);
    if (boxSizing == "content-box") { return makePixel(height + paddingTop + paddingBottom); };
    if (boxSizing == "padding-box") { return makePixel(height); };
    if (boxSizing == "border-box") { return makePixel(height - borderTopWidth - borderBottomWidth); };
    return makePixel(height);
  },
  "--width": "width",
  "--height": "height",
  "--padding-left": "padding-left",
  "--padding-right": "padding-right",
  "--border-top-width": "border-top-width",
  "--border-bottom-width": "border-bottom-width",
  "--border-left-width": "border-left-width",
  "--border-right-width": "border-right-width"
};

let applyProperties = (element, computedStyle) => {
  for (let key in propMap) {
    let functor = propMap[key];
    let value = null;
    if (typeof functor == "function") { value = functor(computedStyle); };
    if (typeof functor === 'string' || functor instanceof String) { value = convert(computedStyle.getPropertyValue(functor)); };
    if (element.attributeStyleMap) {
      element.attributeStyleMap.set(key, convertToUnparsed(value));
    } else {
      element.style.setProperty(key, value);
    }
  }
}

let updateProperties = (arg, options) => {
  let elements = [];
  if (typeof arg === 'string' || arg instanceof String) { elements = document.querySelectorAll(arg); };
  if (Array.isArray(arg)) { elements = arg; }; 
  if (isElement(arg)) elements = [arg];

  // 
  elements.forEach((element)=>{ 
    let computedStyle = window.getComputedStyle(element, options.pseudo);
    applyProperties(element, computedStyle);
    if (options.observe) {
      let observe = new observer.ComputedStyleObserver(element, options.pseudo, ["width", "height", "padding-left", "padding-right", "border-top-width", "border-bottom-width", "border-left-width", "border-right-width"]);
      observe.addListener((entry)=>{
        applyProperties(element, entry.computed);
      });
    }
  });
  
};

export default {updateProperties};
