import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import Bookmarks from '@material-ui/icons/Bookmarks'
import TextField from '@material-ui/core/TextField'
import MediaCard from './components/common/card'

import Navbar from './components/common/navbar'
import Landing from './components/pages/landing'
import Register from './components/pages/register'

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <main>
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route path="/" component={Landing} />
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
