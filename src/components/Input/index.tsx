import * as React from 'react';
import classNames from 'classnames';
import { LiteralUnion } from '../_type/type';
import useRandomId from '@/hooks/useRandomId';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  transition: all 0.3s ease-in-out;
  input {
    /* 清除默认样式 */
    margin: 0px;
    padding: 0px;
    border: none;
    border-radius: 0px;
    background: transparent;
    appearance: none;
    -webkit-appearance: none;
    transition: all 0.3s ease-in-out;
    color: #384442;
    &:focus {
      outline: none;
    }
    /* global */
    flex: auto;
    height: inherit;
    font-weight: 500;
    &::placeholder {
      color: rgba(56, 68, 66, 0.4);
      font-weight: 400;
    }
    /* 自动填充 */
    &:-webkit-autofill {
      box-shadow: 0 0 0px 1000px #ffffff inset;
      -webkit-box-shadow: 0 0 0px 1000px #ffffff inset;
      -webkit-text-fill-color: #ffffff;
    }
  }
  label {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    pointer-events: none;
    transition: all 0.3s ease-in-out;
    border: 1px solid #e8e8e8;
  }
  &:not(.danger, .disabled):hover input:focus + label {
    border: 1px solid #06ceab;
  }
  img {
    user-select: none;
    cursor: pointer;
  }
  /* base */
  &.danger {
    input {
      color: #ff7878;
    }
    label,
    input:focus + label {
      border: 1px solid #ff7878;
    }
  }
  &.disabled {
    user-select: none;
    cursor: not-allowed;
    input {
      color: #849a96;
      cursor: not-allowed;
      z-index: 1;
      &::placeholder {
        color: rgba(132, 154, 150, 0.4);
      }
    }
    label {
      background: #f1f1f1;
    }
  }
  &.sm {
    padding: 8px;
    min-width: 80px;
    height: 30px;
    input {
      font-size: 12px;
    }
    label {
      border-radius: 4px;
    }
    img {
      margin-left: 8px;
      width: 14px;
      height: 14px;
    }
  }
  &.md {
    padding: 10px;
    height: 38px;
    input {
      font-size: 12px;
    }
    label {
      border-radius: 5px;
    }
    img {
      margin-left: 10px;
      width: 16px;
      height: 16px;
    }
  }
  &.lg {
    padding: 12px;
    height: 42px;
    input {
      font-size: 16px;
    }
    label {
      border-radius: 6px;
    }
    img {
      margin-left: 12px;
      width: 20px;
      height: 20px;
    }
  }
`;

/* eslint-disable */
type inputType = LiteralUnion<
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week',
  string
>;
/* eslint-enable */

type SizeType = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'suffix'> {
  className?: string;
  type?: inputType;
  size?: SizeType;
  disabled?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  clear?: boolean;
  danger?: boolean;
  onChange?: (...args: any[]) => any;
  onBlur?: (...args: any[]) => any;
  onClear?: (...args: any[]) => any;
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
}

const Input: React.FC<InputProps> = React.forwardRef((props: InputProps, ref) => {
  const {
    className,
    type = 'text',
    size = 'md',
    disabled = false,
    prefix,
    suffix,
    clear = false,
    danger = false,
    value,
    onChange,
    onBlur,
    onClear,
    onPressEnter,
    ...rest
  } = props;

  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/28884
  const inputRef = (ref as any) || React.createRef<HTMLInputElement>();
  const uuid = useRandomId();

  // React.useEffect(() => {
  //   if (!inputRef || !inputRef.current) {
  //     return;
  //   }
  // }, [inputRef]);

  const classes = classNames(className, 'row-between', {
    [`${size}`]: size,
    danger,
    disabled,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value, e.target.name);
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    onBlur?.(e.target.value, e.target.name);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    onPressEnter?.(e);
  };

  const handleClear = () => {
    onClear?.() ?? onChange?.('', 'clear');
  };

  return (
    <Wrapper className={classes}>
      {prefix}
      <input
        type={type}
        disabled={disabled}
        ref={inputRef}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyPress={handleEnter}
        autoComplete="off"
        {...rest}
      />
      <label htmlFor={uuid} />
      {clear && value && <img src={require('@/assets/images/_global/clear.svg')} alt="clear" onClick={handleClear} />}
      {suffix}
    </Wrapper>
  );
});

export default Input;
