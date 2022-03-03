/* eslint-disable */
import * as React from 'react';
import useRandomId from '@/hooks/useRandomId';

interface Props extends Omit<React.SVGAttributes<SVGElement>, 'color'> {
  size?: number;
  color?: string | string[];
}

const DEFAULT_STYLE: React.CSSProperties = {
  display: 'inline-block',
};

const getIconColor = (color: string | string[] | undefined, index: number, defaultColor: string) => {
  console.log(color ? (typeof color === 'string' ? color : color[index] || defaultColor) : defaultColor);

  return color ? (typeof color === 'string' ? color : color[index] || defaultColor) : defaultColor;
};

const IconSpin: React.FC<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;
  const uuid = useRandomId();

  return (
    <svg id={uuid} viewBox="0 0 38 38" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <defs>
        <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
          <stop stopColor={getIconColor(color, 1, '#ffffff')} stopOpacity="0" offset="0%" />
          <stop stopColor={getIconColor(color, 1, '#ffffff')} stopOpacity=".631" offset="63.146%" />
          <stop stopColor={getIconColor(color, 1, '#ffffff')} offset="100%" />
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <g transform="translate(1 1)">
          <path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" strokeWidth="2">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="0.9s"
              repeatCount="indefinite"
            />
          </path>
          <circle fill={getIconColor(color, 1, '#ffffff')} cx="36" cy="18" r="1">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="0.9s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </g>
    </svg>
  );
};

IconSpin.defaultProps = {
  size: 16,
};

export default IconSpin;
