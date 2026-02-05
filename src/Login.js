import { useState } from "react";

const Login = () => {

    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({});


    const handleChnage = (e) => {
        console.log("Changed=" + e.target.name);
        console.log("Changed=" + e.target.value);
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        setErrors((prev) => ({ ...prev, [e.target.name]: "" }));


    };

    const validate = () => {
        const nextErrors = {};
        const email = form.email.trim();
        const password = form.password.trim();

        if (!email) {
            nextErrors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            nextErrors.email = "Enter a valid email address.";
        }

        if (!password) {
            nextErrors.password = "Password is required.";
        } else if (password.length < 6) {
            nextErrors.password = "Password must be at least 6 characters.";
        }

        return nextErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const nextErrors = validate();
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0) {
            return;
        }
        console.log("Submitting login:", { ...form });
    };

    return (
        <form method="POST" onSubmit={handleSubmit} noValidate>
            <h2>Login Form</h2>
            <div>
                <label>Emailid</label>
                <input type="text" name="email" value={form.email} onChange={handleChnage} />
                {errors.email ? <div className="error">{errors.email}</div> : null}

            </div>

            <div>
                <label>Password</label>
                <input type="password" name="password" value={form.password} onChange={handleChnage} />
                {errors.password ? <div className="error">{errors.password}</div> : null}

            </div>
            <button type="submit">Login</button>
        </form>
    );
}


export default Login;