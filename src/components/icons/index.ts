import { defineComponent, h, Component, markRaw } from 'vue'
import Icon from '@ant-design/icons-vue'
/** 菜单部分 */
import IconMonitor from './svg/menu/icon-monitor.svg?component'
/** 其他图标 */


const wrapWithIcon = (Comp: Component) =>
  markRaw(
    defineComponent({
      setup(props) {
        return () => h(Icon, { class: 'sw-custom-icon', component: Comp, ...props })
      }
    })
  )
export const menuIcons: Record<string, ReturnType<typeof wrapWithIcon>> = {
  Optinization: wrapWithIcon(IconMonitor)
}
