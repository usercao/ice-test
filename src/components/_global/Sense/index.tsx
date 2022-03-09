import { SENSE_ID } from '@/config/const';
import { getGeetestInfo } from '@/services/account';
import { useMount } from 'ahooks';

const Sense: React.FC = () => {
  useMount(async () => {
    const data = await getGeetestInfo(SENSE_ID);
    console.log(data);
  });

  return <span />;
};

export default Sense;
