import { lazy } from 'react';

import { ApexOptions } from 'apexcharts';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import { useChart } from '../../../hooks';

const Chart = lazy(() => import('./styles'));

// ----------------------------------------------------------------------

export default function BarChart({ title, subheader, series, labels }: { title: string, subheader: string, series: { name: string, data: number[] }[], labels: string[] }) {

  const chartOptions: ApexOptions = useChart({
    chart: {
      stacked: true
    },
    xaxis: {
      type: "category",
      categories: labels
    },
    plotOptions: {
      bar: {
          horizontal: false
      }
    },
  });

  return (
    <Card>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3, pb: 1 }}>
        <Chart
          dir="ltr"
          type="bar"
          series={series}
          options={chartOptions}
          width="100%"
          height={364}
        />
      </Box>
    </Card>
  );
}
