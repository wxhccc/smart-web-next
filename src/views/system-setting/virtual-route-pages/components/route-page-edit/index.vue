<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { pick } from 'lodash-es'
import { FormInstance } from 'ant-design-vue'
import { FormFields, FormBtns, Loading as UeLoading, vueTypeProp, dateFormat } from '@wxhccc/ue-antd-vue'
import { readJsonFile, saveFileContent } from '@/utils/file-parsers'
import { refToLock, smartfetch, strToUTF8Arr, vwp } from '@/utils'
import PagedTablePageConfig from '@/common/template/paged-list-page/config-edit-tpl.vue'
import { getVirtualPageDetail, createVirtualPage, updateVirtualPage } from '@/api/system'
import ModuleItemForm from './module-item-form.vue'
import { getEditMainFormItems, useTplModuleChose, commonModuleTypeMap } from './utils'

type DataRecord = VirtualRoutes.Item

type EditFormData = VirtualRoutes.AddParams

const props = defineProps({
  data: vueTypeProp<Partial<DataRecord>>(Object, () => ({} as Partial<DataRecord>))
})
const emit = defineEmits(['success', 'cancel'])

const el = ref<HTMLDivElement>()
const form = ref<FormInstance>()
const isPreview = ref(false)
const loading = ref(false)
const sending = ref(false)

const formData = ref<Partial<EditFormData>>({
  configs: {}
})
const pageId = computed(() => props.data?.id as number | undefined)

const configs = computed(() => formData.value.configs)

const { choseItem, choseModuleKey, choseItemData } = useTplModuleChose(configs)

const mainFields = computed(() => getEditMainFormItems())

const compsMap = {
  PagedTablePageConfig: PagedTablePageConfig
}
// 当前使用模版组件的名称，必须先引入并局部注册
const tplComp = computed(() => {
  const { template } = props.data
  return template ? compsMap[`${template}Config`] : null
})

/** 当前选中模块的类型，对于可以通用模块，可以使用名称转换进行匹配。对于模版内特定模块，可以单独导出对应表单域数据，然后在template/index.ts内统一导出 */
const choseModuleType = computed(
  () => commonModuleTypeMap[choseModuleKey.value] || choseModuleKey.value
)

// 导出所有数据到json文件中
const onExportJson = async () => {
  if (!form.value) {
    return
  }
  const [err] = await vwp(form.value.validate())
  if (err) {
    return
  }
  const { template, routeName } = formData.value
  const content = JSON.stringify(formData.value)
  const buffer = strToUTF8Arr(content)
  const fileName = `${template}-${routeName}-${dateFormat(new Date())}.json`
  saveFileContent(buffer, fileName)
}

// 导入json文件
const onImportJson = async (e: Event) => {
  const { files } = e.target as unknown as { files: File[] }
  const [file] = files
  const [, data] = await vwp(readJsonFile<EditFormData>(file))
  if (data) {
    formData.value = data
  }
}

const getRoutePageDetail = async () => {
  const { id } = props.data
  if (!id) {
    return
  }
  const [, data] = await smartfetch(getVirtualPageDetail(id), refToLock(loading))
  if (data) {
    formData.value = pick(data, ['id', 'template', 'name', 'routeName', 'configs'])
  }
  console.log(111, data)
}

const onSubmit = async () => {
  console.log(formData.value)
  const params = formData.value
  const config = pageId.value
    ? updateVirtualPage(pageId.value, params as VirtualRoutes.EditParams)
    : createVirtualPage(params as VirtualRoutes.AddParams)
  const [, data] = await smartfetch(config, refToLock(sending))
  if (data) {
    emit('success')
  }
}

watch(() => props.data, () => {
  formData.value = { configs: {}, ...props.data }
  getRoutePageDetail()
})
</script>
<script lang="ts">
export default { name: 'RoutePageEdit' }
</script>

<template>
  <div ref="el" class="route-edit-container">
    <ue-loading v-if="loading"></ue-loading>
    <a-form ref="form" class="route-edit-header" :model="formData">
      <div class="main-info">
        <form-fields v-model="formData" class="main-info-fields" :items="mainFields" layout="inline" />
      </div>
      <div class="action-btns">
        <a-dropdown-button :get-popup-container="() => el" @click="onExportJson">
          导出JSON
          <template #overlay>
            <a-menu>
              <a-menu-item key="1">
                <input class="json-file-input" type="file" @change="onImportJson" />
                导入JSON
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown-button>
        <form-btns :form="form" submit-confirm :submit="onSubmit" :cancel="() => $emit('cancel')"></form-btns>
      </div>
      <a-button class="preview-btn" @click="() => (isPreview = !isPreview)">
        <eye-outlined />
        {{ isPreview ? '退出预览' : '预览' }}
      </a-button>
    </a-form>
    <section class="route-edit-content">
      <div class="route-tpl-container">
        <component :is="tplComp" v-if="tplComp" v-model="formData.configs" v-model:chose-module="choseItem"
          :preview="isPreview" />
      </div>
      <div v-show="!isPreview" class="tpl-props-form">
        <module-item-form v-model="choseItemData" :type="choseModuleType" />
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.virtual-route-pages .route-edit-container {
  @include flex-block(column);
  @include relative();

  .route-edit-header {
    position: relative;
    display: flex;
    border-bottom: 1px solid #cecece;
  }

  .route-edit-content {
    flex: 1;
    display: flex;
    overflow: hidden;
  }

  .route-tpl-container {
    flex: 1;
    overflow: hidden;
  }

  .tpl-props-form {
    width: 24%;
    min-width: 320px;
    border-left: 1px solid #cecece;
    overflow: hidden;
  }

  .main-info {
    position: relative;
    flex: 1;
    padding: 10px 20px;
    overflow: hidden;
  }

  .preview-btn {
    position: absolute;
    bottom: 8px;
    right: 12px;
  }

  .main-info-fields {
    display: flex;
    flex-wrap: wrap;
    column-gap: 20px;

    .ue-common-field {
      min-width: 260px;
    }

    .page-name-item {
      margin-bottom: 8px;
    }
  }

  .bind-route-info {
    color: #999999;
  }

  .action-btns {
    display: flex;
    flex-wrap: wrap;

    .ant-btn-group {
      margin: 10px 12px;
    }

    .ue-button {
      margin-right: 12px;
    }
  }

  .json-file-input {
    @include absolute;
    opacity: 0;
    width: 100%;
    cursor: pointer;
  }
}
</style>
