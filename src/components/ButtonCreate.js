import styled from "@emotion/styled";

const ButtonCreate = styled.button`
  display: flex;
  padding: 10px 20px;
  background-color: #67ba24;
  color: white;
  border-radius: 5px;
  font-size: 16px;
  margin: 20px 0;
  border: none;

  @media (max-width: 768px) {
    display: none;
  }
`;

export default ButtonCreate;
