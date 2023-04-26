import { defineComponent, ref, h, computed } from 'vue'
import { useRoute } from 'vue-router'
import { kebabCase } from 'lodash-es'
import { message } from 'ant-design-vue'
import { CommonListPage, CommonListPageProps, vueTypeProp } from '@wxhccc/ue-antd-vue'
import { smartfetch } from '@/utils'
import { useAppStore } from '@/store'
import { getVirtualPageDetail } from '@/api/system'
import { configJsonToObject } from './utils'
import { PageConfig, GetPagedData } from './type'

export * from './type'

export default defineComponent({
  name: 'PagedListPage',
  props: {
    routeName: vueTypeProp<string>(String),
    config: vueTypeProp<PageConfig>(Object)
  },
  setup(props) {
    const store = useAppStore()
    const route = useRoute()
    const selfConfig = ref<PageConfig>()

    const routeConfig = computed(() => {
      const config = props.config || selfConfig.value || {} as PageConfig
      return configJsonToObject(config)
    })

    const pageClassName = computed(() => props.routeName || kebabCase(route.name as string))

    const fetchPagedData = async (params: App.AnyObject) => {
      const { url, method = 'GET' } = routeConfig.value.getPagedData || {}
      const [err, data] = await smartfetch(url, params, method)
      if (err) {
        throw err
      } else {
        return data
      }
    }

    const getRoutePageConfig = async () => {
      const { virtualPageId } = route.meta
      if (props.config || !virtualPageId) {
        return
      }
      const [, data] = await smartfetch<VirtualRoutes.Detail>(getVirtualPageDetail(virtualPageId as number))
      if (data) {
        selfConfig.value = data.configs
      }
    }

    getRoutePageConfig()

    return () =>
      h(
        'div',
        { class: ['sw-list-page fixed', pageClassName.value] },
        h(CommonListPage, {
          columns: routeConfig.value.tableColumns,
          searchForms: { items: routeConfig.value.searchFormItems, },
          request: fetchPagedData,
          paramsSwitchMaps: routeConfig.value.paramsSwitchMaps,
          createdAutoSend: true
        } as CommonListPageProps)
      )
  }
})
