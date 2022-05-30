import * as React from 'react';
import styled from 'styled-components';
import { Button, Modal } from '@/components';

const Wrapper = styled.div`
  main {
    width: 100%;
    min-height: 100vh;
    .box {
      width: 400px;
      .row + .row {
        margin-top: 24px;
      }
      h4 {
        font-weight: 700;
        font-size: 34px;
        color: #06ceab;
      }
      img,
      .backdrop {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        border: 4px solid #06ceab;
      }
      img + img {
        margin-left: 12px;
      }
      .backdrop {
        background-image: url(${require('@/assets/images/test/test.png')});
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
      }
      button {
        margin-top: 34px;
      }
    }
  }
`;

const IMG_NAME = 'test';

const IMG_LIST = [
  { id: 'a', img: new URL(`/src/assets/images/test/${IMG_NAME}.png`, import.meta.url).href },
  { id: 'b', img: new URL(`/src/assets/images/test/${IMG_NAME}.png`, import.meta.url).href },
  { id: 'c', img: new URL(`/src/assets/images/test/${IMG_NAME}.png`, import.meta.url).href },
];

const Home = () => {
  const [visible, setVisible] = React.useState<boolean>(false);

  return (
    <Wrapper>
      <main className="col-center">
        <div className="box">
          {/* ---------------- import ---------------- */}
          <div className="row row-between">
            <h4>1</h4>
            <img src={require('@/assets/images/test/test.png')} alt="test" />
          </div>
          <div className="row row-between">
            <h4>2</h4>
            <img src={new URL(`/src/assets/images/test/${IMG_NAME}.png`, import.meta.url).href} alt="test" />
          </div>
          <div className="row row-between">
            <h4>3</h4>
            <div className="backdrop" />
          </div>
          <div className="row row-between">
            <h4>4</h4>
            <div className="list row-end">
              {IMG_LIST.map((ele) => (
                <img key={ele.id} src={ele.img} alt="test" />
              ))}
            </div>
          </div>
          {/* ---------------- import ---------------- */}
          <Button onClick={() => setVisible(true)}>Modal</Button>
        </div>
        <Modal visible={visible} title="Modal" cancel="cancel" ok="ok" onCancel={() => setVisible(false)}>
          <div style={{ width: 400, height: 400, textAlign: 'center' }}>close</div>
        </Modal>
      </main>
    </Wrapper>
  );
};

export default Home;
