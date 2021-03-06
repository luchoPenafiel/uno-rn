// vendor
import React, { ReactElement } from 'react';
import { Svg, Path } from 'react-native-svg';

type IconProps = {
  size?: number;
  color?: string;
};

export const BlockIcon = ({ size = 24, color = '#fff' }: IconProps): ReactElement => {
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Path
        d="M19.1414 5C17.3265 3.14864 14.7974 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19M19.1414 5C20.9097 6.80375 22 9.27455 22 12C22 17.5228 17.5228 22 12 22C9.20261 22 6.67349 20.8514 4.85857 19M19.1414 5L4.85857 19"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
