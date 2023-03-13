import { ref } from 'vue'

export const useDetailPageState = () => {
  const loading = ref(false)
  const getInfoFailed = ref(false)

  return { loading, getInfoFailed }
}