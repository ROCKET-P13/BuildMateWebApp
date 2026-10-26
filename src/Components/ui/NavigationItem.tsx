import { ButtonHTMLAttributes, ComponentType, forwardRef, ReactNode, SVGProps } from 'react';

import { mergeTailwindClasses } from '@/utils/mergeTailwindClasses';

import { Icon } from './Icon';

interface NavigationItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon?: ComponentType<SVGProps<SVGSVGElement>>;
	children: ReactNode;
	active?: boolean;
	disabled?: boolean;
}

export const NavigationItem = forwardRef<HTMLButtonElement, NavigationItemProps>(
	(
		{
			icon: NavigationItemIcon,
			children,
			active = false,
			disabled = false,
			className = '',
			...props
		},
		ref
	) => {
		return (
			<button
				ref={ref}
				disabled={disabled}
				className={
					mergeTailwindClasses(
						'flex items-center gap-3 w-full rounded-md px-3 py-2 text-sm transition-colors',
						'text-foreground',
						'hover:bg-accent',
						'hover:text-accent-foreground',
						active ? 'bg-accent text-accent-foreground' : '',
						disabled ? 'opacity-50 pointer-events-none' : '',
						className
					)
				}
				{...props}
			>
				{
					NavigationItemIcon && (
						<Icon as={NavigationItemIcon} className="text-muted-foreground" />
					)
				}
				<span className="truncate">{children}</span>
			</button>
		);
	}
);

NavigationItem.displayName = 'NavigationItem';