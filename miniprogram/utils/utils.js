export function createQueryString(data) {
  let str = ''
  Object.keys(data).forEach(k => {
    str += `${k}=${data[k]}&`
  })
  return str
}