import axios from "axios"
import { useEffect, useState } from "react"

interface User {
  id: number
  name: string
}

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    setLoading(true)
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      setLoading(false)
      setUsers(res.data)
    })
  }, [])

  const deleteUser = (id: number) => {
    const originalUsers = [...users]
    setUsers(users.filter((user) => user.id !== id))

    axios
      .delete("https://jsonplaceholder.typicode.com/xusers/" + id)
      .catch((err) => {
        setError(err.message)
        setUsers(originalUsers)
      })
  }

  const addUser = () => {
    const originalUsers = [...users]
    const newUser = { id: 0, name: "Shanmukh" }
    setUsers([newUser, ...users])

    axios
      .post("https://jsonplaceholder.typicode.com/users/", newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((err) => {
        setError(err.message)
        setUsers(originalUsers)
      })
  }

  const updateUser = (id) => {
    const originalUsers = [...users]
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, name: user.name + "!" } : user
      )
    )

    axios
      .patch("https://jsonplaceholder.typicode.com/users/" + id)
      .catch((err) => {
        setError(err.message)
        setUsers(originalUsers)
      })
  }

  return (
    <div>
      {error && <div className="text-danger">{error}</div>}
      {loading && <div className="spinner-border"></div>}
      <button className="btn btn-primary mb-3" onClick={addUser}>
        Add
      </button>
      <ul className="list-group">
        {users.map((user) => (
          <li
            className="list-group-item d-flex justify-content-between"
            key={user.id}
          >
            {user.name}
            <div>
              <button
                className="btn btn-outline-secondary mx-3"
                onClick={() => updateUser(user.id)}
              >
                Update
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => deleteUser(user.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
