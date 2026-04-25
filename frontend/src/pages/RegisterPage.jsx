import React from 'react';

function Register() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Register Page</h2>
      <input placeholder="Email" /><br /><br />
      <input placeholder="Password" type="password" /><br /><br />
      <button>Register</button>
    </div>
  );
}

export default Register;