import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import Layout from "../components/Layout";
import useValidation from "../hooks/useValidation";
import registerValidation from "../validation/registerValidation";
import { Form, Field, InputSubmit, Error } from "../components/Form";
import firebase from "../firebase/index";
import ButtonLoginWith from "../components/ButtonLoginWith";

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
        "Oops! Ada yang error."
      );
    }
  }

  return (
    <div>
      <Layout title="Daftar | #PamerAjaDulu">
        <center>
          <h1 className="formTitle">Daftar</h1>
          <br />
          <br />
          <ButtonLoginWith
            onClick={() =>
              firebase
                .googleSignIn()
                .then((user) => {
                  router.push("/");
                })
                .catch((error) => {
                  console.error(error.message);
                  setError("Gagal daftar menggunakan akun Google");
                })
            }
            data-umami-event="klik-daftar-dengan-akun-google"
          >
            Daftar menggunakan akun Google
          </ButtonLoginWith>
        </center>
        <br />
        <br />
        <div style={{ textAlign: "center", color: "#67ba24" }}>atau</div>
        <Form onSubmit={handleSubmit} noValidate>
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
