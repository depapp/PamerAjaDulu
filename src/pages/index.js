import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";

import useOrder from "../hooks/useOrder";

import Layout from "../components/Layout";
import Link from "next/link";
import ButtonCreate from "../components/ButtonCreate";
import HomeMessage from "../components/HomeMessage";
import { ProductListSkeleton } from "../components/ProductListSkeleton";
import ProductDetail from "../components/ProductDetail";

export default function Home() {
  const router = useRouter();

  const { popular } = router.query;

  const { products, loading, setOrder } = useOrder(
    typeof popular === "string" ? "votes" : "date"
  );

  const [selectedValue, setSelectedValue] = useState(
    typeof popular === "string" ? "popular" : "date"
  );

  useEffect(() => {
    if (typeof popular === "string") {
      setOrder("votes");
      setSelectedValue("popular");
    } else {
      setOrder("date");
      setSelectedValue("featured");
    }
  }, [popular]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    const value = event.target.value;

    const OPTIONS_MAPPING = {
      featured: "date",
      popular: "votes",
    };

    setOrder(OPTIONS_MAPPING[value]);

    const currentPath = window.location.pathname;
    const newPath = value === "popular" ? "/?popular" : currentPath;

    window.history.pushState({ path: newPath }, "", newPath);
  };

  return (
    <>
      <Layout>
        <div className="wrapper">
          <div className="container">
            <HomeMessage />
          </div>
          <div className="heading_container">
            <Link href="/post/create">
              <ButtonCreate>Kuy Pamerin</ButtonCreate>
            </Link>
            <select value={selectedValue} onChange={handleChange}>
              <option value="featured">Terbaru</option>
              <option value="popular">Terpopuler</option>
            </select>
          </div>
          <ul className="product_list">
            {!loading &&
              products.map((product) => (
                <ProductDetail key={product.id} product={product} />
              ))}
            <ProductListSkeleton loading={loading} hideVote={true} />
          </ul>
        </div>
      </Layout>
    </>
  );
}
