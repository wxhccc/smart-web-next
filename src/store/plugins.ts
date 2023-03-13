import { toRaw } from 'vue'
import { PiniaPluginContext, StateTree } from 'pinia'
import { Storage } from '@/utils/storage'

declare module 'pinia' {
  export interface DefineStoreOptionsBase<S, Store> {
    storage?: Partial<StoragePluginOptions<S>>
  }
}

export type CheckStateProp = (store: PiniaPluginContext['store']) => boolean

export type PropPath<K extends string> = K | [K, CheckStateProp]

export interface StoragePluginOptions<S> {
  defaultCore?: 'local' | 'session'
  localPaths?: PropPath<Extract<keyof S, string>>[]
  sessionPaths?: PropPath<Extract<keyof S, string>>[]
}

export const storagePlugin = (contenxt: PiniaPluginContext) => {
  const { store, options } = contenxt
  const { storage } = options
  if (!storage) {
    return
  }
  const { defaultCore = 'local', localPaths, sessionPaths } = storage
  const storeKey = `store-${store.$id}`

  const handleKeys = (keys?: PropPath<string>[]) => {
    return keys
      ? keys.reduce<string[]>((acc, cur) => {
          if (typeof cur === 'string') {
            acc.push(cur)
          } else if (Array.isArray(cur) && cur.length === 2 && cur[1](store)) {
            acc.push(cur[0])
          }
          return acc
        }, [])
      : undefined
  }
  const restoreStateValue = () => {
    const localValue = Storage.get(storeKey)
    const sessionValue = Storage.session(storeKey)
    store.$patch({ ...localValue, ...sessionValue })
  }
  restoreStateValue()
  const storeStateValue = (state: StateTree) => {
    if (localPaths?.length === 0 && sessionPaths?.length === 0) {
      return
    }
    const keys = {
      local: handleKeys(localPaths),
      session: handleKeys(sessionPaths)
    }
    const values = {
      local: {} as StateTree,
      session: {} as StateTree
    }
    Object.keys(state).forEach((key) => {
      const value = toRaw(state[key])
      if (value instanceof Function) {
        return
      }
      if (keys.local?.includes(key) && defaultCore === 'session') {
        values.local[key] = value
      } else if (keys.session?.includes(key) && defaultCore === 'local') {
        value.session[key] = value
      } else if (keys[defaultCore]) {
        if (keys[defaultCore]?.includes(key)) {
          values[defaultCore][key] = value
        }
      } else {
        values[defaultCore][key] = value
      }
    })
    ;(['local', 'session'] as (keyof typeof values)[]).forEach((key) => {
      if (Object.keys(values[key]).length) {
        Storage[key](storeKey, values[key])
      }
    })
  }
  store.$subscribe((_mutation, state) => storeStateValue(state), { detached: true })
}

