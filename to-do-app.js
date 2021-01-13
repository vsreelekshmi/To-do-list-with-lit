import { LitElement, html, css } from 'lit-element';
import './to-do-item.js';

class TodoApp extends LitElement {
  static get properties() {
    return {
      todos: { type: Array }
    }
  }

  constructor() {
    super();
    this.todos = [
      { text: 'Buy Groceries', checked: true },
      { text: 'Electricity Bill', checked: false },
      { text: 'Organise the Shelf', checked: false }
    ];
  }

  firstUpdated() {
    this.$input = this.shadowRoot.querySelector('input');
  }

  _removeTodo(e) {
    this.todos = this.todos.filter((todo,index) => {
        return index !== e.detail;
    });
  }

  _toggleTodo(e) {
    this.todos = this.todos.map((todo, index) => {
        return index === e.detail ? {...todo, checked: !todo.checked} : todo;
    });
  }

  _addTodo(e) {
    e.preventDefault();
    if(this.$input.value.length > 0) {
        this.todos = [...this.todos, { text: this.$input.value, checked: false }];
        this.$input.value = '';
    }
  }

  static get styles() {
    return css`
      :host {
        display: block;
        font-family: sans-serif;
        text-align: center;
      }
      button {
        background-color: white; 
        color: black; 
        border: 1px solid #4CAF50;
      }
      ul {
        list-style: none;
        padding: 0;
        text-align: left;
      }
      .container {
          display: flex;
          justify-content: center;
        }
    `;
  }

  render() {
    return html`
      <h3>Jan 2021</h3>
      <br>
      <h1>To do</h1>
      <form id="todo-input">
          <input type="text" placeholder="Add a new item"></input>
          <button @click=${this._addTodo}>Add ✔️</button>
      </form>
      <div class="container">
        <ul id="todos">
            ${this.todos.map((todo, index) => html`
                  <to-do-item 
                      ?checked=${todo.checked}
                      .index=${index}
                      text=${todo.text}
                      @onRemove=${this._removeTodo}
                      @onToggle=${this._toggleTodo}>    
                  </to-do-item>`
              )}
        </ul>
      </div>
    `;
  }
}

window.customElements.define('to-do-app', TodoApp);