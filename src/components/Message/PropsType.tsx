import * as React from 'react';

// ===========================================
// ============= Notification ================
// ===========================================
export type NotificationIcon = 'success' | 'warning' | 'info' | 'error' | 'loading';

export interface NotificationOptions {
  content: string | React.ReactNode;
  stayTime?: number;
}

export interface NotificationProps extends NotificationOptions {
  key?: string;
  icon?: NotificationIcon;
  onClose?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export interface NotificationReturnInstance {
  close: () => void;
}

export interface NotificationInstance {
  open: (props: NotificationProps) => NotificationReturnInstance;
  success: (options: NotificationOptions) => NotificationReturnInstance;
  warning: (options: NotificationOptions) => NotificationReturnInstance;
  info: (options: NotificationOptions) => NotificationReturnInstance;
  error: (options: NotificationOptions) => NotificationReturnInstance;
  close: (key: string) => void;
  closeAll: () => void;
  destroy: () => void;
}

export interface NotificationStackItemProps extends NotificationProps {
  Component: React.FunctionComponent<NotificationProps>;
}

// ===========================================
// ============= Message =====================
// ===========================================
export type MessageIcon = NotificationIcon;

export type MessageProps = NotificationProps;

export type MessageOptions = MessageProps | React.ReactNode;

export interface MessageInstance {
  loading: (props: MessageOptions) => NotificationReturnInstance;
  success: (options: string) => NotificationReturnInstance;
  warning: (options: string) => NotificationReturnInstance;
  info: (options: string) => NotificationReturnInstance;
  error: (options: string) => NotificationReturnInstance;
}
