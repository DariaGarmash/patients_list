import { format, formatDuration, intervalToDuration } from "date-fns"

export const defaultDateFormat = 'dd MMM yyyy'
export const defaultDateTimeFormat = `${defaultDateFormat} HH:mm`

export const dateFormatBase = (formatType: string, dateInput?: string | Date | null) => {
    if(!dateInput){
        return ''
    }

    const date =  dateInput instanceof Date ? dateInput : new Date(dateInput)
    return format(date, formatType)
}

export const dateFormat = (dateInput?: string | Date | null, formatType = defaultDateFormat,) => {
    return dateFormatBase(formatType, dateInput)
}

export const dateTimeFormat = (dateInput?: string | Date | null, formatType = defaultDateTimeFormat) => {
    return dateFormatBase(formatType, dateInput)
}

export const diffYears = (startDate: string, endDate?: string) => {
    const start = new Date(startDate)
    const end = endDate ? new Date(startDate) : new Date()
    const {years} = intervalToDuration({start, end})
    return years || 0
}

export const diffYearsReadable = (years: number) => {
    return formatDuration({years})
}

