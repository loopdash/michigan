# Mapbox Setup Instructions

## Adding Your Mapbox API Key

1. **Get your Mapbox Access Token:**
   - Go to https://account.mapbox.com/access-tokens/
   - Sign up or log in to your Mapbox account
   - Copy your default public token (or create a new one)

2. **Add the token to your code:**
   - Open `app.js` in your code editor
   - Find line 114 (look for `mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN_HERE';`)
   - Replace `'YOUR_MAPBOX_ACCESS_TOKEN_HERE'` with your actual token
   - Example: `mapboxgl.accessToken = 'pk.eyJ1IjoieW91cnVzZXJuYW1lIiwiYSI6ImN...';`

## 3D Map Features

The map is configured with:
- **3D Terrain**: Elevation data for realistic 3D rendering
- **Pitch Control**: Tilt the map (default 45 degrees)
- **Rotation**: Rotate the map by right-clicking and dragging (or Ctrl + drag)
- **Navigation Controls**: Zoom and compass controls in the top-right corner

## Map Controls

- **Drag**: Click and drag to pan the map
- **Zoom**: Scroll wheel or use +/- buttons
- **Rotate**: Right-click + drag (or Ctrl + drag on Mac)
- **Tilt**: Hold Shift + drag up/down, or use the navigation controls

## Troubleshooting

If you see an error about the access token:
- Make sure you've replaced `YOUR_MAPBOX_ACCESS_TOKEN_HERE` with your actual token
- Ensure your token has the correct scopes enabled
- Check that your token hasn't expired
