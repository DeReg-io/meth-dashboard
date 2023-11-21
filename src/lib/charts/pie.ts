import type { EChartsOption } from 'echarts';
import { extractThemeColorsFromDOM } from '$lib/util/theme-colors';

const themeColors = extractThemeColorsFromDOM();
console.log('themeColors: ', themeColors);

const chartOptions: EChartsOption = {
	series: {
		type: 'pie',
		data: [
			{
				name: 'WETH',
				value: 0.9,
				itemStyle: {
					color: themeColors.secondary
				},
				label: {
					color: themeColors.baseContent
				}
			},
			{
				name: 'METH',
				value: 0.1,
				itemStyle: {
					color: themeColors.primary
				},
				label: {
					color: themeColors.baseContent
				}
			}
		]
	}
};

export default chartOptions;
