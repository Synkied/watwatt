import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import styles from "./BasicChart.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

import type { eCO2Mix } from "../server/api/routers/eco2mix";
import type { IChartData, IChartDataSet } from "../types/general";

const BasicChart = ({
  eCO2MixToday,
}: {
  eCO2MixToday: eCO2Mix | undefined;
}) => {
  const [data, setData] = useState<IChartData | null>(null);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "France CO2 electrical consumption",
      },
    },
  };

  useEffect(() => {
    const labels = new Set<string>();
    const datasets: { [key: string]: IChartDataSet } = {};

    eCO2MixToday?.records.map((record) => {
      labels.add(record?.fields?.heure || "");
      const region = record?.fields?.libelle_region || "";

      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      const dataset = {
        label: region,
        data: [record?.fields?.consommation],
        borderColor: `#${randomColor}`,
        backgroundColor: `#${randomColor}`,
      };

      if (Object.keys(datasets).includes(region)) {
        datasets[region]?.data.push(record?.fields?.consommation);
      } else {
        datasets[region] = dataset;
      }
    });

    const labelsList = Array.from(labels);

    const data = {
      labels: labelsList,
      datasets: Object.values(datasets),
    };
    setData(data);
  }, [eCO2MixToday?.records]);

  return (
    <div className={styles.chartWrapper}>
      {data && (
        <>
          <Line data={data} options={options} />
        </>
      )}
    </div>
  );
};

export default BasicChart;
