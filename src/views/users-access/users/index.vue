<script setup lang="ts">
import { computed } from 'vue'
import { CommonListPage } from '@wxhccc/ue-antd-vue'
import { useAppStore } from '@/store'
import { getUserList, updateUser } from '@/api/access'
import GroupSettingPop from './components/GroupSettingPop'
import { tbColumnsCreator, formItemsCreator, operationCreator, actionBtnsCreator } from './data-and-handle'

const store = useAppStore()

  // mixins: [listPageMixin()],
  // components: {
  //   GroupSettingPop
  // },
  // data () {
  //   return this.initPageData({
  //     extraForm: {},
  //     groupSetting: {
  //       show: false,
  //       userInfo: {}
  //     }
  //   }, {
  //     rowKey: 'id',
  //     operation: operationCreator,
  //     actionBtns: actionBtnsCreator,
  //     addRouteName: 'UserAdd',
  //     detailRouteName: 'UserEdit',
  //     handledApis: {
  //       getPageList: getUserList,
  //       setRecordState: updateUser
  //     }
  //   })

const tableColumns = computed(() => {
  const formatters = { state: this.switchFilter('accountState') }
  return tbColumnsCreator(formatters)
})
const formItems = computed(() => {
  const stateOtptions = Array.isArray(this.appConfig.accountState) ? this.appConfig.accountState : []
  return formItemsCreator(stateOtptions)
})


const stateParamsHandle = (row) => {
  return { state: 1 ^ row.state }
}
/** event **/
const groupSettingHandle = (row) => {
  Object.assign(this.groupSetting, { show: true, userInfo: row })
}
const rowDataUpdate = (row, params) => {
  Object.assign(row, params)
}

</script>
<script lang="ts">
export default { name: 'UserListPage' }
</script>
<template>
  <div class="user-list-page">
    <common-list-page
      :paged-data="data"
      :loading="loading"
      :columns="handledColumns"
      :operation="handledOperation"
      created-auto-send
      :search-forms="handledSearchForms"
      :get-paged-data="getPageListData"
      :extra-form="extraForm"
      :restore="$store.getters.remember"
    >
    </common-list-page>
    <!-- <group-setting-pop
      class="group-slide-pane"
      :show.sync="groupSetting.show"
      :user-info="groupSetting.userInfo"
      @on-update-row="rowDataUpdate"
    >
    </group-setting-pop> -->
  </div>
</template>

<style lang="scss" scoped>
</style>
