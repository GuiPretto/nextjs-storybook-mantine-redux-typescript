import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet.offline';
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.js';
import 'leaflet.locatecontrol/dist/L.Control.Locate.css';
import './highlight';

import {
  Control,
  Layer,
  TileLayer,
  control,
  latLng,
  latLngBounds,
  tileLayer,
} from 'leaflet';
import { MapContainer, Marker, Popup, useMap } from 'react-leaflet';
import { MapEventsProps, MapProps, MarkerProps } from './interfaces';

import { Container } from './styles';
import { Text } from '@mantine/core';
import { markerIcon } from './icon';
import { useEffect } from 'react';
import { useState } from 'react';

const getPositions = (marker: MarkerProps) => {
  return latLng(
    typeof marker.lat === 'number' ? marker.lat : parseFloat(marker.lat),
    typeof marker.long === 'number' ? marker.long : parseFloat(marker.long)
  );
};

const getBounds = (markers: MarkerProps[]) => {
  const latLngs = markers?.map((marker) => {
    return getPositions(marker);
  });
  return latLngs?.length ? latLngBounds(latLngs) : [];
};

const MapEvents = ({ markers, showBoundaries, highlights }: MapEventsProps) => {
  const map = useMap();
  const [currentHighlights, setCurrentHighlights] = useState([]);

  let locateControl: Control;
  let offlineLayer: TileLayer;

  useEffect(() => {
    if (map) {
      map.setZoom(16);

      if (!locateControl) {
        locateControl = control
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          .locate({
            keepCurrentZoomLevel: true,
            drawCircle: false,
          });
        map.addControl(locateControl);

        if (!markers?.length) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          locateControl.start();
        }
      }

      if (offlineLayer) {
        if (!map.hasLayer(offlineLayer)) {
          map.addLayer(offlineLayer);
        }
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        offlineLayer = tileLayer.offline(
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            attribution:
              '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            subdomains: 'abc',
            minZoom: 13,
            maxZoom: 16,
          }
        );
        // setOfflineLayer(newOffLayer);
        map.addLayer(offlineLayer);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const controlSaveTiles = control.savetiles(offlineLayer, {
          zoomlevels: [13, 14, 15, 16], // optional zoomlevels to save, default current zoomlevel
          confirm(layer, successCallback) {
            // eslint-disable-next-line no-alert
            if (
              window.confirm(
                `Save tiles offline? It will download ${layer._tilesforSave?.length} images.`
              )
            ) {
              successCallback();
            }
          },
          confirmRemoval(layer, successCallback) {
            // eslint-disable-next-line no-alert
            if (window.confirm('Delete offline tiles?')) {
              successCallback();
            }
          },
          saveText: `<img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE0Ljk5OSAyMS41NUw5LjQ5OTAyIDE1SDIwLjQ5OUwxNC45OTkgMjEuNTVaTTEyLjk5OSA1SDE2Ljk5OVY3SDEyLjk5OVY1Wk0xMi45OTkgOEgxNi45OTlWMTBIMTIuOTk5VjhaIiBmaWxsPSIjMTU2NUMwIi8+CjxwYXRoIGQ9Ik0xMi45OTggMTAuOTk5NUgxNi45OThWMTYuNDk5NUgxMi45OThWMTAuOTk5NVpNNS45OTgwNSAyMi45OTk1SDIzLjk5OFYyNC45OTk1SDUuOTk4MDVWMjIuOTk5NVoiIGZpbGw9IiMxNTY1QzAiLz4KPC9zdmc+Cg==" />`,
          rmText: `<img src="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMzAgMzAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTExLjMzNCAxMi4zMzRBLjY2Ny42NjcgMCAwIDEgMTIgMTN2OGEuNjY3LjY2NyAwIDAgMS0xLjMzMyAwdi04YS42NjYuNjY2IDAgMCAxIC42NjctLjY2NlptMy4zMzMgMGEuNjY2LjY2NiAwIDAgMSAuNjY3LjY2NnY4QS42NjcuNjY3IDAgMCAxIDE0IDIxdi04YS42NjcuNjY3IDAgMCAxIC42NjctLjY2NlptNCAuNjY2YS42NjYuNjY2IDAgMSAwLTEuMzMzIDB2OGEuNjY3LjY2NyAwIDAgMCAxLjMzMyAwdi04WiIgZmlsbD0iIzNDM0MzQyIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjMuMzMzIDlBMS4zMzMgMS4zMzMgMCAwIDEgMjIgMTAuMzMzaC0uNjY3djEyQTIuNjY3IDIuNjY3IDAgMCAxIDE4LjY2NyAyNWgtOEEyLjY2NyAyLjY2NyAwIDAgMSA4IDIyLjMzM3YtMTJoLS42NjdBMS4zMzMgMS4zMzMgMCAwIDEgNiA5VjcuNjY3YTEuMzMzIDEuMzMzIDAgMCAxIDEuMzMzLTEuMzM0SDEyQTEuMzM0IDEuMzM0IDAgMCAxIDEzLjMzMyA1SDE2YTEuMzMzIDEuMzMzIDAgMCAxIDEuMzMzIDEuMzMzSDIyYTEuMzMzIDEuMzMzIDAgMCAxIDEuMzMzIDEuMzM0VjlaTTkuNDkxIDEwLjMzM2wtLjE1OC4wNzl2MTEuOTIxYTEuMzMzIDEuMzMzIDAgMCAwIDEuMzM0IDEuMzM0aDhBMS4zMzMgMS4zMzMgMCAwIDAgMjAgMjIuMzMzVjEwLjQxMmwtLjE1Ny0uMDc5SDkuNDlaTTcuMzMzIDlWNy42NjdIMjJWOUg3LjMzM1oiIGZpbGw9IiMzQzNDM0MiLz48L3N2Zz4=" >`,
        });
        controlSaveTiles.addTo(map);
      }
    }
  }, []);

  useEffect(() => {
    if (markers?.length) {
      if (showBoundaries) {
        map.fitBounds(getBounds(markers));
      } else {
        map.panTo(getPositions(markers[markers?.length - 1]));
      }
    }
  }, [markers]);

  useEffect(() => {
    currentHighlights.forEach((e) => {
      map.removeLayer(e);
    });

    const listHighlight = [];
    highlights.forEach((h) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const highlight = new Layer.Highlight().do(
        {
          q: `${h.query}, Brazil`,
        },
        {
          id: h.query,
          style: () => ({ color: h.color }),
        }
      );
      highlight.addTo(map);
      listHighlight.push(highlight);
    });
    setCurrentHighlights(listHighlight);
  }, [highlights]);

  return null;
};

const RealMap = ({
  markers,
  markerBody = () => null,
  initialZoom = 16,
  withMargin,
  minHeight = '400px',
  highlights,
  showBoundaries,
}: MapProps) => {
  return (
    <Container minHeight={minHeight} withMargin={withMargin}>
      <MapContainer zoom={initialZoom} tap={false}>
        <MapEvents
          highlights={highlights}
          showBoundaries={showBoundaries}
          markers={markers ? markers : []}
        />
        {markers?.map((m, index) => (
          <Marker
            key={index}
            position={getPositions(m)}
            icon={markerIcon(null, index.toString())}
          >
            <Popup>
              {markerBody ? (
                markerBody(m)
              ) : (
                <>
                  <Text weight={'bold'}>Hi!</Text>
                </>
              )}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Container>
  );
};

export default RealMap;
