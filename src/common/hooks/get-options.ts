import { ref } from 'vue'
import { pickRenameKeys } from '@wxhccc/es-util'
import { smartfetch } from '@/utils'
import { getAcessRoleOptions, getGroupOptions } from '@/api/access'

interface Options extends Common.SelectOption {
  children?: Options
}

const renameOptionsKeys = (
  items: App.AnyObject[],
  keys = ['id', 'name']
): Options[] => {
  const keysMap = { [keys[0]]: 'value', [keys[1]]: 'label' }
  return items.map((item) => {
    const { children, ...rest } = item
    return {
      ...pickRenameKeys(rest, keysMap),
      ...(Array.isArray(children) && children.length
        ? { children: renameOptionsKeys(children, keys) }
        : {})
    } as Options
  })
}

/** 获取用户可用角色下拉列表数据 */
export const useAccessRolesOptions = (autoFetch = true) => {
  const options = ref<Common.SelectOption[]>([])

  const fetchOptions = async () => {
    const [, data] = await smartfetch(getAcessRoleOptions())
    options.value = Array.isArray(data) ? data : []
  }
  autoFetch && fetchOptions()

  return { options, fetchOptions }
}

/** 获取用户可用用户组级联下拉列表数据 */
export const useAccessGroupsOptions = (autoFetch = true) => {
  const options = ref<Common.SelectOption[]>([])

  const fetchOptions = async () => {
    const [, data] = await smartfetch(getGroupOptions())
    options.value = Array.isArray(data) ? renameOptionsKeys(data) : []
  }
  autoFetch && fetchOptions()

  return { options, fetchOptions }
}
