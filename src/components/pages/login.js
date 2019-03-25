import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { saveToken, handleChange } from '../../lib/common'

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
    }
    this.handleChange = handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = (event) => {
    event.preventDefault()
    if (document.getElementById('mechanic-checkbox').checked){
      axios.post('/api/mechanic/login', this.state)
        .then(res => {
          saveToken(res.data.token)
        })
        .then(() => this.props.history.push('/'))
        .catch(() => {
          this.props.history.replace('/login')
        })
    } else {
      axios.post('/api/user/login', this.state)
        .then(res => {
          saveToken(res.data.token)
        })
        .then(() => this.props.history.push('/'))
        .catch(() => {
          this.props.history.replace('/login')
        })
    }
  }

  render() {
    return (
      <div>
        <h1>Log In</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              name="email"
              placeholder="Email"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              id="mechanic-checkbox"
              type="checkbox"
              name="mechanic"
            />
            I am a mechanic
          </div>
          <button>Submit</button>
        </form>
        <hr/>
        <p>Not yet registered? Sign-up below</p>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
    )
  }
}

export default Login
