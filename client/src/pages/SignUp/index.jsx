const SignUp = () => {
  return (
    <div className="signup">
      <div className="signup_container">
        <h1>Instagram</h1>
        <form>
          <input type="text" placeholder="Username" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="submit">Sign Up</button>
        </form>
        <p>Already have an account? Log in</p>
      </div>
    </div>
  );
};

export default SignUp;
