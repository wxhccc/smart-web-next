declare namespace SystemSettings {
  declare namespace Configs {
    /** 配置项 */
    interface Item {
      id: number
      /** 关键字 */
      key: string
      /** 值 */
      value: any
      /** 状态 */
      state: number
      /** 配置值类型, 0=默认，1=字典项 */
      type: number
      /** 描述 */
      describe: string
      /** value数据类型，如果是对象数组，则表示对象中的value的类型, 0=字符串，1=数字 */
      valueType: number
    }
    /** 配置项提交时的单项 */
    interface EditParamsItem extends App.PartailExclude<Item, 'key' | 'value'> {
      isDelete?: boolean
    }
    type DictParamsItem = App.PartailExclude<EditParamsItem, 'key' | 'value' | 'valueType' | 'state'>

    type PublicItem = Pick<Item, 'key' | 'value' | 'type'>
  }
  /** 权限资源 */
  declare namespace Rights {
    interface Base {
      /** 父权限id */
      pid: number
      /** 关联子级节点的key */
      index: string
      /** 菜单标题 */
      title: string
      /** 关键字 */
      key: string
      /** 图标 */
      icon: string
      /** 路由 */
      routes: string
      /** 资源类型，0=菜单，1=功能点 */
      type: number
      /** 虚拟页面配置项id */
      vrid: number
      /** 路由页面地址路径，虚拟页面使用 */
      path: string
      /** 排序值 */
      orderValue: number
      /** 状态，0=禁用，1=正常 */
      state: number
    }

    interface Item extends Base {
      id: number
    }

    interface TreeItem extends Item {
      children?: TreeItem[]
    }

    /** 添加权限项参数 */
    type AddParams = App.PartailExclude<Base, 'key' | 'title' | 'type' | 'state'> 
    /** 修改权限项参数 */
    type EditParams = Partial<Item>
  }
}