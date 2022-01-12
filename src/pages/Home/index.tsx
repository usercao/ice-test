import styled from 'styled-components';
import { t } from '@lingui/macro';

const Wrapper = styled.div`
  img {
    display: block;
    width: 60px;
  }
`;

const Home = () => {
  function imgUrl(params: string) {
    // 手动@转/src
    return new URL(params, import.meta.url).href;
  }

  return (
    <Wrapper>
      <img src={imgUrl('/src/assets/images/test.png')} alt="icon" />
      <p>{t`hello word`}</p>
    </Wrapper>
  );
};

export default Home;
