import * as React from 'react';

const useRandomId = (number = 8) => {
  const charStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  return React.useMemo(() => {
    let returnStr = '';
    for (let i = 0; i < number; i++) {
      const index = Math.round(Math.random() * (charStr.length - 1));
      returnStr += charStr.substring(index, index + 1);
    }
    return returnStr;
  }, [number]);
};

export default useRandomId;
