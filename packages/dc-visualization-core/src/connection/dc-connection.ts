import { ClientConnection, MC_EVENTS } from 'message-event-channel'

const noop = () => {}

export enum EVENTS {
  GET = 'context-get',
  MODEL_CHANGE = 'dc-model-change',
  REQUEST_CONFIG = 'dc-request-config',
}

export interface Device {}

export interface Hub {
  name: string
  id: string
}

export interface Schema {}

export interface Config {
  hub: Hub
  contentId: string
  snapshotId: string
  contentTypeId: string
  effectiveContentType: Schema
}

export type DeliveryRequestConfig = CD1Config | CD2Config

export interface CD1Config {
  scope: string
}

export interface CD2Config {
  format: string
  depth: string
  locale?: string
}

export interface VisualizationSetting {
  label: string
  default: boolean
  vseDomain: string
  hasLocaleToken: boolean
  templatedUri: string
  actualTemplatedUri: string
}

export interface Preview {
  vse: string
  contentItemId: string
}

export interface Context {
  config: Config
  preview: Preview
  devices: Device[]
  visualizationSettings: VisualizationSetting
}

export interface Model<T = any> {
  locale: string
  body: T
  device: Device
}

export type ModelChangeDispose = () => void

export type ModelChangeHandler<T = any> = (
  context: Model<T>
) => ModelChangeDispose

export class Visualization {
  connection = new ClientConnection()

  static async create() {
    const core = new Visualization()

    return core
  }

  constructor() {}

  async init() {
    this.connection.init()

    return new Promise((resolve, reject) => {
      this.connection.on(MC_EVENTS.CONNECTED, () => resolve(this))
      this.connection.on(MC_EVENTS.CONNECTION_TIMEOUT, () => resolve(null))
    })
  }

  async onModelChange<Body = any>(
    cb: ModelChangeHandler<Body>,
    config: Partial<DeliveryRequestConfig> = {}
  ): Promise<ModelChangeDispose> {
    this.connection.request(EVENTS.REQUEST_CONFIG, config).then(() => {
      this.connection.on(EVENTS.MODEL_CHANGE, (model: Model<Body>) => {
        cb(model)
      })
    })

    return () => this.connection.on(EVENTS.MODEL_CHANGE, noop)
  }

  /**
   *
   * DC
   *
   * 'dc-request-config' -> handlers.push ({ id, config })
   *
   * handlers - > config  //
   *
   *
   *  {
   *    '12412124124':  [() => {}, () => {}],
   *    '124124124124'
   * }
   *
   */

  async getContext(): Promise<Context> {
    const context = await this.connection.request<Context>(EVENTS.GET, null, {
      timeout: false,
    })

    return context
  }
}
