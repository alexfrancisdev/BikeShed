import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import Bookmarks from '@material-ui/icons/Bookmarks'
import TextField from '@material-ui/core/TextField'
import MediaCard from './components/common/card'

import Navbar from './components/common/navbar'

function App() {
  return (
    <div>
      <Navbar />
      <Button variant="outlined" color="primary">
        <Bookmarks></Bookmarks>
      </Button> <br />
      <TextField
        placeholder="Placeholder here"
        label="Basic TextField" />
      <MediaCard />
      <MediaCard />
      <MediaCard />
      <MediaCard />
      <MediaCard />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
