// Vendor
import React, { ReactElement } from 'react';
import { ScrollView, View, SafeAreaView, Dimensions } from 'react-native';
import styled from 'styled-components';

// Theme
import theme from '@uno/constants/theme';

const Wrapper = styled(ScrollView)`
  padding-bottom: ${theme.spaces.m}px;
`;

const InnerWrapper = styled(View)<{ screenHeigth: number }>`
  background: ${theme.color.white};
  padding: 20px;

  min-height: 100%;
`;

export const PageWrapper = ({ children }: { children: ReactElement | ReactElement[] }) => {
  const screenHeigth = Dimensions.get('screen').height;
  return (
    <View>
      <SafeAreaView style={{ backgroundColor: theme.color.white }}>
        <Wrapper bounces={false}>
          <InnerWrapper screenHeigth={screenHeigth}>{children}</InnerWrapper>
        </Wrapper>
      </SafeAreaView>
    </View>
  );
};
