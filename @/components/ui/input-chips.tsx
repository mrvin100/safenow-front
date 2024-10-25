'use client';

import { Badge } from '@/components/ui/badge';
import { Command, CommandList } from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { Command as CommandPrimitive } from 'cmdk';
import { X } from 'lucide-react';
import * as React from 'react';

type Props = {
	placeholder?: string;
	value?: string[];
	onValueChange?: (value: string[]) => void;
};

export function InputChips({ placeholder, value, onValueChange }: Props) {
	const inputRef = React.useRef<HTMLInputElement>(null);

	const [selected, setSelected] = React.useState<string[]>([]);
	const [inputValue, setInputValue] = React.useState('');

	const handleUnselect = React.useCallback(
		(query: string) => {
			let result = selected.filter((s) => s !== query);

			setSelected(result);

			if (onValueChange) {
				onValueChange(result);
			}
		},
		[onValueChange, selected]
	);

	const handleKeyDown = React.useCallback(
		(e: React.KeyboardEvent<HTMLDivElement>) => {
			const input = inputRef.current;
			if (input) {
				if (e.key === 'Delete' || e.key === 'Backspace') {
					if (input.value === '') {
						setSelected((prev) => {
							const newSelected = [...prev];
							newSelected.pop();
							return newSelected;
						});
					}
				}

				if (e.key === 'Enter' || e.key === 'Tab' || e.key === ';' || e.key === ',') {
					let result = selected;

					if (input.value.trim() !== '') {
						result = [...selected, input.value.trim()];
					}

					setSelected(result);
					setInputValue('');

					if (onValueChange) {
						onValueChange(result);
					}
				}

				// This is not a default behavior of the <input /> field
				if (e.key === 'Escape') {
					input.blur();
				}
			}
		},
		[onValueChange, selected]
	);

	React.useEffect(() => {
		if (value) {
			setSelected(value);
		}
	}, [value]);

	return (
		<Command onKeyDown={handleKeyDown} className='overflow-visible bg-transparent'>
			<div
				className={cn(
					'group rounded-md border border-input px-3 py-2 text-sm ring-offset-background',
					'focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2'
				)}
			>
				<div className='flex flex-wrap gap-1'>
					{selected.map((framework, i) => {
						return (
							<Badge key={`item-${i}`} variant='secondary'>
								{framework}
								<button
									className='ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-accent'
									onKeyDown={(e) => {
										if (e.key === 'Enter') {
											handleUnselect(framework);
										}
									}}
									onMouseDown={(e) => {
										e.preventDefault();
										e.stopPropagation();
									}}
									onClick={() => handleUnselect(framework)}
								>
									<X className='h-3 w-3 text-muted-foreground hover:text-foreground' />
								</button>
							</Badge>
						);
					})}
					{/* Avoid having the "Search" Icon */}
					<CommandPrimitive.Input
						ref={inputRef}
						value={inputValue}
						onValueChange={(value) => setInputValue(value.replace(/[,;]/g, ''))}
						placeholder={placeholder}
						className='ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground'
					/>
				</div>
			</div>
			<div className='relative mt-2'>
				<CommandList>{null}</CommandList>
			</div>
		</Command>
	);
}
