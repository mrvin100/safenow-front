import { cn } from '@/lib/utils';
import { FC } from 'react';

export type TagsProps = {
	content: string[];
};

export const Tags: FC<TagsProps> = (props) => {
	return (
		<div className='flex gap-2 flex-wrap whitespace-nowrap min-w-60'>
			{props.content.map((tag, index) => (
				<Tag key={index} tag={tag} />
			))}
		</div>
	);
};

const Tag = ({ tag }: { tag: string }) => {
	// Random bg-color
	const colors = ['#0D5C63', '#320B04', '#842D1B', '#1B2CC1', '#091540'];
	const randomColor = colors[Math.floor(Math.random() * colors.length)];

	return (
		<div
			className={cn('px-[3px] py-[1px] text-white rounded text-[10px] font-bold')}
			style={{ backgroundColor: randomColor }}
		>
			{tag}
		</div>
	);
};
