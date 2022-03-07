import * as React from 'react';
import classNames from 'classnames';
import useRandomId from '@/hooks/useRandomId';
import styled from 'styled-components';

const Wrapper = styled.div`
  align-items: flex-start;
  user-select: none;
  /* 清除默认样式 */
  input {
    display: none;
    opacity: 0;
  }
  /* global */
  label {
    display: block;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    transition: all 0.3s linear;
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
    }
  }
  a {
    color: #06ceab;
  }
  &.checked {
    label {
      border: 1px solid #06ceab;
      background: #06ceab;
    }
  }
  /* base */
  &.sm {
  }
  &.md {
    label {
      width: 18px;
      height: 18px;
    }
    .text {
      margin-left: 9px;
      font-size: 14px;
      line-height: 18px;
      color: rgba(0, 0, 0, 0.6);
    }
  }
  &.lg {
  }
`;

type SizeType = 'sm' | 'md' | 'lg';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  className?: string;
  size?: SizeType;
  checked?: boolean;
  onChange?: (...args: any[]) => any;
}

const Checkbox: React.FC<CheckboxProps> = React.forwardRef((props: CheckboxProps, ref) => {
  const { className, size = 'md', disabled = false, checked = false, children, onChange } = props;

  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/28884
  const checkboxRef = (ref as any) || React.createRef<HTMLInputElement>();
  const uuid = useRandomId();

  React.useEffect(() => {
    if (!checkboxRef || !checkboxRef.current) {
      return;
    }
  }, [checkboxRef]);

  const classes = classNames(className, 'row-start', {
    [`${size}`]: size,
    checked: checked,
    disabled: disabled,
  });

  const handleChange = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if ((e.target as HTMLInputElement).localName === 'a') return;
    onChange?.(!checked, 'checkbox');
  };

  return (
    <Wrapper className={classes} onClick={handleChange}>
      <input ref={checkboxRef} type="checkbox" id={uuid} />
      <label htmlFor={uuid} />
      {children && <div className="text row-start">{children}</div>}
    </Wrapper>
  );
});

export default Checkbox;
