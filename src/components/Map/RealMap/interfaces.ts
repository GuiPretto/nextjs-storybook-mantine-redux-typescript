export interface MapProps {
  markers?: MarkerProps[];
  markerBody?: (item: MarkerProps) => any;
  initialZoom?: number;
  withMargin?: boolean;
  minHeight?: string;
  showBoundaries?: boolean;
  highlights?: Highlight[];
}

export interface MarkerProps {
  // some examples
  lat: string | number;
  long: string | number;
}

export interface MapEventsProps {
  markers: MarkerProps[];
  highlights: Highlight[];
  showBoundaries: boolean;
}

export interface Highlight {
  query: string;
  color: string;
}
