declare namespace Group {

  interface Base {
    /** 父级组id */
    pid: number
    /** 组名称 */
    name: string
    /** 所有父级组id列表 */
    parentIds: number[]
    /** 状态， */
    state: number
  }

  interface SearchParams extends Search.ListParam {
    name?: string
  }

  /** 分页列表数据项 */
  type Item = Base & Common.RecordBase

  /** 树形结构数据项 */
  interface TreeIem extends Item {
    isTree?: boolean
    children?: TreeIem[]
  }

  type AddParams = App.PartailExclude<Base, 'name'>

  interface EditParams extends Partial<Base> {
    id?: number
  }

  interface OptionSearchParams {
    pid?: number
  }
}

declare namespace Role {

  interface Base {
    /** 角色名称 */
    name: string
    /** 描述 */
    description: string
    /** 权限项id数组 */
    rightIds: CreationOptional<number[]>
  }
  type Base = SqlModel.Base<Schema>

  interface SearchParams extends Search.ListParam {
    name?: string
  }

  /** 分页列表数据项 */
  type Item = Base & Common.RecordBase

  type AddParams = App.PartailExclude<Base, 'name'>

  interface EditParams extends Partial<Base> {
    id?: number
  }
}

