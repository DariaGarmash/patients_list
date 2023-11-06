import React, {FC, useRef, useEffect} from "react";
import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/airbnb.css';
import { dateTimeFormat } from "../../utils/dateUtils";

type TValue = string | Date | null
type TOptions = flatpickr.Options.Options
type DateTimePickerProps = {
    value?: TValue,
    label?: string;
    customOptions?: Omit<TOptions, 'defaultDate'>
    onChange?: (value: string) => void
    disabled?: boolean
}
const DateTimePicker: FC<DateTimePickerProps> = (
        {value, customOptions, onChange, label, disabled}: DateTimePickerProps
    ): JSX.Element => {

    const defaultOptions: TOptions = {
        enableTime: true,
        altInput: true,
        altFormat: 'd M Y H:i',
        time_24hr: true,
    }

    const needConvert = typeof value === 'string'
    const currentValue = value && needConvert ? new Date(value) : undefined;
    const config = {
        ...defaultOptions,
        ...(customOptions && { ...customOptions }),
        defaultDate: currentValue
    }
    
    const node = useRef(null);

    useEffect(() => {
        if(node.current == null){
            return
        }
        
        const flatpickrNode = flatpickr(node.current, config)

        if(onChange){
            const onSelect: flatpickr.Options.Hook = (selectedDates: Date[]) => {
                const updatedValue = dateTimeFormat(selectedDates[0])
                onChange(updatedValue )
            }
            flatpickrNode.config.onChange.push(onSelect)
        }

        return (): void => {
            flatpickrNode.destroy();
        };

    })

    return (
        <div className="datepicker-form-control">
            {label && <span className="label">{label}</span>}
            <input ref={node} disabled={disabled}/>
        </div>
    );
};

export default DateTimePicker;