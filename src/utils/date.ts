// https://github.com/traPtitech/traQ_S-UI/blob/master/src/lib/basic/date.ts
const getMonthString = (date: Readonly<Date>) => (date.getMonth() + 1).toString().padStart(2, '0')

const getDateString = (date: Readonly<Date>) => date.getDate().toString().padStart(2, '0')

const getHoursString = (date: Readonly<Date>) => date.getHours().toString().padStart(2, '0')

const getMinutesString = (date: Readonly<Date>) => date.getMinutes().toString().padStart(2, '0')

const getTimeString = (date: Readonly<Date>) => `${getHoursString(date)}:${getMinutesString(date)}`

const getDayString = (date: Readonly<Date>) => `${getMonthString(date)}/${getDateString(date)}`

const getFullDayString = (date: Readonly<Date>) => `${date.getFullYear()}/${getDayString(date)}`

export const getDateRepresentation = (date: Readonly<Date> | string) => {
  const displayDate = new Date(date)
  if (Number.isNaN(displayDate.getTime())) {
    return ''
  }
  const today = new Date()
  const timeString = getTimeString(displayDate)
  const yesterday = new Date(today.getTime() - 1000 * 60 * 60 * 24)

  if (
    displayDate.getFullYear() === today.getFullYear() &&
    displayDate.getMonth() === today.getMonth() &&
    displayDate.getDate() === today.getDate()
  ) {
    return `今日 ${timeString}`
  }
  if (
    displayDate.getFullYear() === yesterday.getFullYear() &&
    displayDate.getMonth() === yesterday.getMonth() &&
    displayDate.getDate() === yesterday.getDate()
  ) {
    return `昨日 ${timeString}`
  }
  if (displayDate.getFullYear() === today.getFullYear()) {
    return `${getDayString(displayDate)} ${timeString}`
  } else {
    return `${getFullDayString(displayDate)} ${timeString}`
  }
}

const days = ['日', '月', '火', '水', '木', '金', '土']
export const getDateDayString = (date: Readonly<Date> | string) => {
  const displayDate = new Date(date)
  if (Number.isNaN(displayDate.getTime())) return ''
  const today = new Date()

  const dayString =
    displayDate.getFullYear() === today.getFullYear()
      ? getDayString(displayDate)
      : getFullDayString(displayDate)

  return `${dayString} (${days[displayDate.getDay()]})`
}

export const toDateISOOrNull = (date: Date | null): string | null => {
  if (!date) return null
  return date.toLocaleDateString('sv-SE', { timeZone: 'Asia/Tokyo' }) // 'YYYY-MM-DD'形式
}
