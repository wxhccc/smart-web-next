declare namespace VuexStore {
  /** Extracts the type of the 'state' parameter of a function type */
  type OmitFirstParameter<T> = T extends (first: any, ...args: infer A) => infer R ? (...args: A) => R : T
  /** Removes the 'state' parameter from a function type. */
  // type ExtractMutation<T> = { [P in keyof T]: OmitStateParameter<T[P], S> }
  type ExtractMethods<T> = { [P in keyof T]: OmitFirstParameter<T[P]> }

  /** get the parameters of function exclude first arg */
  type ParameterWithoutFirst<T extends (...args: any) => any> = T extends (first: any, ...args: infer P) => any
    ? P
    : never
  /** switch mutations map to commit method */
  type ExtractMutations<T extends App.AnyObject> = <M extends keyof T>(mutation: M, ...args: Parameters<T[M]>) => void
  /** switch mutations map to dispatch method */
  type ExtractActions<T extends App.AnyObject> = <M extends keyof T>(
    mutation: M,
    ...args: Parameters<T[M]>
  ) => Promise<ReturnType<T[M]>>

  /** 图片转视频基础配置 */
  interface ImgToVideoConfig {
    crf: number
    duration: number
  }
}

declare namespace VuexPayload {}
