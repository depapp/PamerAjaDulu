import styled from "@emotion/styled";

const SkeletonProduct = styled.li`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  position: relative;
`;

const SkeletonContent = styled.div`
  flex: 0 1 600px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 2rem;
  z-index: 2;

  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const SkeletonImage = styled.div`
  grid-column-start: 1;
  grid-column-end: 2;
  width: 100%;
  height: 100%;
  aspect-ratio: 1 / 1;
  background-color: #f0f0f0;
  border-radius: 5px;
`;

const SkeletonDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: flex-start;
`;

const SkeletonText = styled.div`
  width: ${(props) => (props.width ? `${props.width}%` : "80%")};
  height: 16px;
  background-color: #f0f0f0;
  border-radius: 4px;

  @media (max-width: 830px) {
    max-width: 70%;
  }

  @media (max-width: 480px) {
    height: 13px;
    display: ${(props) => (props.hideOnMobile ? "none" : "initial")};
  }
`;

const SkeletonVotes = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  text-align: center;
  background-color: #f0f0f0;
  padding: 1rem 0.5rem;
  border-radius: 4px;
  z-index: 2;
  width: 62px;
  height: 74px;
  @media (max-width: 480px) {
    transform: scale(0.5);
  }
`;

export default function ProductDetailSkeleton({ hideVote }) {
  return (
    <SkeletonProduct>
      <SkeletonContent>
        <SkeletonImage />
        <SkeletonDetails>
          <SkeletonText />
          <SkeletonText width={120} />
          <SkeletonText hideOnMobile={true} />
        </SkeletonDetails>
      </SkeletonContent>
      {!hideVote && <SkeletonVotes />}
    </SkeletonProduct>
  );
}
