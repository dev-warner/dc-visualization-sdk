export interface ISettings {
  hub: IHub
  preview: IPreview
  contentId: string
  snapshotId: string
  contentTypeId: string
  selectedDevice: IDevice
  effectiveContentType: ISchema
  visualization: IVisualizationSetting
}

export interface IDevice {
  name: string
  height: number
  rotated: boolean
  orientate: boolean
  width: number
}

export interface IHub {
  name: string
  id: string
}

export type ISchema = Record<string, any>

export interface IVisualizationSetting {
  label: string
  default: boolean
  vseDomain: string
  hasLocaleToken: boolean
  templatedUri: string
  actualTemplatedUri: string
}

export interface IPreview {
  vse: string
  contentItemId: string
}
