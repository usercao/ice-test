import * as React from 'react';
import styled from 'styled-components';
import Container from '@/pages/Account/container';
import { Input, Button } from '@/components';
import { t } from '@lingui/macro';

const Wrapper = styled.div`
  align-items: flex-start;
  padding-left: 84px;
  height: inherit;
  > .inner {
    width: 330px;
    h4 {
      font-weight: 600;
      font-size: 26px;
      line-height: 34px;
      color: #000000;
    }
    .tips {
      margin: 10px 0 45px 0;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      color: rgba(0, 0, 0, 0.4);
    }
    .handle {
      margin-bottom: 26px;
      p {
        padding: 6px 14px;
        background: rgba(0, 0, 0, 0.05);
        border-radius: 4px;
        user-select: none;
        cursor: pointer;
        font-weight: 500;
        font-size: 14px;
        color: #000000;
      }
      p + p {
        margin-left: 12px;
      }
    }
    .label {
      font-weight: 500;
      font-size: 12px;
      line-height: 17px;
      color: #384442;
    }
    .lg {
      height: 46px;
      input {
        font-size: 14px;
      }
    }
    .input {
      margin: 5px 0 16px 0;
    }
    .iconfont {
      color: #384442;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      &:hover {
        color: #06ceab;
      }
    }
    .forget {
      margin: 17px 0;
      font-weight: 600;
      font-size: 14px;
      line-height: 17px;
      color: #06ceab;
      user-select: none;
      cursor: pointer;
    }
    .jump {
      span {
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        color: rgba(0, 0, 0, 0.6);
      }
      span:nth-child(2) {
        color: #06ceab;
        user-select: none;
        cursor: pointer;
      }
    }
  }
`;

const Login = () => {
  const [eye, setEye] = React.useState<boolean>(false);

  return (
    <Container>
      <Wrapper className="col-center">
        <div className="inner">
          <h4>{t`hello`}</h4>
          <p className="tips">{t`hello`}</p>
          <div className="handle row-start">
            <p>{t`hello`}</p>
            <p>{t`hello`}</p>
          </div>
          <p className="label">Email / Phone Number</p>
          <Input className="input" size="lg" placeholder="21212" clear />
          <p className="label">Email / Phone Number</p>
          <Input
            className="input"
            type={eye ? 'text' : 'password'}
            size="lg"
            placeholder="21212"
            suffix={<i className={`iconfont icon-${eye ? 'show' : 'hide'}`} onClick={() => setEye((v) => !v)} />}
            clear
          />
          <Button size="lg">Continue</Button>
          <p className="forget">Forget Password</p>
          <p className="jump">
            <span>Not a member ? </span>
            <span>Sign Up</span>
          </p>
        </div>
      </Wrapper>
    </Container>
  );
};

export default Login;
