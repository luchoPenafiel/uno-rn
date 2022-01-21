// Vendor
import React, { ReactElement } from 'react';
import { ScrollView, View } from 'react-native';
import styled from 'styled-components';

// Theme
import theme from '@uno/constants/theme';

const Wrapper = styled(ScrollView)`
  background: ${theme.color.white};
`;

const InnerWrapper = styled(View)`
  background: ${theme.color.white};
  padding: 20px;
`;

export const PageWrapper = ({ children }: { children: ReactElement | ReactElement[] }) => {
  return (
    <Wrapper>
      <InnerWrapper>{children}</InnerWrapper>
    </Wrapper>
  );
};
