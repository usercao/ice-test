import { useCreation } from 'ahooks';
import { uuidv4 } from '@/utils/tools';

const useRandomId = () => {
  const uuid = useCreation(() => uuidv4(), []);

  return uuid;
};

export default useRandomId;
