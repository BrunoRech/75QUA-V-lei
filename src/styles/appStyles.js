import styled from "styled-components";
import { Item, Button } from "semantic-ui-react";

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const ItemGroup = styled(Item.Group)`
  margin: auto;
  width: 700px;
  border: 1px solid #d4d4d4;
  border-radius: 10px;
  padding: 10px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const IconButton = styled(Button)`
  margin-left: 150px;
`;

export const Label = styled.h3`
  margin: 0;
`;
