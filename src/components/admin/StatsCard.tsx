
import React from "react";
import { LucideIcon } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
  trend?: {
    value: string;
    positive?: boolean;
    neutral?: boolean;
  };
}

const StatsCard = ({ 
  title, 
  value, 
  icon: Icon, 
  iconColor, 
  iconBgColor,
  trend 
}: StatsCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold">{value}</div>
          <div className={`p-2 ${iconBgColor} rounded-full`}>
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
        </div>
        {trend && (
          <p className={`text-xs mt-2 ${trend.neutral
            ? "text-amber-600"
            : trend.positive
            ? "text-green-600"
            : "text-red-600"}`}
          >
            {trend.value}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
