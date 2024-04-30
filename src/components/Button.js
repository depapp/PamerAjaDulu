import styled from "@emotion/styled";

const Button = styled.button`
  display: flex;
  padding: 10px 20px;
  background-color: #67ba24;
  color: white;
  border-radius: 5px;
  font-size: 16px;
  margin: 20px 0;
  border: none;

  @media (max-width: 768px) {
    margin: 0.3rem 0.6rem 0;
  }
`;

export default Button;
