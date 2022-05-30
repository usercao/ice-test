/* eslint-disable @iceworks/best-practices/recommend-functional-component */
/* eslint-disable @typescript-eslint/member-ordering */
import * as React from 'react';
import { fadeConfig } from '@/config/motion';
import { AnimatePresence, motion } from 'framer-motion';
import { NotificationStackItemProps } from './PropsType';

export default class StackItem extends React.Component<NotificationStackItemProps, {}> {
  static defaultProps = {
    stayTime: 5_000,
  };
  private timeout: number;
  state = { visible: false };

  componentDidMount() {
    this.setState({ visible: true });
    this.startTimer();
  }

  componentDidUpdate(prevProps) {
    const { stayTime } = prevProps;
    const { stayTime: newTime } = this.props;
    if (stayTime !== newTime) {
      this.stopTimer();
      this.startTimer();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timeout);
  }

  close = () => {
    this.stopTimer();
    this.setState({ visible: false }, this.props.onClose);
  };

  startTimer = () => {
    const { stayTime } = this.props;
    if (stayTime) {
      this.timeout = window.setTimeout(this.close, stayTime);
    }
  };

  stopTimer = () => {
    clearInterval(this.timeout);
  };

  render() {
    const { Component, onClose, ...rest } = this.props;
    const { visible } = this.state;

    return (
      <AnimatePresence>
        {visible && (
          <motion.div {...fadeConfig}>
            <Component {...rest} onMouseEnter={this.stopTimer} onMouseLeave={this.startTimer} onClose={this.close} />
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
}
