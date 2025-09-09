import { MapContainer, TileLayer, Marker, Popup, LayersControl, useMap } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Layers, Satellite, TreePine, Home, Droplets, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { useMapData } from "@/hooks/useMapData";
import { useEffect } from "react";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icons
const createCustomIcon = (color: string) => new L.DivIcon({
  html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
  className: 'custom-marker',
  iconSize: [12, 12],
  iconAnchor: [6, 6]
});

const markerIcons = {
  IFR: createCustomIcon('#22c55e'),
  CR: createCustomIcon('#3b82f6'),
  CFR: createCustomIcon('#f59e0b'),
  water: createCustomIcon('#0ea5e9'),
  settlement: createCustomIcon('#dc2626')
};

interface MapControllerProps {
  selectedState: string;
  getStateBounds: (state: string) => [[number, number], [number, number]];
}

const MapController = ({ selectedState, getStateBounds }: MapControllerProps) => {
  const map = useMap();
  
  useEffect(() => {
    const bounds = getStateBounds(selectedState);
    map.fitBounds(bounds);
  }, [selectedState, map, getStateBounds]);
  
  return null;
};

interface InteractiveMapProps {
  fullSize?: boolean;
}

const InteractiveMap = ({ fullSize = false }: InteractiveMapProps) => {
  const { layers, markers, selectedState, setSelectedState, toggleLayer, getStateBounds } = useMapData();
  const cardHeight = fullSize ? "h-[600px]" : "h-[400px]";

  const handleStateChange = (state: string) => {
    setSelectedState(state);
  };

  return (
    <Card className="shadow-elegant">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Satellite className="h-5 w-5 text-forest" />
            Interactive WebGIS - FRA Atlas
          </CardTitle>
          <div className="flex items-center gap-2">
            <Select value={selectedState} onValueChange={handleStateChange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mp">Madhya Pradesh</SelectItem>
                <SelectItem value="tripura">Tripura</SelectItem>
                <SelectItem value="odisha">Odisha</SelectItem>
                <SelectItem value="telangana">Telangana</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Layers className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className={`relative ${cardHeight} overflow-hidden`}>
          {/* Map Container */}
          <div className="absolute inset-4 rounded-lg overflow-hidden border border-forest-light/30">
            <MapContainer
              center={[23.2599, 77.4126] as LatLngExpression}
              zoom={6}
              style={{ height: '100%', width: '100%' }}
              zoomControl={false}
            >
              <MapController selectedState={selectedState} getStateBounds={getStateBounds} />
              
              <LayersControl position="topright">
                <LayersControl.BaseLayer checked name="Satellite">
                  <TileLayer
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                  />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="OpenStreetMap">
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="Terrain">
                  <TileLayer
                    url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                  />
                </LayersControl.BaseLayer>
              </LayersControl>

              {markers.map((marker) => (
                <Marker
                  key={marker.id}
                  position={marker.position as LatLngExpression}
                >
                  <Popup>
                    <div className="p-2">
                      <h4 className="font-semibold">{marker.data.name}</h4>
                      <p className="text-sm text-muted-foreground">Type: {marker.type}</p>
                      <p className="text-sm">Beneficiaries: {marker.data.beneficiaries}</p>
                      <p className="text-sm">Area: {marker.data.area} hectares</p>
                      <Badge variant={marker.data.status === 'Active' ? 'default' : 'secondary'}>
                        {marker.data.status}
                      </Badge>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
          
          {/* Layer Control Panel */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg max-w-64">
            <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
              <Layers className="h-4 w-4 text-forest" />
              Map Layers
            </h4>
            <div className="space-y-2">
              {layers.map((layer) => (
                <div key={layer.id} className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded border-2 border-white shadow-sm"
                    style={{ backgroundColor: layer.color }}
                  />
                  <label className="flex-1 text-xs cursor-pointer" onClick={() => toggleLayer(layer.id)}>
                    <input 
                      type="checkbox" 
                      checked={layer.active} 
                      onChange={() => toggleLayer(layer.id)}
                      className="mr-2 scale-75" 
                    />
                    {layer.name}
                  </label>
                </div>
              ))}
            </div>
            
            {/* Legend */}
            <div className="mt-4 pt-3 border-t border-gray-200">
              <h5 className="font-medium text-xs mb-2">Legend</h5>
              <div className="grid grid-cols-2 gap-1 text-xs">
                <div className="flex items-center gap-1">
                  <TreePine className="h-3 w-3 text-forest" />
                  <span>Forest</span>
                </div>
                <div className="flex items-center gap-1">
                  <Home className="h-3 w-3 text-earth" />
                  <span>Settlements</span>
                </div>
                <div className="flex items-center gap-1">
                  <Droplets className="h-3 w-3 text-water" />
                  <span>Water</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-warning" />
                  <span>Claims</span>
                </div>
              </div>
            </div>
          </div>

          {/* Map Status */}
          <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-xs font-mono">
            Active Markers: {markers.length}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveMap;