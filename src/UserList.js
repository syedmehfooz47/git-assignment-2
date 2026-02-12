import { useEffect, useReducer, useRef } from "react";

const initialState = {
    users: [],
    filteredUsers: [],
    status: { type: "", message: "" },
    isLoading: true
};

const reducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return { ...state, isLoading: true, status: { type: "", message: "" } };
        case "LOAD_SUCCESS":
            return {
                ...state,
                users: action.payload,
                filteredUsers: action.payload,
                isLoading: false,
                status: { type: "", message: "" }
            };
        case "LOAD_ERROR":
            return {
                ...state,
                isLoading: false,
                status: { type: "error", message: action.payload }
            };
        case "FILTER_USERS":
            const searchTerm = action.payload.toLowerCase();
            const filtered = state.users.filter(user =>
                user.name?.toLowerCase().includes(searchTerm) ||
                user.email?.toLowerCase().includes(searchTerm) ||
                user.username?.toLowerCase().includes(searchTerm) ||
                user.company?.name?.toLowerCase().includes(searchTerm)
            );
            return { ...state, filteredUsers: filtered };
        default:
            return state;
    }
};

const UserList = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const searchInputRef = useRef(null);
    const previousSearchRef = useRef("");

    useEffect(() => {
        let isMounted = true;

        const loadUsers = async () => {
            dispatch({ type: "LOADING" });
            try {
                const response = await fetch("http://localhost:3001/users");
                if (!response.ok) {
                    throw new Error("Failed to load users.");
                }
                const data = await response.json();
                if (isMounted) {
                    dispatch({ type: "LOAD_SUCCESS", payload: data });
                }
            } catch (error) {
                if (isMounted) {
                    dispatch({ type: "LOAD_ERROR", payload: error.message || "Failed to load users." });
                }
            }
        };

        loadUsers();

        return () => {
            isMounted = false;
        };
    }, []);

    const handleSearch = (e) => {
        const searchValue = e.target.value;
        previousSearchRef.current = searchValue;
        dispatch({ type: "FILTER_USERS", payload: searchValue });
    };

    const focusSearchInput = () => {
        searchInputRef.current?.focus();
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>User List</h2>

            <div style={{ marginBottom: "20px" }}>
                <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search by name, email, username, or company..."
                    onChange={handleSearch}
                    style={{
                        padding: "8px",
                        width: "300px",
                        marginRight: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "4px"
                    }}
                />
                <button 
                    type="button" 
                    onClick={focusSearchInput}
                    style={{
                        padding: "8px 16px",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer"
                    }}
                >
                    Focus Search
                </button>
            </div>

            {state.isLoading ? <div>Loading users...</div> : null}
            {!state.isLoading && state.status.message ? (
                <div style={{ color: state.status.type === "error" ? "red" : "green", marginBottom: "10px" }}>
                    {state.status.message}
                </div>
            ) : null}
            {!state.isLoading && !state.status.message && state.filteredUsers.length === 0 ? (
                <div>No users found.</div>
            ) : null}
            {!state.isLoading && state.filteredUsers.length > 0 ? (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ backgroundColor: "#f2f2f2" }}>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>ID</th>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Username</th>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Email</th>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Phone</th>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Company</th>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Website</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.filteredUsers.map((user) => (
                            <tr key={user.id}>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{user.id}</td>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{user.name}</td>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{user.username}</td>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{user.email}</td>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{user.phone}</td>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{user.company?.name}</td>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{user.website}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : null}
        </div>
    );
};

export default UserList;
