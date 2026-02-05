import { useState } from "react";

const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    return (
        <form method="POST">
            <h2>Registration Form</h2>
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
    );
}

export default Register;
