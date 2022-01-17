import React, { ReactElement } from 'react';
import { Svg, Path } from 'react-native-svg';

type IconProps = {
  size?: number;
  color?: string;
};

export const MedalIcon = ({ size = 24, color = '#fff' }: IconProps): ReactElement => {
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Path
        d="M14.2718 10.445L18 2M9.31612 10.6323L5 2M12.7615 10.0479L8.835 2M14.36 2L13.32 4.5M6 16C6 19.3137 8.68629 22 12 22C15.3137 22 18 19.3137 18 16C18 12.6863 15.3137 10 12 10C8.68629 10 6 12.6863 6 16Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M10.5 15L12.5 13.5V18.5" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
};
