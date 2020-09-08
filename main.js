import { createElement, render, Component } from './toyReact.js';

class MyComponent extends Component {
  constructor (props) {
    super(props);
    this.state = {
      a: 1,
      b: 2
    }
  }
  
  render() {
    return (
      <div id="laoluo">
        <h1>哈喽，我是老罗</h1>
        <span>
          {
            this.state.a.toString()
          }
        </span>
        <button onClick={ () => { this.setState({ a: this.state.a + 1 })}}>add a </button>
        <span>{this.state.b.toString()}</span>
      </div>
    )
  }
}


render(<MyComponent id='12'>
  <div>123dd</div>
  <div></div>
  <div></div>
</MyComponent>, window.document.body);