import StackManager from './StackManager'
import Message from './Notification'
import { NotificationIcon, MessageInstance, MessageOptions } from './PropsType'
import { handleOptions } from './utils'

const managerInstance = new StackManager(Message, 'message')

export function showMessage(options: MessageOptions, icon: NotificationIcon) {
  const newOptions = handleOptions(options)
  newOptions.icon = icon
  // if (!newOptions.stayTime && newOptions.stayTime !== 0) {
  //   newOptions.stayTime = newOptions.icon === 'loading' ? 0 : 3000
  // }
  return managerInstance.open(newOptions)
}

const messageInstance: Partial<MessageInstance> = {}

;['success', 'warning', 'info', 'error', 'loading'].forEach((iconType) => {
  messageInstance[iconType] = (options: MessageOptions) => {
    return showMessage(options, iconType as NotificationIcon)
  }
})

export default messageInstance as MessageInstance
