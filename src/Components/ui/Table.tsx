import { HTMLAttributes } from 'react';

import { mergeTailwindClasses } from '@/utils/mergeTailwindClasses';

const TableContainer = ({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) => {
	return (
		<div className={
			mergeTailwindClasses(
				'rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden',
				className
			)
		}
		{...props}
		/>
	);
};

const Table = ({ className = '', ...props }: HTMLAttributes<HTMLTableElement>) => {
	return (
		<div className="relative w-full overflow-auto">
			<table
				className={
					mergeTailwindClasses(
						'w-full caption-bottom text-sm',
						className
					)
				}
				{...props}
			/>
		</div>
	);
};

const TableHeader = ({ className = '', ...props }: HTMLAttributes<HTMLTableSectionElement>) => {
	return (
		<thead
			className={mergeTailwindClasses(
				'[&_tr]:border-b',
				className
			)}
			{...props}
		/>
	);
};

const TableBody = ({ className = '', ...props }: HTMLAttributes<HTMLTableSectionElement>) => {
	return (
		<tbody
			className={mergeTailwindClasses(
				'[&_tr:last-child]:border-0',
				className
			)}
			{...props}
		/>
	);
};

const TableFooter = ({ className = '', ...props }: HTMLAttributes<HTMLTableSectionElement>) => {
	return (
		<tfoot
			className={mergeTailwindClasses(
				'border-t bg-muted/50 font-medium [&>tr]:last:border-b-0',
				className
			)}
			{...props}
		/>
	);
};

const TableRow = ({ className = '', ...props }: HTMLAttributes<HTMLTableRowElement>) => {
	return (
		<tr
			className={mergeTailwindClasses(
				'border-b border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
				className
			)}
			{...props}
		/>
	);
};

const TableHead = ({ className = '', ...props }: HTMLAttributes<HTMLTableCellElement>) => {
	return (
		<th
			className={mergeTailwindClasses(
				'h-10 px-4 text-left align-middle font-medium text-muted-foreground',
				'whitespace-nowrap',
				className
			)}
			{...props}
		/>
	);
};

const TableCell = ({ className = '', ...props }: HTMLAttributes<HTMLTableCellElement>) => {
	return (
		<td
			className={mergeTailwindClasses(
				'px-4 py-3 align-middle',
				className
			)}
			{...props}
		/>
	);
};

const TableCaption = ({ className = '', ...props }: HTMLAttributes<HTMLTableCaptionElement>) => {
	return (
		<caption
			className={mergeTailwindClasses(
				'mt-4 text-sm text-muted-foreground',
				className
			)}
			{...props}
		/>
	);
};

export {
	TableContainer,
	Table,
	TableHeader,
	TableBody,
	TableFooter,
	TableRow,
	TableHead,
	TableCell,
	TableCaption
};
