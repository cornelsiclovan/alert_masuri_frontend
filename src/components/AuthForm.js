import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const data = useActionData();
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();

  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? "Log In" : "Creaza un utilizator"}</h1>
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((err) => {
              <li key={err}>{err}</li>;
            })}
          </ul>
        )}
        {data && data.data && data.data[0].msg && <p>{data.data[0].msg}</p>}
        {data && data.message && <p>{data.message}</p>}
        {!isLogin && (
          <p>
            <label htmlFor="name">Name</label>
            <input id="name" type="text" name="name" required></input>
          </p>
        )}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        {!isLogin && (
          <p>
            <label htmlFor="repeatPassword">Repeat Password</label>
            <input
              id="repeatPassword"
              type="password"
              name="repeatPassword"
              required
            />
          </p>
        )}
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
            {isLogin ? "Creaza utilizator nou" : "Login"}
          </Link>
          <button disabled={isSubmitting}>
            {isSubmitting ? "Submitting" : "Salveaza"}
          </button>
        </div>
      </Form>
    </>
  );
};

export default AuthForm;
