import _ from 'lodash';
import { useState, useRef, useEffect, useCallback, KeyboardEvent, ChangeEvent } from 'react';

import { mergeTailwindClasses } from '@/utils/mergeTailwindClasses';

import { Input } from './Input';

interface Option {
	id: string;
	label?: string;
	[key: string]: unknown;
}

interface AutocompleteProps {
	options?: Option[];
	value?: Option | null;
	onChange?: (option: Option) => void;
	getOptionLabel?: (option: Option | null) => string;
	placeholder?: string;
	className?: string;
	label?: string;
}

export const Autocomplete = ({
	options = [],
	value = null,
	onChange,
	getOptionLabel = (option) => option?.label ?? '',
	placeholder = 'Search...',
	className = '',
	label,
}: AutocompleteProps) => {
	const [query, setQuery] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [activeIndex, setActiveIndex] = useState(-1);

	const containerRef = useRef<HTMLDivElement>(null);

	const EventKeys = Object.freeze({
		ARROW_UP: 'ArrowUp',
		ARROW_DOWN: 'ArrowDown',
		ENTER: 'Enter',
	});

	useEffect(() => {
		if (!value) {
			setQuery('');
			return;
		}
		const selectedOption = _.find(options, (option) => option.id === value.id);

		if (selectedOption) {
			setQuery(getOptionLabel(selectedOption));
			return;
		}

		return setQuery(getOptionLabel(value));
	}, [value, getOptionLabel, options]);

	const filteredOptions = options.filter((option) =>
		getOptionLabel(option)
			.toLowerCase()
			.includes(query.toLowerCase())
	);

	const selectOption = (option: Option) => {
		onChange?.(option);
		setQuery(getOptionLabel(option));
		setIsOpen(false);
		setActiveIndex(-1);
	};

	const resetIfInvalid = useCallback(() => {
		const match = options.find(
			(option) => getOptionLabel(option) === query
		);

		if (!match) {
			setQuery(value ? getOptionLabel(value) : '');
		}
	}, [getOptionLabel, options, query, value]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (!containerRef.current?.contains(event.target as Node)) {
				setIsOpen(false);
				resetIfInvalid();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [query, resetIfInvalid]);

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === EventKeys.ARROW_DOWN) {
			e.preventDefault();
			setIsOpen(true);
			setActiveIndex((prev) =>
				prev < filteredOptions.length - 1 ? prev + 1 : prev
			);
		}

		if (e.key === EventKeys.ARROW_UP) {
			e.preventDefault();
			setActiveIndex((prev) => (prev > 0 ? prev - 1 : 0));
		}

		if (e.key === EventKeys.ENTER && activeIndex >= 0) {
			e.preventDefault();
			selectOption(filteredOptions[activeIndex]);
		}

		if (e.key === 'Escape') {
			setIsOpen(false);
			resetIfInvalid();
		}
	};

	return (
		<div
			ref={containerRef}
			className={mergeTailwindClasses('relative w-full', className)}
		>
			<Input
				type="text"
				label={label}
				value={query}
				placeholder={placeholder}
				onFocus={() => setIsOpen(true)}
				onChange={(e: ChangeEvent<HTMLInputElement>) => {
					setQuery(e.target.value);
					setIsOpen(true);
				}}
				onBlur={resetIfInvalid}
				onKeyDown={handleKeyDown}
			/>

			{isOpen && filteredOptions.length > 0 && (
				<ul className="absolute z-50 mt-1 w-full max-h-60 overflow-auto rounded-md border border-border bg-popover shadow-md">
					{
						filteredOptions.map((option, index) => (
							<li
								key={index}
								onMouseDown={() => selectOption(option)}
								className={
									mergeTailwindClasses(
										'cursor-pointer px-3 py-2 text-sm',
										index === activeIndex
											? 'bg-accent text-accent-foreground'
											: 'hover:bg-accent'
									)
								}
							>
								{getOptionLabel(option)}
							</li>
						))
					}
				</ul>
			)}
		</div>
	);
};
