import { EventHandler } from '@create-figma-plugin/utilities'

export interface ResizeWindowHandler extends EventHandler {
  name: 'RESIZE_WINDOW'
  handler: (windowSize: { width: number; height: number }) => void
}

export interface ColorInputHandler extends EventHandler {
  name: 'INPUT_COLOR'
  handler: (color: string) => void
}

export interface GenerateColorSchemeHandler extends EventHandler {
  name: 'GENERATE_COLOR_SCHEME'
  handler: (color: string) => void
}