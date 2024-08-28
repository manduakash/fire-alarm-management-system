"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export default function Component({data}) {
  return (
    <Card className="lg:mx-2 md:mx-2">
      <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2 [&>div]:flex-1">
        <div>
          <CardDescription>Today</CardDescription>
          <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">

          {(data.find(item => item.date === new Date().toISOString().split('T')[0]) || { alarmed: 0 }).alarmed}
            <span className="text-sm font-normal tracking-normal text-muted-foreground">
              alarm buzzed
            </span>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 items-center">
        <ChartContainer
          config={{
            alarmed: {
              label: "alarmed",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="w-full"
        >
          <LineChart
            accessibilityLayer
            margin={{
              left: 14,
              right: 14,
              top: 10,
            }}
            data={data}
          >
            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke="hsl(var(--muted-foreground))"
              strokeOpacity={0.5}
            />
            <YAxis hide domain={["dataMin - 10", "dataMax + 10"]} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                  weekday: "short",
                })
              }}
            />
            <Line
              dataKey="alarmed"
              type="natural"
              fill="var(--color-alarmed)"
              stroke="var(--color-alarmed)"
              strokeWidth={2}
              dot={false}
              activeDot={{
                fill: "var(--color-alarmed)",
                stroke: "var(--color-alarmed)",
                r: 4,
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  indicator="line"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  }}
                />
              }
              cursor={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
