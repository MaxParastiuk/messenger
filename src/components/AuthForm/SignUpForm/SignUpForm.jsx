const SignUpForm = ({ register, watch, errors, touchedFields }) => {
  return (
    <>
      <label className="input">
        <input
          id="email"
          name="email"
          type="email"
          className="input__field"
          placeholder=" "
          {...register('email', {
            required: 'Email is required',
            minLength: {
              value: 3,
              message: 'Must be at least 3 characters',
            },
          })}
        />
        <span className="input__label">Email</span>
        {touchedFields.email && errors.email && (
          <span className="error">{errors.email.message}</span>
        )}
      </label>
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
            maxLength: {
              value: 14,
              message: 'Password must not exceed 14 characters',
            },
          })}
        />
        <span className="input__label">Password</span>
        {touchedFields.password && errors.password && (
          <span className="error">{errors.password.message}</span>
        )}
      </label>
      <label className="input">
        <input
          id="passwordConfirm"
          name="passwordConfirm"
          type="password"
          className="input__field"
          placeholder=" "
          {...register('passwordConfirm', {
            required: 'Please confirm your password',
            validate: (value) =>
              value === watch('password') || 'Passwords do not match',
          })}
        />
        <span className="input__label">Confirm Password</span>
        {touchedFields.passwordConfirm && errors.passwordConfirm && (
          <span className="error">{errors.passwordConfirm.message}</span>
        )}
      </label>
    </>
  );
};

export default SignUpForm;
