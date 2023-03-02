import { divIcon } from 'leaflet';

export const markerIcon = (color = '#4899D0', id) => {
  const lightenDarkenColor = (col, amt) => {
    let usePound = false;
    if (col[0] == '#') {
      col = col.slice(1);
      usePound = true;
    }

    const num = parseInt(col, 16);

    let r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    let b = ((num >> 8) & 0x00ff) + amt;

    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    let g = (num & 0x0000ff) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
  };

  return divIcon({
    html: `
  <svg viewBox="0 0 25 42" fill="${color}" xmlns="http://www.w3.org/2000/svg">
  <path
  stroke-linejoin="round"
    d="M23.122 20.578 12.541 41.38 1.959 20.578c-2.121-4.266-2.283-11.734 0-14.934C4.243 2.444 7.25.31 12.541.31c5.29 0 8.103 1.6 10.581 5.334 2.478 3.733 2.113 10.668 0 14.934Z"
    fill="url(#${id})" />
  <path
  stroke-linejoin="round"
    d="M7.206 12.012c0 2.953 2.37 5.347 5.292 5.347 2.922 0 5.291-2.394 5.291-5.347 0-2.953-2.369-5.347-5.291-5.347-2.923 0-5.292 2.394-5.292 5.347Z"
    fill="#fff" />
  <defs>
    <linearGradient id="${id}" x1="12.522" y1=".31" x2="12.522" y2="41.38" gradientUnits="userSpaceOnUse">
      <stop stop-color="${lightenDarkenColor(color, 40)}" />
      <stop offset="1" stop-color="${color}" />
    </linearGradient>
  </defs>
</svg>
  `,
    iconSize: [25, 42],
    iconAnchor: [12.5, 42],
  });
};
