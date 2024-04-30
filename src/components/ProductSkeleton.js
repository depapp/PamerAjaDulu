import styled from "@emotion/styled";

const SkeletonArticle = styled.article`
  padding: 1rem;
  max-width: 900px;
  margin: 0 auto;
  padding-bottom: 500px;
`;

const SkeletonContent = styled.div`
  display: grid;
  gap: 2rem;
`;

const SkeletonImage = styled.div`
  width: 72px;
  aspect-ratio: 1 / 1;
  background-color: #f0f0f0;
  border-radius: 5px;
`;

const SkeletonDetails = styled.div`
  flex: 0 1 600px;
  display: flex;
  gap: 5rem;

  @media (max-width: 768px) {
    display: grid;
    max-width: 50%;
    gap: 2rem;
  }

  @media (max-width: 600px) {
    max-width: 100%;
  }
`;

const SkeletonInfo = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SkeletonActions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-end;
  flex: 1;
`;

const SkeletonVisit = styled.div`
  width: 65px;
  height: 52px;
  background-color: #f0f0f0;
  border-radius: 4px;
`;

const SkeletonUpvote = styled.div`
  border-radius: 4px;
  flex: 1;
  height: 52px;
  background-color: #f0f0f0;
`;

const SkeletonText = styled.div`
  width: ${(props) => (props.width ? `${props.width}%` : "80%")};
  height: ${(props) => (props.height ? `${props.height}px` : "16px")};
  background-color: #f0f0f0;
  border-radius: 4px;
`;

const SkeletonDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const ProductSkeleton = () => {
  return (
    <SkeletonArticle>
      <SkeletonContent>
        <SkeletonImage />
        <SkeletonDetails>
          <SkeletonInfo>
            <SkeletonText height={24} width={60} />
            <SkeletonText height={24} width={100} />
          </SkeletonInfo>
          <SkeletonActions>
            <SkeletonVisit />
            <SkeletonUpvote />
          </SkeletonActions>
        </SkeletonDetails>
        <SkeletonDescription>
          <SkeletonText width={100} />
          <SkeletonText width={100} />
          <SkeletonText width={80} />
        </SkeletonDescription>
        <SkeletonText width={50} />
      </SkeletonContent>
    </SkeletonArticle>
  );
};

export default ProductSkeleton;
