import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})``;

export const Content = styled.View`
  margin-bottom: 20px;
  border-radius: 4px;
  background: #fff;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export const SubmitButton = styled(Button)`
  height: 40px;
  width: 90%;
  margin-bottom: 20px;
`;

export const SubmitButtonEmpty = styled(Button)`
  height: 50px;
  width: 40%;
  margin-top: 20px;
  border-radius: 4px;
  background: transparent;
`;

export const ContentEmpty = styled.View`
  padding: 20px;
  border-radius: 4px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;
