import ProductDetailSkeleton from "./ProductDetailSkeleton";

export function ProductListSkeleton({ loading, hideVote = false }) {
  return (
    <>
      {loading &&
        [...Array(5)].map((_, index) => (
          <ProductDetailSkeleton key={index} hideVote={hideVote} />
        ))}
    </>
  );
}
