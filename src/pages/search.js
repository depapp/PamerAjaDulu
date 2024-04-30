import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useOrder from "../hooks/useOrder";

import Layout from "../components/Layout";
import ProductDetail from "../components/ProductDetail";

const SearchPage = () => {
  const router = useRouter();
  const [searchProducts, setSearchProducts] = useState([]);

  const {
    query: { q },
  } = router;

  const { products } = useOrder("date");

  useEffect(() => {
    if (q) {
      const query = q.toLowerCase();
      const filteredProducts = products.filter(
        ({ name, description, company }) => {
          const fields = [name, description, company];

          for (const field of fields) {
            return field.toLowerCase().includes(query);
          }
        }
      );

      setSearchProducts(filteredProducts);
    }
  }, [q, products]);

  return (
    <Layout>
      <div className="wrapper">
        <div className="container">
          <ul className="product_list">
            {searchProducts.length > 0 &&
              searchProducts.map((searchProduct) => (
                <ProductDetail key={searchProduct.id} product={searchProduct} />
              ))}
            {searchProducts.length === 0 && (
              <>
                <div className="containerHomeMessage">
                  <h4 className="title">Tidak ada hasil untuk "{q}"</h4>
                  <p className="subtitle">Silahkan gunakan kata kunci lain</p>
                </div>
              </>
            )}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
