"use client"

import { TrendingUp } from "lucide-react"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A radial chart displaying battery and mains power details."

const chartData = [{ status: "power", battery: 0, mains: 10 }]

export default function Component({powerDetails}) {
  const totalPower = powerDetails.battery + powerDetails.mains

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Radial Chart - Power Details</CardTitle>
        <CardDescription>Battery 🟧 vs Mains🟩</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={{
            "battery": {
              "label": "Battery",
              "color": "hsl(var(--chart-1))",
            },
            "mains": {
              "label": "Mains",
              "color": "hsl(var(--chart-2))",
            }
          }}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={[{"status": "power", "battery": powerDetails?.battery, "mains": powerDetails?.mains}]}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalPower.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Power (minutes)
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="battery"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-battery)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="mains"
              fill="var(--color-mains)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing power usage details (Battery vs Mains)
        </div>
      </CardFooter>
    </Card>
  )
}
