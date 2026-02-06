import { useState } from "react";

const Login = (props) => {

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [status, setStatus] = useState({ type: "", message: "" });

    const handleChnage = (e) => {
        console.log("Changed=" + e.target.name);
        console.log("Changed=" + e.target.value);
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })


    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: "", message: "" });

        try {
            const response = await fetch(`http://localhost:3001/users?email=${form.email}&password=${form.password}`);
            const users = await response.json();

            if (users.length > 0) {
                setStatus({ type: "success", message: "Login successful!" });
            } else {
                setStatus({ type: "error", message: "Invalid email or password." });
            }
        } catch (error) {
            setStatus({ type: "error", message: "Login failed. Please try again." });
        }
    };

    return (
        <div className="auth-form-container">
            <form method="POST" onSubmit={handleSubmit}>
                <h2>Login Form</h2>
                {status.message && (
                    <div className={status.type === "error" ? "error" : "success"}>
                        {status.message}
                    </div>
                )}
                <div>
                    <label>Emailid</label>
                    <input type="text" name="email" value={form.email} onChange={handleChnage} />

                </div>

                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={form.password} onChange={handleChnage} />

                </div>
                <button type="submit">Login</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
        </div>
    );
}


export default Login;