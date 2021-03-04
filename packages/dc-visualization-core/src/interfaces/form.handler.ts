export interface IModel<T = any> {
  locale: string
  body: T
}

export type ModelChangeDispose = () => void

export type ModelChangeHandler<T = any> = (context: IModel<T>) => void
