/* eslint-disable no-nested-ternary */
// src/components/LoginWrapper
import * as React from 'react';
import { Redirect } from 'ice';
import { useSetRecoilState } from 'recoil';
import { recoilUserInfo } from '@/models/_global';
import { getUserInfo } from '@/services/_global';
import { useSafeState, useMount, useSessionStorageState } from 'ahooks';

const LoginWrapper = (WrappedComponent) => {
  const LoginWrappedPage = (props) => {
    const setUser = useSetRecoilState(recoilUserInfo);
    const [isLogin, setIsLogin] = useSafeState<boolean>(false);
    const [loading, setLoading] = useSafeState<boolean>(true);
    const [, setSessionInfo] = useSessionStorageState('userinfo');

    const getUser = React.useCallback(async () => {
      try {
        const data = await getUserInfo();
        setIsLogin(true);
        setUser(data);
        setLoading(false);
        // 老项目抛弃之后修改
        setSessionInfo(data);
        // 老项目抛弃之后修改
      } catch (e) {
        setIsLogin(false);
        setUser(undefined);
        setLoading(false);
        // 老项目抛弃之后修改
        setSessionInfo(undefined);
        // 老项目抛弃之后修改
      }
    }, [setIsLogin, setLoading, setSessionInfo, setUser]);

    useMount(() => {
      getUser();
    });

    return (
      <>
        {loading ? (
          <div style={{ textAlign: 'center' }}>Loading</div>
        ) : isLogin ? (
          <WrappedComponent {...props} />
        ) : (
          <Redirect to={`/login?redirect=${encodeURIComponent(window.location.href)}`} />
        )}
      </>
    );
  };

  return LoginWrappedPage;
};

export default LoginWrapper;
