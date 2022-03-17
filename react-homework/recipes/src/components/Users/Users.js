import React, { useEffect, useState } from "react";
import UserItem from "./ListItem/UserList";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/users")
      .then((res) => res.json())
      .then((arr) => setUsers(arr))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>List of all users</h1>
      <div>
        {users.map((x) => (
          <UserItem key={x.id} id={x.id} email={x.email} image={x.picture} />
        ))}
      </div>
    </div>
  );
}

export default Users;
