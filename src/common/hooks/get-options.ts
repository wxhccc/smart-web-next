import { ref } from 'vue'
import { smartfetch } from '@/utils'
import { getAcessRoleOptions } from '@/api/access'


/** 获取用户可用角色下拉列表数据 */
export function useAccessRolesOptions(autoFetch = true) {
  const options = ref<Common.SelectOption[]>([])

  const fetchOptions = async () => {
    const [, data] = await smartfetch(getAcessRoleOptions())
    console.log(data)
    options.value =
      data && data.records
        ? data.records.map((item) => ({ label: item.name, value: item.id, thingModelId: item.thingModelId || '' }))
        : []
  }
  autoFetch && fetchOptions()

  return { options, fetchOptions }
}
