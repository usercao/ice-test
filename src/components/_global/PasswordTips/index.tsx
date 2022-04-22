import * as React from 'react';
import styled from 'styled-components';
import { t } from '@lingui/macro';

const Wrapper = styled.div`
  position: relative;
  ul {
    position: absolute;
    top: 2px;
    left: 0;
    padding: 8px 0;
    width: 100%;
    background: #ffffff;
    border-radius: 4px;
    box-shadow: 0px 4px 10px rgba(208, 208, 208, 0.5);
    transition: all 0.3s ease-in-out;
    z-index: 1;
    li {
      padding-left: 18px;
      height: 24px;
      i {
        margin-right: 8px;
        font-size: 12px;
        transform: scale(0.8);
        &.icon-select-confirm {
          color: #06ceab;
        }
        &.icon-select-cancel {
          color: #ff7878;
        }
      }
      span {
        font-size: 12px;
        color: #384442;
      }
    }
  }
  .hide {
    opacity: 0;
    transform: translateY(-46px);
    z-index: -1;
  }
`;

interface IProps {
  visible: boolean;
  value: string;
  className?: string;
}

const PasswordTips: React.FC<IProps> = (props: IProps) => {
  const { visible, value, className } = props;
  return (
    <Wrapper className={className}>
      <ul className={`${visible ? '' : 'hide'}`.trimEnd()}>
        <li className="row-start">
          <i className={`iconfont icon-select-${value.length > 7 ? 'confirm' : 'cancel'}`} />
          <span>{t`atLeast8Characters`}</span>
        </li>
        {value.length > 20 && (
          <li className="row-start">
            <i className="iconfont icon-select-cancel" />
            <span>{t`atMost20Characters`}</span>
          </li>
        )}

        <li className="row-start">
          <i className={`iconfont icon-select-${/\d/.test(value) ? 'confirm' : 'cancel'}`} />
          <span>{t`atLeast1Number`}</span>
        </li>
        <li className="row-start">
          <i className={`iconfont icon-select-${/[A-Z]/.test(value) ? 'confirm' : 'cancel'}`} />
          <span>{t`atLeast1UpperCase`}</span>
        </li>
      </ul>
    </Wrapper>
  );
};
export default PasswordTips;
