// export const obj = {
//   currentDate: () => {
//     console.log('here')
//     return true
//   },
//   currentMoment: () => {
//     console.log('here Now')
//     return true
//   }
// }

export function currentDate () {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const formattedDate = `${months[month]} 0${day}, ${year}`
  return formattedDate
}
