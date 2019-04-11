import React from 'react'
import ReactDOM from 'react-dom'
import { render } from "react-dom"
import { Provider } from "react-redux"
import store from "./js/store/index"
import { BrowserRouter, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div>
        <p>Hello World</p>
      </div>
    </BrowserRouter>
  )
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
