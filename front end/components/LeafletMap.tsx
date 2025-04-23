import { useEffect, useState } from "react";

export default function LeafletMap() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const L = require("leaflet");
    require("leaflet/dist/leaflet.css");
    require("leaflet-routing-machine");
    require("leaflet-routing-machine/dist/leaflet-routing-machine.css");

    const map = L.map("map").setView([53.3498, -6.2603], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    const crimeData = [
      { lat: 53.3438, lon: -6.2546, type: "Theft" },
      { lat: 53.3488, lon: -6.2672, type: "Assault" },
    ];

    crimeData.forEach((crime) => {
      L.marker([crime.lat, crime.lon])
        .addTo(map)
        .bindPopup(`<b>Crime Type:</b> ${crime.type}`);
    });

    L.Routing.control({
      waypoints: [
        L.latLng(53.3498, -6.2603),
        L.latLng(53.3438, -6.2546),
        L.latLng(53.3408, -6.2546),
      ],
      routeWhileDragging: true,
    }).addTo(map);

    return () => {
      map.remove();
    };
  }, [isClient]);

  if (!isClient) return null;

  return (
    <div
      id="map"
      style={{
        height: "800px",
        width: "90%",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    />
  );
}
