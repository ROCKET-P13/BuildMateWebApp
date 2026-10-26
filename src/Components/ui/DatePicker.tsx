import dayjs, { Dayjs } from 'dayjs';
import { useState, useMemo } from 'react';

import { mergeTailwindClasses } from '@/utils/mergeTailwindClasses';

import { Button } from './Button';

const buildCalendarDays = (month: Dayjs): Dayjs[] => {
	const start = month.startOf('month').startOf('week');
	const end = month.endOf('month').endOf('week');

	const days: Dayjs[] = [];
	let day = start;

	while (day.isBefore(end) || day.isSame(end, 'day')) {
		days.push(day);
		day = day.add(1, 'day');
	}

	return days;
};

interface DatePickerProps {
	value: Dayjs;
	onChange?: (date: Dayjs) => void;
}

export const DatePicker = ({ value, onChange }: DatePickerProps) => {
	const [currentMonth, setCurrentMonth] = useState(value || dayjs());

	const selected = value ? dayjs(value) : dayjs();

	const currentDays = useMemo(
		() => buildCalendarDays(currentMonth),
		[currentMonth]
	);

	const changeMonth = (dir: number) => {
		setCurrentMonth((prev) =>
			dir > 0 ? prev.add(1, 'month') : prev.subtract(1, 'month')
		);
	};

	return (
		<div className="space-y-4 p-2">
			<div className="flex justify-between items-center">
				<Button
					size="sm"
					variant="ghost"
					onClick={() => changeMonth(-1)}
				>
					◀
				</Button>

				<div className="font-medium">
					{currentMonth.format('MMMM YYYY')}
				</div>

				<Button
					size="sm"
					variant="ghost"
					onClick={() => changeMonth(1)}
				>
					▶
				</Button>
			</div>

			<div className="h-40">
				<div className="grid grid-cols-7 gap-1 text-center text-sm">
					{
						currentDays.map((day) => {
							const isCurrentMonth = day.month() === currentMonth.month();
							const isSelected = selected && day.isSame(selected, 'day');

							return (
								<button
									key={day.toString()}
									onClick={() => onChange?.(day)}
									className={
										mergeTailwindClasses(
											'h-8 w-8 rounded-md text-sm transition-colors',
											isCurrentMonth ? 'hover:bg-accent' : 'opacity-30',
											isSelected ? 'bg-primary text-primary-foreground' : ''
										)
									}
								>
									{day.date()}
								</button>
							);
						})
					}
				</div>
			</div>
		</div>
	);
};
