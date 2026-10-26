import { useEffect, useRef, useState, cloneElement, Children, ReactNode, isValidElement, ReactElement, HTMLAttributes } from 'react';

import { mergeTailwindClasses } from '@/utils/mergeTailwindClasses';

interface DialogSharedProps {
	open?: boolean;
	onClose?: () => void;
	onExited?: () => void;
}

interface DialogProps extends DialogSharedProps {
	children: ReactNode;
}

const Dialog = ({ open, onClose, onExited, children } : DialogProps) => {
	return Children.map(children, (child) => {
		if (!isValidElement(child)) {
			return child;
		}

		return cloneElement(child as ReactElement<DialogSharedProps>, {
			open,
			onClose,
			onExited,
		});
	});
};

interface DialogContentProps extends DialogSharedProps, HTMLAttributes<HTMLDivElement> {}

const DialogContent = (
	{
		open,
		onClose,
		className = '',
		children,
		onExited,
		...props
	} : DialogContentProps
) => {
	const [isMounted, setIsMounted] = useState(false);
	const ref = useRef<HTMLDivElement | null>(null);

	if (open && !isMounted) {
		setIsMounted(true);
	}

	useEffect(() => {
		const handleKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose?.();
			}
		};

		if (isMounted) {
			document.addEventListener('keydown', handleKey);
		}
		return () => document.removeEventListener('keydown', handleKey);
	}, [isMounted, onClose]);

	const handleAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
		if (!open && e.target === ref.current) {
			setIsMounted(false);
			onExited?.();
		}
	};

	if (!isMounted) {
		return null;
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div
				onClick={() => onClose?.()}
				className={
					mergeTailwindClasses(
						'fixed inset-0 bg-background/50 backdrop-blur-sm',
						open
							? 'animate-[dialog-overlay-in_150ms_ease-out]'
							: 'animate-[dialog-overlay-out_150ms_ease-in_forwards]'
					)
				}
			/>

			<div
				ref={ref}
				onClick={(e) => e.stopPropagation()}
				onAnimationEnd={handleAnimationEnd}
				className={
					mergeTailwindClasses(
						'relative z-50 w-full max-w-lg rounded-xl border border-border bg-card shadow-lg pt-5 px-5 mx-4',
						open
							? 'animate-[dialog-content-in_200ms_ease-out]'
							: 'animate-[dialog-content-out_200ms_ease-in_forwards]',
						className
					)
				}
				{...props}
			>
				{children}

				<button
					className={
						mergeTailwindClasses(
							'absolute top-4 right-4 rounded-sm opacity-70',
							'transition-opacity hover:opacity-100 focus:outline-none',
							'focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer'
						)
					}
					onClick={() => onClose?.()}
				>
					✕
				</button>
			</div>
		</div>
	);
};

const DialogHeader = ({ className = '', ...props } : HTMLAttributes<HTMLDivElement>) => {
	return (
		<div
			className={mergeTailwindClasses('flex flex-col space-y-2', className)}
			{...props}
		/>
	);
};

const DialogTitle = ({ className = '', ...props } : HTMLAttributes<HTMLHeadingElement>) => {
	return (
		<h2
			className={
				mergeTailwindClasses(
					'text-lg font-semibold tracking-tight mb-4',
					className
				)
			}
			{...props}
		/>
	);
};

const DialogDescription = ({ className = '', ...props } : HTMLAttributes<HTMLParagraphElement>) => {
	return (
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
};

const DialogFooter = (
	{
		className = '',
		children,
		...props
	} : HTMLAttributes<HTMLDivElement>
) => {
	return (
		<div
			className={
				mergeTailwindClasses(
					'flex justify-end gap-2 pt-4 pb-4',
					className
				)
			}
			{...props}
		>
			{children}
		</div>
	);
};

export {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter
};