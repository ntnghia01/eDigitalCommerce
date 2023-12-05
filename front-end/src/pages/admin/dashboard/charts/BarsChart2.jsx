import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const uData = [4000, 3000, 2000, 2780];
const pData = [2400, 1398, 9800, 3908];
const xLabels = [
  'Quý 1',
  'Quý 2',
  'Quý 3',
  'Quý 4',
  // 'Page E',
  // 'Page F',
  // 'Page G',
];

export default function BarsChart2() {
  return (
    <BarChart
      width={500}
      height={300}
      series={[
        { data: pData, label: 'Nhập', id: 'pvId' },
        { data: uData, label: 'Bán', id: 'uvId' },
      ]}
      xAxis={[{ data: xLabels, scaleType: 'band' }]}
    />
  );
}