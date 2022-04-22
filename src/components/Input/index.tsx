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
    margin: 0;
    padding: 0;
    border: none;
    border-radius: 0;
    background: transparent;
    appearance: none;
    -webkit-appearance: none;
    transition: all 0.3s ease-in-out;
    color: ${(props) => props.theme.textBaseColor};
    transition: all 0.3s ease-in-out;
    &:focus {
      outline: none;
    }
    /* global */
    flex: auto;
    height: inherit;
    font-weight: 500;
    &::placeholder {
      color: ${(props) => props.theme.textFirstColor};
      font-weight: 400;
      transition: all 0.3s ease-in-out;
    }
  }
  /* chrome autocomplete background color */
  input:-webkit-autofill,
  input:-webkit-autofill:focus {
    -webkit-text-fill-color: ${(props) => props.theme.textBaseColor};
    transition: background-color 99999s 0s, color 99999s 0s;
  }
  /* input[data-autocompleted] {
    background-color: transparent !important;
  } */
  /* chrome autocomplete background color */
  label {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    pointer-events: none;
    transition: all 0.3s ease-in-out;
    border: 1px solid ${(props) => props.theme.colorFirstAssist};
    transition: all 0.3s ease-in-out;
  }
  &:not(.danger, .disabled):hover label,
  input:focus + label {
    border: 1px solid #06ceab;
  }
  .clear {
    padding: 6px;
    font-size: 12px;
    font-weight: bold;
    color: ${(props) => props.theme.textSecondColor};
    border-radius: 50%;
    user-select: none;
    cursor: pointer;
    transform: scale(0.8);
    transition: all 0.3s ease-in-out;
    &:hover {
      color: #06ceab;
      background: rgba(6, 206, 171, 0.1);
    }
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
      color: ${(props) => props.theme.textThirdColor};
      cursor: not-allowed;
      z-index: 1;
      transition: all 0.3s ease-in-out;
      &::placeholder {
        color: ${(props) => props.theme.textThirdColor};
        transition: all 0.3s ease-in-out;
      }
    }
    label {
      background: ${(props) => props.theme.colorSecondAssist};
      transition: all 0.3s ease-in-out;
    }
  }
  &.sm {
    padding: 0 8px;
    min-width: 80px;
    height: 30px;
    input {
      font-size: 12px;
    }
    label {
      border-radius: 4px;
    }
  }
  &.md {
    padding: 0 10px;
    height: 38px;
    input {
      font-size: 12px;
    }
    label {
      border-radius: 5px;
    }
  }
  &.lg {
    padding: 0 12px;
    height: 42px;
    input {
      font-size: 16px;
    }
    label {
      border-radius: 6px;
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
  danger?: boolean;
  disabled?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  clear?: boolean;
  onChange?: (...args: any[]) => any;
  onFocus?: (...args: any[]) => any;
  onBlur?: (...args: any[]) => any;
  onClear?: (...args: any[]) => any;
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
}

const Input: React.FC<InputProps> = React.forwardRef((props: InputProps, ref) => {
  const {
    className,
    type = 'text',
    size = 'md',
    danger = false,
    disabled = false,
    prefix,
    suffix,
    clear = false,
    value,
    onChange,
    onFocus,
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

  const handleFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFocus?.(e.target.value, e.target.name);
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
        autoComplete="off"
        ref={inputRef}
        type={type}
        disabled={disabled}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyPress={handleEnter}
        {...rest}
      />
      <label htmlFor={uuid} />
      {!disabled && clear && value && <i className="iconfont icon-select-cancel clear" onClick={handleClear} />}
      {suffix}
    </Wrapper>
  );
});

export default Input;
