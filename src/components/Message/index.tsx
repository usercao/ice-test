import * as React from 'react';
import { MessageProps, MessageIcon, MessageOptions, MessageInstance } from './PropsType';
import StackManager from './StackManager';
import Message from './Message';

// To muster options
export function handleOptions(options: MessageProps | React.ReactNode): MessageProps {
  if (options && Object.prototype.toString.call(options) === '[object Object]' && !React.isValidElement(options)) {
    return { ...(options as MessageProps) };
  }
  return { content: options as React.ReactNode };
}

const managerInstance = new StackManager(Message);

function showMessage(options: MessageOptions, icon: MessageIcon) {
  const newOptions = handleOptions(options);
  newOptions.icon = icon;
  if (!newOptions.stayTime && newOptions.stayTime !== 0) {
    newOptions.stayTime = newOptions.icon === 'loading' ? 0 : 3_000;
  }
  return managerInstance.open(newOptions);
}

const messageInstance: Partial<MessageInstance> = {};

['success', 'warning', 'info', 'error', 'loading'].forEach((iconType) => {
  messageInstance[iconType] = (options: MessageOptions) => {
    return showMessage(options, iconType as MessageIcon);
  };
});

export default messageInstance as MessageInstance;
