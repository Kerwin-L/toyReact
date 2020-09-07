
class ElementWrapper  {
  constructor(type) {
    this.root = document.createElement(type);
  }

  setAttribute(name, value) {
    this.root.setAttribute(name, value);
  }

  appendChild(component) {
    this.root.appendChild(component.root);
  }
}

class TextWrapper {
  constructor(content) {
    this.root = document.createTextNode(content);
  }
}

export class Component { 
  constructor() {
    this.props =  Object.create(null);
    this._root = null;
    this.children = [];
  }

  setAttribute(name, value) {
    this.props[name] = value;
  }

  appendChild(component) {
    this.children.push(component);
  }


  get root() {
    if(!this._root) {
      this._root = this.render().root
    }
    return this._root;
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
  
  console.log(children);

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
  parentElement.appendChild(component.root);
}