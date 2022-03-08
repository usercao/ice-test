import React, { ComponentClass, ComponentElement, RefObject } from 'react';
import ReactDOM from 'react-dom';
import StackItem from './StackItem';
import { NotificationPropsBase, NotificationReturnInstance } from './PropsType';

function isAtBottom() {
  return 'topLeft'.indexOf('bottom') === 0;
}

export default class StackManager {
  private notifyList: ComponentElement<NotificationPropsBase, StackItem>[] = [];

  private component: ComponentClass<NotificationPropsBase, {}>;

  private containerCls: string;

  private keySeed = 0;

  private componentName: string;

  constructor(component: ComponentClass<NotificationPropsBase, {}>, componentName: string) {
    this.containerCls = `${(component.defaultProps as NotificationPropsBase).prefixCls}-container`;
    this.component = component;
    this.componentName = componentName;
  }

  private render() {
    const list = this.notifyList.filter((item) => item.props);
    ReactDOM.render(<>{list}</>, this.getContainerDom(true));
  }

  private getContainerDom(create?: boolean) {
    let div = document.querySelector(`.message-root`);
    if (!div && create) {
      div = document.createElement('div');
      div.className = `message-root`;
      document.body.appendChild(div);
    }
    return div as HTMLDivElement;
  }

  // private remove(key: string) {
  //   const index = this.notifyList.findIndex((item) => item.key === key)
  //   if (index > -1) {
  //     this.notifyList.splice(index, 1)
  //     this.render()
  //   }
  // }

  // To display a new StackItem
  open(props: NotificationPropsBase): NotificationReturnInstance {
    const newKey = props.key || String((this.keySeed += 1));
    // const position = getPosition(props.position);
    const newRef = React.createRef<StackItem>();

    const stackItem = (
      <StackItem
        {...props}
        key={newKey}
        ref={newRef}
        // position={position}
        Component={this.component}
        name={`${this.componentName}`}
        // willUnmount={() => this.remove(newKey)}
      />
    );
    const existingIndex = this.notifyList.findIndex((item) => item.key === newKey);
    if (existingIndex !== -1) {
      this.notifyList[existingIndex] = stackItem;
    } else if (isAtBottom()) {
      this.notifyList.unshift(stackItem);
    } else {
      this.notifyList.push(stackItem);
    }
    this.render();
    return {
      close: () => this.close(newKey),
      update: (newOptions) => {
        this.update(newKey, newOptions);
      },
    };
  }

  update(key: string, newOptions: any) {
    const notify = this.notifyList.find((item) => item.key === key);
    if (notify) {
      const { current } = notify.ref as RefObject<StackItem>;
      if (current) {
        current.setState(newOptions);
      }
    }
  }

  // To close single one
  close(key: string) {
    const notify = this.notifyList.find((item) => item.key === key);
    if (notify) {
      const { current } = notify.ref as RefObject<StackItem>;
      current && current.close();
    }
  }

  // To close all
  closeAll() {
    this.notifyList.forEach((notify) => {
      const { current } = notify.ref as RefObject<StackItem>;
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
