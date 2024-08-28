"use client"

import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import { Separator } from "@/components/ui/separator"

export default function Component() {
  return (
    <Card className="w-[100%] mx-0 px-0">
      <CardContent className="flex gap-4 p-4 pb-2">
        <ChartContainer
          config={{
            battery: {
              label: "Battery",
              color: "hsl(var(--chart-1))",
            },
            mains: {
              label: "Mains",
              color: "hsl(var(--chart-2))",
            },
            offline: {
              label: "Offline",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[140px] w-full"
        >
          <BarChart
            margin={{
              left: 0,
              right: 0,
              top: 0,
              bottom: 10,
            }}
            data={[
              {
                activity: "battery",
                value: (5 / 24) * 100,
                label: "5/24 hr.",
                fill: "var(--color-battery)",
              },
              {
                activity: "mains",
                value: (12 / 24) * 100,
                label: "12/24 hr.",
                fill: "var(--color-mains)",
              },
              {
                activity: "offline",
                value: (7 / 24) * 100,
                label: "7/24 hr.",
                fill: "var(--color-offline)",
              },
            ]}
            layout="vertical"
            barSize={32}
            barGap={2}
          >
            <XAxis type="number" dataKey="value" hide />
            <YAxis
              dataKey="activity"
              type="category"
              tickLine={false}
              tickMargin={4}
              axisLine={false}
              className="capitalize"
            />
            <Bar dataKey="value" radius={5}>
              <LabelList
                position="insideLeft"
                dataKey="label"
                fill="white"
                offset={8}
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-row border-t p-4">
        <div className="flex w-full items-center gap-2">
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-xs text-muted-foreground">Battery</div>
            <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
              5
              <span className="text-sm font-normal text-muted-foreground">
                hours
              </span>
            </div>
          </div>
          <Separator orientation="vertical" className="mx-2 h-10 w-px" />
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-xs text-muted-foreground">Mains</div>
            <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
              12
              <span className="text-sm font-normal text-muted-foreground">
              hours
              </span>
            </div>
          </div>
          <Separator orientation="vertical" className="mx-2 h-10 w-px" />
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-xs text-muted-foreground">Offline</div>
            <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
              7
              <span className="text-sm font-normal text-muted-foreground">
              hours
              </span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
