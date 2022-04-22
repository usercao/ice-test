import * as React from 'react';
import classNames from 'classnames';
import { tuple } from '../_type/type';
import IconSpin from '@/assets/images/_global/IconSpin';
import styled from 'styled-components';

const Wrapper = styled.button`
  /* 清除默认样式 */
  margin: 0;
  padding: 0;
  border: none;
  border-radius: 0;
  background: transparent;
  appearance: none;
  -webkit-appearance: none;
  &:focus {
    outline: none;
  }
  /* global */
  width: 100%;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  span {
    display: inline-block;
    white-space: nowrap;
    font-weight: 500;
    transition: all 0.3s ease-in-out;
  }
  /* base */
  &.primary {
    background: #06ceab;
    span {
      color: #ffffff;
    }
    &:not(.loading, .disabled):hover {
      background: #149e86;
    }
  }
  &.second {
    background: rgba(6, 206, 171, 0.1);
    span {
      color: #06ceab;
    }
    &:not(.loading, .disabled):hover {
      background: rgba(6, 206, 171, 0.2);
    }
  }
  &.solid {
    border: 1px solid #06ceab;
    span {
      color: #06ceab;
    }
    &:not(.loading, .disabled):hover {
      border: 1px solid #149e86;
      span {
        color: #149e86;
      }
    }
  }
  &.text {
    span {
      color: #06ceab;
    }
    &:not(.loading, .disabled):hover {
      span {
        color: #149e86;
      }
    }
  }
  &.danger {
    background: rgba(238, 105, 41, 0.1);
    span {
      color: #ee6929;
    }
    &:not(.loading, .disabled):hover {
      background: rgba(238, 105, 41, 0.2);
    }
  }
  &.disabled {
    cursor: not-allowed;
    background: ${(props) => props.theme.backgroundColorDisabled};
    span {
      color: ${(props) => props.theme.textThirdColor};
    }
  }
  &.loading {
    cursor: not-allowed;
    svg {
      margin-right: 6px;
    }
  }
  &.sm {
    min-width: 80px;
    height: 30px;
    border-radius: 4px;
    span {
      font-size: 14px;
    }
  }
  &.md {
    height: 38px;
    border-radius: 5px;
    span {
      font-size: 14px;
    }
  }
  &.lg {
    height: 42px;
    border-radius: 6px;
    span {
      font-size: 16px;
    }
  }
`;

const ButtonTypes = tuple('primary', 'second', 'solid', 'text', 'danger');

type ButtonType = typeof ButtonTypes[number];

type SizeType = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'prefix' | 'suffix'> {
  className?: string;
  type?: ButtonType;
  size?: SizeType;
  loading?: boolean;
  disabled?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const Button: React.FC<ButtonProps> = React.forwardRef((props: ButtonProps, ref) => {
  const {
    className,
    type = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    prefix,
    suffix,
    children,
    onClick,
    ...rest
  } = props;

  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/28884
  const buttonRef = (ref as any) || React.createRef<HTMLElement>();

  // React.useEffect(() => {
  //   if (!buttonRef || !buttonRef.current) {
  //     return;
  //   }
  // }, [buttonRef]);

  const classes = classNames(className, 'row-center', {
    [`${type}`]: type,
    [`${size}`]: size,
    loading,
    disabled,
  });

  const loadingColor = React.useMemo(() => {
    switch (type) {
      case 'primary':
        return '#ffffff';
      case 'danger':
        return '#ee6929';
      default:
        return '#06ceab';
    }
  }, [type]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => {
    if (loading || disabled) {
      e.preventDefault();
      return;
    }
    (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)?.(e);
  };

  return (
    <Wrapper className={classes} ref={buttonRef} onClick={handleClick} {...rest}>
      {prefix}
      {!disabled && loading && <IconSpin color={loadingColor} />}
      {children && <span>{children}</span>}
      {suffix}
    </Wrapper>
  );
});

export default Button;
