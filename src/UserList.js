import { useEffect, useState } from "react";
  
 const UserList = () => {
     const [users, setUsers] = useState([]);
     const [status, setStatus] = useState({ type: "", message: "" });
     const [isLoading, setIsLoading] = useState(true);
  
     useEffect(() => {
         let isMounted = true;
  
         const loadUsers = async () => {
             setIsLoading(true);
             setStatus({ type: "", message: "" });
             try {
                 const response = await fetch("http://localhost:3001/users");
                 if (!response.ok) {
                     throw new Error("Failed to load users.");
                 }
                 const data = await response.json();
                 if (isMounted) {
                     setUsers(data);
                 }
             } catch (error) {
                 if (isMounted) {
                     setStatus({ type: "error", message: error.message || "Failed to load users." });
                 }
             } finally {
                 if (isMounted) {
                     setIsLoading(false);
                 }
             }
         };
  
         loadUsers();
  
         return () => {
             isMounted = false;
         };
     }, []);
  
     return (
         <div>
             <h2>User List</h2>
             {isLoading ? <div>Loading users...</div> : null}
             {!isLoading && status.message ? (
                 <div className={status.type === "error" ? "error" : "success"}>{status.message}</div>
             ) : null}
             {!isLoading && !status.message && users.length === 0 ? <div>No users found.</div> : null}
             {!isLoading && users.length > 0 ? (
                 <table>
                     <thead>
                         <tr>
                             <th>ID</th>
                             <th>First Name</th>
                             <th>Last Name</th>
                             <th>Email</th>
                             <th>Gender</th>
                             <th>Hobbies</th>
                         </tr>
                     </thead>
                     <tbody>
                         {users.map((user) => (
                             <tr key={user.id ?? user.email}>
                                 <td>{user.id}</td>
                                 <td>{user.firstName}</td>
                                 <td>{user.lastName}</td>
                                 <td>{user.email}</td>
                                 <td>{user.gender}</td>
                                 <td>{user.hobbies}</td>
                             </tr>
                         ))}
                     </tbody>
                 </table>
             ) : null}
         </div>
     );
 };
  
 export default UserList;
