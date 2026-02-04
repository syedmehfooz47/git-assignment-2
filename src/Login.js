import { useState } from "react";

const Login = (props) => {

    const [form, setForm] = useState({
        email: "",
        password: ""
    });


    const handleChnage = (e) => {
        console.log("Changed=" + e.target.name);
        console.log("Changed=" + e.target.value);
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })


    };

    return (
        <div className="auth-form-container">
            <form method="POST">
                <h2>Login Form</h2>
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