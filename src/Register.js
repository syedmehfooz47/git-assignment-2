import { useState } from "react";

const Register = (props) => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [status, setStatus] = useState({ type: "", message: "" });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: "", message: "" });

        try {
            const checkResponse = await fetch(`http://localhost:3001/users?email=${form.email}`);
            const existingUsers = await checkResponse.json();

            if (existingUsers.length > 0) {
                setStatus({ type: "error", message: "Email already registered." });
                return;
            }

            const response = await fetch("http://localhost:3001/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            if (response.ok) {
                setStatus({ type: "success", message: "Registration successful!" });
                setForm({ name: "", email: "", password: "" });
            } else {
                setStatus({ type: "error", message: "Registration failed. Please try again." });
            }
        } catch (error) {
            setStatus({ type: "error", message: "Registration failed. Please try again." });
        }
    };

    return (
        <div className="auth-form-container">
            <form method="POST" onSubmit={handleSubmit}>
                <h2>Registration Form</h2>
                {status.message && (
                    <div className={status.type === "error" ? "error" : "success"}>
                        {status.message}
                    </div>
                )}
                <div>
                    <label>Name</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={form.password} onChange={handleChange} />
                </div>
                <button type="submit">Register</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
        </div>
    );
}

export default Register;
