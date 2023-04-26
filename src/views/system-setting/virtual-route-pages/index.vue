<script setup lang="ts">
import { ref, computed } from 'vue'
// import { message } from 'ant-design-vue'
import { getVirtualPages, deleteVirtualPage } from '@/api/system'
import RoutePageList from './components/route-page-list.vue'
import RoutePageEdit from './components/route-page-edit/index.vue'
import { refToLock, smartfetch } from '@/utils';

type DataRecord = VirtualRoutes.Item

interface DetailState {
  show: boolean
  data?: Partial<DataRecord>
}

const routePages = ref<DataRecord[]>([])
const loading = ref(false)
const detailState = ref<DetailState>({ show: false })

const onEditRoutePage = (data?: DetailState['data']) => {
  detailState.value = { show: true, data: data || { template: 'PagedTablePage' } }
}

const onDeleteRoutePage = async (data: DataRecord) => {
  const [err] = await smartfetch(deleteVirtualPage(data.id))
  if (!err) {
    getAllRoutePages()
  }
}

const backToList = () => {
  detailState.value = { show: false }
}

const getAllRoutePages = async () => {
  const [, data] = await smartfetch<DataRecord[]>(getVirtualPages(), refToLock(loading))
  routePages.value = Array.isArray(data) ? data : []
}

const onEditSuccess = () => {
  backToList()
  getAllRoutePages()
}

getAllRoutePages()
</script>
<script lang="ts">
export default { name: 'VirtualRoutePages' }
</script>

<template>
  <div class="virtual-route-pages fixed">
    <transition-group :class="['slider-container', { 'show-detail': detailState.show }]" tag="section" name="slide">
      <div key="list" class="slider-pane page-list-pane">
        <route-page-list :data="routePages" :loading="loading" @edit="onEditRoutePage" @delete="onDeleteRoutePage"></route-page-list>
      </div>
      <div key="detail" class="slider-pane page-detail-pane">
        <route-page-edit :data="detailState.data" @cancel="backToList" @success="onEditSuccess" />
      </div>
    </transition-group>
  </div>
</template>

<style lang="scss">
.virtual-route-pages {
  .slider-container {
    @include relative();
    display: flex;
    overflow: hidden;
    background-color: #ffffff
  }
  .slider-pane {
    @include absolute();
  }
  .page-detail-pane {
    transform: translateX(100%);
  }
  .slider-container.show-detail {
    .page-list-pane {
      transform: translateX(-100%);
    }
    .page-detail-pane {
      transform: translateX(0);
    }
  }
  .slide-move {
    transition: transform 0.4s ease;
  }
}
</style>
