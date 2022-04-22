import * as React from 'react';
import classNames from 'classnames';
import { cloneElement } from '../_util/reactNode';
import useRandomId from '@/hooks/useRandomId';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  /* 清除默认样式 */
  input {
    display: none;
    opacity: 0;
  }
  /* global */
  label {
    display: block;
    border: 1px solid ${(props) => props.theme.textThirdColor};
    border-radius: 4px;
    transition: all 0.3s ease-in-out;
    &::after {
      content: '';
      display: block;
      margin: 4.5px 0 0 4px;
      width: 9px;
      height: 6px;
      background-image: url(${require('@/assets/images/_global/check.svg')});
      background-repeat: no-repeat;
      background-size: 9px 6px;
      background-position: center;
      transition: all 0.3s ease-in-out;
    }
  }
  &:not(.checked) {
    label::after {
      opacity: 0;
    }
  }
  .text {
    flex: 1;
    user-select: none;
  }
  p,
  span {
    color: ${(props) => props.theme.textSecondColor};
    transition: all 0.3s ease-in-out;
  }
  a {
    color: #06ceab;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
      color: rgba(6, 206, 171, 0.6);
    }
  }
  &:not(.disabled):hover {
    label {
      border: 1px solid rgba(6, 206, 171, 0.8);
    }
  }
  /* base */
  &.checked {
    label {
      border: 1px solid #06ceab;
      background: #06ceab;
    }
  }
  &.disabled {
    cursor: not-allowed;
    label {
      cursor: not-allowed;
    }
  }
  &.sm {
  }
  &.md {
    label {
      margin-right: 9px;
      width: 18px;
      height: 18px;
    }
    p,
    a,
    span {
      font-size: 14px;
      line-height: 18px;
    }
  }
  &.lg {
  }
`;

type SizeType = 'sm' | 'md' | 'lg';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  className?: string;
  size?: SizeType;
  disabled?: boolean;
  checked?: boolean;
  children?: React.ReactNode;
  onChange?: (...args: any[]) => any;
}

const Checkbox: React.FC<CheckboxProps> = React.forwardRef((props: CheckboxProps, ref) => {
  const { className, size = 'md', disabled = false, checked = false, children, onChange } = props;

  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/28884
  const checkboxRef = (ref as any) || React.createRef<HTMLInputElement>();
  const uuid = useRandomId();

  // React.useEffect(() => {
  //   if (!checkboxRef || !checkboxRef.current) {
  //     return;
  //   }
  // }, [checkboxRef]);

  const classes = classNames(className, {
    [`${size}`]: size,
    checked,
    disabled,
  });

  const handleChange = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if ((e.target as HTMLInputElement).localName === 'a' || disabled) return;
    onChange?.(!checked, 'checkbox');
  };

  return (
    <Wrapper className={classes}>
      <input type="checkbox" id={uuid} ref={checkboxRef} disabled={disabled} onClick={handleChange} />
      <label htmlFor={uuid} />
      {children && cloneElement(children, { className: 'text', onClick: handleChange })}
    </Wrapper>
  );
});

export default Checkbox;
