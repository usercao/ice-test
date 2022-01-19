import styled from 'styled-components';
import { t } from '@lingui/macro';

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
  // function imgUrl(params: string) {
  //   // 手动@转/src
  //   return new URL(params, import.meta.url).href;
  // }

  return (
    <Wrapper className="col-center">
      {/* <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
      <p>abcdefghijklmnopqrstuvwxyz</p>
      <p>1234567890</p> */}
      {/* <img src={imgUrl('/src/assets/images/test.png')} alt="icon" /> */}
      {/* <img src={require('@/assets/images/test.png')} alt="icon" /> */}
      <p>{t`hello`}</p>
    </Wrapper>
  );
};

export default Home;
