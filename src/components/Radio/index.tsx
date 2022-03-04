import * as React from 'react'
import classNames from 'classnames'
import styled from 'styled-components'
import { useMount } from 'ahooks'

const Wrapper = styled.div`
  cursor: pointer;
  .radio__children {
    cursor: pointer;
  }
  input {
    display: none;
  }
  &.square {
    label .radio__target {
      border-radius: 2px;
    }
    input:checked + label {
      .radio__target {
        border: none;
        background: rgba(255, 196, 18, 1);
        position: relative;
        &::before {
          content: '';
          position: absolute;
          background: #000000;
          width: 6px;
          height: 2px;
          transform: translate(1px, 7px) rotateZ(45deg);
          border-radius: 10px;
        }
        &::after {
          content: '';
          position: absolute;
          background: #000000;
          width: 10px;
          height: 2px;
          transform: translate(4px, 6px) rotateZ(-45deg);
          border-radius: 10px;
        }
      }
    }
  }
  label .radio__target {
    display: block;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.1581);
    cursor: pointer;
    user-select: none;
    transition: all 0.1s linear;
  }
  input:checked + label .radio__target {
    border: 4px solid rgba(255, 196, 18, 1);
  }
`

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'suffix'> {
  className?: string
  type?: 'default' | 'square'
  checked?: boolean
  onChange?: (...args: any[]) => any
}

const Radio: React.FC<RadioProps> = React.forwardRef((props: RadioProps, ref) => {
  const { className, checked = false, type = 'default', onChange } = props

  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/28884
  const inputRef = (ref as any) || React.createRef<HTMLInputElement>()
  const [UUID, setUUID] = React.useState('A')

  React.useEffect(() => {
    if (!inputRef || !inputRef.current) {
      return
    }
  }, [inputRef])

  const classes = classNames(className, type, {
    // disabled: disabled,
  })

  function randomRangeId(num = 8) {
    const charStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let returnStr = ''
    for (let i = 0; i < num; i++) {
      const index = Math.round(Math.random() * (charStr.length - 1))
      returnStr += charStr.substring(index, index + 1)
    }
    return returnStr
  }

  useMount(() => {
    const uuid = randomRangeId()
    setUUID(uuid)
  })

  return (
    <Wrapper className={classes}>
      <input
        type="checkbox"
        id={UUID}
        checked={checked}
        ref={inputRef}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <label htmlFor={UUID} className="row-start">
        <div className="radio__target"></div>
        <div className="radio__children">{props.children}</div>
      </label>
    </Wrapper>
  )
})

export default Radio
