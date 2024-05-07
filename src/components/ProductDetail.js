import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FirebaseContext } from "../firebase/index";
import { default as formatTimeToNow } from "date-fns/formatDistanceToNow";

import styled from "@emotion/styled";

const Product = styled.li`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  position: relative;

  &::before {
    content: "";
    border-radius: 8px;
    transition: 600ms ease-out opacity;
    position: absolute;
    top: 40%;
    transform: translateY(-50%);
    left: 0;
    width: 100%;
    height: 80%;
    opacity: 0;
    background: linear-gradient(12deg, #fff 60%, rgb(151, 252, 128, 0.746));
    z-index 1;
  }

  @media (max-width: 768px) {
    margin-left: 9px;
    &::before {
      all: unset;
    }
  }

  &:hover::before {
    opacity: 1;
  }

  &:hover {
    cursor: pointer;
  }
`;

const ProductDescription = styled.div`
  flex: 0 1 600px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 2rem;
  z-index: 2;

  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const ProductDetails = styled.div`
  padding: 0.5rem 0;
`;

const DescriptionText = styled.p`
  font-size: 1rem;
  margin: 0;
  color: #667190;
  margin-bottom: 0.5rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Limit the number of lines */
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  line-height: 1.2; /* Adjust line height as needed */

  @media (max-width: 480px) {
    font-size: 13px;
    -webkit-line-clamp: 1;
  }
`;

const Title = styled.p`
  font-size: 1rem;
  font-weight: bold;
  margin: 0 0 0.5rem 0;
  color: #21293c;

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  border-radius: 5px;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  aspect-ratio: 1 / 1;
  background-color: #f0f0f0;
`;

const TimeAgo = styled.span`
  font-size: 14px;
  color: #21293c;
`;

const Votes = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  text-align: center;
  background-color: #fff;
  border: 1px solid #e1e1e1;
  padding: 1rem 0.5rem;
  border-radius: 4px;
  z-index: 2;

  p {
    transition: 800ms steps(28) color;
    color: ${(props) => (props.upvoted ? "rgb(61, 61, 61)" : "initial")};
    margin: 0;
    font-size: 13px;
    font-weight: 600;
  }

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 480px) {
    border: none;
    border-radius: 0px;
  }
`;

const UpVote = styled.div`
  background-image: url(https://i.ibb.co/1Xd76xJ/pad-animation.png);
  width: 45px;
  height: 26px;
  background-position: ${(props) => (props.upvoted ? "100%" : "0%")};
  background-repeat: no-repeat;
  background-size: 2900%;
  transition: 800ms steps(28) background-position;
`;

export default function ProductDetail({ product }) {
  const {
    id,
    name,
    subtitle,
    date,
    description,
    imageurl,
    votes,
    comments,
    hasVoted,
    slug,
  } = product;

  const [upvoted, setUpvoted] = useState(false);

  const router = useRouter();

  const { user, firebase } = useContext(FirebaseContext);

  useEffect(() => {
    if (user) {
      setUpvoted(hasVoted.includes(user.uid));
    }
  }, []);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleImageLoaded = () => {
    setLoading(false);
  };

  const handleImageError = () => {
    setError(true);
  };

  const idLocale = {
    formatDistance: (token, count, options) => {
      switch (token) {
        case "lessThanXSeconds":
          return `kurang dari 1 detik`;
        case "xSeconds":
          return `${count} detik`;
        case "halfAMinute":
          return `setengah menit`;
        case "lessThanXMinutes":
          return `${count} menit`;
        case "xMinutes":
          return `${count} menit`;
        case "aboutXHours":
          return `${count} jam`;
        case "xHours":
          return `${count} jam`;
        case "xDays":
          return `${count} hari`;
        case "aboutXMonths":
          return `${count} bulan`;
        case "xMonths":
          return `${count} bulan`;
        case "aboutXYears":
          return `${count} tahun`;
        case "xYears":
          return `${count} tahun`;
        case "overXYears":
          return `lebih dari ${count} tahun`;
        case "almostXYears":
          return `hampir ${count} tahun`;
        default:
          return "";
      }
    },
  };

  function handleVote(e) {
    e.stopPropagation();

    if (!user) return router.push("/login");

    let totalVotes = votes;
    let usersHaveVoted = [...hasVoted];

    if (hasVoted.includes(user.uid)) {
      totalVotes = votes - 1;
      usersHaveVoted = usersHaveVoted.filter((uid) => uid !== user.uid);
    } else {
      totalVotes = votes + 1;
      usersHaveVoted = [...usersHaveVoted, user.uid];
    }

    setUpvoted(usersHaveVoted.includes(user.uid));

    firebase.db
      .collection("products")
      .doc(id)
      .update({ votes: totalVotes, hasVoted: usersHaveVoted });
  }

  return (
    <Link href={`/post/${slug}`} legacyBehavior>
      <Product>
        <ProductDescription>
          <ImageContainer>
            {(loading || error) && <ImagePlaceholder />}
            {!error && (
              <Image
                style={loading ? { display: "none" } : {}}
                src={imageurl}
                alt={name + " logo"}
                onLoad={handleImageLoaded}
                onError={handleImageError}
              />
            )}
          </ImageContainer>
          <ProductDetails>
            <Title>{name}</Title>
            <DescriptionText>{subtitle || description}</DescriptionText>
            <TimeAgo>
              {comments.length} komentar <span>·</span>{" "}
              {formatTimeToNow(new Date(date), { locale: idLocale })} yang lalu
            </TimeAgo>
            {/* 
            Uncomment this section to hide `0 komentar`
              <TimeAgo>
                {comments.length > 0 && (
                  <>
                    {comments.length} komentar <span>·</span>{" "}
                  </>
                )}
                {formatTimeToNow(new Date(date), { locale: idLocale })} yang lalu
              </TimeAgo>
            */}
          </ProductDetails>
        </ProductDescription>
        <Votes onClick={handleVote} upvoted={upvoted} data-umami-event="klik-tombol-upvote">
          <UpVote upvoted={upvoted} />
          <p>{votes}</p>
        </Votes>
      </Product>
    </Link>
  );
}
