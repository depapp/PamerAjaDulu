import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import firebase from "../firebase/index";
import useValidation from "../hooks/useValidation";
import loginValidation from "../validation/loginValidation";

import Layout from "../components/Layout";
import { Form, Field, InputSubmit, Error } from "../components/Form";

const initialState = {
  password: "",
  email: "",
};

const Login = () => {
  const [error, setError] = useState("");

  const { values, errors, handleSubmit, handleChange, handleBlur } =
    useValidation(initialState, loginValidation, logIn);

  const { password, email } = values;

  const router = useRouter();

  async function logIn() {
    try {
      await firebase.login(email, password);
      router.push("/");
    } catch (error) {
      console.error(error.message);
      setError("Email atau/dan Kata Sandi salah");
    }
  }

  return (
    <div>
      <Layout>
        <Form onSubmit={handleSubmit} noValidate>
          <h1 className="formTitle">Masuk</h1>
          <Error>{error}</Error>
          <Field>
            <label htmlFor="name"></label>
            <input
              data-error={errors.email !== undefined}
              type="email"
              id="email"
              name="email"
              placeholder="johndoe@example.com"
              value={email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Error>{errors.email}</Error>
          </Field>
          <Field>
            <label htmlFor="name"></label>
            <input
              data-error={errors.password !== undefined}
              type="password"
              id="password"
              placeholder="Kata Sandi"
              name="password"
              value={password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Error>{errors.password}</Error>
          </Field>
          <InputSubmit type="submit" value="Masuk" />
          <br />
          <div style={{ textAlign: "center" }}>
            <Link href="/register">Belum punya akun? Daftar disini</Link>
          </div>
        </Form>
      </Layout>
    </div>
  );
};

export default Login;
