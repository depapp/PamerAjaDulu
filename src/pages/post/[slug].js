import { useContext, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FirebaseContext } from "../../firebase/index";
import { getPostBySlug } from "../../firebase/utils";
import formatDate from "../../utils/formatDate";

import styled from "@emotion/styled";
import Layout from "../../components/Layout";
import BackIcon from "../../components/BackIcon";
import ButtonVisit from "../../components/ButtonVisit";

const ProductContainer = styled.div``;

const Article = styled.article`
  padding: 1rem;
  max-width: 900px;
  margin: 0 auto;
`;

const GoBackLink = styled(Link)`
  color: #4b587c;
  display: flex;
  padding: 2rem 2rem 2rem 0;
  width: max-content;
  align-items: center;
  gap: 5px;

  svg {
    width: 18px;
  }
`;

const ImageAndPosition = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ImageContainer = styled.div`
  width: 72px;
  border-radius: 4px;
  overflow: hidden;
  aspect-ratio: 1 / 1;
`;

const Position = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 0 0.5rem 0;

  @media (max-width: 600px) {
    font-size: 1.2rem;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
`;

const TitleSubtitleAndLinks = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    display: grid;
  }
`;

const TitleAndSubtitle = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 24px;
  margin: 1rem 0 0 0;
  color: #21293c;
`;

const Subtitle = styled.h2`
  font-size: 24px;
  font-weight: 500;
  color: #4b587c;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 24px;
  color: #21293c;
  text-align: justify;
`;

const SmallTextView = styled.span`
  font-weight: bold;
  color: #000;
`;

const LaunchSummary = styled.p`
  margin-bottom: 32px;
  color: #4b587c;
  font-size: 14px;
  line-height: 24px;
  font-weight: 400;
`;

export default function Product({ product }) {
  const [localProduct, setLocalProduct] = useState(null);
  const [minHeight] = useState(64);
  const [maxHeight] = useState(200);
  const [height, setHeight] = useState(minHeight);

  const [comment, setComment] = useState("");
  const [_, setQueryDB] = useState(true);

  const [imageError, setImageError] = useState(false);
  const [imageloading, setImageLoading] = useState(true);

  const handleImageLoaded = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleChange = (e) => {
    const { scrollHeight } = e.target;
    const newHeight = Math.min(maxHeight, Math.max(minHeight, scrollHeight));

    if (e.target.value === "") {
      setHeight(minHeight);
    } else {
      setHeight(newHeight);
    }

    setComment(e.target.value);
  };

  const { user, firebase } = useContext(FirebaseContext);

  const router = useRouter();

  const {
    id,
    name,
    subtitle,
    description,
    company,
    creator,
    url,
    imageurl,
    votes,
    comments,
    hasVoted,
    tags,
    date,
  } = localProduct ? localProduct : product;

  const handleVote = () => {
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

    firebase.db
      .collection("products")
      .doc(id)
      .update({ votes: totalVotes, hasVoted: usersHaveVoted });

    setLocalProduct({
      ...product,
      votes: totalVotes,
    });

    setQueryDB(true);
  };

  const isCreator = (id) => {
    if (creator.id === id) {
      return true;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!user) return router.push("/login");

    if (comment.trim() === "") return;
    if (comment.length <= 150) return;

    const newComment = {};

    newComment.userId = user.uid;
    newComment.userName = user.displayName;
    newComment.msg = comment.trim();

    const newComments = [...comments, newComment];

    firebase.db
      .collection("products")
      .doc(id)
      .update({ comments: newComments });

    setLocalProduct({
      ...product,
      comments: newComments,
    });

    setComment("");
    setHeight(minHeight);

    setQueryDB(true);
  };

  return (
    <Layout>
      <Article>
        <GoBackLink href="/">
          <BackIcon /> Kembali
        </GoBackLink>
        <ImageAndPosition>
          <ImageContainer>
            {(imageloading || imageError) && <ImagePlaceholder />}
            {!imageError && (
              <Image
                style={imageloading ? { display: "none" } : {}}
                src={imageurl}
                alt={name + " logo"}
                onLoad={handleImageLoaded}
                onError={handleImageError}
              />
            )}
          </ImageContainer>
          {company && (
            <Position>
              <Link href={`https://twitter.com/${company}`} target="_blank">
                @{company}
              </Link>
            </Position>
          )}
        </ImageAndPosition>

        <TitleSubtitleAndLinks>
          <TitleAndSubtitle>
            <Title>{name}</Title>
            <Subtitle>{subtitle || description}</Subtitle>
          </TitleAndSubtitle>
        </TitleSubtitleAndLinks>
        <ProductContainer>
          <Description>{description}</Description>
          <br />
          <Link href={`${url}`} target="_blank">
            <ButtonVisit>Lihat Karya</ButtonVisit>
          </Link>
          <LaunchSummary>
            <br />
            diposting oleh <SmallTextView>{creator.name}</SmallTextView> <br />
            pada tanggal <SmallTextView>{formatDate(date)}</SmallTextView>
          </LaunchSummary>
        </ProductContainer>
      </Article>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const {
    params: { slug },
  } = context;

  try {
    const product = await getPostBySlug(slug);

    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        notFound: true,
      },
    };
  }
}
