import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { genderCount } from '../../../../slices/revenueSlice';

const data = [
  { value: 5, label: 'Nam' },
  { value: 10, label: 'Nữ' },
  { value: 15, label: 'Khác' },
];

const size = {
  width: 400,
  height: 200,
};

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

export default function PieChartWithCenterLabel() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(genderCount());
  }, [dispatch]);

  const genderCountValue = useSelector((state) => state.revenue.genderCountValue);

  const transformedData = genderCountValue?.map((item) => ({
    value: item.value,
    label: item.label,
  })) || [];

  return (
    <PieChart series={[{ data: transformedData, innerRadius: 80 }]} {...size}>
      <PieCenterLabel>Giới tính</PieCenterLabel>
    </PieChart>
  );
}
