import { useState, useEffect } from 'react';

export interface MapLayer {
  id: string;
  name: string;
  active: boolean;
  color: string;
  data?: any[];
}

export interface MapMarker {
  id: string;
  position: [number, number];
  type: 'IFR' | 'CR' | 'CFR' | 'water' | 'settlement';
  data: any;
}

export const useMapData = () => {
  const [layers, setLayers] = useState<MapLayer[]>([
    { 
      id: "ifr", 
      name: "Individual Forest Rights", 
      active: true, 
      color: "#22c55e",
      data: []
    },
    { 
      id: "cr", 
      name: "Community Rights", 
      active: true, 
      color: "#3b82f6",
      data: []
    },
    { 
      id: "cfr", 
      name: "Community Forest Resource Rights", 
      active: true, 
      color: "#f59e0b",
      data: []
    },
    { 
      id: "forest", 
      name: "Forest Cover", 
      active: true, 
      color: "#16a34a",
      data: []
    },
    { 
      id: "water", 
      name: "Water Bodies", 
      active: false, 
      color: "#0ea5e9",
      data: []
    },
    { 
      id: "settlements", 
      name: "Tribal Settlements", 
      active: true, 
      color: "#dc2626",
      data: []
    },
  ]);

  const [markers, setMarkers] = useState<MapMarker[]>([]);
  const [selectedState, setSelectedState] = useState<string>('mp');

  useEffect(() => {
    // Generate realistic marker data based on selected state
    generateMarkersForState(selectedState);
  }, [selectedState]);

  const generateMarkersForState = (state: string) => {
    const stateBounds = {
      mp: { lat: [21.0, 26.5], lng: [74.0, 82.0] }, // Madhya Pradesh
      tripura: { lat: [23.0, 24.5], lng: [91.0, 92.5] }, // Tripura
      odisha: { lat: [17.5, 22.5], lng: [81.5, 87.5] }, // Odisha
      telangana: { lat: [16.0, 19.5], lng: [77.0, 81.5] } // Telangana
    };

    const bounds = stateBounds[state as keyof typeof stateBounds] || stateBounds.mp;
    const newMarkers: MapMarker[] = [];

    // Generate random markers within state bounds
    for (let i = 0; i < 50; i++) {
      const lat = bounds.lat[0] + Math.random() * (bounds.lat[1] - bounds.lat[0]);
      const lng = bounds.lng[0] + Math.random() * (bounds.lng[1] - bounds.lng[0]);
      
      const types: ('IFR' | 'CR' | 'CFR' | 'water' | 'settlement')[] = ['IFR', 'CR', 'CFR', 'water', 'settlement'];
      const type = types[Math.floor(Math.random() * types.length)];
      
      newMarkers.push({
        id: `marker-${i}`,
        position: [lat, lng],
        type,
        data: {
          name: `${type} Site ${i + 1}`,
          beneficiaries: Math.floor(Math.random() * 200 + 50),
          status: Math.random() > 0.5 ? 'Active' : 'Pending',
          area: Math.floor(Math.random() * 500 + 100)
        }
      });
    }

    setMarkers(newMarkers);
  };

  const toggleLayer = (layerId: string) => {
    setLayers(prev => prev.map(layer => 
      layer.id === layerId ? { ...layer, active: !layer.active } : layer
    ));
  };

  const getActiveMarkers = () => {
    return markers.filter(marker => {
      const layerMap = {
        'IFR': 'ifr',
        'CR': 'cr', 
        'CFR': 'cfr',
        'water': 'water',
        'settlement': 'settlements'
      };
      
      const layerId = layerMap[marker.type];
      const layer = layers.find(l => l.id === layerId);
      return layer?.active;
    });
  };

  const getStateBounds = (state: string): [[number, number], [number, number]] => {
    const bounds = {
      mp: [[21.0, 74.0], [26.5, 82.0]] as [[number, number], [number, number]],
      tripura: [[23.0, 91.0], [24.5, 92.5]] as [[number, number], [number, number]],
      odisha: [[17.5, 81.5], [22.5, 87.5]] as [[number, number], [number, number]],
      telangana: [[16.0, 77.0], [19.5, 81.5]] as [[number, number], [number, number]]
    };
    
    return bounds[state as keyof typeof bounds] || bounds.mp;
  };

  return {
    layers,
    markers: getActiveMarkers(),
    selectedState,
    setSelectedState,
    toggleLayer,
    getStateBounds
  };
};