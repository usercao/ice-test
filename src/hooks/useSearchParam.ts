/* eslint-disable @iceworks/best-practices/recommend-polyfill */
import * as React from 'react';
import { off, on } from './_util';

const getValue = (search: string, param: string) => new URLSearchParams(search).get(param);

export type UseQueryParam = (param: string) => string | null;

const useSearchParam: UseQueryParam = (param) => {
  const { location } = window;
  const [value, setValue] = React.useState<string | null>(() => getValue(location.search, param));

  React.useEffect(() => {
    const onChange = () => {
      setValue(getValue(location.search, param));
    };

    on(window, 'popstate', onChange);
    on(window, 'pushstate', onChange);
    on(window, 'replacestate', onChange);

    return () => {
      off(window, 'popstate', onChange);
      off(window, 'pushstate', onChange);
      off(window, 'replacestate', onChange);
    };
  }, [param, location]);

  return value;
};

export default useSearchParam;
