// components/MozambiqueMapLeaflet.tsx
"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { provinces } from "@/data/mockData";

// Fix para ícones do Leaflet no Next.js
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// Configuração dos ícones padrão
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface Props {
  highlightProvince?: string;
  onProvinceClick?: (province: string) => void;
  height?: string;
  width?: string;
  showInvestments?: boolean;
}

// Coordenadas aproximadas das províncias de Moçambique
const provinceCoordinates: Record<string, { lat: number; lng: number }> = {
  Niassa: { lat: -13.5, lng: 36.5 },
  "Cabo Delgado": { lat: -12.0, lng: 39.5 },
  Nampula: { lat: -15.0, lng: 39.5 },
  Zambézia: { lat: -17.0, lng: 37.5 },
  Tete: { lat: -16.0, lng: 33.5 },
  Manica: { lat: -19.0, lng: 33.5 },
  Sofala: { lat: -19.5, lng: 35.0 },
  Inhambane: { lat: -23.0, lng: 35.0 },
  Gaza: { lat: -23.5, lng: 32.5 },
  "Maputo Província": { lat: -25.5, lng: 32.0 },
  "Maputo Cidade": { lat: -26.0, lng: 32.5 },
};

// Cores baseadas nos investimentos (do seu mockData)
const getColorByInvestment = (investment: number) => {
  if (investment > 20000) return "#166534"; // Verde escuro
  if (investment > 15000) return "#15803d"; // Verde médio-escuro
  if (investment > 10000) return "#16a34a"; // Verde médio
  if (investment > 7000) return "#22c55e"; // Verde claro
  return "#4ade80"; // Verde muito claro
};

const MozambiqueMapLeaflet = ({
  highlightProvince,
  onProvinceClick,
  height = "500px",
  width = "100%",
  showInvestments = true,
}: Props) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Inicializar mapa apenas no cliente
    if (typeof window === "undefined" || mapContainerRef.current === null)
      return;

    // Destruir mapa anterior se existir
    if (mapRef.current) {
      mapRef.current.remove();
    }

    // Criar novo mapa
    const map = L.map(mapContainerRef.current).setView([-18.0, 35.0], 6);

    // Adicionar tile layer do OpenStreetMap
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 10,
    }).addTo(map);

    // Adicionar marcadores para cada província
    provinces.forEach((province) => {
      const coords = provinceCoordinates[province.name];
      if (!coords) return;

      const isHighlighted = highlightProvince === province.name;
      const color = getColorByInvestment(province.investment);

      // Criar círculo para representar a província
      const circle = L.circleMarker([coords.lat, coords.lng], {
        radius: isHighlighted ? 20 : 15,
        color: isHighlighted ? "#ef4444" : "#ffffff",
        weight: isHighlighted ? 3 : 1,
        fillColor: color,
        fillOpacity: 0.8,
      }).addTo(map);

      // Adicionar popup com informações
      circle.bindPopup(`
        <div style="text-align: center;">
          <strong>${province.name}</strong><br/>
          Investimento: ${province.investment.toLocaleString()} MZN<br/>
          ${province.investment > 20000 ? "★ Alto investimento" : ""}
        </div>
      `);

      // Adicionar evento de clique
      if (onProvinceClick) {
        circle.on("click", () => {
          onProvinceClick(province.name);
        });
      }

      // Adicionar tooltip ao passar o mouse
      circle.bindTooltip(province.name, { permanent: false, direction: "top" });

      // Adicionar label com valor do investimento (opcional)
      if (showInvestments) {
        const investmentLabel = L.marker([coords.lat, coords.lng - 0.3], {
          icon: L.divIcon({
            className: "investment-label",
            html: `<div style="background: rgba(255,255,255,0.9); padding: 2px 6px; border-radius: 10px; font-size: 10px; font-weight: bold; border: 1px solid #ccc;">${(province.investment / 1000).toFixed(1)}k</div>`,
            iconSize: [40, 20],
            iconAnchor: [20, 10],
          }),
        }).addTo(map);
      }
    });

    // Armazenar referência do mapa
    mapRef.current = map;

    // Cleanup ao desmontar
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [highlightProvince, onProvinceClick, showInvestments]);

  // Adicionar CSS customizado
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .investment-label {
        pointer-events: none;
      }
      .leaflet-popup-content {
        font-family: system-ui, -apple-system, sans-serif;
      }
      .leaflet-container {
        background: #e5f0f5;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div
      ref={mapContainerRef}
      style={{ height, width, borderRadius: "8px", overflow: "hidden" }}
    />
  );
};

export default MozambiqueMapLeaflet;
