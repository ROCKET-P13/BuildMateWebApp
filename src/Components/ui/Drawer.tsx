import { createContext, forwardRef, HTMLAttributes, ReactNode, useContext, useEffect } from 'react';

import { mergeTailwindClasses } from '@/utils/mergeTailwindClasses';

interface DrawerContextValue {
	open: boolean;
	onClose?: () => void;
}

interface DrawerProps {
	open: boolean;
	onClose?: () => void;
	children: ReactNode;
}

interface DrawerContentProps extends HTMLAttributes<HTMLDivElement> {
	side?: Side;
}

const DrawerContext = createContext<DrawerContextValue | null>(null);

const useDrawerContext = () => {
	const context = useContext(DrawerContext);

	if (!context) {
		throw new Error('Drawer components must be rendered inside a <Drawer> provider');
	}

	return context;
};

export const Drawer = (
	{
		open,
		onClose,
		children,
	} : DrawerProps
) => {
	useEffect(() => {
		const handleKey = (e : KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose?.();
			}
		};

		if (open) {
			window.addEventListener('keydown', handleKey);
		}

		return () => {
			window.removeEventListener('keydown', handleKey);
		};
	}, [open, onClose]);

	return (
		<DrawerContext.Provider value={{ open, onClose }}>
			<div
				onClick={onClose}
				className={
					mergeTailwindClasses(
						'fixed inset-0 z-40 bg-background80 backdrop-blur-sm transition-transform duration-300 ease-in-out',
						open ? 'opacity-100' : 'pointer-events-none opacity-0 overflow-hidden'
					)
				}
			/>
			{children}
		</DrawerContext.Provider>
	);
};

type Side = 'right' | 'left' | 'bottomLeft';

const DrawerContent = forwardRef<HTMLDivElement, DrawerContentProps>(
	(
		{
			side = 'right',
			className = '',
			children,
			...props
		},
		ref
	) => {
		const { open } = useDrawerContext();

		const sideStyles: Record<Side, string> = {
			right: 'right-0 top-0 h-full w-[400px] border-l',
			left: 'left-0 top-0 h-full w-[400px] border-r',
			bottomLeft: 'bottom-0 left-0 w-full h-[400px] border-t',
		};

		const slideStyles: Record<Side, string> = {
			right: open ? 'translate-x-0' : 'translate-x-full',
			left: open ? 'translate-x-0' : '-translate-x-full',
			bottomLeft: open ? 'translate-y-0' : 'translate-y-full',
		};

		return (
			<div
				ref={ref}
				onClick={(e) => e.stopPropagation()}
				className={
					mergeTailwindClasses(
						'fixed z-50 shadow-lg transition-transform duration-300 ease-in-out',
						'bg-background text-foreground border-border',
						sideStyles[side],
						slideStyles[side],
						className
					)
				}
				{...props}
			>
				{children}
			</div>
		);
	}
);

DrawerContent.displayName = 'Drawer.Content';
Drawer.Content = DrawerContent;

const DrawerHeader = ({ className = '', ...props } : HTMLAttributes<HTMLDivElement>) => (
	<div
		className={
			mergeTailwindClasses(
				'p-6 border-b border-border',
				className
			)
		}
		{...props}
	/>
);

Drawer.Header = DrawerHeader;

const DrawerTitle = ({ className = '', ...props } : HTMLAttributes<HTMLHeadingElement>) => (
	<h2
		className={
			mergeTailwindClasses(
				'text-lg font-semibold tracking-tight',
				className
			)
		}
		{...props}
	/>
);

Drawer.Title = DrawerTitle;

const DrawerDescription = ({ className = '', ...props } : HTMLAttributes<HTMLParagraphElement>) => (
	<p
		className={
			mergeTailwindClasses(
				'text-sm text-muted-foreground',
				className
			)
		}
		{...props}
	/>
);

Drawer.Description = DrawerDescription;

const DrawerFooter = ({ className = '', ...props } : HTMLAttributes<HTMLDivElement>) => (
	<div
		className={
			mergeTailwindClasses(
				'p-6 border-t border-border flex justify-end gap-2',
				className
			)
		}
		{...props}
	/>
);

Drawer.Footer = DrawerFooter;