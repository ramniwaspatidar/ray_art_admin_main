/* eslint-disable react-hooks/rules-of-hooks */
import { useCookie } from '@/hooks/useCookie';
import { decryptData, encryptData } from '@/lib/dataEncrypt';



export const getCookieAuthToken = (): string => {
  try {
    const { getCookie } = useCookie();
    const authToken = getCookie('authToken');

    return authToken ? decryptData(authToken) : '';
  } catch (error) {
    return '';
  }
};

export const getUserRole = (): string => {
  try {
    const { getCookie } = useCookie();
    const role = getCookie('role');

    return role ? decryptData(role) : '';
  } catch (error) {
    return '';
  }
};

export const setUserRole = (role : string) => {
   const {setCookie } = useCookie();
    setCookie('role', encryptData(role));
};

export const setCookieAuthToken = (authToken : string) => {
   const {setCookie } = useCookie();
    setCookie('authToken', encryptData(authToken));
};



export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    const { getCookie } = useCookie();
    const authToken = getCookie('authToken');
    return !!authToken;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};

export const logout = () => {
  if (typeof window !== 'undefined') {
    try {
      const { deleteCookie } = useCookie();
      deleteCookie('authToken');
      deleteCookie('userRole');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }
};







