import { createContext, useContext, useMemo, Children, cloneElement, ReactNode, ReactElement } from 'react';

import { mergeTailwindClasses } from '@/utils/mergeTailwindClasses';

interface StepperContextType {
	currentStep: number;
	onStepChange?: (step: number) => void;
	total: number;
	orientation: 'horizontal' | 'vertical';
}

const StepperContext = createContext<StepperContextType>({
	currentStep: 0,
	onStepChange: () => {},
	total: 0,
	orientation: 'horizontal',
});

interface StepperProps {
	children: ReactNode;
	currentStep?: number;
	onStepChange?: (step: number) => void;
	orientation?: 'horizontal' | 'vertical';
	className?: string;
}

const Stepper = ({
	children,
	currentStep = 0,
	onStepChange,
	orientation = 'horizontal',
	className = '',
}: StepperProps
) => {
	const steps = Children.toArray(children);

	const value = useMemo(() => ({
		currentStep,
		onStepChange,
		total: steps.length,
		orientation,
	}), [currentStep, onStepChange, steps.length, orientation]);

	const isHorizontal = orientation === 'horizontal';

	return (
		<StepperContext.Provider value={value}>
			<div className={
				mergeTailwindClasses(
					'relative w-full',
					isHorizontal ? 'flex flex-col gap-4' : '',
					className
				)
			}>
				<div className={
					mergeTailwindClasses(
						isHorizontal
							? 'relative flex justify-between items-center'
							: 'flex flex-col gap-6'
					)
				}>
					{
						steps.map((child, index) => cloneElement(child as ReactElement<StepProps>, { index }))
					}
				</div>
			</div>
		</StepperContext.Provider>
	);
};

interface StepProps {
	title: string;
	description?: string;
	index?: number;
	error?: boolean;
}

const Step = (
	{
		title,
		description,
		index = 0,
		error = false,
	}: StepProps
) => {
	const { currentStep, onStepChange, orientation } = useContext(StepperContext);

	const isCompleted = index < currentStep;
	const isActive = index === currentStep;
	const isClickable = !!onStepChange;

	const baseCircle = `relative z-10 flex h-8 w-8 items-center justify-center rounded-full border text-sm font-medium transition-all`;

	const stateClasses = mergeTailwindClasses(
		isCompleted ? 'bg-primary text-primary-foreground border-primary' : '',
		(isActive && !error) ? 'border-primary text-primary ring-2 ring-primary/30' : '',
		(!isCompleted && !isActive && !error) ? 'border-border bg-background text-muted-foreground' : '',
		error ? 'border-destructive text-destructive ring-2 ring-destructive/30' : ''
	);

	return (
		<div className={
			mergeTailwindClasses(
				orientation === 'horizontal'
					? 'flex flex-col items-center text-center w-full'
					: 'flex items-start gap-4'
			)
		}>
			<span
				className={
					mergeTailwindClasses(
						baseCircle,
						stateClasses,
						isClickable ? 'focus-visible:outline-none' : ''
					)
				}
			>
				{isCompleted ? '✓' : index + 1}
			</span>

			<div className={mergeTailwindClasses('mt-2 space-y-1', (orientation === 'vertical') ? 'mt-0' : '')}>
				<div className={mergeTailwindClasses(
					'text-sm font-medium transition-colors',
					isActive ? 'text-foreground' : 'text-muted-foreground'
				)}>
					{title}
				</div>
				{description && <div className="text-xs text-muted-foreground">{description}</div>}
			</div>
		</div>
	);
};

Stepper.Step = Step;

export { Stepper };
