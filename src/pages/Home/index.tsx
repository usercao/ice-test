import * as React from 'react';
import styled from 'styled-components';
import { t } from '@lingui/macro';
import { Scrollbar, Modal, Button, Input, Select, Checkbox } from '@/components';
import useCountDown from '@/hooks/useCountDown';

const Wrapper = styled.div`
  /* height: 200px;
  background: green; */
  .img {
    display: block;
    width: 60px;
  }
  /* p {
    margin-bottom: 20px;
    font-size: 40px;
  }
  p:nth-child(1) {
    font-weight: 400;
  }
  p:nth-child(2) {
    font-weight: 500;
  }
  p:nth-child(3) {
    font-weight: 600;
  } */
  .button {
    button + button {
      margin-top: 20px;
    }
  }
  .select {
    width: 120px;
  }
`;

const Home = () => {
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>('1');
  const [list, setList] = React.useState<string[]>(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);

  const [state, setState] = React.useState<boolean>(false);

  const [countDown, isOver, startCountDown] = useCountDown('emailAuth');

  return (
    <Wrapper className="col-center">
      <button
        onClick={() => {
          startCountDown('emailSetPwd', () => {
            console.log('overover');
          });
        }}
      >
        {isOver ? '开始' : `${countDown}s`}
      </button>
      {/* <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
      <p>abcdefghijklmnopqrstuvwxyz</p>
      <p>1234567890</p> */}
      <Scrollbar
        trackStyle={(horizontal) => ({ [horizontal ? 'height' : 'width']: 0 })}
        thumbStyle={(horizontal) => ({ [horizontal ? 'height' : 'width']: 4 })}
        onScroll={(e: React.UIEvent<HTMLDivElement>) => {
          const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
          console.log(scrollTop + clientHeight === scrollHeight);
        }}
      >
        <div>212121212121</div>
      </Scrollbar>
      {/* <i className="iconfont icon-phone"></i> */}
      <img className="img" src={require('@/assets/images/test.png')} alt="icon" />
      <p onClick={() => setModalVisible(true)}>{t`hello`}</p>
      {/* <div className="button">
        <Button type="default" loading>
          hello
        </Button>
        <Button type="danger" loading>
          hello
        </Button>
        <Button type="primary" loading>
          hello
        </Button>
        <Button type="solid" loading>
          hello
        </Button>
        <Button disabled loading>
          hello
        </Button>
        <Button loading>hello</Button>
        <Button size="lg" loading>
          hello
        </Button>
        <Button size="md" loading>
          hello
        </Button>
        <Button size="sm" loading>
          hello
        </Button>
      </div> */}
      {/* <div className="input">
        <Input value={value} danger clear onChange={(e) => setValue(e)} />
        <Input value={value} disabled clear onChange={(e) => setValue(e)} />
        <Input value={value} placeholder="21211221" clear onChange={(e) => setValue(e)} />
        <Input value={value} size="sm" clear onChange={(e) => setValue(e)} />
        <Input value={value} size="md" clear onChange={(e) => setValue(e)} />
        <Input
          value={value}
          size="lg"
          clear
          onChange={(e) => setValue(e)}
          onPressEnter={() => {
            console.log(212122);
          }}
        />
      </div> */}
      <div className="select">
        <Select placeholder="2121313" overlay={<p>{value}</p>}>
          <ul>
            {list.map((ele) => (
              <li key={ele} onClick={() => setValue(ele)}>
                {ele}
              </li>
            ))}
          </ul>
        </Select>
      </div>
      <Checkbox
        checked={state}
        onChange={(e) => {
          setState(e);
        }}
      >
        <p>
          <span>I have read and agreed </span>
          <a
            onClick={() => {
              console.log(111);
            }}
          >
            Terms of Use{' '}
          </a>
          <span>and </span>
          <a
            onClick={(e) => {
              console.log(222);
            }}
          >
            Privacy Agreement
          </a>
        </p>
      </Checkbox>
      <Modal visible={modalVisible}>
        <div onClick={() => setModalVisible(false)}>close</div>
      </Modal>
    </Wrapper>
  );
};

export default Home;
