import * as React from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { RemoveScroll } from 'react-remove-scroll'
import styled from 'styled-components'
import { fadeConfig } from '../../config/motion'
import { Scrollbar, } from '../index'
import { tuple } from '../_type/type'
import classNames from 'classnames'

const PortalWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 666;
  background: rgba(0, 0, 0, 0.6);
  /* background: rgba(58, 58, 58, 0.3); */
  /* 产品的意思是：用户要能看清蒙层下的字，不能太模糊 */
  /* backdrop-filter: blur(6px); */
  > .inner {
    /* padding: 0 0 24px 0; */
    /* padding-bottom: 24px; */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* width: 436px; */
    border: 0.5px solid rgba(255, 255, 255, 0.08);
    background: #28292e;
    overflow: hidden;
    &.middle {
      width: 440px;
    }
    .header {
      padding: 0 16px 0 20px;
      height: 50px;
      font-weight: 600;
      /* background: rgba(0, 0, 0, 0.0605); */
      background: #26272c;
      h4 {
        i {
          margin-right: 2px;
          font-size: 16px;
          font-weight: 600;
          color: rgba(255, 255, 255, 1);
          transition: all 0.3s ease-in-out;
          transform: rotateZ(180deg);
        }
        span {
          font-size: 14px;
          color: #ffffff;
        }
      }
      .back {
        cursor: pointer;
        user-select: none;
      }
      .close {
        padding-left: 40px;
        cursor: pointer;
        user-select: none;
        i {
          font-size: 20px;
          color: #ffffff;
          transition: all 0.3s ease-in-out;
        }
        &:hover {
          i {
            color: rgba(255, 255, 255, 0.8);
          }
        }
      }
    }
    .content {
      /* padding-bottom: 24px; */
      /* max-height: 80vh; */
      /* overflow-y: auto; */
      .os-host {
        /* min-height: 80vh; */
        max-height: 80vh;
      }
    }
    .footer {
      padding: 0 24px;
      height: 80px;
      > button {
        width: max-content;
        min-width: 74px;
      }
      > button + button {
        margin-left: 8px;
      }
      &.error {
        button:last-child {
          background: rgba(255, 77, 79, 1);
          &:hover {
            background: rgba(255, 77, 79, 0.8);
          }
        }
      }
    }
  }
`

const ModalTypes = tuple('info', 'success', 'error', 'warning', 'confirm')
type SizeTypes = 'default' | 'middle'

export type ModalType = typeof ModalTypes[number]

export interface ModalProps {
  className?: string
  visible?: boolean
  away?: boolean // 点击事件
  type?: ModalType
  onBack?: (...args: any[]) => any
  title?: React.ReactNode
  closable?: boolean
  onClose?: (...args: any[]) => any
  cancel?: React.ReactNode
  onCancel?: (...args: any[]) => any
  ok?: React.ReactNode
  onOk?: (...args: any[]) => any
  children?: React.ReactNode
  size?: SizeTypes
  footer?: React.ReactNode
}

const Portal: React.FC<ModalProps> = (props: ModalProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    away = false,
    type = 'info',
    onBack,
    title,
    closable = true,
    onClose,
    cancel,
    onCancel,
    ok,
    onOk,
    children,
    className,
    size,
    footer,
    ...rest
  } = props

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { onCancel } = props
    onCancel?.(e)
  }

  const handleOk = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { onOk } = props
    onOk?.(e)
  }

  const renderHeader = (
    <div className="header row-between">
      <h4
        className={`row-start ${onBack ? 'back' : ''}`.trimEnd()}
        onClick={() => {
          onBack?.()
        }}
      >
        {onBack && <i className="iconfont icon-arrow_right" style={{ marginLeft: '-6px' }} />}
        <span>{title}</span>
      </h4>
      <div className="close" onClick={(e) => onClose?.(e)}>
        {closable && <i className="iconfont icon-close" />}
      </div>
    </div>
  )

  const renderFooter = (
    <div className={`footer row-end ${type}`.trimEnd()}>
      {/* {onCancel && (
        <Button className="btn-cancel" type="default" onClick={handleCancel}>
          {cancel}
        </Button>
      )}
      {onOk && (
        <Button className="btn-ok" {...rest} onClick={handleOk}>
          {ok}
        </Button>
      )} */}
    </div>
  )

  return createPortal(
    <RemoveScroll>
      <PortalWrapper
        className={className}
        {...fadeConfig}
        onClick={(e) => {
          if (away) return
          e.stopPropagation()
        }}
      >
        <div className={classNames('inner', size)}>
          {(onBack || title || closable) && renderHeader}
          <div className="content">
            <Scrollbar>{children}</Scrollbar>
          </div>
          {cancel || ok ? renderFooter : footer}
        </div>
      </PortalWrapper>
    </RemoveScroll>,
    document.body
  )
}

const Modal: React.FC<ModalProps> = (props: ModalProps) => {
  const { visible = false } = props

  return <AnimatePresence>{visible && <Portal {...props} />}</AnimatePresence>
}

export default Modal
