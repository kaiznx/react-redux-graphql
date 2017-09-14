import React from 'react';
// import PropTypes from 'prop-types';

const Login = ({onSubmit, onChange, email, password}) => {
  return (
    <div>
      <h1>Login</h1>
      <input type="email" className="form-control" placeholder="Email" name='email' value={email} onChange={onChange} />
      <input type="password" className="form-control" placeholder="Contraseña" name='password' value={password} onChange={onChange} />
      <input type="submit" className="btn qw-buttonred" onClick={onSubmit} value='Login' />      
    </div>
  );
};

export default Login;