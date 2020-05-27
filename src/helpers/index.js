/* 
  Concatenate an array of classes.
  @param `classes` array
  @return string
*/
export const concatClasses = (classes) => {
  if (!Array.isArray(classes)) {
    return console.error('Expect an array as parameter')
  }

  return classes.reduce((acc, val) =>
    typeof val === 'string'
      ? acc.concat(` ${val.replace(/\s+/g, ' ')}`).trim()
      : acc
  )
}

/* 
  Convert HEX code into an RGB values.
  @params `hex` string
  @return string
*/
export const hexToRgb = (hex) => {
  if (typeof hex !== 'string')
    return console.error('Expect a string as parameter')

  if (hex.length < 6 || hex.length > 7)
    return console.error('Expect a format like `#ffffff` or `ffffff` ')

  hex = '0x' + hex.replace('#', '')
  let r = (hex >> 16) & 0xff
  let g = (hex >> 8) & 0xff
  let b = hex & 0xff
  return `${r}, ${g}, ${b}`
}

/* 
  Convert RGB values into an HEX code.
  @params `r`, `g`, `b` number
  @return string
*/
export const rgbToHex = (r, g, b) =>
  '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')
