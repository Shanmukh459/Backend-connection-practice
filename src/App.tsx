import userService from "./services/user-service"
import useUsers from "./hooks/useUsers"

function App() {
  const { users, error, loading, setError, setUsers } = useUsers()

  const deleteUser = (id: number) => {
    const originalUsers = [...users]
    setUsers(users.filter((user) => user.id !== id))

    userService.delete(id).catch((err) => {
      setError(err.message)
      setUsers(originalUsers)
    })
  }

  const addUser = () => {
    const originalUsers = [...users]
    const newUser = { id: 0, name: "Shanmukh" }
    setUsers([newUser, ...users])

    userService
      .create(newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((err) => {
        setError(err.message)
        setUsers(originalUsers)
      })
  }

  const updateUser = (id: number) => {
    const originalUsers = [...users]
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, name: user.name + "!" } : user
      )
    )

    userService.update(id).catch((err) => {
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
