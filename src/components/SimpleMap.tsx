import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Layers, Satellite, TreePine, Home, Droplets, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { useMapData } from "@/hooks/useMapData";
import mapImage from "@/assets/map-layer.jpg";

interface SimpleMapProps {
  fullSize?: boolean;
}

const SimpleMap = ({ fullSize = false }: SimpleMapProps) => {
  const { layers, markers, selectedState, setSelectedState, toggleLayer } = useMapData();
  const cardHeight = fullSize ? "h-[600px]" : "h-[400px]";

  return (
    <Card className="shadow-elegant">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Satellite className="h-5 w-5 text-forest" />
            Interactive WebGIS - FRA Atlas
          </CardTitle>
          <div className="flex items-center gap-2">
            <Select value={selectedState} onValueChange={setSelectedState}>
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
            <img 
              src={mapImage} 
              alt="FRA Atlas Interactive Map"
              className="w-full h-full object-cover"
            />
            
            {/* Dynamic markers based on selected state and active layers */}
            <div className="absolute inset-0">
              {markers.map((marker, index) => (
                <div
                  key={marker.id}
                  className={`absolute w-3 h-3 rounded-full border-2 border-white shadow-lg animate-pulse cursor-pointer`}
                  style={{
                    backgroundColor: marker.type === 'IFR' ? '#22c55e' : 
                                   marker.type === 'CR' ? '#3b82f6' :
                                   marker.type === 'CFR' ? '#f59e0b' :
                                   marker.type === 'water' ? '#0ea5e9' : '#dc2626',
                    top: `${20 + (index * 15) % 60}%`,
                    left: `${15 + (index * 12) % 70}%`
                  }}
                  title={`${marker.data.name} - ${marker.type} - ${marker.data.beneficiaries} beneficiaries`}
                />
              ))}
            </div>
            
            {/* Map Controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <Button variant="secondary" size="sm" className="w-8 h-8 p-0">
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="sm" className="w-8 h-8 p-0">
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="sm" className="w-8 h-8 p-0">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Status Display */}
            <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-xs font-mono">
              Active Markers: {markers.length} | State: {selectedState.toUpperCase()}
            </div>
          </div>
          
          {/* Layer Control Panel */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg max-w-64">
            <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
              <Layers className="h-4 w-4 text-forest" />
              Interactive Layers
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
        </div>
      </CardContent>
    </Card>
  );
};

export default SimpleMap;