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
import WriteDocsIcon from "../../components/WriteDocsIcon";
import UserCommentIcon from "../../components/UserCommentIcon";

const Comments = styled.div``;

const CommentsList = styled.ul`
  display: grid;
`;

const Form = styled.form`
  display: grid;
  gap: 0.5rem;
  padding-top: 0.5rem;
  grid-template-columns: auto 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  margin-bottom: 2rem;
`;

const UserIconContainer = styled.div`
  display: flex;
  width: max-content;
  border-radius: 100%;
  padding: 0.3rem;
  height: max-content;
  margin-top: 7px;

  svg {
    width: 28px;
    height: 28px;
  }
`;

const TextArea = styled.textarea`
  box-sizing: border-box;
  padding: 1rem;
  width: 100%;
  height: ${(props) => props.height}px;
  grid-column-end: 4;
  grid-column-start: 2;
  resize: none;
  border: none;
  outline: none;
`;

const SubmitContainer = styled.div`
  grid-row: 2;
  grid-column-start: 3;
  grid-column-end: 4;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const Submit = styled.button`
  background-color: #67ba24;
  height: max-content;
  padding: 8px 16px;
  border: none;
  width: max-content;
  cursor: pointer;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  line-height: 24px;
`;

const CommentMessage = styled.p`
  line-height: 1.6;
`;

const CommentUsername = styled.span`
  color: #4b587c;
`;

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

const CommentSectionTitle = styled.h1`
  font-size: 20px;
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

const CommentUserContainer = styled.div`
  display: flex;
  gap: 0.7rem;
  align-items: center;
`;

const CommentUser = styled.span`
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
`;

const ProductOwner = styled.p`
  display: inline;
  border-radius: 999px;
  color: #ffffff;
  background-color: #67ba24;
  margin-left: 8px;
  padding: 4px 8px;
  font-weight: 600;
  font-size: 11px;
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
    <Layout title={`${product.name} | #PamerAjaDulu`}>
      <Article>
        <GoBackLink href="/" data-umami-event="klik-tombol-kembali-dari-halaman-produk">
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
              <Link href={`https://twitter.com/${company}`} target="_blank" data-umami-event="klik-tombol-akun-twitter">
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
            <ButtonVisit data-umami-event="klik-tombol-lihat-karya">Lihat Karya</ButtonVisit>
          </Link>
          <LaunchSummary>
            <br />
            diposting oleh <SmallTextView>{creator.name}</SmallTextView>{" "}
            pada tanggal <SmallTextView>{formatDate(date)}</SmallTextView>
          </LaunchSummary>
          <div>
            <Form onSubmit={onSubmit}>
              <UserIconContainer>
                <WriteDocsIcon />
              </UserIconContainer>
              <TextArea
                placeholder="tinggalkan komentarmu disini."
                height={height}
                value={comment}
                onChange={handleChange}
              />
              <SubmitContainer>
                <Submit type="submit" data-umami-event="klik-kirim-komentar">Kirim</Submit>
              </SubmitContainer>
            </Form>
            <Comments>
              {comments.length > 0 && (
                <CommentsList>
                  <CommentSectionTitle>
                    Komentar Tentang Karya Ini
                  </CommentSectionTitle>
                  <br />
                  {comments
                    .slice()
                    .reverse()
                    .map((comment, i) => (
                      <li key={`${comment.userId}-${i}`}>
                        <CommentUserContainer>
                          <UserIconContainer>
                            <UserCommentIcon />
                          </UserIconContainer>
                          <CommentUser>{comment.userName}</CommentUser>
                          {isCreator(comment.userId) && (
                            <ProductOwner>Yang Mamerin Karya</ProductOwner>
                          )}
                        </CommentUserContainer>
                        <CommentMessage>
                          <CommentUsername>{comment.msg}</CommentUsername>
                        </CommentMessage>
                      </li>
                    ))}
                </CommentsList>
              )}
            </Comments>
          </div>
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
