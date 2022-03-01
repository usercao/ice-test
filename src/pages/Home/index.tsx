import * as React from 'react';
import styled from 'styled-components';
import { t } from '@lingui/macro';
import { Modal } from '@/components';

const Wrapper = styled.div`
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
      <img src={require('@/assets/images/test.png')} alt="icon" />
      <p onClick={() => setModalVisible(true)}>{t`hello`}</p>
      <Modal visible={modalVisible}>
        <div onClick={() => setModalVisible(false)}>close</div>
      </Modal>
    </Wrapper>
  );
};

export default Home;
