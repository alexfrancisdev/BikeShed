import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { handleChange, saveToken } from '../../lib/common'

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleChange = handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    if (document.getElementById('mechanic-checkbox').checked) {
      axios.post('/api/mechanic/register', this.state)
        .then(res => {
          saveToken(res.data.token)
        })
        .then(() => this.props.history.push('/'))
        .catch(() => {
          this.props.history.replace('/login')
        })
    } else {
      axios.post('/api/user/register', this.state)
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
      <div className="">
        <h1 className="">Register</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              name="username"
              placeholder="Username"
              onChange={this.handleChange}
            />
          </div>
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
          <hr/>
          <p>Already registered? Login below</p>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </form>
      </div>
    )
  }
}

export default Register
