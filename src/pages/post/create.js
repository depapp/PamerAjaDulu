import { useState, useContext } from "react";
import Layout from "../../components/Layout";
import useValidation from "../../hooks/useValidation";
import productValidation from "../../validation/productValidation";
import { useRouter } from "next/router";
import { Form, Field, InputSubmit, Error } from "../../components/Form";
import { FirebaseContext } from "../../firebase/index";

const initialState = {
  name: "",
  subtitle: "",
  company: "",
  image: "",
  url: "",
  description: "",
  tags: [],
};

const NewPost = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageurl, setImageUrl] = useState("");

  const { user, firebase } = useContext(FirebaseContext);

  const router = useRouter();

  const [error, setError] = useState("");

  const { values, errors, handleSubmit, handleChange, handleBlur } =
    useValidation(initialState, productValidation, NewPost);

  const { name, url, description, tags, subtitle, company } = values;

  const [uploadTask, setUploadTask] = useState(null);

  async function NewPost() {
    if (!user) {
      router.push("/login");
    }

    const tagsString = typeof tags === "string" ? tags : "";

    const tagsArray = tagsString
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    const slug = name.trim().toLowerCase().replace(/ /g, "-");

    const product = {
      name,
      subtitle,
      tags: tagsArray,
      company,
      url,
      imageurl,
      description,
      votes: 0,
      comments: [],
      date: Date.now(),
      creator: {
        id: user.uid,
        name: user.displayName,
      },
      hasVoted: [],
      slug,
    };

    firebase.db.collection("products").add(product);
    return router.push("/");
  }

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    const storageRef = firebase.storage.ref("products");

    const uploadTask = storageRef.child(file.name).put(file);

    setUploadTask(uploadTask);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.error(error);
        setUploading(false);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          setImageUrl(downloadURL);
          setUploading(false);
        });
      }
    );
  };

  return (
    <div>
      <Layout>
        {!user && (
          <div className="containerHomeMessage">
            <h4 className="title">Anda belum masuk</h4>
            <p className="subtitle">Silahkan masuk terlebih dahulu</p>
          </div>
        )}
        {user && (
          <>
            <div style={{ textAlign: "center" }}>
              <h1 className="formTitle">Kuy Pamerin</h1>
            </div>
            <Form onSubmit={handleSubmit} noValidate>
              <div>
                <Field>
                  <label htmlFor="name"></label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Nama Karya"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>

                {errors.name && <Error>{errors.name}</Error>}

                <Field>
                  <label htmlFor="subtitle"></label>
                  <input
                    id="subtitle"
                    type="text"
                    placeholder="Deskripsi Pendek"
                    name="subtitle"
                    value={subtitle}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>

                {errors.subtitle && <Error>{errors.subtitle}</Error>}

                <Field>
                  <label htmlFor="company"></label>
                  <input
                    type="text"
                    id="company"
                    placeholder="Username Twitter Pembuat Karya (Tanpa @)"
                    name="company"
                    value={company}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>

                <Field>
                  <label htmlFor="url"></label>
                  <input
                    type="url"
                    id="url"
                    name="url"
                    placeholder="https://example.com"
                    value={url}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>

                {errors.url && <Error>{errors.url}</Error>}
              </div>

              <div>
                <Field>
                  <label htmlFor="description"></label>
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Deskripsi Panjang"
                    value={description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>

                {errors.description && <Error>{errors.description}</Error>}

                <Field>
                  <label htmlFor="image"></label>
                  <input
                    type="file"
                    accept="image/*"
                    id="image"
                    name="image"
                    onChange={handleUpload}
                  />
                </Field>
              </div>
              {error && <Error>{error}</Error>}

              <InputSubmit type="submit" value="Kirim" />
            </Form>
          </>
        )}
      </Layout>
    </div>
  );
};

export default NewPost;
