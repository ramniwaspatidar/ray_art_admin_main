'use client';

type SetCookieOptions = {
  minutes?: number;
  hours?: number;
  days?: number;
  path?: string;
};

export function useCookie() {
  const getCookie = (name: string): string | null => {
    const match = document.cookie.match(
      new RegExp('(^| )' + name + '=([^;]+)')
    );
    return match ? decodeURIComponent(match[2]) : null;
  };

  const setCookie = (
    name: string,
    value: string,
    options: SetCookieOptions = {}
  ): void => {
    let { minutes = 0, hours = 0, days = 0, path = '/' } = options;
    let expires = '';

    if (minutes === 0 && hours === 0 && days === 0) {
      hours = 24;
    }

    const totalMs =
      minutes * 60 * 1000 +
      hours * 60 * 60 * 1000 +
      days * 24 * 60 * 60 * 1000;

    if (totalMs > 0) {
      const date = new Date();
      date.setTime(date.getTime() + totalMs);
      expires = '; expires=' + date.toUTCString();
    }

    document.cookie = `${name}=${encodeURIComponent(
      value
    )}${expires}; path=${path}`;
  };

  const deleteCookie = (name: string, path: string = '/'): void => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}`;
  };

  return { getCookie, setCookie, deleteCookie };
}
