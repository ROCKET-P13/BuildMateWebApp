import dayjs, { Dayjs } from 'dayjs';
import _ from 'lodash';
import { useId } from 'react';

import { mergeTailwindClasses } from '@/utils/mergeTailwindClasses';

import { Select } from './Select';

interface TimePickerProps {
	value: Dayjs;
	onChange?: (time: Dayjs) => void;
	label?: string;
	required?: boolean;
}

export const TimePicker = ({ value, onChange, label, required }: TimePickerProps) => {
	const time = value ? dayjs(value) : dayjs();

	const hour = time.format('hh');
	const minute = time.format('mm');
	const period = time.format('A');

	const updateTime = (h: string = hour, m: string = minute, p: string = period) => {
		const newTime = dayjs()
			.hour(
				p === 'PM'
					? (parseInt(h) % 12) + 12
					: parseInt(h) % 12
			)
			.minute(parseInt(m))
			.second(0);

		onChange?.(newTime);
	};

	const hours = _.map(_.range(0, 12), (x) => {
		const res = x + 1;
		return res < 10 ? `0${res}` : res.toString();
	});

	const minutes = _.map(_.range(0, 12), (x) => {
		const res = x * 5;
		return res < 10 ? `0${res}` : res.toString();
	});
	const inputId = useId();

	return (
		<div>
			<div>
				{
					label && (
						<label
							htmlFor={inputId}
							className={
								mergeTailwindClasses(
									'text-sm font-medium leading-none',
									'text-foreground'
								)
							}
						>
							{label}
							{
								required && (
									<span className="ml-1 text-destructive">*</span>
								)
							}
						</label>
					)
				}
			</div>
			<div className="flex gap-2">
				<Select value={hour} onChange={(h) => updateTime(h)}>
					<Select.Trigger />
					<Select.Content maxHeight={48}>
						{
							hours.map((h) => (
								<Select.Item key={h} value={h}>{h}</Select.Item>
							))
						}
					</Select.Content>
				</Select>

				<Select value={minute} onChange={(m) => updateTime(hour, m)}>
					<Select.Trigger />
					<Select.Content maxHeight={48}>
						{
							minutes.map((m) => (
								<Select.Item key={m} value={m}>{m}</Select.Item>
							))
						}
					</Select.Content>
				</Select>

				<Select value={period} onChange={(p) => updateTime(hour, minute, p)}>
					<Select.Trigger />
					<Select.Content maxHeight={40}>
						<Select.Item value="AM">AM</Select.Item>
						<Select.Item value="PM">PM</Select.Item>
					</Select.Content>
				</Select>
			</div>
		</div>
	);
};
