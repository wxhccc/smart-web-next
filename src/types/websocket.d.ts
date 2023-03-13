/** websocket模块 */
declare namespace WS {
  type MessageType = 'notice' | 'task'
  interface MessagePayload<T extends MessageType, D extends any = any> {
    type: T
    data?: D
  }

  /** 任务数据 */
  type TaskData<N extends string, T extends App.AnyObject> = {
    /** 任务id */
    id: string
    /** 任务名称 */
    name: N
  } & T

}
