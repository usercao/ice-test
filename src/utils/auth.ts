import Cookies from 'js-cookie';
import { getUserInfo, authorizeCancel } from '@/services/_global';
import { message } from '@/components';

export const AUTH_GUEST = { admin: false, guest: true }; // 访客
export const AUTH_ADMIN = { admin: true, guest: false }; // 用户

// 校验用户权限
export const verifyAuth = async () => {
  const c_token = Cookies.get('c_token');
  if (!c_token) return { auth: AUTH_GUEST };

  try {
    const data = await getUserInfo();
    window.sessionStorage.setItem('userinfo', JSON.stringify(data));
    return { auth: AUTH_ADMIN };
  } catch (error) {
    console.log(error);
    return { auth: AUTH_GUEST };
  }
};

// 清除用户权限
export const cancelAuth = async () => {
  const c_token = Cookies.get('c_token');
  if (!c_token) return;
  // if (!c_token) return { auth: AUTH_GUEST };

  try {
    await authorizeCancel();
    // 老项目抛弃之后修改
    window.sessionStorage.removeItem('userinfo');
    // 老项目抛弃之后修改
    // window.sessionStorage.clear();
    // return { auth: AUTH_GUEST };
  } catch (error) {
    console.log(error);
    message.error('Server error');
    // return { auth: AUTH_GUEST };
  }
};
