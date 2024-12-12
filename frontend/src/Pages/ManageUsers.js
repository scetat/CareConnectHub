import React, { useState, useEffect } from "react";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://careconnecthub-backend.onrender.com/api/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Manage Users</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                {user.FirstName} {user.LastName}
              </td>{" "}
              {/* Corrected */}
              <td>{user.Email}</td>
              <td>{user.Role ? user.Role.RoleName : "No Role"}</td> {/* Handle Role correctly */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
