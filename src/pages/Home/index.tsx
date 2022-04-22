import * as React from 'react';
import styled from 'styled-components';
import { Modal, message } from '@/components';
import { useHistory } from 'ice';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
`;

const Home = () => {
  const history = useHistory();

  const [modalVisible, setModalVisible] = React.useState<boolean>(false);

  return (
    <Wrapper className="col-center">
      <button
        onClick={() => {
          message.success('');
        }}
      >
        message
      </button>
      {/* <Scrollbar
        trackStyle={(horizontal) => ({ [horizontal ? 'height' : 'width']: 0 })}
        thumbStyle={(horizontal) => ({ [horizontal ? 'height' : 'width']: 4 })}
        onScroll={(e: React.UIEvent<HTMLDivElement>) => {
          const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
          console.log(scrollTop + clientHeight === scrollHeight);
        }}
      >
        <div>212121212121</div>
      </Scrollbar> */}
      {/* <i className="iconfont icon-phone"></i> */}
      <button onClick={() => setModalVisible(true)}>modal</button>
      <Modal visible={modalVisible} title="212121" cancel="1111" ok="222">
        <div onClick={() => setModalVisible(false)} style={{ width: 400, height: 400 }}>
          close
        </div>
      </Modal>
    </Wrapper>
  );
};

export default Home;
