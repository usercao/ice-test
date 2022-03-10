import * as React from 'react';
import { NotificationProps, NotificationIcon, MessageOptions, MessageInstance } from './PropsType';
import StackManager from './StackManager';
import Message from './Message';

// To muster options
export function handleOptions(options: NotificationProps | React.ReactNode): NotificationProps {
  if (options && Object.prototype.toString.call(options) === '[object Object]' && !React.isValidElement(options)) {
    return { ...(options as NotificationProps) };
  }
  return { content: options as React.ReactNode };
}

const managerInstance = new StackManager(Message);

function showMessage(options: MessageOptions, icon: NotificationIcon) {
  const newOptions = handleOptions(options);
  console.log(newOptions);

  newOptions.icon = icon;
  if (!newOptions.stayTime && newOptions.stayTime !== 0) {
    newOptions.stayTime = newOptions.icon === 'loading' ? 0 : 3000;
  }
  return managerInstance.open(newOptions);
}

const messageInstance: Partial<MessageInstance> = {
  close(key) {
    managerInstance.close(key);
  },
  closeAll() {
    managerInstance.closeAll();
  },
  destroy() {
    managerInstance.destroy();
  },
};

['success', 'warning', 'info', 'error', 'loading'].forEach((iconType) => {
  messageInstance[iconType] = (options: MessageOptions) => {
    return showMessage(options, iconType as NotificationIcon);
  };
});

export default messageInstance as MessageInstance;
