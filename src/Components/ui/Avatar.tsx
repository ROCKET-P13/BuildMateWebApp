import _ from 'lodash';
import { HTMLAttributes, useState } from 'react';

import { mergeTailwindClasses } from '@/utils/mergeTailwindClasses';

const Sizes = {
	sm: 'h-8 w-8 text-xs',
	md: 'h-10 w-10 text-sm',
	lg: 'h-12 w-12 text-base',
	xl: 'h-16 w-16 text-lg',
} as const;

type Size = keyof typeof Sizes

const getInitialsFromName = (fullName: string) => {
	if (!fullName) {
		return '';
	};

	const names : string[] = _.chain(fullName).trim().split(' ').value();

	const initials : string = names.length > 1
		? `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`
		: names[0].charAt(0);

	return initials.toUpperCase();
};

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
	src?: string,
	name: string,
	size?: Size,
}

export const Avatar = (
	{
		src,
		name = 'Avatar',
		size = 'md',
		className = '',
		...props
	} : AvatarProps
) => {
	const [imageError, setImageError] = useState(false);

	return (
		<div
			className={
				mergeTailwindClasses(
					'inline-flex items-center justify-center rounded-full bg-gray-200 text-gray-700 overflow-hidden',
					Sizes[size],
					className
				)
			}
			{...props}
		>
			{
				src && !imageError
					? (
						<img
							src={src}
							alt={name}
							onError={() => setImageError(true)}
							className="h-full w-full object-cover"
						/>
					)
					: (
						<span className="font-medium select-none">
							{getInitialsFromName(name)}
						</span>
					)
			}
		</div>
	);
};