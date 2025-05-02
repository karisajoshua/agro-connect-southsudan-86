
import React from "react";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid 
} from "recharts";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent, 
  ChartLegend, 
  ChartLegendContent 
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for dashboard
const registrationData = [
  { name: "Jan", businesses: 40, cooperatives: 24 },
  { name: "Feb", businesses: 30, cooperatives: 13 },
  { name: "Mar", businesses: 20, cooperatives: 8 },
  { name: "Apr", businesses: 27, cooperatives: 18 },
  { name: "May", businesses: 45, cooperatives: 30 },
  { name: "Jun", businesses: 58, cooperatives: 35 },
];

const chartConfig = {
  businesses: { label: "Businesses", color: "#4f46e5" },
  cooperatives: { label: "Cooperatives", color: "#06b6d4" },
};

const RegistrationChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Registration Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-80">
          <BarChart data={registrationData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="businesses"
              fill="var(--color-businesses)"
              radius={[4, 4, 0, 0]}
              name="businesses"
            />
            <Bar
              dataKey="cooperatives"
              fill="var(--color-cooperatives)"
              radius={[4, 4, 0, 0]}
              name="cooperatives"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default RegistrationChart;
