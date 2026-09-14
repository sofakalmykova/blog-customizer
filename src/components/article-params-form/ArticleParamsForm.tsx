import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useRef, useEffect } from 'react';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import clsx from 'clsx';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
interface ArticleParamsFormProps {
	onApply: (state: ArticleStateType) => void;
	onReset: () => void;
}

export const ArticleParamsForm = ({
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const [isFormOpen, setIsOpen] = useState(false);
	const [draft, setDraft] = useState(defaultArticleState);

	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!isFormOpen) {
			return;
		}
		const handleClickOutside = (e: MouseEvent) => {
			const target = e.target as Element;

			if (containerRef.current && !containerRef.current.contains(target)) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isFormOpen]);
	const updateField = <K extends keyof ArticleStateType>(
		key: K,
		newValue: ArticleStateType[K]
	) => {
		setDraft({ ...draft, [key]: newValue });
	};

	const handleApply = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(draft);
	};
	const handleReset = (e: React.FormEvent) => {
		e.preventDefault();
		onReset();
		setDraft(defaultArticleState);
	};
	return (
		<>
			<div ref={containerRef}>
				<ArrowButton
					isOpen={isFormOpen}
					onClick={() => {
						setIsOpen(!isFormOpen);
					}}
				/>
				<aside
					className={clsx(styles.container, {
						[styles.container_open]: isFormOpen,
					})}>
					<form
						className={styles.form}
						onSubmit={handleApply}
						onReset={handleReset}>
						<Text as={'h2'} size={31} weight={800} uppercase={true}>
							Задайте параметры
						</Text>
						<Select
							title='шрифт'
							options={fontFamilyOptions}
							selected={draft.fontFamilyOption}
							onChange={(selected) => {
								updateField('fontFamilyOption', selected);
							}}
						/>
						<RadioGroup
							title='размер шрифта'
							name='fontSize'
							options={fontSizeOptions}
							selected={draft.fontSizeOption}
							onChange={(value) => {
								updateField('fontSizeOption', value);
							}}
						/>
						<Select
							title='Цвет шрифта'
							options={fontColors}
							selected={draft.fontColor}
							onChange={(selected) => {
								updateField('fontColor', selected);
							}}
						/>
						<Separator />
						<Select
							title='Цвет фона'
							options={backgroundColors}
							selected={draft.backgroundColor}
							onChange={(selected) => {
								updateField('backgroundColor', selected);
							}}
						/>
						<Select
							title='Ширина контента'
							options={contentWidthArr}
							selected={draft.contentWidth}
							onChange={(selected) => {
								updateField('contentWidth', selected);
							}}
						/>
						<div className={styles.bottomContainer}>
							<Button title='Сбросить' htmlType='reset' type='clear' />
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
