import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  iconColor?: string
  iconBgColor?: string
  trend?: { value: number; isPositive: boolean }
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  iconColor = "text-sky-700",
  iconBgColor = "bg-sky-100",
  trend,
}: StatsCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-white p-5 shadow-sm">
      <div className={cn("flex h-14 w-14 items-center justify-center rounded-xl", iconBgColor)}>
        <Icon className={cn("h-7 w-7", iconColor)} />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className="flex items-baseline gap-2">
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {trend && (
            <span className={cn("text-xs font-medium", trend.isPositive ? "text-emerald-600" : "text-red-500")}>
              {trend.isPositive ? "+" : ""}
              {trend.value}%
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
