<script lang="ts">
import { defineComponent, computed, h } from 'vue'
import { Alert, Row, Col, Spin, PageHeader, PageHeaderProps } from 'ant-design-vue'
import { isFunction } from 'lodash-es'
import { vueTypeProp } from '@wxhccc/ue-antd-vue'

type CProps = Partial<Record<'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl', number>>

export default defineComponent({
  name: 'DetailPageFrame',
  props: {
    /** 获取信息是否失败 */
    getInfoFailed: Boolean,
    /** 页面Col列的个数，默认1为一个，2左右两列，为0没有Row和Col */
    colsNum: vueTypeProp<0 | 1 | 2>(Number, 1),
    /** 数据是否在请求中 */
    loading: Boolean,
    title: vueTypeProp<string | PageHeaderProps>([Object, String]),
    colProps: vueTypeProp<number | CProps>([Number, Object], 18),
    /** 是否铺满容器高度 */
    fullHeight: Boolean
  },
  setup(props, { slots }) {
    const pageTitle = computed(() => {
      const { title } = props
      return { backIcon: false, ...(typeof title === 'string' ? { title } : title) }
    })

    const leftColProps = computed(() => {
      const { colProps } = props
      return typeof colProps === 'number' ? { span: colProps } : colProps
    })

    const rightColProps = computed(() => {
      const { colProps } = props
      if (typeof colProps === 'number') {
        return { span: 24 - colProps }
      }
      const result: CProps = {}
      for (let i in colProps) {
        result[i as keyof CProps] = 24 - (colProps[i as keyof CProps] || 0)
      }
      return result
    })
    const alertNode = h(Alert, { type: 'error', message: '获取数据失败', showIcon: true })

    const modulePane = (nodes?: any) => h('div', { class: 'page-module-pane' }, nodes)

    const contentNodes = () => {
      const { title, default: defSlot } = slots
      const titleNodes = isFunction(title)
        ? title()
        : props.title
        ? h(PageHeader, pageTitle.value)
        : null
      return [titleNodes, isFunction(defSlot) ? defSlot() : null]
    }

    const loadingSpin = computed(() =>
      props.loading ? h(Spin, { spinning: true, class: 'common-cover-spin' }) : null
    )

    const mainModule = (two?: boolean) =>
      h(Col, leftColProps.value, {
        default: () => (two ? modulePane(contentNodes()) : contentNodes())
      })

    const rightModule = () => {
      const { right } = slots
      return h(Col, rightColProps.value, {
        default: () => modulePane(isFunction(right) ? right() : null)
      })
    }

    const rowNodes = (two?: boolean) => {
      return [
        loadingSpin.value,
        h(
          Row,
          { class: 'container-inner-row', ...(two ? { gutter: 10 } : {}) },
          {
            default: () => (two ? [mainModule(true), rightModule()] : mainModule())
          }
        )
      ]
    }

    const allNodes = computed(() => {
      const { colsNum, loading } = props
      return [
        ,
        colsNum
          ? colsNum === 2
            ? rowNodes(true)
            : modulePane(rowNodes())
          : modulePane([loadingSpin.value, contentNodes()])
      ]
    })

    return () =>
      h(
        'div',
        { class: ['detail-page-pane', { 'full-height': props.fullHeight }] },
        props.getInfoFailed ? alertNode : allNodes.value
      )
  }
})
</script>

<style lang="scss">
.detail-page-pane {
  .page-module-pane {
    @include page-module-pane;
    position: relative;
    min-height: 100%;
  }

  .ant-page-header {
    padding: 0 6px 12px;
  }
  .container-inner-row {
    min-height: 100%;
  }
  &.full-height {
    .page-module-pane,
    .container-inner-row {
      height: 100%;
    }
  }
}
</style>
