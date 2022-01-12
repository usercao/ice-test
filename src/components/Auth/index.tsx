// src/components/LoginWrapper
import { useAuth, Redirect } from 'ice';

const LoginWrapper = (WrappedComponent) => {
  const LoginWrappedPage = (props) => {
    const isLogin = true; // 替换成业务逻辑
    return <>{isLogin ? <WrappedComponent {...props} /> : <Redirect to="/login" />}</>;
  };

  return LoginWrappedPage;
};

export default LoginWrapper;
