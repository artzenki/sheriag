'use client';

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export interface MapMarkerItem {
  id: string;
  lat: number;
  lng: number;
  title: string;
  subtitle?: string;
  badgeText?: string;
  isUnderConstruction?: boolean;
  href?: string;
  ctaLabel?: string;
}

interface MapInnerProps {
  center: { lat: number; lng: number };
  zoom?: number;
  markers: MapMarkerItem[];
  className?: string;
}

export default function MapInner({
  center,
  zoom = 15,
  markers,
  className = 'h-[420px] w-full',
}: MapInnerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(containerRef.current, {
      center: [center.lat, center.lng],
      zoom,
      scrollWheelZoom: false,
    });

    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    markers.forEach((m) => {
      const pinColor = m.isUnderConstruction ? '#E46800' : '#16191F';
      const svgPin = `
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="44" viewBox="0 0 36 44">
          <path d="M18 0C8.06 0 0 8.06 0 18c0 12.6 18 26 18 26s18-13.4 18-26C36 8.06 27.94 0 18 0z" fill="${pinColor}" stroke="#FFFFFF" stroke-width="2"/>
          <circle cx="18" cy="17" r="7" fill="#E46800"/>
          <circle cx="18" cy="17" r="3" fill="#FFFFFF"/>
        </svg>
      `;

      const icon = L.divIcon({
        html: svgPin,
        className: 'sheriag-map-pin',
        iconSize: [36, 44],
        iconAnchor: [18, 44],
        popupAnchor: [0, -40],
      });

      const marker = L.marker([m.lat, m.lng], { icon, title: m.title }).addTo(map);

      const popupContainer = document.createElement('div');
      popupContainer.className = 'min-w-[200px] text-left';

      if (m.badgeText) {
        const badge = document.createElement('span');
        badge.className =
          'inline-block rounded bg-brand-tint px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ink mb-1';
        badge.textContent = m.badgeText;
        popupContainer.appendChild(badge);
      }

      const heading = document.createElement('div');
      heading.className = 'font-heading text-sm font-extrabold text-ink';
      heading.textContent = m.title;
      popupContainer.appendChild(heading);

      if (m.subtitle) {
        const sub = document.createElement('div');
        sub.className = 'mt-0.5 text-xs text-ink-body';
        sub.textContent = m.subtitle;
        popupContainer.appendChild(sub);
      }

      if (m.href && m.ctaLabel) {
        const link = document.createElement('a');
        link.href = m.href;
        link.className =
          'mt-2 inline-block text-xs font-bold text-brand underline hover:text-brand-dark';
        link.textContent = `${m.ctaLabel} →`;
        popupContainer.appendChild(link);
      }

      marker.bindPopup(popupContainer);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [center.lat, center.lng, zoom, markers]);

  return (
    <div
      ref={containerRef}
      className={className}
      role="region"
      aria-label="Interactive Map of Gostivar"
    />
  );
}
