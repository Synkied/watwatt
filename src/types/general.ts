interface IChartDataSet {
  label: string;
  data: (number | undefined)[];
  borderColor?: string;
  backgroundColor?: string;
}

interface IChartData {
  labels: string[];
  datasets: IChartDataSet[];
}

export type { IChartDataSet, IChartData };
