import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { totaAmountByQuarter, totaAmountByQuarter2 } from '../../../../slices/revenueSlice';

const uData = [4000, 3000, 2000, 278000000];
const pData = [2400, 1398, 9800, 390800000];
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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(totaAmountByQuarter());
    dispatch(totaAmountByQuarter2());
  },[dispatch])

  const totaAmountByQuarterValue = useSelector((state) => state.revenue.totaAmountByQuarterValue);
  const totaAmountByQuarterValue2 = useSelector((state) => state.revenue.totaAmountByQuarterValue2);

  console.log(totaAmountByQuarterValue);
  console.log(totaAmountByQuarterValue2);
  return (
    <BarChart
      width={500}
      height={400}
      series={[
        { data: totaAmountByQuarterValue, label: 'Nhập', id: 'pvId' },
        { data: totaAmountByQuarterValue2, label: 'Bán', id: 'uvId' },
      ]}
      xAxis={[{ data: xLabels, scaleType: 'band' }]}
    />
  );
}