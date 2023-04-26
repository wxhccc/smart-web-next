import { moduleEditFieldsCreators as pagedTablePageCreators } from './paged-list-page/utils'
import { TplModuleEditFieldsCreator } from './type'

export const tplModuleEditFieldsCreators: Record<string, TplModuleEditFieldsCreator> = {
  ...pagedTablePageCreators
}
