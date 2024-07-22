
import { Bold, Button, Stack, Container, Muted, Text, TextboxColor, VerticalSpace, render, useWindowResize } from '@create-figma-plugin/ui'
import { emit } from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { ResizeWindowHandler, ColorInputHandler, GenerateColorSchemeHandler } from './types'
import { useCallback, useState } from 'preact/hooks'


function Plugin() {
  const [color, setColor] = useState<string | ''>('D0481B')

  const onWindowResize = (windowSize: { width: number; height: number }) => {
    emit<ResizeWindowHandler>('RESIZE_WINDOW', windowSize)
  }

  const onColorInput = useCallback(function () {
    if (color !== '') {
      emit<ColorInputHandler>('INPUT_COLOR', color)
    }
  }, [color]
  )

  const onGenerateColorScheme = useCallback(function () {
    if (color !== '') {
      emit<GenerateColorSchemeHandler>('GENERATE_COLOR_SCHEME', color)
    }
  }, [color]
  )

  useWindowResize(onWindowResize, {
    maxHeight: 320,
    maxWidth: 320,
    minHeight: 120,
    minWidth: 120,
    resizeBehaviorOnDoubleClick: 'minimize'
  })
  return (
    <Container space="medium">
      <VerticalSpace space="large" />
      <Text>
        <Bold>Input hex code:</Bold>
      </Text>
      <VerticalSpace space="small" />
      <TextboxColor
        onHexColorValueInput={setColor}
        onOpacityInput={() => {}}
        hexColor={color}
        opacity='100'
        variant="border"
      />
      <VerticalSpace space="extraLarge" />
      <Stack space="extraSmall">
        <Button fullWidth onClick={onColorInput}>
          Get Color Name
        </Button>
        <Button fullWidth onClick={onGenerateColorScheme}>
          Generate Color Scheme
        </Button>
      </Stack>
      <VerticalSpace space="small" />
    </Container>
  )
}

export default render(Plugin)
