import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

const DayJSDefaults = {
  timeFormat: 'HH:mm A',
}

export { DayJSDefaults }
export default dayjs
