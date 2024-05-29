import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import style from './admin.module.css';
import { UserContext } from '../context/User';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const { userToken } = useContext(UserContext);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://estatetest.onrender.com/api/users', {
                    headers: { token: userToken }
                });
                console.log("this",response.data);
                setUsers(response.data || []);
                console.log("this",users);
            } catch (error) {
                console.error("Error fetching users:", error);
                setError("Failed to fetch users");
            }
        };

        if (userToken) {
            fetchUsers();
        }
    }, [userToken]);

    if (error) {
        return <div className={style.error}>Error: {error}</div>;
    }

    return (
        <div className={style.container}>
            <h1 className={style.title}>All Users</h1>
            <table className={style.table}>
                <thead>
                    <tr>
                        {/* <th>ID</th> */}
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map(user => (
                            <tr key={user._id}>
                                {/* <td>{user._id}</td> */}
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No users found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
