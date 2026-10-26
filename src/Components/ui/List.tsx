import { HTMLAttributes } from 'react';

import { mergeTailwindClasses } from '@/utils/mergeTailwindClasses';

export const List = (
	{
		className = '',
		...props
	} : HTMLAttributes<HTMLUListElement>
) => {
	return (
		<ul
			className={
				mergeTailwindClasses(
					'flex flex-col divide-y divide-border bg-card',
					className
				)
			}
			{...props}
		/>
	);
};

export const ListItem = (
	{
		className = '',
		children,
		onClick,
		...props
	} : HTMLAttributes<HTMLLIElement>
) => {
	const isClickable = !!onClick;

	return (
		<li
			onClick={onClick}
			className={
				mergeTailwindClasses(
					'flex items-center justify-between px-4 py-3 transition-colors',
					isClickable ? 'cursor-pointer hover:bg-muted/50' : '',
					className
				)
			}
			{...props}
		>
			{children}
		</li>
	);
};

interface ListItemIconProps extends HTMLAttributes<HTMLDivElement> {
	description?: string;
}

export const ListItemIcon = (
	{
		title,
		description,
		className = '',
	} : ListItemIconProps
) => {
	return (
		<div className={mergeTailwindClasses('flex flex-col', className)}>
			<span className='font-medium'>{title}</span>
			{
				description && (
					<span className='text-sm text-muted-foreground'>
						{description}
					</span>
				)
			}
		</div>
	);
};

export const ListItemAction = (
	{
		className = '',
		...props
	} : HTMLAttributes<HTMLDivElement>
) => {
	return (
		<div
			className={
				mergeTailwindClasses(
					'flex items-center gap-2',
					className
				)
			}
			{...props}
		/>
	);
};