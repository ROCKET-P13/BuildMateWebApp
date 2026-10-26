import { forwardRef, HTMLAttributes, useId } from 'react';

import { mergeTailwindClasses } from '@/utils/mergeTailwindClasses';

interface CheckboxProps extends HTMLAttributes<HTMLInputElement> {
	label?: string,
	checked?: boolean,
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
	disabled?: boolean,
	error?: boolean,
	required?: boolean,
	id?: string,
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
	(
		{
			label,
			checked = false,
			onChange,
			disabled,
			error,
			required,
			id,
			className = '',
			...props
		},
		ref
	) => {
		const generatedId = useId();
		const checkboxId = id ?? generatedId;

		return (
			<label
				htmlFor={checkboxId}
				className={
					mergeTailwindClasses(
						'flex items-center gap-3 cursor-pointer select-none',
						disabled ? 'opacity-50 cursor-not-allowed' : '',
						className
					)
				}
			>

				<input
					id={checkboxId}
					ref={ref}
					type="checkbox"
					checked={checked}
					onChange={onChange}
					disabled={disabled}
					required={required}
					className="sr-only"
					{...props}
				/>

				<div
					className={
						mergeTailwindClasses(
							'flex h-5 w-5 items-center justify-center rounded border transition-colors',
							checked
								? 'bg-primary border-primary'
								: 'bg-background border-input',
							error ? 'border-destructive' : ''
						)
					}
				>
					{
						checked && (
							<svg
								viewBox="0 0 24 24"
								className="h-4 w-4 text-primary-foreground"
								fill="none"
								stroke="currentColor"
								strokeWidth="3"
							>
								<polyline points="20 6 9 17 4 12" />
							</svg>
						)
					}
				</div>

				{
					label && (
						<span className="text-sm text-foreground">
							{label}
							{
								required && (
									<span className="ml-1 text-destructive">*</span>
								)
							}
						</span>
					)
				}

			</label>
		);
	}
);

Checkbox.displayName = 'Checkbox';