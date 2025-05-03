const Login = () => {
  return (
    <div className="login">
      <div className="login_container">
        <h1>Instagram</h1>
        <form>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>
        <p>Don't have an account? Sign up</p>
      </div>
    </div>
  );
};

export default Login;
