export default function index () {
  // handler
  const create = () => {
    const data = { username: 'example' }
    fetch('/create', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  return <h1>Dashboard</h1>
}
