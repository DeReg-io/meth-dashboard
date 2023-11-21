import type { EChartsOption } from 'echarts';
import { extractThemeColorsFromDOM } from '$lib/util/theme-colors';

const themeColors = extractThemeColorsFromDOM();

const chartOptions: EChartsOption = {
  series: {
    type: 'pie',
    data: [
      {
        name: 'WETH',
        value: 1,
        itemStyle: {
          color: themeColors?.secondary
        },
        label: {
          color: themeColors?.baseContent
        }
      },
      {
        name: 'METH',
        value: 0,
        itemStyle: {
          color: themeColors?.primary
        },
        label: {
          color: themeColors?.baseContent
        }
      }
    ]
  }
};

export default chartOptions;
