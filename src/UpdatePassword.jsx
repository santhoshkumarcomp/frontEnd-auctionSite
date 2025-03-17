import { useState } from "react";

const UpdatePassword = () => {
   const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const[str, setStr] = useState("");
    const [error, setError] = useState("");
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
   const handleStrChange = (e) =>{
    setStr(e.target.value);
   };
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    }
    const handleSubmit = (e) =>{
      e.preventDefault();
      if (email === "" || password === "") {
        setError("Both fields are required!");
      } else {
        setError("");
      }
    }
  return <>
  <div className="login-container">
      <h2>Login password change form</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="input-group">
        <label htmlFor="str">emailed String</label>
          <input
            type="text"
            id="str"
            value={str}
            onChange={handleStrChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit">Login</button>
      </form>
      </div></>;
};
export default UpdatePassword;