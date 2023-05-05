import PropTypes from 'prop-types';
const Login = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <div>
      <h2>login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          username
          <input value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type='submit'>ligins</button>
      </form>
    </div>
  );
};

Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};
export default Login;
