import styled from "@emotion/styled";

export const Form = styled.form`
  max-width: 500px;
  margin: 1rem auto 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0;
  
  @media (max-width: 768px) {
    max-width: 300px;
  }
`;

export const Field = styled.div`
  display: flex;
  font-size: 1rem;
  flex-direction: column;
  align-items: flex-start;

  label {
    margin: 7px 0;
    font-size: 1rem;
  }

  input,
  textarea {
    width: 100%;
    padding: 1rem;
    box-sizing: border-box;
  }

  input[data-error="true"] {
    outline: 2px solid red;
    border: 1px solid transparent;
  }

  textarea {
    height: 180px;
  }
`;

export const InputSubmit = styled.input`
  background-color: #67ba24;
  width: 100%;
  padding: 1rem;
  text-align: center;
  color: white;
  font-size: 1.1rem;
  border: none;
  border-radius: 4px;
  margin-top: 2rem;

  &:hover {
    cursor: pointer;
  }
`;

export const Error = styled.p`
  color: #f53a29;
  height: 1rem;
  padding: 0;
  font-size: 14px;
`;
