// Authentication and Data Management
const AUTH_PASSWORD = 'ShapeTomorrow'; // Default password - change in production
const STORAGE_KEY = 'mjf_map_data';
const AUTH_KEY = 'mjf_auth';

// Initialize map centered on Michigan
let map;
let markers = [];
let currentMarkers = [];
let isAddingLocation = false;
let tempMarker = null;

// Sample data - in production this would come from a database
let mapData = [
    {
        id: 1,
        name: 'Detroit Legal Aid',
        serviceType: 'Legal Assistance',
        lat: 42.3314,
        lng: -83.0458,
        address: '123 Main St, Detroit, MI 48201',
        phone: '(313) 555-0100',
        email: 'info@detroitlegalaid.org',
        notes: 'Provides free legal assistance for housing and employment issues.'
    },
    {
        id: 2,
        name: 'Grand Rapids Community Center',
        serviceType: 'Community Support',
        lat: 42.9634,
        lng: -85.6681,
        address: '456 Oak Ave, Grand Rapids, MI 49503',
        phone: '(616) 555-0200',
        email: 'contact@grcommunity.org',
        notes: 'Emergency housing and food assistance available.'
    },
    {
        id: 3,
        name: 'Ann Arbor Crisis Response',
        serviceType: 'Crisis Response',
        lat: 42.2808,
        lng: -83.7430,
        address: '789 University Blvd, Ann Arbor, MI 48104',
        phone: '(734) 555-0300',
        email: 'help@a2crisis.org',
        notes: '24/7 crisis hotline and rapid response team.'
    },
    {
        id: 4,
        name: 'Lansing Justice Network',
        serviceType: 'Legal Assistance',
        lat: 42.7325,
        lng: -84.5555,
        address: '321 Capital Ave, Lansing, MI 48933',
        phone: '(517) 555-0400',
        email: 'info@lansingjustice.org',
        notes: 'Legal representation and advocacy services.'
    },
    {
        id: 5,
        name: 'Flint Resource Hub',
        serviceType: 'Community Support',
        lat: 43.0125,
        lng: -83.6875,
        address: '654 Saginaw St, Flint, MI 48502',
        phone: '(810) 555-0500',
        email: 'support@flinthub.org',
        notes: 'Comprehensive community resources and referrals.'
    },
    // Partner Organizations
    {
        id: 51,
        name: 'Michigan Immigrant Rights Center',
        serviceType: 'Legal Assistance',
        lat: 42.2808,
        lng: -83.7500,
        address: '111 N Main St, Ann Arbor, MI 48104',
        phone: '(734) 239-6863',
        email: 'info@michiganimmigrant.org',
        notes: 'Provides free legal services to immigrants and their families across Michigan.'
    },
    {
        id: 52,
        name: 'ACLU of Michigan',
        serviceType: 'Legal Assistance',
        lat: 42.3314,
        lng: -83.0520,
        address: '2966 Woodward Ave, Detroit, MI 48201',
        phone: '(313) 578-6800',
        email: 'info@aclumich.org',
        notes: 'Fights for civil liberties and immigrant rights through litigation and advocacy.'
    },
    {
        id: 53,
        name: 'Detroit Hispanic Development Corporation',
        serviceType: 'Community Support',
        lat: 42.3200,
        lng: -83.0800,
        address: '1211 Trumbull St, Detroit, MI 48216',
        phone: '(313) 841-7436',
        email: 'info@dhdcorp.org',
        notes: 'Community organization providing support services to Latino families in Detroit.'
    },
    {
        id: 54,
        name: 'One Michigan for Immigrant Rights',
        serviceType: 'Crisis Response',
        lat: 42.3314,
        lng: -83.0458,
        address: 'Detroit, MI',
        phone: '(313) 555-6000',
        email: 'info@onemichigan.org',
        notes: 'Grassroots organization working to protect immigrant communities and provide rapid response.'
    },
    {
        id: 55,
        name: 'Grand Rapids Area Mutual Aid Network',
        serviceType: 'Community Support',
        lat: 42.9634,
        lng: -85.6681,
        address: 'Grand Rapids, MI',
        phone: '(616) 555-6100',
        email: 'info@grmutualaid.org',
        notes: 'Community mutual aid network providing support and resources to vulnerable communities.'
    },
    {
        id: 56,
        name: 'Lansing Area Rapid Response Network',
        serviceType: 'Crisis Response',
        lat: 42.7325,
        lng: -84.5555,
        address: 'Lansing, MI',
        phone: '(517) 555-6200',
        email: 'response@lansingnetwork.org',
        notes: 'Local rapid response network coordinating community support and emergency assistance.'
    },
    {
        id: 57,
        name: 'Michigan United',
        serviceType: 'Community Support',
        lat: 42.3314,
        lng: -83.0458,
        address: 'Detroit, MI',
        phone: '(313) 555-6300',
        email: 'info@michiganunited.org',
        notes: 'Statewide organization working for immigrant rights, economic justice, and community organizing.'
    },
    {
        id: 58,
        name: 'Washtenaw Interfaith Coalition for Immigrant Rights',
        serviceType: 'Community Support',
        lat: 42.2808,
        lng: -83.7430,
        address: 'Ann Arbor, MI',
        phone: '(734) 555-6400',
        email: 'info@wicir.org',
        notes: 'Interfaith coalition providing support and advocacy for immigrant families in Washtenaw County.'
    },
    {
        id: 59,
        name: 'Detroit Justice Center',
        serviceType: 'Legal Assistance',
        lat: 42.3314,
        lng: -83.0500,
        address: 'Detroit, MI',
        phone: '(313) 555-6500',
        email: 'info@detroitjustice.org',
        notes: 'Legal services organization focused on community justice and supporting marginalized communities.'
    },
    {
        id: 60,
        name: 'Kalamazoo Immigrant Rights Coalition',
        serviceType: 'Crisis Response',
        lat: 42.2917,
        lng: -85.5872,
        address: 'Kalamazoo, MI',
        phone: '(269) 555-6600',
        email: 'info@kazooimmigrantrights.org',
        notes: 'Coalition working to protect and support immigrant communities in Kalamazoo.'
    },
    {
        id: 61,
        name: 'Flint Immigration Network',
        serviceType: 'Community Support',
        lat: 43.0125,
        lng: -83.6875,
        address: 'Flint, MI',
        phone: '(810) 555-6700',
        email: 'info@flintimmigration.org',
        notes: 'Local network providing resources and support to immigrant families in Flint.'
    },
    {
        id: 62,
        name: 'Saginaw Valley Community Support',
        serviceType: 'Community Support',
        lat: 43.4195,
        lng: -83.9508,
        address: 'Saginaw, MI',
        phone: '(989) 555-6800',
        email: 'info@svcommunity.org',
        notes: 'Community organization offering support services and resources to families in need.'
    },
    {
        id: 63,
        name: 'West Michigan Legal Services',
        serviceType: 'Legal Assistance',
        lat: 42.9634,
        lng: -85.6750,
        address: 'Grand Rapids, MI',
        phone: '(616) 555-6900',
        email: 'legal@westmichigan.org',
        notes: 'Legal aid organization providing free legal services to low-income and immigrant communities.'
    },
    {
        id: 64,
        name: 'Metro Detroit Mutual Aid',
        serviceType: 'Community Support',
        lat: 42.3380,
        lng: -83.0520,
        address: 'Detroit Metro Area',
        phone: '(313) 555-7000',
        email: 'info@metrodetroitmutualaid.org',
        notes: 'Mutual aid network providing emergency support and resources across Metro Detroit.'
    },
    {
        id: 65,
        name: 'Michigan Faith in Action',
        serviceType: 'Community Support',
        lat: 42.7325,
        lng: -84.5620,
        address: 'Lansing, MI',
        phone: '(517) 555-7100',
        email: 'info@mifia.org',
        notes: 'Faith-based organization working for social justice and supporting immigrant communities.'
    },
    {
        id: 66,
        name: 'Detroit Community Health Center',
        serviceType: 'Healthcare',
        lat: 42.3314,
        lng: -83.0480,
        address: 'Detroit, MI',
        phone: '(313) 555-7200',
        email: 'health@detroitcommunity.org',
        notes: 'Community health center providing healthcare services regardless of immigration status.'
    },
    {
        id: 67,
        name: 'Ann Arbor Sanctuary Network',
        serviceType: 'Crisis Response',
        lat: 42.2880,
        lng: -83.7500,
        address: 'Ann Arbor, MI',
        phone: '(734) 555-7300',
        email: 'info@a2sanctuary.org',
        notes: 'Sanctuary network providing safe spaces and support for immigrant families.'
    },
    {
        id: 68,
        name: 'Grand Rapids Legal Aid Society',
        serviceType: 'Legal Assistance',
        lat: 42.9700,
        lng: -85.6750,
        address: 'Grand Rapids, MI',
        phone: '(616) 555-7400',
        email: 'info@grlegalaid.org',
        notes: 'Legal aid organization providing free legal services to low-income residents.'
    },
    {
        id: 69,
        name: 'Michigan Coalition for Immigrant Rights',
        serviceType: 'Community Support',
        lat: 42.7325,
        lng: -84.5555,
        address: 'Lansing, MI',
        phone: '(517) 555-7500',
        email: 'info@michiganimmigrantcoalition.org',
        notes: 'Statewide coalition coordinating immigrant rights advocacy and support services.'
    },
    {
        id: 70,
        name: 'Detroit Workers Rights Center',
        serviceType: 'Legal Assistance',
        lat: 42.3314,
        lng: -83.0460,
        address: 'Detroit, MI',
        phone: '(313) 555-7600',
        email: 'info@detroitworkers.org',
        notes: 'Organization fighting for workers rights and providing legal support to immigrant workers.'
    }
];

// Load data from localStorage or use default
function loadData() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            mapData = JSON.parse(stored);
        } catch (e) {
            console.error('Error loading data:', e);
        }
    }
}

// Save data to localStorage
function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mapData));
}

// Check authentication
function checkAuth() {
    const auth = localStorage.getItem(AUTH_KEY);
    return auth === 'authenticated';
}

// Authenticate user
function authenticate(password) {
    if (password === AUTH_PASSWORD) {
        localStorage.setItem(AUTH_KEY, 'authenticated');
        return true;
    }
    return false;
}

// Logout
function logout() {
    localStorage.removeItem(AUTH_KEY);
    location.reload();
}

// Initialize map
function initMap() {
    // Get Mapbox token from config file
    if (window.MAPBOX_CONFIG && window.MAPBOX_CONFIG.accessToken) {
        mapboxgl.accessToken = window.MAPBOX_CONFIG.accessToken;
    } else {
        // Fallback: check if config.js wasn't loaded
        alert('Mapbox configuration not found. Please create a config.js file with your Mapbox access token.\n\nSee config.example.js for instructions.\n\nGet your token from: https://account.mapbox.com/access-tokens/');
        return;
    }
    
    // Check if token is still placeholder
    if (!mapboxgl.accessToken || mapboxgl.accessToken === 'YOUR_MAPBOX_ACCESS_TOKEN_HERE') {
        alert('Please add your Mapbox API key in config.js.\n\nCopy config.example.js to config.js and add your token.\n\nGet your token from: https://account.mapbox.com/access-tokens/');
        return;
    }
    
    // Center on Detroit
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v11', // Dark futuristic style (supports 3D buildings)
        center: [-83.0458, 42.3314], // Detroit coordinates [lng, lat]
        zoom: 15, // Zoomed in to see buildings clearly (increased for better visibility)
        pitch: 60, // Maximum tilt for best 3D building view (0-60 degrees)
        bearing: 0, // North-facing for better building visibility
        minZoom: 6,
        maxZoom: 18,
        maxBounds: [
            [-90.4184, 41.6961], // Southwest corner [lng, lat]
            [-82.1229, 48.3031]  // Northeast corner [lng, lat]
        ],
        antialias: true // Enable antialiasing for smoother 3D rendering
    });

    // Add navigation controls (zoom, rotation, pitch)
    map.addControl(new mapboxgl.NavigationControl({
        showCompass: true,
        showZoom: true,
        visualizePitch: true
    }), 'top-right');

    // Wait for map to load
    map.on('load', () => {
        // Add terrain source for 3D elevation
        map.addSource('mapbox-dem', {
            'type': 'raster-dem',
            'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
            'tileSize': 512,
            'maxzoom': 14
        });
        
        // Set terrain with exaggeration for more visible 3D effect
        map.setTerrain({ 
            'source': 'mapbox-dem',
            'exaggeration': 1.5 // Slightly reduced for better building visibility
        });

        // Add 3D buildings layer after style is fully loaded
        add3DBuildings();

        // Customize map colors for futuristic gray theme
        try {
            map.setPaintProperty('water', 'fill-color', '#1a1a1a');
            if (map.getLayer('landcover')) {
                map.setPaintProperty('landcover', 'fill-color', '#2d2d2d');
            }
        } catch (e) {
            // Some layers might not exist in dark style, that's okay
            console.log('Some style customizations skipped:', e);
        }

        // Load markers after terrain is set up
        loadMarkers();
    });

    // Add click handler for adding locations
    // Use mousedown instead of click to avoid conflicts with form inputs
    map.on('click', (e) => {
        // Check if modal is open and if click is inside modal
        const modal = document.getElementById('addLocationModal');
        if (modal && !modal.classList.contains('hidden')) {
            // Don't handle map clicks when modal is open - let user click map intentionally
            return;
        }
        handleMapClick(e);
    });

    // Enable drag rotation with right-click + drag or Ctrl + drag
    map.dragRotate.enable();
    map.touchZoomRotate.enable();
}

// Add 3D buildings layer
function add3DBuildings() {
    // Function to actually add the buildings layer
    const addBuildingsLayer = () => {
        // Check if layer already exists
        if (map.getLayer('add-3d-buildings')) {
            console.log('3D buildings layer already exists');
            return;
        }

        // Get all layers to find where to insert
        const layers = map.getStyle().layers;
        
        // Find the first symbol layer with text (labels)
        const labelLayerId = layers.find(
            (layer) => layer.type === 'symbol' && 
                       layer.layout && 
                       layer.layout['text-field']
        )?.id;

        console.log('Adding 3D buildings layer before:', labelLayerId);

        try {
            // The 'building' layer in the Mapbox Streets vector tileset contains building height data
            // Filter for buildings that have height data and can be extruded
            map.addLayer(
                {
                    'id': 'add-3d-buildings',
                    'source': 'composite',
                    'source-layer': 'building',
                    'filter': ['has', 'height'], // Show buildings that have height data
                    'type': 'fill-extrusion',
                    'minzoom': 13, // Lower minzoom so buildings appear earlier
                    'paint': {
                        'fill-extrusion-color': [
                            'interpolate',
                            ['linear'],
                            ['get', 'height'],
                            0, '#2d2d2d',   // Dark gray for short buildings
                            50, '#4a5568',  // Medium gray
                            100, '#718096', // Lighter gray
                            200, '#9ca3af'  // Light gray for tall buildings
                        ],

                        // Use an 'interpolate' expression to add a smooth transition effect
                        // to the buildings as the user zooms in
                        'fill-extrusion-height': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            13,
                            0,
                            13.05,
                            ['get', 'height']
                        ],
                        'fill-extrusion-base': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            13,
                            0,
                            13.05,
                            ['*', ['get', 'min_height'], 0.9] // Use min_height if available, otherwise 0
                        ],
                        'fill-extrusion-opacity': 0.9 // Increased opacity for better visibility
                    }
                },
                labelLayerId // Insert before label layer
            );
            console.log('3D buildings layer added successfully');
        } catch (error) {
            console.error('Error adding 3D buildings layer:', error);
            // Try without filter as fallback - show all buildings
            try {
                map.addLayer(
                    {
                        'id': 'add-3d-buildings',
                        'source': 'composite',
                        'source-layer': 'building',
                        'filter': ['has', 'height'], // Only buildings with height
                        'type': 'fill-extrusion',
                        'minzoom': 13,
                        'paint': {
                            'fill-extrusion-color': '#4a5568',
                            'fill-extrusion-height': [
                                'interpolate',
                                ['linear'],
                                ['zoom'],
                                13,
                                0,
                                13.05,
                                ['get', 'height']
                            ],
                            'fill-extrusion-base': [
                                'interpolate',
                                ['linear'],
                                ['zoom'],
                                13,
                                0,
                                13.05,
                                ['*', ['get', 'min_height'], 0.9]
                            ],
                            'fill-extrusion-opacity': 0.9
                        }
                    },
                    labelLayerId
                );
                console.log('3D buildings layer added (fallback method)');
            } catch (fallbackError) {
                console.error('Fallback also failed:', fallbackError);
                console.error('Available sources:', Object.keys(map.getStyle().sources || {}));
            }
        }
    };

    // Try to add immediately if style is loaded
    if (map.isStyleLoaded()) {
        addBuildingsLayer();
    } else {
        // Wait for style to load
        map.once('style.load', () => {
            console.log('Style loaded, adding 3D buildings');
            addBuildingsLayer();
        });
        
        // Also listen for the regular load event as backup
        map.once('load', () => {
            if (!map.getLayer('add-3d-buildings')) {
                console.log('Map loaded, adding 3D buildings');
                setTimeout(addBuildingsLayer, 500); // Small delay to ensure style is ready
            }
        });
    }
}

// Create marker element
function createMarkerElement(serviceType) {
    // Futuristic gray/cyan color scheme
    const colors = {
        'Legal Assistance': '#00d4ff', // Cyan
        'Community Support': '#00ff88', // Neon green
        'Crisis Response': '#ff0066', // Neon pink
        'default': '#888888' // Gray
    };
    
    const color = colors[serviceType] || colors.default;
    
    const el = document.createElement('div');
    el.className = 'custom-marker';
    el.style.width = '22px';
    el.style.height = '22px';
    el.style.borderRadius = '50%';
    el.style.background = `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`;
    el.style.border = '2px solid #ffffff';
    el.style.boxShadow = `0 0 12px ${color}66, 0 2px 6px rgba(0,0,0,0.4)`;
    el.style.transition = 'all 0.3s ease';
    el.style.transformOrigin = 'center center'; // Scale from center to prevent position shift
    
    // Add hover effect
    el.addEventListener('mouseenter', () => {
        el.style.transform = 'scale(1.3)';
        el.style.boxShadow = `0 0 20px ${color}99, 0 4px 10px rgba(0,0,0,0.5)`;
    });
    el.addEventListener('mouseleave', () => {
        el.style.transform = 'scale(1)';
        el.style.boxShadow = `0 0 12px ${color}66, 0 2px 6px rgba(0,0,0,0.4)`;
    });
    
    return el;
}

// Load markers on map
function loadMarkers() {
    // Clear existing markers
    currentMarkers.forEach(marker => marker.remove());
    currentMarkers = [];

    // Add markers
    mapData.forEach(entry => {
        // Create marker element
        const el = createMarkerElement(entry.serviceType);
        
        // Create Mapbox marker with center anchor to prevent position shift on scale
        const marker = new mapboxgl.Marker({
            element: el,
            anchor: 'center' // Anchor at center so scaling doesn't shift position
        })
            .setLngLat([entry.lng, entry.lat]) // [lng, lat] for Mapbox
            .addTo(map);
        
        // Create popup
        const popup = new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
                <div class="popup-content">
                    <h3 class="font-bold text-lg mb-2">${entry.name}</h3>
                    <p class="text-sm text-gray-600 mb-2"><strong>Type:</strong> ${entry.serviceType}</p>
                    <p class="text-sm mb-1"><strong>Address:</strong> ${entry.address}</p>
                    <p class="text-sm mb-1"><strong>Phone:</strong> <a href="tel:${entry.phone}" class="text-blue-600">${entry.phone}</a></p>
                    <p class="text-sm mb-2"><strong>Email:</strong> <a href="mailto:${entry.email}" class="text-blue-600">${entry.email}</a></p>
                    ${entry.notes ? `<p class="text-sm text-gray-700 mt-2">${entry.notes}</p>` : ''}
                </div>
            `);
        
        marker.setPopup(popup);

        // Add click handler
        el.addEventListener('click', () => {
            showInfoPanel(entry);
        });

        marker.entry = entry;
        currentMarkers.push(marker);
    });
}

// Show info panel
function showInfoPanel(entry) {
    const panel = document.getElementById('infoPanel');
    const title = document.getElementById('infoTitle');
    const content = document.getElementById('infoContent');

    title.textContent = entry.name;
    content.innerHTML = `
        <div class="space-y-2">
            <p><strong>Service Type:</strong> ${entry.serviceType}</p>
            <p><strong>Address:</strong> ${entry.address}</p>
            <p><strong>Phone:</strong> <a href="tel:${entry.phone}" class="text-blue-600 hover:underline">${entry.phone}</a></p>
            <p><strong>Email:</strong> <a href="mailto:${entry.email}" class="text-blue-600 hover:underline">${entry.email}</a></p>
            ${entry.notes ? `<p class="mt-4 pt-4 border-t"><strong>Notes:</strong><br>${entry.notes}</p>` : ''}
        </div>
    `;

    panel.classList.remove('hidden');
    
    // Pan to marker
    map.flyTo({
        center: [entry.lng, entry.lat],
        zoom: 10
    });
}

// Filter markers
function filterMarkers() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const serviceType = document.getElementById('serviceTypeFilter').value;

    currentMarkers.forEach(marker => {
        const entry = marker.entry;
        const matchesSearch = !searchTerm || 
            entry.name.toLowerCase().includes(searchTerm) ||
            entry.serviceType.toLowerCase().includes(searchTerm) ||
            entry.address.toLowerCase().includes(searchTerm) ||
            (entry.notes && entry.notes.toLowerCase().includes(searchTerm));
        
        const matchesType = !serviceType || entry.serviceType === serviceType;

        // Show or hide marker element
        const markerElement = marker.getElement();
        if (matchesSearch && matchesType) {
            markerElement.style.display = 'block';
        } else {
            markerElement.style.display = 'none';
        }
    });
}


// Populate service type filter
function populateServiceTypes() {
    const select = document.getElementById('serviceTypeFilter');
    const types = [...new Set(mapData.map(entry => entry.serviceType).filter(t => t))].sort();
    
    // Clear existing options except "All Service Types"
    select.innerHTML = '<option value="">All Service Types</option>';
    
    types.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        select.appendChild(option);
    });
}

// Handle map click when adding location
function handleMapClick(e) {
    // Only update if modal is open and user intentionally clicks the map (not the modal)
    if (!isAddingLocation || !e.lngLat) {
        return;
    }
    
    // Don't update if user is interacting with form inputs
    const activeElement = document.activeElement;
    if (activeElement && (
        activeElement.id === 'locationLat' || 
        activeElement.id === 'locationLng' ||
        activeElement.tagName === 'INPUT' ||
        activeElement.tagName === 'TEXTAREA' ||
        activeElement.tagName === 'SELECT'
    )) {
        return; // Don't update if input is focused
    }
    
    if (isAddingLocation && e.lngLat) {
        const lat = e.lngLat.lat;
        const lng = e.lngLat.lng;
        
        document.getElementById('locationLat').value = lat.toFixed(6);
        document.getElementById('locationLng').value = lng.toFixed(6);
        
        // Make fields editable since user set them manually
        document.getElementById('locationLat').readOnly = false;
        document.getElementById('locationLat').classList.remove('bg-gray-50');
        document.getElementById('locationLng').readOnly = false;
        document.getElementById('locationLng').classList.remove('bg-gray-50');
        
        // Remove previous temp marker if exists
        if (tempMarker) {
            tempMarker.remove();
        }
        
        // Create temporary marker element
        const tempEl = document.createElement('div');
        tempEl.style.width = '24px';
        tempEl.style.height = '24px';
        tempEl.style.borderRadius = '50%';
        tempEl.style.backgroundColor = '#EF4444';
        tempEl.style.border = '3px solid white';
        tempEl.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
        
        // Add temporary marker to show selected location
        tempMarker = new mapboxgl.Marker(tempEl)
            .setLngLat([lng, lat])
            .addTo(map);
        
        // Pan to clicked location
        const currentZoom = map.getZoom();
        map.flyTo({
            center: [lng, lat],
            zoom: Math.max(currentZoom, 10)
        });
    }
}

// Open add location modal
function openAddLocationModal() {
    isAddingLocation = true;
    document.getElementById('addLocationModal').classList.remove('hidden');
    document.getElementById('addLocationForm').reset();
    
    // Reset lat/lng fields to readonly (will be filled from address)
    document.getElementById('locationLat').readOnly = true;
    document.getElementById('locationLat').classList.add('bg-gray-50');
    document.getElementById('locationLng').readOnly = true;
    document.getElementById('locationLng').classList.add('bg-gray-50');
    document.getElementById('geocodeStatus').textContent = '';
    
    // Clear temp marker if exists
    if (tempMarker) {
        tempMarker.remove();
        tempMarker = null;
    }
    
    // Focus on name field
    document.getElementById('locationName').focus();
}

// Close add location modal
function closeAddLocationModal() {
    isAddingLocation = false;
    document.getElementById('addLocationModal').classList.add('hidden');
    
    // Remove temp marker
    if (tempMarker) {
        map.removeLayer(tempMarker);
        tempMarker = null;
    }
}

// Geocode address to get coordinates
async function geocodeAddress(address) {
    // Get token from config or mapboxgl
    let token = null;
    if (window.MAPBOX_CONFIG && window.MAPBOX_CONFIG.accessToken) {
        token = window.MAPBOX_CONFIG.accessToken;
    } else if (typeof mapboxgl !== 'undefined' && mapboxgl.accessToken) {
        token = mapboxgl.accessToken;
    }
    
    if (!address || !token) {
        console.error('Mapbox token not found for geocoding');
        return null;
    }
    
    try {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${token}&limit=1&country=us&bbox=-90.5,41.5,-82,48.5`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.features && data.features.length > 0) {
            const feature = data.features[0];
            const [lng, lat] = feature.center;
            return { lat, lng, placeName: feature.place_name };
        }
        return null;
    } catch (error) {
        console.error('Geocoding error:', error);
        return null;
    }
}

// Handle geocoding address
async function handleGeocodeAddress() {
    const address = document.getElementById('locationAddress').value.trim();
    const statusEl = document.getElementById('geocodeStatus');
    
    if (!address) {
        statusEl.textContent = 'Please enter an address first.';
        statusEl.className = 'ml-2 text-sm text-red-500';
        return;
    }
    
    statusEl.textContent = 'Looking up coordinates...';
    statusEl.className = 'ml-2 text-sm text-blue-500';
    
    const result = await geocodeAddress(address);
    
    if (result) {
        document.getElementById('locationLat').value = result.lat.toFixed(6);
        document.getElementById('locationLng').value = result.lng.toFixed(6);
        
        // Keep fields readonly when auto-filled from address
        document.getElementById('locationLat').readOnly = true;
        document.getElementById('locationLat').classList.add('bg-gray-50');
        document.getElementById('locationLng').readOnly = true;
        document.getElementById('locationLng').classList.add('bg-gray-50');
        
        statusEl.textContent = '✓ Coordinates found';
        statusEl.className = 'ml-2 text-sm text-green-500';
        
        // Update temp marker if exists
        if (tempMarker) {
            tempMarker.remove();
        }
        
        const tempEl = document.createElement('div');
        tempEl.style.width = '24px';
        tempEl.style.height = '24px';
        tempEl.style.borderRadius = '50%';
        tempEl.style.backgroundColor = '#EF4444';
        tempEl.style.border = '3px solid white';
        tempEl.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
        
        tempMarker = new mapboxgl.Marker(tempEl)
            .setLngLat([result.lng, result.lat])
            .addTo(map);
        
        map.flyTo({
            center: [result.lng, result.lat],
            zoom: Math.max(map.getZoom(), 12)
        });
    } else {
        statusEl.textContent = 'Could not find coordinates. Try clicking on the map instead.';
        statusEl.className = 'ml-2 text-sm text-red-500';
    }
}

// Handle add location form submission
async function handleAddLocationSubmit(e) {
    e.preventDefault();
    
    const address = document.getElementById('locationAddress').value.trim();
    let lat = parseFloat(document.getElementById('locationLat').value);
    let lng = parseFloat(document.getElementById('locationLng').value);
    
    // If coordinates are missing but address is provided, try to geocode
    if ((isNaN(lat) || isNaN(lng)) && address) {
        const statusEl = document.getElementById('geocodeStatus');
        statusEl.textContent = 'Looking up coordinates from address...';
        statusEl.className = 'ml-2 text-sm text-blue-500';
        
        const geocodeResult = await geocodeAddress(address);
        if (geocodeResult) {
            lat = geocodeResult.lat;
            lng = geocodeResult.lng;
            document.getElementById('locationLat').value = lat.toFixed(6);
            document.getElementById('locationLng').value = lng.toFixed(6);
        } else {
            alert('Could not determine coordinates from address. Please click on the map to set the location.');
            return;
        }
    }
    
    const entry = {
        name: document.getElementById('locationName').value.trim(),
        serviceType: document.getElementById('locationServiceType').value || 'Other',
        lat: lat,
        lng: lng,
        address: address,
        phone: document.getElementById('locationPhone').value.trim(),
        email: document.getElementById('locationEmail').value.trim(),
        notes: document.getElementById('locationNotes').value.trim(),
    };
    
    // Validation (serviceType is now optional)
    if (!entry.name || !entry.address || !entry.phone || !entry.email) {
        alert('Please fill in all required fields (Name, Address, Phone, Email).');
        return;
    }
    
    if (isNaN(entry.lat) || isNaN(entry.lng)) {
        alert('Please provide an address (coordinates will be found automatically) or click on the map to set coordinates.');
        return;
    }
    
    // Validate Michigan bounds (approximate)
    if (entry.lat < 41.5 || entry.lat > 48.5 || entry.lng < -90.5 || entry.lng > -82) {
        if (!confirm('This location appears to be outside Michigan. Continue anyway?')) {
            return;
        }
    }
    
    // Generate new ID
    const newId = mapData.length > 0 ? Math.max(...mapData.map(e => e.id)) + 1 : 1;
    entry.id = newId;
    
    // Add to mapData
    mapData.push(entry);
    saveData();
    
    // Reload markers
    loadMarkers();
    
    // Update service type filter
    populateServiceTypes();
    
    // Close modal
    closeAddLocationModal();
    
    // Show success message
    alert('Location added successfully!');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadData();

    // Check authentication
    if (!checkAuth()) {
        document.getElementById('passwordModal').classList.remove('hidden');
        document.getElementById('passwordInput').focus();
        
        // Handle password submission
        document.getElementById('passwordSubmit').addEventListener('click', () => {
            const password = document.getElementById('passwordInput').value;
            const errorDiv = document.getElementById('passwordError');
            
            if (authenticate(password)) {
                document.getElementById('passwordModal').classList.add('hidden');
                document.getElementById('mainContent').classList.remove('hidden');
                initMap();
                populateServiceTypes();
            } else {
                errorDiv.textContent = 'Incorrect password. Please try again.';
                errorDiv.classList.remove('hidden');
                document.getElementById('passwordInput').value = '';
            }
        });

        // Allow Enter key to submit
        document.getElementById('passwordInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                document.getElementById('passwordSubmit').click();
            }
        });
    } else {
        // Already authenticated
        document.getElementById('passwordModal').classList.add('hidden');
        document.getElementById('mainContent').classList.remove('hidden');
        document.getElementById('logoutBtn').classList.remove('hidden');
        document.getElementById('adminLink').classList.remove('hidden');
        initMap();
        populateServiceTypes();
    }

    // Logout button
    document.getElementById('logoutBtn').addEventListener('click', logout);

    // Search and filter
    document.getElementById('searchInput').addEventListener('input', filterMarkers);
    document.getElementById('serviceTypeFilter').addEventListener('change', filterMarkers);
    document.getElementById('clearFilters').addEventListener('click', () => {
        document.getElementById('searchInput').value = '';
        document.getElementById('serviceTypeFilter').value = '';
        filterMarkers();
    });

    // Close info panel
    document.getElementById('closeInfo').addEventListener('click', () => {
        document.getElementById('infoPanel').classList.add('hidden');
    });

    // Add location button
    document.getElementById('addLocationBtn').addEventListener('click', openAddLocationModal);
    
    // Add location form
    document.getElementById('addLocationForm').addEventListener('submit', handleAddLocationSubmit);
    
    // Geocode address button
    document.getElementById('geocodeAddressBtn').addEventListener('click', handleGeocodeAddress);
    
    // Auto-geocode when address field loses focus (with Enter key or blur)
    document.getElementById('locationAddress').addEventListener('blur', async () => {
        const address = document.getElementById('locationAddress').value.trim();
        const lat = document.getElementById('locationLat').value;
        const lng = document.getElementById('locationLng').value;
        
        // Only geocode if address is provided and coordinates are not set
        if (address && (!lat || !lng)) {
            await handleGeocodeAddress();
        }
    });
    
    // Cancel add location
    document.getElementById('cancelAddLocationBtn').addEventListener('click', closeAddLocationModal);
    
    // Close modal on outside click (but prevent map clicks from interfering)
    document.getElementById('addLocationModal').addEventListener('click', (e) => {
        if (e.target.id === 'addLocationModal') {
            closeAddLocationModal();
        }
        // Stop propagation to prevent map click handler from firing
        e.stopPropagation();
    });
    
    // Prevent map clicks when clicking inside the modal form
    document.getElementById('addLocationForm').addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    document.getElementById('addLocationForm').addEventListener('mousedown', (e) => {
        e.stopPropagation();
    });
});

// Export functions for admin page
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { mapData, loadData, saveData };
}
