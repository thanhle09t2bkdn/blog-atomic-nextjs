declare module 'jsvectormap' {
  interface JsVectorMapOptions {
    selector?: string | HTMLElement;
    map?: string;
    backgroundColor?: string;
    zoomButtons?: boolean;
    zoomOnScroll?: boolean;
    zoomOnScrollSpeed?: number;
    zoomMax?: number;
    zoomMin?: number;
    zoomAnimate?: boolean;
    showTooltip?: boolean;
    zoomStep?: number;
    bindTouchEvents?: boolean;
    onLoaded?: (map: unknown) => void;
    markers?: Array<{
      name?: string;
      coords?: [number, number];
      style?: Record<string, unknown>;
    }>;
    markerStyle?: {
      initial?: Record<string, unknown>;
      hover?: Record<string, unknown>;
      selected?: Record<string, unknown>;
    };
    regionStyle?: {
      initial?: Record<string, unknown>;
      hover?: Record<string, unknown>;
      selected?: Record<string, unknown>;
    };
    series?: {
      regions?: Array<{
        values?: Record<string, number>;
        scale?: string[];
        normalizeFunction?: string;
        min?: number;
        max?: number;
      }>;
      markers?: Array<{
        values?: Record<string, number>;
        scale?: string[];
        normalizeFunction?: string;
        min?: number;
        max?: number;
      }>;
    };
    labels?: {
      regions?: {
        render?: (code: string) => string;
        offsets?: (index: number) => [number, number];
      };
      markers?: {
        render?: (marker: unknown, index: number) => string;
        offsets?: (index: number) => [number, number];
      };
    };
    onRegionTooltipShow?: (
      event: Event,
      tooltip: unknown,
      code: string
    ) => void;
    onMarkerTooltipShow?: (
      event: Event,
      tooltip: unknown,
      index: number
    ) => void;
    onRegionClick?: (event: Event, code: string) => void;
    onMarkerClick?: (event: Event, index: number) => void;
  }

  interface JsVectorMapConstructor {
    new (options: JsVectorMapOptions): unknown;
    maps: Record<string, unknown>;
  }

  const jsVectorMap: JsVectorMapConstructor;
  export default jsVectorMap;
}
