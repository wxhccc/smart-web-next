import { ref } from 'vue'
import { PagedTableProps } from '@wxhccc/ue-antd-vue'

type PagedData<T extends App.AnyObject> = PagedTableProps<T>['pagedData']

export const usePagedData = <T extends App.AnyObject>(initData?: PagedData<T>) => {
  const pagedData = ref({ ...initData })
  const loading = ref(false)

  return { pagedData, loading }
}