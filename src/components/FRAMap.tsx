import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Layers, Satellite, TreePine, Home, Droplets, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import mapImage from "@/assets/map-layer.jpg";

interface FRAMapProps {
  fullSize?: boolean;
}

// Dummy data for map layers and features
const mapLayers = [
  { id: "ifr", name: "Individual Forest Rights", active: true, color: "#22c55e" },
  { id: "cr", name: "Community Rights", active: true, color: "#3b82f6" },
  { id: "cfr", name: "Community Forest Resource Rights", active: true, color: "#f59e0b" },
  { id: "forest", name: "Forest Cover", active: true, color: "#16a34a" },
  { id: "water", name: "Water Bodies", active: false, color: "#0ea5e9" },
  { id: "settlements", name: "Tribal Settlements", active: true, color: "#dc2626" },
];

const FRAMap = ({ fullSize = false }: FRAMapProps) => {
  const cardHeight = fullSize ? "h-[600px]" : "h-[400px]";

  return (
    <Card className="shadow-elegant">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Satellite className="h-5 w-5 text-forest" />
            WebGIS - FRA Atlas
          </CardTitle>
          <div className="flex items-center gap-2">
            <Select defaultValue="satellite">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="satellite">Satellite</SelectItem>
                <SelectItem value="terrain">Terrain</SelectItem>
                <SelectItem value="roadmap">Roadmap</SelectItem>
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
              alt="FRA Atlas Map"
              className="w-full h-full object-cover"
            />
            
            {/* Map Overlay Elements */}
            <div className="absolute inset-0">
              {/* Sample markers for IFR/CR locations */}
              <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-success rounded-full border-2 border-white shadow-lg animate-pulse" />
              <div className="absolute top-1/2 left-1/3 w-3 h-3 bg-water rounded-full border-2 border-white shadow-lg animate-pulse" />
              <div className="absolute top-2/3 left-1/2 w-3 h-3 bg-warning rounded-full border-2 border-white shadow-lg animate-pulse" />
              <div className="absolute top-1/4 right-1/3 w-3 h-3 bg-earth rounded-full border-2 border-white shadow-lg animate-pulse" />
              
              {/* Sample polygons for forest areas */}
              <div className="absolute top-1/4 left-1/2 w-16 h-12 border-2 border-forest bg-forest/20 rounded transform rotate-12" />
              <div className="absolute bottom-1/3 right-1/4 w-20 h-16 border-2 border-success bg-success/20 rounded transform -rotate-6" />
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
            
            {/* Coordinates Display */}
            <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-xs font-mono">
              23.2599° N, 77.4126° E
            </div>
            
            {/* Scale */}
            <div className="absolute bottom-4 right-4 bg-white/90 px-2 py-1 rounded text-xs">
              1:50,000
            </div>
          </div>
          
          {/* Layer Control Panel */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg max-w-64">
            <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
              <Layers className="h-4 w-4 text-forest" />
              Map Layers
            </h4>
            <div className="space-y-2">
              {mapLayers.map((layer) => (
                <div key={layer.id} className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded border-2 border-white shadow-sm"
                    style={{ backgroundColor: layer.color }}
                  />
                  <label className="flex-1 text-xs">
                    <input 
                      type="checkbox" 
                      checked={layer.active} 
                      className="mr-2 scale-75" 
                      readOnly
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

export default FRAMap;