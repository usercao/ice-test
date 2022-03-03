import * as React from 'react';
import classNames from 'classnames';
import { tuple } from '../_type/type';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.button`
  /* 清除默认样式 */
  margin: 0px;
  padding: 0px;
  border: none;
  border-radius: 0px;
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
  &.default {
    background: rgba(6, 206, 171, 0.1);
    span {
      color: #06ceab;
    }
    &:not(.disabled, .loading):hover {
      span {
        color: rgba(6, 206, 171, 0.8);
      }
    }
  }
  &.danger {
    background: rgba(238, 105, 41, 0.1);
    span {
      color: #ee6929;
    }
    &:not(.disabled, .loading):hover {
      span {
        color: rgba(238, 105, 41, 0.8);
      }
    }
  }
  &.primary {
    background: #06ceab;
    span {
      color: #ffffff;
    }
    &:not(.disabled, .loading):hover {
      background: rgba(6, 206, 171, 0.8);
      span {
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }
  &.solid {
    border: 1px solid #06ceab;
    span {
      color: #06ceab;
    }
    &:not(.disabled, .loading):hover {
      border: 1px solid rgba(6, 206, 171, 0.8);
      span {
        color: rgba(6, 206, 171, 0.8);
      }
    }
  }
  /* &.text {
    background: transparent;
    span {
    }
  } */
  &.disabled {
    cursor: not-allowed;
    background: #f6f6f8;
    span {
      color: #b1b1b1;
    }
  }
  &.loading {
    cursor: not-allowed;
    i {
      margin-right: 6px;
      display: inline-block;
      font-size: 12px;
      animation: ${rotate} 2s linear infinite;
    }

    &.default,
    &.solid {
      i {
        color: #06ceab;
      }
    }
    &.danger {
      i {
        color: #ee6929;
      }
    }
    &.primary {
      i {
        color: #ffffff;
      }
    }
  }
  &.sm {
    min-width: 80px;
    height: 30px;
    border-radius: 4px;
    span {
      font-size: 12px;
      line-height: 28px;
    }
  }
  &.md {
    height: 38px;
    border-radius: 5px;
    span {
      font-size: 12px;
      line-height: 36px;
    }
  }
  &.lg {
    height: 42px;
    border-radius: 6px;
    span {
      font-size: 16px;
      line-height: 40px;
    }
  }
`;

const ButtonTypes = tuple('default', 'danger', 'primary', 'ghost', 'solid', 'link', 'text');

type ButtonType = typeof ButtonTypes[number];

type SizeType = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  className?: string;
  type?: ButtonType;
  size?: SizeType;
  disabled?: boolean;
  loading?: boolean;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const Button: React.FC<ButtonProps> = React.forwardRef((props: ButtonProps, ref) => {
  const { className, type = 'primary', size = 'md', disabled, loading, children, ...rest } = props;

  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/28884
  const buttonRef = (ref as any) || React.createRef<HTMLElement>();

  React.useEffect(() => {
    if (!buttonRef || !buttonRef.current) {
      return;
    }
  }, [buttonRef]);

  const classes = classNames(className, {
    [`${type}`]: type,
    [`${size}`]: size,
    disabled: disabled,
    loading: loading,
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => {
    const { disabled, onClick } = props;
    if (loading || disabled) {
      e.preventDefault();
      return;
    }
    (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)?.(e);
  };

  return (
    <Wrapper className={classes} ref={buttonRef} onClick={handleClick} {...rest}>
      {!disabled && loading && <i className="iconfont icon-loading" />}
      {children && <span>{children}</span>}
    </Wrapper>
  );
});

export default Button;
