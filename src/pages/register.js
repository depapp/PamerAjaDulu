import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import Layout from "../components/Layout";
import useValidation from "../hooks/useValidation";
import registerValidation from "../validation/registerValidation";
import { Form, Field, InputSubmit, Error } from "../components/Form";
import firebase from "../firebase/index";

const initialState = {
  name: "",
  password: "",
  email: "",
};

const Register = () => {
  const [error, setError] = useState("");

  const { values, errors, handleSubmit, handleChange, handleBlur } =
    useValidation(initialState, registerValidation, register);

  const { name, password, email } = values;
  const router = useRouter();

  async function register() {
    try {
      await firebase.register(name, email, password);
      router.push("/");
    } catch (error) {
      console.error(error.message);
      setError(
        "Oops! This one is on us. There was an error when creating your account."
      );
    }
  }

  return (
    <div>
      <Layout>
        <Form onSubmit={handleSubmit} noValidate>
          <h1 className="formTitle">Daftar</h1>
          <Error>{error}</Error>
          <Field>
            <label htmlFor="name"></label>
            <input
              data-error={errors.name !== undefined}
              type="text"
              id="name"
              placeholder="John Doe"
              name="name"
              value={name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Error>{errors.name}</Error>
          </Field>
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
          <InputSubmit type="submit" value="Daftar" />
          <br />
          <div style={{ textAlign: "center" }}>
            <Link href="/login">Sudah punya akun? Masuk disini</Link>
          </div>
        </Form>
      </Layout>
    </div>
  );
};

export default Register;
