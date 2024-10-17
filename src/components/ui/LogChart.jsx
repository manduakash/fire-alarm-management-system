"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A mixed bar chart"

const chartConfig = {
  
  color1: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  color2: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  color3: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  color4: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  color5: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
  color6: {
    label: "Visitors",
  },
  color7: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  color8: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  color9: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  color0: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
}

export function LogChart({chartData}) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Bar Chart Presentation - Panel Wise</CardTitle>
        <CardDescription>{new Date(new Date().setDate(new Date().getDate() - 7)).toDateString()} - {new Date().toDateString()}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              accessibilityLayer
              data={chartData}
              layout="vertical"
              margin={{
                left: 80,
                top: 5,
                bottom: 5,
                right: 10,
              }}
            >
              <YAxis
                dataKey="panel"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                width={70}
                tick={{ fontSize: 12 }}
              />
              <XAxis dataKey="alarm" type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="alarm" layout="vertical" radius={4} barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Highest alarm count this week <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total alarm for the last week
        </div>
      </CardFooter>
    </Card>
  )
}