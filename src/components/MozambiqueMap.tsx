import { provinces } from "@/data/mockData";

interface Props {
  highlightProvince?: string;
  onProvinceClick?: (province: string) => void;
  size?: "sm" | "md" | "lg";
}

// Simplified province positions on a schematic map of Mozambique
const provincePositions: Record<string, { x: number; y: number; w: number; h: number }> = {
  "Niassa": { x: 145, y: 10, w: 80, h: 55 },
  "Cabo Delgado": { x: 195, y: 5, w: 75, h: 60 },
  "Nampula": { x: 175, y: 75, w: 85, h: 55 },
  "Zambézia": { x: 135, y: 130, w: 95, h: 50 },
  "Tete": { x: 80, y: 60, w: 85, h: 65 },
  "Manica": { x: 75, y: 140, w: 65, h: 55 },
  "Sofala": { x: 115, y: 180, w: 80, h: 50 },
  "Inhambane": { x: 120, y: 260, w: 70, h: 45 },
  "Gaza": { x: 85, y: 235, w: 65, h: 55 },
  "Maputo Província": { x: 80, y: 300, w: 70, h: 35 },
  "Maputo Cidade": { x: 95, y: 335, w: 55, h: 25 },
};

const MozambiqueMap = ({ highlightProvince, onProvinceClick, size = "md" }: Props) => {
  const scale = size === "sm" ? 0.6 : size === "lg" ? 1.2 : 1;
  const width = 300 * scale;
  const height = 380 * scale;

  return (
    <svg viewBox="0 0 300 380" width={width} height={height} className="mx-auto">
      {/* Country outline */}
      <path
        d="M130,5 L225,0 L280,30 L275,80 L260,130 L220,170 L200,230 L180,260 L160,290 L140,310 L110,340 L95,360 L80,350 L75,320 L70,290 L65,260 L60,230 L55,200 L60,170 L55,140 L60,110 L70,80 L90,50 L110,25 Z"
        fill="hsl(var(--secondary))"
        stroke="hsl(var(--border))"
        strokeWidth="1.5"
      />

      {/* Province regions */}
      {provinces.map((prov) => {
        const pos = provincePositions[prov.name];
        if (!pos) return null;
        const isHighlighted = highlightProvince === prov.name;
        const investmentRatio = prov.investment / 28500;

        return (
          <g
            key={prov.id}
            onClick={() => onProvinceClick?.(prov.name)}
            className={onProvinceClick ? "cursor-pointer" : ""}
          >
            <rect
              x={pos.x * scale}
              y={pos.y * scale}
              width={pos.w * scale}
              height={pos.h * scale}
              rx={4 * scale}
              fill={isHighlighted ? "hsl(var(--primary))" : `hsl(147, 63%, ${70 - investmentRatio * 50}%)`}
              stroke={isHighlighted ? "hsl(var(--foreground))" : "hsl(var(--background))"}
              strokeWidth={isHighlighted ? 2.5 : 1}
              opacity={isHighlighted ? 1 : 0.85}
              className="transition-all duration-200 hover:opacity-100"
            />
            <text
              x={(pos.x + pos.w / 2) * scale}
              y={(pos.y + pos.h / 2 - 4) * scale}
              textAnchor="middle"
              className="pointer-events-none fill-primary-foreground"
              fontSize={size === "sm" ? 6 : 8}
              fontWeight={isHighlighted ? 700 : 500}
            >
              {prov.name.length > 12 ? prov.name.substring(0, 10) + "…" : prov.name}
            </text>
            <text
              x={(pos.x + pos.w / 2) * scale}
              y={(pos.y + pos.h / 2 + 8) * scale}
              textAnchor="middle"
              className="pointer-events-none fill-primary-foreground"
              fontSize={size === "sm" ? 5 : 7}
              opacity={0.8}
            >
              {prov.investment.toLocaleString()} M
            </text>
            {isHighlighted && (
              <circle
                cx={(pos.x + pos.w / 2) * scale}
                cy={(pos.y - 6) * scale}
                r={4 * scale}
                fill="hsl(var(--destructive))"
                className="animate-pulse"
              />
            )}
          </g>
        );
      })}
    </svg>
  );
};

export default MozambiqueMap;
