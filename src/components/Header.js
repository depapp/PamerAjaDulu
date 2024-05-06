import { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import FirebaseContext from "../firebase/context";

import styled from "@emotion/styled";
import Search from "./Search";
import Button from "./Button";

const HeaderContainer = styled.header`
  border-bottom: 1px solid rgb(225, 225, 225);
  padding: 1.25rem 2rem;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  z-index: 999;

  @media (max-width: 760px) {
    padding: 1.25rem 1rem;
  }
`;

const NavContainer = styled.div`
  display: flex;
`;

const LogoAndSearch = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  flex: 1;

  @media (max-width: 480px) {
    align-items: flex-start;
    gap: 1rem;
  }
`;

const AUTH_PAGES = ["login", "register"];

const Header = () => {
  const { user, firebase } = useContext(FirebaseContext);

  const { pathname } = useRouter();
  const router = useRouter();
  const parsedPathname = pathname.slice(1);

  const handleLogout = () => {
    firebase.signout();
    router.replace("/");
  };

  return (
    <HeaderContainer>
      <NavContainer>
        <LogoAndSearch>
          <Link href="/" legacyBehavior>
            <img src="/favicon.ico" />
          </Link>
          <Search />
        </LogoAndSearch>
      </NavContainer>
      <NavContainer>
        {user && (
          <Link href="/" onClick={handleLogout}>
            <Button>Halo, {user.displayName}</Button>
          </Link>
        )}
        {!user && !AUTH_PAGES.includes(parsedPathname) && (
          <Link href="/login">
            <Button>Masuk</Button>
          </Link>
        )}
      </NavContainer>
    </HeaderContainer>
  );
};

export default Header;
