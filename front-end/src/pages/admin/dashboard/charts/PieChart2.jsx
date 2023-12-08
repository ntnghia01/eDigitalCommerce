import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { reviewCount } from '../../../../slices/revenueSlice';

const data = [
  { value: 5, label: '1' },
  { value: 10, label: '2' },
  { value: 15, label: '3' },
  { value: 20, label: '4' },
  { value: 20, label: '5' },
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

export default function PieChart2() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reviewCount());
  }, [dispatch]);

  const reviewCountValue = useSelector((state) => state.revenue.reviewCountValue);

  const transformedData = reviewCountValue?.map((item) => ({
    value: item.value,
    label: item.label.toString(), // Chuyển đổi label về dạng chuỗi
  })) || [];
  
  return (
    <PieChart series={[{ data: transformedData, innerRadius: 80 }]} {...size}>
      <PieCenterLabel>Đánh giá</PieCenterLabel>
    </PieChart>
  );
}
