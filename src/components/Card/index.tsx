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

const Wrapper = styled(Pressable)<{
  withMarginLeft?: boolean;
  cardWidth: number;
  cardHeight: number;
  onlyText?: boolean;
}>`
  width: ${({ cardWidth }) => cardWidth}px;
  height: ${({ cardHeight }) => cardHeight}px;

  margin-bottom: ${theme.spaces.m}px;
  margin-left: ${({ withMarginLeft }) => (withMarginLeft ? '4%' : 0)};

  border: 1px ${({ onlyText }) => (onlyText ? 'dotted' : 'solid')} ${theme.color.dark};
  border-radius: ${theme.bordeRadius};
`;

const InnerWrapper = styled(View)<{ color: string }>`
  justify-content: center;
  align-items: center;

  position: relative;

  height: 100%;
  padding: 2px;

  background-color: ${theme.color.white};
  border: 4px solid ${({ color }) => color};
  border-radius: ${theme.bordeRadius};
`;

const OvalWrapper = styled(View)`
  position: absolute;
  top: 22%;
  left: -10%;

  width: 100%;

  transform: rotate(-55deg);
`;

const Oval = styled(View)<{ cardWidth: number; cardHeight: number; color: string }>`
  width: ${({ cardWidth }) => cardWidth * 1.2}px;
  height: ${({ cardHeight }) => cardHeight / 1.4}px;

  border-radius: 999px;
  background-color: ${({ color }) => color};

  transform: scaleY(0.5);
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

const Label = styled(Text)<{ color: string }>`
  position: absolute;
  top: 2px;
  left: 2px;

  color: ${({ color }) => color};
`;

const LabelInvert = styled(Text)<{ invert?: boolean; color: string }>`
  position: absolute;
  bottom: 2px;
  right: 2px;

  transform: rotate(180deg);

  color: ${({ color }) => color};
`;

const ValueIcon = styled(View)`
  transform: scale(1.5);
`;

const Value = styled(Text)<{ onlyText?: boolean }>`
  color: ${({ onlyText }) => (onlyText ? theme.color.darkGray : theme.color.white)};
  font-size: ${({ onlyText }) => (onlyText ? '12px' : '26px')};
`;

export const Card = ({
  color,
  label,
  withMarginLeft,
  specialCard,
  onlyText,
  onPress,
}: {
  color: string;
  label?: string;
  withMarginLeft?: boolean;
  specialCard?: 'block' | 'revert' | 'wildcard' | 'plus-four';
  onlyText?: boolean;
  onPress: () => void;
}) => {
  const screenWidth = Dimensions.get('screen').width;

  const cardWidth = (screenWidth - 40 - 25) / 4;
  const cardHeight = cardWidth * 1.65;

  return (
    <Wrapper
      withMarginLeft={withMarginLeft}
      cardWidth={cardWidth}
      cardHeight={cardHeight}
      onPress={onPress}
      onlyText={onlyText}>
      <InnerWrapper color={color}>
        {label ? <Label color={color}>{label}</Label> : null}

        <OvalWrapper>
          <Oval
            color={specialCard === 'wildcard' ? theme.color.white : color}
            cardWidth={cardWidth}
            cardHeight={cardHeight}
          />
        </OvalWrapper>

        {specialCard ? (
          specialCard === 'block' ? (
            <>
              <LabelIcon>
                <BlockIcon color={color} />
              </LabelIcon>
              <ValueIcon>
                <BlockIcon color={theme.color.white} />
              </ValueIcon>
              <LabelIconInvert>
                <BlockIcon color={color} />
              </LabelIconInvert>
            </>
          ) : specialCard === 'revert' ? (
            <>
              <LabelIcon>
                <RevertIcon color={color} />
              </LabelIcon>
              <ValueIcon>
                <RevertIcon color={theme.color.white} />
              </ValueIcon>
              <LabelIconInvert>
                <RevertIcon color={color} />
              </LabelIconInvert>
            </>
          ) : specialCard === 'wildcard' ? (
            <Wildcard cardWidth={cardWidth} cardHeight={cardHeight} />
          ) : (
            <PlusFour />
          )
        ) : (
          <Value onlyText={onlyText}>{label}</Value>
        )}

        {label ? <LabelInvert color={color}>{label}</LabelInvert> : null}
      </InnerWrapper>
    </Wrapper>
  );
};
