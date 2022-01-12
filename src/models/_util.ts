import { AtomEffect, DefaultValue } from 'recoil'

export const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    const savedValue = window.localStorage.getItem(key)
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue))
    }

    onSet((newValue) => {
      if (newValue instanceof DefaultValue) {
        window.localStorage.removeItem(key)
      } else {
        window.localStorage.setItem(key, JSON.stringify(newValue))
      }
    })
  }

export const localForageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    const loadPersisted = async () => {
      const savedValue = await window.localStorage.getItem(key)

      if (savedValue != null) {
        setSelf(JSON.parse(savedValue))
      }
    }

    loadPersisted()

    onSet((newValue) => {
      if (newValue instanceof DefaultValue) {
        window.localStorage.removeItem(key)
      } else {
        window.localStorage.setItem(key, JSON.stringify(newValue))
      }
    })
  }

// export const authenticationInfoState = atom<AuthenticationInfo | null>({
//   key: 'authenticationInfoState',
//   default: null,
//   effects_UNSTABLE: [localStorageEffect<AuthenticationInfo | null>(LOCAL_STORAGE_KEY)],
// })
