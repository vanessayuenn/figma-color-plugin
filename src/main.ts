import { on, once, showUI } from '@create-figma-plugin/utilities'

import { ColorInputHandler, ResizeWindowHandler, GenerateColorSchemeHandler } from './types'

export default function () {
  on<ResizeWindowHandler>(
    'RESIZE_WINDOW',
    function (windowSize: { width: number; height: number }) {
      const { width, height } = windowSize
      figma.ui.resize(width, height)
    }
  )

  on<ColorInputHandler>('INPUT_COLOR', async function (color: string) {
    try {
      const res = await fetch(`https://www.thecolorapi.com/id?hex=${color}&format=svg`)
      const node = figma.createNodeFromSvg(await res.text())
      figma.currentPage.selection = [node]
      figma.viewport.scrollAndZoomIntoView([node])
    } catch (error) {
      console.error(error)
      figma.notify('An error occurred')
    }
  })
  on<GenerateColorSchemeHandler>('GENERATE_COLOR_SCHEME', async function (color: string) {
    try {
      const res = await fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=analogic&count=5&format=svg`)
      const node = figma.createNodeFromSvg(await res.text())
      figma.currentPage.selection = [node]
      figma.viewport.scrollAndZoomIntoView([node])
    } catch (error) {
      console.error(error)
      figma.notify('An error occurred')
    }
  })

  showUI({
    height: 180,
    width: 240
  })
}
