import { createPinia } from 'pinia'
import { useAppStore } from './app'
import { storagePlugin } from './plugins'

const pinia = createPinia()
pinia.use(storagePlugin)


export * from './app'
export * from './user'

export default pinia
