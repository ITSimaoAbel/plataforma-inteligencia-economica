"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Opportunity } from "@/data/mockData"

interface OpportunitiesTableProps {
  opportunities: Opportunity[]
  title: string
}

export function OpportunitiesTable({ opportunities, title }: OpportunitiesTableProps) {
  const typeColors: Record<string, string> = {
    planned: "bg-blue-100 text-blue-700",
    ongoing: "bg-emerald-100 text-emerald-700",
    completed: "bg-purple-100 text-purple-700",
  }

  const typeLabels: Record<string, string> = {
    planned: "Planeado",
    ongoing: "Em Curso",
    completed: "Concluído",
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-xs font-medium text-muted-foreground">
                <th className="px-6 py-3">Título</th>
                <th className="px-6 py-3">Sector</th>
                <th className="px-6 py-3">Província</th>
                <th className="px-6 py-3">Valor Est.</th>
                <th className="px-6 py-3">Data</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {opportunities.map((opp) => (
                <tr key={opp.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-3">
                    <span className="font-medium text-sm">{opp.title}</span>
                  </td>
                  <td className="px-6 py-3 text-sm text-muted-foreground">{opp.sector}</td>
                  <td className="px-6 py-3 text-sm text-muted-foreground">{opp.province}</td>
                  <td className="px-6 py-3 text-sm font-medium">{opp.value.toLocaleString()} MZN</td>
                  <td className="px-6 py-3 text-sm text-muted-foreground">
                    {new Date(opp.date).toLocaleDateString("pt-MZ")}
                  </td>
                  <td className="px-6 py-3">
                    <Badge variant="secondary" className={typeColors[opp.status]}>
                      {typeLabels[opp.status]}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
