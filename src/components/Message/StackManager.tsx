/* eslint-disable @typescript-eslint/member-ordering */
import * as React from 'react';
import ReactDOM from 'react-dom';
// import ReactDOM from 'react-dom/client';
import StackItem from './StackItem';
import { NotificationProps, NotificationReturnInstance } from './PropsType';

// React 18 introduces new root API ( ReactDOM.createRoot ) | Saeloun Blog
// https://blog.saeloun.com/2021/07/15/react-18-adds-new-root-api.html
export default class StackManager {
  private notifyList: Array<React.ComponentElement<NotificationProps, StackItem>> = [];
  private component: React.FunctionComponent<NotificationProps>;
  private keySeed = 0;

  constructor(component: React.FunctionComponent<NotificationProps>) {
    this.component = component;
  }

  // javascript - Deprecation notice: ReactDOM.render is no longer supported in React 18 - Stack Overflow
  // https://stackoverflow.com/questions/71668256/deprecation-notice-reactdom-render-is-no-longer-supported-in-react-18
  private render() {
    const list = this.notifyList;
    ReactDOM.render(<>{list}</>, this.getContainerDom(true));
    // const root = ReactDOM.createRoot(this.getContainerDom(true) as HTMLElement);
    // root.render(<>{list}</>);
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
  open(props: NotificationProps): NotificationReturnInstance {
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
      // const root = ReactDOM.createRoot(div as HTMLElement);
      // root.unmount();
      document.body.removeChild(div);
    }
  }
}
