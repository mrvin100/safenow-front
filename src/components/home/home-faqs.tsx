'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { TypographyH2, TypographyH3 } from '@/components/ui/typographies';
import { FAQType } from '@src/helpers/util-types';
import { FC, useState } from 'react';
import { AppContainer, Spacer } from '@src/components/global';

export const HomeFAQ: FC = () => {
	const [questions] = useState<FAQType[]>([
		{
			id: 'question1',
			question: 'What happens if I need to extend my leave of absence?',
			response:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. ',
		},
		{
			id: 'question2',
			question: 'How long can I take for a leave of absence?',
			response:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. ',
		},
		{
			id: 'question3',
			question: 'What documentation do I need to provide to support my request for a leave of absence?',
			response:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. ',
		},
		{
			id: 'question4',
			question: "How do I arrange coverage for my work while I'm on a leave of absence?",
			response:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. ',
		},
		{
			id: 'question5',
			question: "Will my job be secure while I'm on a leave of absence?",
			response:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. ',
		},
		{
			id: 'question6',
			question: 'Can I use my sick or vacation time to cover the leave of absence?',
			response:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. ',
		},
	]);

	return (
		<section>
			<AppContainer>
				<TypographyH3 className='tracking-wide text-center'>Frequently <span className='text-primary'>Asked</span> Questions</TypographyH3>
				<Spacer tooSmall />
				<Accordion type='single' collapsible>
					{questions.map((question) => (
						<AccordionItem key={question.id} value={question.id}>
							<AccordionTrigger className='text-xl'>{question.question}</AccordionTrigger>
							<AccordionContent>{question.response}</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</AppContainer>
		</section>
	);
};