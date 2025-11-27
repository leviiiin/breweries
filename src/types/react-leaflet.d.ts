declare module 'react-leaflet' {
  import * as React from 'react';
  import * as L from 'leaflet';

  interface MapContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    center: L.LatLngExpression;
    zoom: number;
    scrollWheelZoom?: boolean;
    children?: React.ReactNode;
    className?: string;
  }

  export class MapContainer extends React.Component<MapContainerProps> { }

  interface TileLayerProps {
    url: string;
  }
  export class TileLayer extends React.Component<TileLayerProps> { }

  interface MarkerProps {
    position: L.LatLngExpression;
    icon?: L.Icon | L.DivIcon;
    children?: React.ReactNode;
  }
  export class Marker extends React.Component<MarkerProps> { }

  export class Popup extends React.Component { }
}
