import type { EChartsOption } from 'echarts';
import { extractThemeColorsFromDOM } from '$lib/util/theme-colors';

const themeColors = extractThemeColorsFromDOM();

let numbers = [];
for (let i = 0; i < 14; i++) {
	numbers.push(i);
}

const chartOptions: EChartsOption = {
	grid: {
		borderColor: themeColors.baseContent
	},
	xAxis: {
		type: 'category',
		boundaryGap: false,
		data: numbers.map((num) => num.toString())
	},
	yAxis: {
		type: 'value',
		splitLine: {
			lineStyle: {
				color: themeColors.neutral
			}
		}
	},
	series: [
		{
			name: 'WETH',
			type: 'line',
			data: numbers,
			lineStyle: {
				color: themeColors.primary,
				width: 4
			},
			itemStyle: {
				color: themeColors.primary
			}
		},
		{
			name: 'WETH',
			type: 'line',
			data: numbers.map((num) => num * num),
			lineStyle: {
				color: themeColors.secondary,
				width: 4
			},
			itemStyle: {
				color: themeColors.secondary
			}
		}
	]
};

export default chartOptions;
