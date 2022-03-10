/* eslint-disable @typescript-eslint/member-ordering */
import * as React from 'react';
import ReactDOM from 'react-dom';
import StackItem from './StackItem';
import { NotificationPropsBase, NotificationReturnInstance } from './PropsType';

export default class StackManager {
  private notifyList: Array<React.ComponentElement<NotificationPropsBase, StackItem>> = [];
  private component: React.FunctionComponent<NotificationPropsBase>;
  private keySeed = 0;

  constructor(component: React.FunctionComponent<NotificationPropsBase>) {
    this.component = component;
  }

  private render() {
    const list = this.notifyList;
    ReactDOM.render(<>{list}</>, this.getContainerDom(true));
  }

  private getContainerDom(create?: boolean) {
    let div = document.querySelector('#stack-dom');
    if (!div && create) {
      div = document.createElement('div');
      div.id = 'stack-dom';
      document.body.appendChild(div);
    }
    return div as HTMLDivElement;
  }

  // To display a new StackItem
  open(props: NotificationPropsBase): NotificationReturnInstance {
    const newKey = props.key || String((this.keySeed += 1));
    const newRef = React.createRef<StackItem>();
    const stackItem = <StackItem {...props} key={newKey} ref={newRef} Component={this.component} />;
    const existingIndex = this.notifyList.findIndex((item) => item.key === newKey);
    if (existingIndex !== -1) {
      this.notifyList[existingIndex] = stackItem;
    } else {
      this.notifyList.push(stackItem);
    }
    this.render();
    return { close: () => this.close(newKey) };
  }

  // To close single one
  close(key: string) {
    const notify = this.notifyList.find((item) => item.key === key);
    if (notify) {
      const { current } = notify.ref as React.RefObject<StackItem>;
      current && current.close();
    }
  }

  // To close all
  closeAll() {
    this.notifyList.forEach((notify) => {
      const { current } = notify.ref as React.RefObject<StackItem>;
      current && current.close();
    });
  }

  // To unmount & reomve container dom
  destroy() {
    this.notifyList.length = 0;
    const div = this.getContainerDom();
    if (div) {
      ReactDOM.unmountComponentAtNode(div);
      document.body.removeChild(div);
    }
  }
}
