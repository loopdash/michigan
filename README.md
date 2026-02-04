# Michigan Justice Fund - Rapid Response Map MVP

An MVP concept for an interactive map displaying rapid response providers and justice resources across Michigan.

## Features

- **Interactive Map**: Geospatial map of Michigan with markers for service providers
- **Password Protection**: Secure access control for viewing the map
- **Admin Panel**: Full CRUD interface for managing map entries
- **Search & Filter**: Search by name, address, or service type
- **Responsive Design**: Works on desktop and mobile devices
- **Performance Optimized**: Efficient rendering with Leaflet.js

## Getting Started

1. Open `index.html` in a web browser
2. Enter the default password: `michigan2024`
3. View the map and interact with markers
4. Access the admin panel to manage entries

## Default Password

The default password is: `michigan2024`

To change it, edit the `AUTH_PASSWORD` constant in `app.js`.

## File Structure

- `index.html` - Main map interface
- `app.js` - Map functionality and authentication
- `admin.html` - Admin panel for managing entries
- `admin.js` - Admin panel functionality
- `README.md` - This file

## Data Storage

This MVP uses browser localStorage to store map entries. In a production environment, this would be replaced with a proper database.

## Technologies Used

- **Tailwind CSS** - Styling
- **Leaflet.js** - Interactive mapping
- **Vanilla JavaScript** - No frameworks required

## Browser Support

Works in all modern browsers that support ES6 JavaScript and localStorage.
