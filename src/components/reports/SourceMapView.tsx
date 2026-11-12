import React, { useMemo, useState } from 'react';
import { worldMapSvgPath } from '../../data/worldMap';
import { ExternalLink, MapPin } from 'lucide-react';

interface SourceGeo {
  id: string;
  name: string;
  country?: string;
  lat?: number;
  lng?: number;
  reliability?: number;
  type?: string;
  url?: string;
}

interface SourceMapViewProps {
  sources: SourceGeo[];
}

export const SourceMapView: React.FC<SourceMapViewProps> = ({ sources }) => {
  const [selectedSource, setSelectedSource] = useState<SourceGeo | null>(null);
  const [zoomFull, setZoomFull] = useState<boolean>(false);

  const mappedPoints = useMemo(() => {
    return (sources || [])
      .filter(
        (s) =>
          Number.isFinite(s.lat) &&
          Number.isFinite(s.lng) &&
          Math.abs(s.lat!) <= 90 &&
          Math.abs(s.lng!) <= 180
      )
      .map((s, idx, arr) => {
        const overlapCount = arr
          .slice(0, idx)
          .filter((other) => Math.abs(other.lat! - s.lat!) < 5 && Math.abs(other.lng! - s.lng!) < 5)
          .length;
        const x = ((s.lng! + 180) / 360) * 1000 + overlapCount * 18;
        const y = ((90 - s.lat!) / 180) * 500 + overlapCount * 10;
        return {
          ...s,
          x,
          y,
        };
      });
  }, [sources]);

  const viewBox = useMemo(() => {
    if (zoomFull || !mappedPoints.length) {
      return { x: 0, y: 25, w: 1000, h: 420 };
    }
    const xs = mappedPoints.map((p) => p.x);
    const ys = mappedPoints.map((p) => p.y);
    let w = Math.max(...xs) - Math.min(...xs) + 160;
    let h = Math.max(...ys) - Math.min(...ys) + 120;
    if (w / h > 2) h = w / 2;
    else w = h * 2;
    w = Math.min(w, 1000);
    h = Math.min(h, 500);
    const midX = (Math.max(...xs) + Math.min(...xs)) / 2;
    const midY = (Math.max(...ys) + Math.min(...ys)) / 2;
    return {
      x: Math.max(0, Math.min(1000 - w, midX - w / 2)),
      y: Math.max(0, Math.min(500 - h, midY - h / 2)),
      w,
      h,
    };
  }, [mappedPoints, zoomFull]);

  const scaleFactor = (viewBox.w / 1000) * 1.6;

  return (
    <div className="rounded-xl border border-border bg-card p-3 space-y-3">
      <div className="relative overflow-hidden rounded-lg border border-border/80 bg-ocean/30">
        <svg
          viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`}
          className="w-full h-auto select-none"
        >
          <path d={worldMapSvgPath} className="fill-land/50 stroke-border/40" strokeWidth={0.8} />

          {mappedPoints.map((pt) => {
            const isSelected = selectedSource?.id === pt.id;
            return (
              <g
                key={pt.id}
                className="cursor-pointer transition-transform"
                onClick={() => setSelectedSource(pt)}
              >
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={8 * scaleFactor}
                  className="fill-primary/30 animate-ping"
                />
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isSelected ? 6 * scaleFactor : 4 * scaleFactor}
                  className="fill-primary stroke-background"
                  strokeWidth={1.5 * scaleFactor}
                />
              </g>
            );
          })}
        </svg>

        <div className="absolute right-2 top-2 flex items-center gap-1.5">
          <button
            onClick={() => setZoomFull(!zoomFull)}
            className="rounded bg-background/80 px-2 py-0.5 font-mono text-[10px] text-muted-foreground hover:text-foreground backdrop-blur border border-border"
          >
            {zoomFull ? 'Zoom cụm' : 'Toàn cầu'}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <MapPin className="size-3 text-primary" /> {mappedPoints.length} tọa độ địa lý nguồn tin
        </span>
        <span className="font-mono text-[10px]">Tọa độ WGS84 phẳng</span>
      </div>

      {selectedSource && (
        <div className="rounded-lg border border-primary/40 bg-secondary/60 p-3 space-y-1.5 text-xs animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="font-bold text-foreground flex items-center gap-1.5">
              <span className="font-mono text-primary font-bold">{selectedSource.id}:</span>
              {selectedSource.name}
            </span>
            <span className="font-mono text-[10px] text-primary bg-primary/20 px-1.5 py-0.5 rounded">
              {selectedSource.country || 'Toàn cầu'}
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1 border-t border-border/50">
            <span>Độ tin cậy: {Math.round(selectedSource.reliability || 90)}/100</span>
            {selectedSource.url && (
              <a
                href={selectedSource.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-primary hover:underline"
              >
                <span>Xem tài liệu gốc</span>
                <ExternalLink className="size-3" />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
