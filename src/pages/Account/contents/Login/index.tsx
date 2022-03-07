import * as React from 'react';
import styled from 'styled-components';
import Container from '@/pages/Account/container';
import { t } from '@lingui/macro';

const Wrapper = styled(Container)``;

const Login = () => {
  return <Wrapper>{t`hello`}</Wrapper>;
};

export default Login;
