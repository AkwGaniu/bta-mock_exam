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
  const formatDay = (day > 9) ? day : `0${day}`
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const formattedDate = `${months[month]} ${formatDay}, ${year}`
  return formattedDate
}
