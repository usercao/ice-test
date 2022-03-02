import * as React from 'react';
import styled from 'styled-components';
import { t } from '@lingui/macro';
import { Scrollbar, Modal } from '@/components';

const Wrapper = styled.div`
  height: 200px;
  background: green;
  img {
    display: block;
    width: 60px;
  }
  p {
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
  }
`;

const Home = () => {
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);

  return (
    <Wrapper className="col-center">
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
        <div style={{ height: 200 }}>212121212121</div>
      </Scrollbar>
      <i className="iconfont icon-phone"></i>
      <img src={require('@/assets/images/test.png')} alt="icon" />
      <p onClick={() => setModalVisible(true)}>{t`hello`}</p>
      <Modal visible={modalVisible}>
        <div onClick={() => setModalVisible(false)}>close</div>
      </Modal>
    </Wrapper>
  );
};

export default Home;
