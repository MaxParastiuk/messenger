const LoginForm = ({ register, errors, touchedFields }) => {
  return (
    <>
      <label className="input">
        <input
          id="username"
          name="username"
          type="text"
          className="input__field"
          placeholder=" "
          {...register('username', {
            required: 'Username is required',
            minLength: {
              value: 3,
              message: 'Must be at least 3 characters',
            },
          })}
        />
        <span className="input__label">Username</span>
        {touchedFields.username && errors.username && (
          <span className="error">{errors.username.message}</span>
        )}
      </label>
      <label className="input">
        <input
          id="password"
          name="password"
          type="password"
          className="input__field"
          placeholder=" "
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters long',
            },
          })}
        />
        <span className="input__label">Password</span>
        {touchedFields.password && errors.password && (
          <span className="error">{errors.password.message}</span>
        )}
      </label>
    </>
  );
};

export default LoginForm;
