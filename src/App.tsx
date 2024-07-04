import axios from "axios"
import { useEffect, useState } from "react"

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUsers(res.data))
  }, [])

  return (
    <div>
      <ul className="list-group">
        {users.map((user) => (
          <li className="list-group-item" key={user.id}>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
