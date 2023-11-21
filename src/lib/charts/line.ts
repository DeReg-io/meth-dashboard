import type { EChartsOption } from 'echarts';
import { extractThemeColorsFromDOM } from '$lib/util/theme-colors';
import { numToHumanText } from '$lib/util/number-to-string';

const themeColors = extractThemeColorsFromDOM();

function getLineChartOptions(xData: string[], yData: number[]): EChartsOption {
  return {
    grid: {
      borderColor: themeColors?.baseContent,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      valueFormatter: (value) => `${numToHumanText(value as number)} $`
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      // data: numbers.map((num) => num.toString())
      data: xData
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          color: themeColors?.neutral
        }
      },
      axisLabel: {
        formatter: (value) => `${numToHumanText(value as number)} $`
      }
    },
    series: [
      {
        name: 'METH',
        type: 'line',
        data: yData.map((num) => 0),
        lineStyle: {
          color: themeColors?.primary,
          width: 4
        },
        itemStyle: {
          color: themeColors?.primary
        }
      },
      {
        name: 'WETH',
        type: 'line',
        data: yData,
        lineStyle: {
          color: themeColors?.secondary,
          width: 4
        },
        itemStyle: {
          color: themeColors?.secondary
        }
      }
    ]
  };
}

export default getLineChartOptions;
