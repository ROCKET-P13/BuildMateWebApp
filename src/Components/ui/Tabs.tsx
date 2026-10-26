import { createContext, useContext, useState, ReactNode } from 'react';

import { mergeTailwindClasses } from '@/utils/mergeTailwindClasses';

interface TabsContextType {
	value: string | null;
	onSelect: (value: string) => void;
}

const TabsContext = createContext<TabsContextType | null>(null);

const useTabs = () => {
	const context = useContext(TabsContext);

	if (!context) {
		throw new Error('Tabs components must be used within <Tabs>');
	}

	return context;
};

interface TabsProps {
	defaultValue?: string;
	value?: string;
	onChange?: (value: string) => void;
	children: ReactNode;
}

export const Tabs = (
	{
		defaultValue,
		value: controlledValue,
		onChange,
		children,
	}: TabsProps
) => {
	const [internalValue, setInternalValue] = useState<string | null>(
		defaultValue ?? null
	);

	const selectedValue = (controlledValue !== undefined) ? controlledValue : internalValue;

	const handleSelect = (val: string) => {
		if (controlledValue === undefined) {
			setInternalValue(val);
		}
		onChange?.(val);
	};

	return (
		<TabsContext.Provider value={{ value: selectedValue, onSelect: handleSelect }}>
			<div className="w-full">
				{children}
			</div>
		</TabsContext.Provider>
	);
};

interface TabProps {
	value: string;
	children: ReactNode;
	className?: string;
}

export const Tab = ({ value, children, className = '' }: TabProps) => {
	const { value: activeValue, onSelect } = useTabs();

	const isActive = activeValue === value;

	return (
		<button
			type="button"
			onClick={() => onSelect(value)}
			className={
				mergeTailwindClasses(
					'px-4 py-2 font-medium transition-colors',
					isActive
						? 'border-b-2 border-primary'
						: 'text-muted-foreground hover:text-foreground',
					className
				)
			}
		>
			{children}
		</button>
	);
};

interface TabPanelProps {
	value: string;
	children: ReactNode;
	className?: string;
}

export const TabPanel = ({ value, children, className = '' }: TabPanelProps) => {
	const { value: activeValue } = useTabs();

	if (value !== activeValue) {
		return null;
	}

	return (
		<div className={mergeTailwindClasses('mt-4', className)}>
			{children}
		</div>
	);
};