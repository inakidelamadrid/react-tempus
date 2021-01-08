import { TOP, BOTTOM } from './constants'

const convertPx = (value) => `${value}px`
/**
 * Getting Div position as far as distance
 * @param node
 * @param direction
 * @param distance
 */
export const getDivPosition = (
  height,
  node,
  direction = BOTTOM,
  distance = 5
) => {
  if (!node) return { left: '', top: '' }

  let top = 0
  let left = 0

  switch (direction) {
    case BOTTOM:
      top = node.offsetTop + node.offsetHeight + distance
      left = node.offsetLeft
      break
    case TOP:
      top = node.offsetTop - height - distance
      left = node.offsetLeft
      break

    default:
      top = left = 0
  }

  return {
    top: convertPx(top),
    left: convertPx(left),
  }
}

export const getDomHeight = (node) => (node ? node.clientHeight : 0)
