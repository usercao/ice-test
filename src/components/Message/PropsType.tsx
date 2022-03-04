import React from 'react'

export type NotificationIcon = 'default' | 'error' | 'success' | 'warning' | 'info' | 'loading'

export interface NotificationPropsBase {
  prefixCls?: string

  style?: React.CSSProperties
  className?: string

  stayTime?: number
  position?: string

  icon?: React.ReactElement | NotificationIcon
  content?: React.ReactNode

  onClick?: (e?: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onClose?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void

  key?: string
  top?: number | string
  bottom?: number | string
}

export interface NotificationProps extends NotificationPropsBase {
  title?: React.ReactNode
  footer?: React.ReactNode
}

export interface NotificationReturnInstance {
  close(): void
  update(options: any): void
}

export interface NotificationInstanceBase {
  open(props: NotificationProps): NotificationReturnInstance
  success(options: NotificationProps): NotificationReturnInstance
  warning(options: NotificationProps): NotificationReturnInstance
  info(options: NotificationProps): NotificationReturnInstance
  error(options: NotificationProps): NotificationReturnInstance
}
export interface NotificationInstanceExt {
  close(key: string): void
  closeAll(): void
  destroy(): void
}
export type NotificationInstance = NotificationInstanceBase & NotificationInstanceExt

export interface NotificationStackItemProps extends NotificationPropsBase {
  Component: React.ComponentClass<NotificationPropsBase>
  name?: string
  willUnmount?: () => void
}

export type MessageOptions = string | React.ReactNode

export interface MessageInstanceBase {
  open(props: string): NotificationReturnInstance
  success(options?: string): NotificationReturnInstance
  warning(options?: string): NotificationReturnInstance
  info(options?: string): NotificationReturnInstance
  error(options?: string): NotificationReturnInstance
  loading(options?: string): NotificationReturnInstance
}

export interface MessageInstance extends Omit<MessageInstanceBase, 'open' | 'close' | 'closeAll' | 'destroy'> {
  // loading(props: MessageOptions): NotificationReturnInstance;
}
