import * as React from 'react';

// ===========================================
// ============= Notification ================
// ===========================================
export type NotificationIcon = 'success' | 'warning' | 'info' | 'error' | 'loading';
export interface NotificationProps {
  key?: string;
  icon?: React.ReactElement | NotificationIcon;
  content: React.ReactNode;
  stayTime?: number;
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
export type MessageOptions = string | MessageProps | React.ReactNode;
export interface MessageProps extends NotificationProps {
  icon?: NotificationIcon;
}
export interface MessageInstance extends Omit<NotificationInstance, 'open'> {
  loading: (props: MessageOptions) => NotificationReturnInstance;
}
