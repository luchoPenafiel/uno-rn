// Vendor
import React from 'react';
import styled from 'styled-components';
import { Pressable, Text, View, Dimensions } from 'react-native';

// Components
import { Wildcard } from './Wildcard';
import { PlusFour } from '@uno/components/Card/PlusFour';

// Icons
import { RevertIcon, BlockIcon } from '@uno/components/Icons';

// Theme
import theme from '@uno/constants/theme';

const Wrapper = styled(Pressable)<{ withMarginLeft?: boolean; screenHeight: number }>`
  width: 22%;
  height: ${({ screenHeight }) => screenHeight / 7}px;

  margin-bottom: ${theme.spaces.m}px;
  margin-left: ${({ withMarginLeft }) => (withMarginLeft ? '4%' : 0)};

  border: 1px solid ${theme.color.dark};
  border-radius: ${theme.bordeRadius};
`;

const InnerWrapper = styled(View)<{ color: string }>`
  justify-content: center;
  align-items: center;

  position: relative;

  height: 100%;
  padding: 2px;

  background-color: ${({ color }) => color};
  border: 4px solid ${theme.color.white};
  border-radius: ${theme.bordeRadius};
`;

const OvalWrapper = styled(View)`
  position: absolute;
  top: 22%;
  left: -4px;

  width: 100%;

  transform: rotate(-50deg);
`;

const Oval = styled(View)<{ screenHeight: number }>`
  width: 127%;
  height: ${({ screenHeight }) => screenHeight / 11}px;

  border-radius: 999px;
  background-color: ${theme.color.white};

  transform: scaleY(0.6);
`;

const LabelIcon = styled(View)`
  position: absolute;
  top: 0;
  left: 0;

  transform: scale(0.8);
`;

const LabelIconInvert = styled(View)`
  position: absolute;
  bottom: 0;
  right: 0;

  transform: rotate(180deg) scale(0.8);
`;

const Label = styled(Text)`
  position: absolute;
  top: 2px;
  left: 2px;

  color: ${theme.color.white};
`;

const LabelInvert = styled(Text)<{ invert?: boolean }>`
  position: absolute;
  bottom: 2px;
  right: 2px;

  transform: rotate(180deg);

  color: ${theme.color.white};
`;

const ValueIcon = styled(View)`
  transform: scale(1.5);
`;

const Value = styled(Text)<{ color: string }>`
  color: ${({ color }) => color};
  font-size: 26px;
`;

export const Card = ({
  color,
  label,
  withMarginLeft,
  specialCard,
  onPress,
}: {
  color: string;
  label?: string;
  withMarginLeft?: boolean;
  specialCard?: 'block' | 'revert' | 'wildcard' | 'plus-four';
  onPress: () => void;
}) => {
  const screenHeight = Dimensions.get('screen').height;

  return (
    <Wrapper withMarginLeft={withMarginLeft} screenHeight={screenHeight} onPress={onPress}>
      <InnerWrapper color={color}>
        {label ? <Label>{label}</Label> : null}

        <OvalWrapper>
          <Oval screenHeight={screenHeight} />
        </OvalWrapper>

        {specialCard ? (
          specialCard === 'block' ? (
            <>
              <LabelIcon>
                <BlockIcon color={theme.color.white} />
              </LabelIcon>
              <ValueIcon>
                <BlockIcon color={color} />
              </ValueIcon>
              <LabelIconInvert>
                <BlockIcon color={theme.color.white} />
              </LabelIconInvert>
            </>
          ) : specialCard === 'revert' ? (
            <>
              <LabelIcon>
                <RevertIcon color={theme.color.white} />
              </LabelIcon>
              <ValueIcon>
                <RevertIcon color={color} />
              </ValueIcon>
              <LabelIconInvert>
                <RevertIcon color={theme.color.white} />
              </LabelIconInvert>
            </>
          ) : specialCard === 'wildcard' ? (
            <Wildcard />
          ) : (
            <PlusFour />
          )
        ) : (
          <Value color={color}>{label}</Value>
        )}

        {label ? <LabelInvert>{label}</LabelInvert> : null}
      </InnerWrapper>
    </Wrapper>
  );
};