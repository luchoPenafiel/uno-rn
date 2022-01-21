// Vendor
import theme from '@uno/constants/theme';
import React from 'react';
import { View, Text as RNText } from 'react-native';
import styled from 'styled-components';

const TextStyles = styled(RNText)<{ align?: string }>`
  margin-bottom: 10px;

  font-size: 16px;
  color: ${theme.color.dark};
  text-align: ${({ align }) => (align ? align : 'left')};
`;

export const Text = ({ children, align }: { children: string; align?: string }) => {
  return <TextStyles align={align}>{children}</TextStyles>;
};

const TitleStyles = styled(RNText)`
  margin-top: 8px;
  margin-bottom: 14px;

  font-size: 26px;
  font-weight: bold;
  color: ${theme.color.dark};
`;

export const Title = ({ children }: { children: string }) => {
  return <TitleStyles>{children}</TitleStyles>;
};

const SubtitleStyles = styled(RNText)`
  margin-top: 8px;
  margin-bottom: 4px;

  font-size: 18px;
  font-weight: bold;
  color: ${theme.color.dark};
`;

export const Subtitle = ({ children }: { children: string }) => {
  return <SubtitleStyles>{children}</SubtitleStyles>;
};

const ListItemWrapper = styled(View)`
  display: flex;
  flex-direction: row;

  margin-bottom: 4px;
`;

const ListItemBullet = styled(RNText)`
  font-size: 16px;
  color: ${theme.color.dark};
`;

const ListItemStyles = styled(RNText)`
  margin-left: 4px;

  font-size: 16px;
  color: ${theme.color.dark};
`;

export const ListItem = ({ children }: { children: string }) => {
  return (
    <ListItemWrapper>
      <ListItemBullet>-</ListItemBullet>
      <ListItemStyles>{children}</ListItemStyles>
    </ListItemWrapper>
  );
};
