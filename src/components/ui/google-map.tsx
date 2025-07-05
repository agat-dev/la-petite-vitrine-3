import React from 'react';

interface GoogleMapComponentProps {
  locations?: any[];
  center?: { lat: number; lng: number };
  zoom?: number;
  height?: string;
}

export const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({
  center = { lat: 46.603354, lng: 2.888334 },
  zoom = 6,
  height = '400px'
}) => {
  // Générer l'URL Google Maps avec les coordonnées du centre et le niveau de zoom
  const mapUrl = `https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dOWTgkU2fFBM2M&center=${center.lat},${center.lng}&zoom=${zoom}&maptype=roadmap`;

  return (
    <div className="w-full rounded-xl overflow-hidden border border-amber-200/50 shadow-lg z-50">
      <iframe
        src={mapUrl}
        width="100%"
        height={height}
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Carte Google Maps"
        className="w-full"
      />
    </div>
  );
};

export default GoogleMapComponent;
