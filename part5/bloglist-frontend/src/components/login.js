import PropTypes from 'prop-types';

//generating login form
const Login = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => (
  <form onSubmit={handleSubmit}>
    <div>
      username
      <input
        type='text'
        id='username'
        value={username}
        name='Username'
        onChange={handleUsernameChange}
      />
    </div>
    <div>
      password
      <input
        type='password'
        value={password}
        id='password'
        name='Password'
        onChange={handlePasswordChange}
      />
    </div>
    <button id='login-button' type='submit'>
      login
    </button>
  </form>
);

Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default Login;
