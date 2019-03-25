export function handleChange(event) {
  const { target: {name, value} } = event
  this.setState({ [name]: value })
}

export function saveToken(token) {
  localStorage.setItem('bikeshed-token', token)
}
