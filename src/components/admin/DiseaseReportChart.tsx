
import React from "react";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid 
} from "recharts";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for dashboard
const diseaseReportsData = [
  { name: "Jan", reports: 2 },
  { name: "Feb", reports: 5 },
  { name: "Mar", reports: 8 },
  { name: "Apr", reports: 12 },
  { name: "May", reports: 7 },
  { name: "Jun", reports: 3 },
];

const chartConfig = {
  reports: { label: "Disease Reports", color: "#ef4444" },
};

const DiseaseReportChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Disease Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-80">
          <LineChart data={diseaseReportsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="reports"
              stroke="var(--color-reports)"
              name="reports"
              strokeWidth={2}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default DiseaseReportChart;
