import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children, title = "#PamerAjaDulu" }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
        <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
