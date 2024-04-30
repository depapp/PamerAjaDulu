import styled from "@emotion/styled";

const StyledFooter = styled.footer`
  color: black;
  padding: 1rem;
  text-align: center;
`;

const FooterText = styled.p`
  margin: 100;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <FooterText></FooterText>
    </StyledFooter>
  );
};

export default Footer;
