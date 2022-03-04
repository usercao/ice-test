import React from 'react'
import { NotificationStackItemProps } from './PropsType'
import { fadeConfig } from '../../config/motion'
import { AnimatePresence, motion } from 'framer-motion'
import styled from 'styled-components'

const PortalWrapper = styled(motion.div)`
  /* position: absolute;
  top: 0px;
  left: 0px; */
  /* width: 100%; */
  /* > .inner {
    position: absolute;
    margin-top: 4px;
    min-width: 112px;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.08);
    box-sizing: border-box;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  } */
  pointer-events: auto;
`
// interface MyState extends NotificationStackItemProps, NotificationPropsBase {
//   visible: boolean
// }

export default class StackItem extends React.Component<NotificationStackItemProps, any> {
  private timeout: number = 3000

  static defaultProps = {
    stayTime: 3000,
  }

  constructor(props) {
    super(props)
    this.state = { visible: false }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.icon !== state.icon && state.visible) {
      return { ...props, ...state }
    }
    return null
  }

  componentDidMount() {
    this.setState({ visible: true })
    this.startTimer()
  }

  componentDidUpdate(prevProps: NotificationStackItemProps) {
    const { stayTime } = prevProps
    const { stayTime: newTime } = this.state
    if (stayTime !== newTime) {
      this.stopTimer()
      this.startTimer()
    }
  }

  componentWillUnmount() {
    clearInterval(this.timeout)
  }

  close = () => {
    this.stopTimer()
    this.setState({ visible: false }, this.props.onClose)
  }

  startTimer = () => {
    // state中的stayTime需要通过update更新
    const stayTime = this.state?.stayTime || this.props?.stayTime
    if (stayTime) {
      this.timeout = window.setTimeout(this.close, stayTime)
    }
  }

  stopTimer = () => {
    clearInterval(this.timeout)
  }

  render() {
    const { Component, name, willUnmount, stayTime, onClose, ...rest } = this.state
    const { visible } = this.state

    return (
      <AnimatePresence>
        {visible && (
          <PortalWrapper {...fadeConfig} onClick={(e) => e.stopPropagation()}>
            <Component {...rest} onMouseEnter={this.stopTimer} onMouseLeave={this.startTimer} onClose={this.close} />
          </PortalWrapper>
        )}
      </AnimatePresence>
    )
  }
}
