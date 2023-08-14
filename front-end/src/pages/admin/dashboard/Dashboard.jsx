import * as React from "react";
import { BarChart, LineChart, ScatterChart } from "@mui/x-charts";
import { PieChart, pieArcClasses } from "@mui/x-charts";
import { Box, Grid } from "@mui/material";

const sample = [1, 10, 30, 50, 70, 90, 100];
const data = [
  { id: 0, value: 10, label: "series A" },
  { id: 1, value: 15, label: "series B" },
  { id: 2, value: 20, label: "series C" },
];
const data2 = [
  {
    id: "data-0",
    x1: 329.39,
    x2: 391.29,
    y1: 443.28,
    y2: 153.9,
  },
  {
    id: "data-1",
    x1: 96.94,
    x2: 139.6,
    y1: 110.5,
    y2: 217.8,
  },
  {
    id: "data-2",
    x1: 336.35,
    x2: 282.34,
    y1: 175.23,
    y2: 286.32,
  },
];

const seriesA = {
  data: [2, 3, 1, 4, 5],
  label: "series A",
};
const seriesB = {
  data: [3, 1, 4, 2, 1],
  label: "series B",
};
const seriesC = {
  data: [3, 2, 4, 5, 1],
  label: "series C",
};

export default function AdminDashboard() {
  return (
    <>
      <h1>TỔNG QUAN</h1>
      <Box></Box>
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <BarChart
            xAxis={[
              { scaleType: "band", data: ["group A", "group B", "group C"] },
            ]}
            series={[
              { data: [4, 3, 5] },
              { data: [1, 6, 3] },
              { data: [2, 5, 6] },
            ]}
            width={500}
            height={300}
          />
        </Grid>
        <Grid item xs={4}>
          {/* <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
                area: true,
              },
            ]}
            width={500}
            height={300}
          /> */}
        </Grid>
        <Grid item xs={4}>
          {/* <LineChart
            xAxis={[{ data: sample }]}
            yAxis={[
              { id: "linearAxis", scaleType: "linear" },
              { id: "logAxis", scaleType: "log" },
            ]}
            series={[
              { yAxisKey: "linearAxis", data: sample, label: "linear" },
              { yAxisKey: "logAxis", data: sample, label: "log" },
            ]}
            leftAxis="linearAxis"
            rightAxis="logAxis"
            height={300}
          /> */}
        </Grid>
        <Grid item xs={4}>
          <PieChart
            series={[
              {
                data,
                highlightScope: { faded: "global", highlighted: "item" },
                faded: { innerRadius: 30, additionalRadius: -30 },
              },
            ]}
            sx={{
              [`& .${pieArcClasses.faded}`]: {
                fill: "gray",
              },
            }}
            height={200}
          />{" "}
        </Grid>
        <Grid item xs={4}>
          <ScatterChart
            width={600}
            height={300}
            series={[
              {
                label: "series A",
                data: data2.map((v) => ({ x: v.x1, y: v.y1, id: v.id })),
              },
              {
                label: "series B",
                data: data2.map((v) => ({ x: v.x1, y: v.y2, id: v.id })),
              },
            ]}
          />
        </Grid>
        <Grid item xs={4}>
          <BarChart
            width={500}
            height={300}
            series={[
              { ...seriesA, stack: "total" },
              { ...seriesB, stack: "total" },
              { ...seriesC, stack: "total" },
            ]}
          />
        </Grid>
      </Grid>
    </>
  );
}
