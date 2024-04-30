import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";

import styled from "@emotion/styled";
import SearchIcon from "./SearchIcon";

const Form = styled.form`
  position: relative;

  @media (max-width: 480px) {
    display: none;
  }
`;

const InputText = styled.input`
  border: 1px solid #ccc;
  padding: 0.6rem;
  border-radius: 4px;
  max-width: 220px;
  position: relative;
  padding-left: 2.5rem;
  font-size: 15px;
`;

const InputSubmit = styled.button`
  height: 3rem;
  width: 3rem;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

const Search = () => {
  const [search, setSearch] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (router.query?.q) {
      setSearch(router.query.q);
    }
  }, [router.query]);

  const searchProduct = (e) => {
    e.preventDefault();
    if (search.trim() === "") return;

    Router.push({
      pathname: "/search",
      query: { q: search },
    });
  };

  return (
    <Form onSubmit={searchProduct}>
      <InputText
        type="text"
        placeholder="Pencarian"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <InputSubmit type="submit">
        <SearchIcon />
      </InputSubmit>
    </Form>
  );
};

export default Search;
