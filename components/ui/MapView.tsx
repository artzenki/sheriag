'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import type { MapMarkerItem } from './MapInner';
import { cn } from '@/lib/utils';

const DynamicMapInner = dynamic(() => import('./MapInner'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[420px] w-full items-center justify-center rounded-lg border border-border bg-surface-alt text-sm font-medium text-muted">
      Loading Gostivar map…
    </div>
  ),
});

interface MapViewProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  markers: MapMarkerItem[];
  className?: string;
}

export function MapView({
  center = { lat: 41.7963, lng: 20.9089 }, // Default center: Gostivar, North Macedonia
  zoom = 15,
  markers,
  className,
}: MapViewProps) {
  return (
    <div className={cn('overflow-hidden rounded-lg border border-border bg-surface-alt shadow-card', className)}>
      <DynamicMapInner
        center={center}
        zoom={zoom}
        markers={markers}
        className="h-[420px] w-full"
      />
    </div>
  );
}
