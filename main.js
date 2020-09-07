import { createElement, render, Component } from './toyReact.js';

class MyComponent extends Component {
  render() {
    return (
      <div id="laoluo">
        <h1>哈喽，我是老罗</h1>
        {this.children}
      </div>
    )
  }
}


render(<MyComponent id='12'>
  <div>123dd</div>
  <div></div>
  <div></div>
</MyComponent>, window.document.body);