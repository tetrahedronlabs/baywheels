"use client";
import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

interface RideMapProps {
  startStation?: {
    longitude: number;
    latitude: number;
  };
  endStation?: {
    longitude: number;
    latitude: number;
  };
}

export default function RideMap({ startStation, endStation }: RideMapProps) {
  if (!startStation || !endStation) {
    return (
      <div className="flex items-center justify-center w-[500px] h-[500px] bg-gray-100 rounded-lg">
        <p className="text-gray-600">Error fetching location data</p>
      </div>
    );
  }

  // Calculate center point and zoom level to show both markers
  const centerLong = (startStation.longitude + endStation.longitude) / 2;
  const centerLat = (startStation.latitude + endStation.latitude) / 2;

  return (
    <div className="">
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{
          longitude: centerLong,
          latitude: centerLat,
          zoom: 12, // Adjusted zoom level to better show the two points
        }}
        style={{ width: "500px", height: "500px", borderRadius: "8px" }}
        mapStyle="mapbox://styles/mapbox/outdoors-v12"
        attributionControl={false}
      >
        <Marker
          longitude={startStation.longitude}
          latitude={startStation.latitude}
          color="#2ecc71" // Green for start station
        />
        <Marker
          longitude={endStation.longitude}
          latitude={endStation.latitude}
          color="#e74c3c" // Red for end station
        />
      </Map>
    </div>
  );
}
