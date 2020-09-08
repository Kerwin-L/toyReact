
const RENDER_TO_DOM = Symbol('render to dom');

class ElementWrapper  {
  constructor(type) {
    this.root = document.createElement(type);
  }

  setAttribute(name, value) {
    if (name.match(/^on([\s\S]+)$/)) {
      this.root.addEventListener(RegExp.$1.replace(/^[\s\S]/, c => c.toLowerCase()), value);
    } else {
      this.root.setAttribute(name, value);
    }

  }

  appendChild(component) {
    let range = document.createRange();
    range.setStart(this.root, this.root.childNodes.length);
    range.setEnd(this.root, this.root.childNodes.length);
    component[RENDER_TO_DOM](range);  
  }

  [RENDER_TO_DOM](range) {
    range.deleteContents(range);
    range.insertNode(this.root);
  }
}

class TextWrapper {
  constructor(content) {
    this.root = document.createTextNode(content);
  }
  [RENDER_TO_DOM](range) {
    range.deleteContents(range);
    range.insertNode(this.root);
  }
}

export class Component { 
  constructor() {
    this.props =  Object.create(null);
    this._root = null;
    this.children = [];
    this._range = null;
    
  }

  setAttribute(name, value) {
    this.props[name] = value;
  }

  appendChild(component) {
    this.children.push(component);
  }

  rerender() {
    // let oldRange = this._range;
    this._range.deleteContents();
    this[RENDER_TO_DOM](this._range);
  }

  setState(newState) {
    if (this.state === null || typeof this.state !== 'object') {
      this.state = newState;
      this.rerender();
      return;
    }
    
    const merge = (oldState, newState) => {
      for (let p in newState) {
        if (oldState[p] === null || typeof oldState[p] !== 'object') {
          oldState[p] = newState[p];
        } else {
          merge(oldState[p], newState[p]);
        }
      }
    }

    merge(this.state, newState);
    this.rerender();
  }

  [RENDER_TO_DOM](range) {
    this._range = range;
    this.render()[RENDER_TO_DOM](range);
  }
}


export function createElement(type, attributes, ...children) {
  
  let e;
  if (typeof type === 'string') {
    e = new ElementWrapper(type);
  } else {
    e = new type;
  }
  
  for (let p in attributes) {
    e.setAttribute(p, attributes[p]);
  }
  
  let insertChild = (children) => {
    for (let child of children) {
      if (typeof child === 'string') {
        child = new TextWrapper(child);
      }
  
      if (typeof child === 'object' && child instanceof Array) {
        insertChild(child);
      } else {
        e.appendChild(child);
      }
    }
  } 

  insertChild(children);

  return e;
}

export function render(component, parentElement) {
  let range = document.createRange();
  range.setStart(parentElement, 0);
  range.setEnd(parentElement, parentElement.childNodes.length);
  range.deleteContents();
  
  component[RENDER_TO_DOM](range);
}