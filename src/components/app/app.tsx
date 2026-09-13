import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './../../constants/articleProps';

import styles from './app.module.scss';

export const App = () => {
	const [applyArticleState, setApplyArticleState] =
		useState<ArticleStateType>(defaultArticleState);
	const handleApply = (newState: ArticleStateType) => {
		setApplyArticleState(newState);
	};
	const handleReset = () => {
		setApplyArticleState(defaultArticleState);
	};
	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': applyArticleState.fontFamilyOption.value,
					'--font-size': applyArticleState.fontSizeOption.value,
					'--font-color': applyArticleState.fontColor.value,
					'--container-width': applyArticleState.contentWidth.value,
					'--bg-color': applyArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onApply={handleApply} onReset={handleReset} />
			<Article />
		</main>
	);
};
