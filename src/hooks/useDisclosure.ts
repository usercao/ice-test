import { useCallback, useState } from 'react';

export function useDisclosure(visibleDefault = false) {
  const [visible, setVisible] = useState(visibleDefault);

  const open = useCallback(() => setVisible(true), []);
  const close = useCallback(() => setVisible(false), []);
  const toggle = useCallback(() => setVisible((state) => !state), []);

  return { visible, open, close, toggle };
}
