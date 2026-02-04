// Data Management
const STORAGE_KEY = 'mjf_map_data';
const AUTH_KEY = 'mjf_auth';

let mapData = [];
let editingId = null;

// Check authentication
function checkAuth() {
    const auth = localStorage.getItem(AUTH_KEY);
    if (auth !== 'authenticated') {
        alert('You must be authenticated to access the admin panel.');
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

// Load data from localStorage
function loadData() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            mapData = JSON.parse(stored);
        } catch (e) {
            console.error('Error loading data:', e);
            mapData = [];
        }
    } else {
        // Initialize with sample data if no stored data
        mapData = [
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
            // ICE Sightings around major cities (offset to avoid overlapping with service providers)
            {
                id: 6,
                name: 'ICE Sighting - Detroit',
                serviceType: 'Crisis Response',
                lat: 42.3380,
                lng: -83.0520,
                address: 'Downtown Detroit Area',
                phone: '(313) 555-9999',
                email: 'report@example.org',
                notes: 'ICE activity reported in downtown Detroit area.',
                isIceCamp: true
            },
            {
                id: 7,
                name: 'ICE Sighting - Grand Rapids',
                serviceType: 'Crisis Response',
                lat: 42.9700,
                lng: -85.6750,
                address: 'Grand Rapids Metro Area',
                phone: '(616) 555-9999',
                email: 'report@example.org',
                notes: 'ICE activity reported in Grand Rapids area.',
                isIceCamp: true
            },
            {
                id: 8,
                name: 'ICE Sighting - Ann Arbor',
                serviceType: 'Crisis Response',
                lat: 42.2880,
                lng: -83.7500,
                address: 'Ann Arbor Area',
                phone: '(734) 555-9999',
                email: 'report@example.org',
                notes: 'ICE activity reported in Ann Arbor area.',
                isIceCamp: true
            },
            {
                id: 9,
                name: 'ICE Sighting - Lansing',
                serviceType: 'Crisis Response',
                lat: 42.7400,
                lng: -84.5620,
                address: 'Lansing Capital Area',
                phone: '(517) 555-9999',
                email: 'report@example.org',
                notes: 'ICE activity reported in Lansing area.',
                isIceCamp: true
            },
            {
                id: 10,
                name: 'ICE Sighting - Flint',
                serviceType: 'Crisis Response',
                lat: 43.0200,
                lng: -83.6950,
                address: 'Flint Area',
                phone: '(810) 555-9999',
                email: 'report@example.org',
                notes: 'ICE activity reported in Flint area.',
                isIceCamp: true
            },
            {
                id: 11,
                name: 'ICE Sighting - Kalamazoo',
                serviceType: 'Crisis Response',
                lat: 42.2917,
                lng: -85.5872,
                address: 'Kalamazoo Area',
                phone: '(269) 555-9999',
                email: 'report@example.org',
                notes: 'ICE activity reported in Kalamazoo area.',
                isIceCamp: true
            },
            {
                id: 12,
                name: 'ICE Sighting - Saginaw',
                serviceType: 'Crisis Response',
                lat: 43.4195,
                lng: -83.9508,
                address: 'Saginaw Area',
                phone: '(989) 555-9999',
                email: 'report@example.org',
                notes: 'ICE activity reported in Saginaw area.',
                isIceCamp: true
            },
            {
                id: 13,
                name: 'ICE Sighting - Warren',
                serviceType: 'Crisis Response',
                lat: 42.5145,
                lng: -83.0147,
                address: 'Warren Area',
                phone: '(586) 555-9999',
                email: 'report@example.org',
                notes: 'ICE activity reported in Warren area.',
                isIceCamp: true
            },
            {
                id: 14,
                name: 'ICE Sighting - Sterling Heights',
                serviceType: 'Crisis Response',
                lat: 42.5803,
                lng: -83.0302,
                address: 'Sterling Heights Area',
                phone: '(586) 555-9999',
                email: 'report@example.org',
                notes: 'ICE activity reported in Sterling Heights area.',
                isIceCamp: true
            },
            {
                id: 15,
                name: 'ICE Sighting - Troy',
                serviceType: 'Crisis Response',
                lat: 42.6056,
                lng: -83.1499,
                address: 'Troy Area',
                phone: '(248) 555-9999',
                email: 'report@example.org',
                notes: 'ICE activity reported in Troy area.',
                isIceCamp: true
            },
            {
                id: 16,
                name: 'ICE Sighting - Battle Creek',
                serviceType: 'Crisis Response',
                lat: 42.3212,
                lng: -85.1797,
                address: 'Battle Creek Area',
                phone: '(269) 555-9999',
                email: 'report@example.org',
                notes: 'ICE activity reported in Battle Creek area.',
                isIceCamp: true
            },
            {
                id: 17,
                name: 'ICE Sighting - Muskegon',
                serviceType: 'Crisis Response',
                lat: 43.2342,
                lng: -86.2484,
                address: 'Muskegon Area',
                phone: '(231) 555-9999',
                email: 'report@example.org',
                notes: 'ICE activity reported in Muskegon area.',
                isIceCamp: true
            },
            {
                id: 18,
                name: 'ICE Sighting - Bay City',
                serviceType: 'Crisis Response',
                lat: 43.5945,
                lng: -83.8889,
                address: 'Bay City Area',
                phone: '(989) 555-9999',
                email: 'report@example.org',
                notes: 'ICE activity reported in Bay City area.',
                isIceCamp: true
            },
            {
                id: 19,
                name: 'ICE Sighting - Jackson',
                serviceType: 'Crisis Response',
                lat: 42.2459,
                lng: -84.4014,
                address: 'Jackson Area',
                phone: '(517) 555-9999',
                email: 'report@example.org',
                notes: 'ICE activity reported in Jackson area.',
                isIceCamp: true
            },
            {
                id: 20,
                name: 'ICE Sighting - Holland',
                serviceType: 'Crisis Response',
                lat: 42.7875,
                lng: -86.1089,
                address: 'Holland Area',
                phone: '(616) 555-9999',
                email: 'report@example.org',
                notes: 'ICE activity reported in Holland area.',
                isIceCamp: true
            },
            {
                id: 21,
                name: 'ICE Sighting - Dearborn',
                serviceType: 'Crisis Response',
                lat: 42.3223,
                lng: -83.1763,
                address: 'Dearborn Area',
                phone: '(313) 555-9999',
                email: 'report@example.org',
                notes: 'ICE activity reported in Dearborn area.',
                isIceCamp: true
            },
            {
                id: 22,
                name: 'ICE Sighting - Livonia',
                serviceType: 'Crisis Response',
                lat: 42.3684,
                lng: -83.3527,
                address: 'Livonia Area',
                phone: '(734) 555-9999',
                email: 'report@example.org',
                notes: 'ICE activity reported in Livonia area.',
                isIceCamp: true
            },
            {
                id: 23,
                name: 'ICE Sighting - Southfield',
                serviceType: 'Crisis Response',
                lat: 42.4734,
                lng: -83.2215,
                address: 'Southfield Area',
                phone: '(248) 555-9999',
                email: 'report@example.org',
                notes: 'ICE activity reported in Southfield area.',
                isIceCamp: true
            },
            {
                id: 24,
                name: 'ICE Sighting - Pontiac',
                serviceType: 'Crisis Response',
                lat: 42.6389,
                lng: -83.2910,
                address: 'Pontiac Area',
                phone: '(248) 555-9999',
                email: 'report@example.org',
                notes: 'ICE activity reported in Pontiac area.',
                isIceCamp: true
            },
            {
                id: 25,
                name: 'ICE Sighting - Taylor',
                serviceType: 'Crisis Response',
                lat: 42.2409,
                lng: -83.2696,
                address: 'Taylor Area',
                phone: '(734) 555-9999',
                email: 'report@example.org',
                notes: 'ICE activity reported in Taylor area.',
                isIceCamp: true
            },
            {
                id: 26,
                name: 'ICE Sighting - St. Clair Shores',
                serviceType: 'Crisis Response',
                lat: 42.4970,
                lng: -82.8888,
                address: 'St. Clair Shores Area',
                phone: '(586) 555-9999',
                email: 'report@example.org',
                notes: 'ICE activity reported in St. Clair Shores area.',
                isIceCamp: true
            },
            {
                id: 27,
                name: 'ICE Sighting - Wyoming',
                serviceType: 'Crisis Response',
                lat: 42.9134,
                lng: -85.7053,
                address: 'Wyoming Area',
                phone: '(616) 555-9999',
                email: 'report@example.org',
                notes: 'ICE activity reported in Wyoming area.',
                isIceCamp: true
            },
            {
                id: 28,
                name: 'ICE Sighting - Rochester Hills',
                serviceType: 'Crisis Response',
                lat: 42.6584,
                lng: -83.1499,
                address: 'Rochester Hills Area',
                phone: '(248) 555-9999',
                email: 'report@example.org',
                notes: 'ICE activity reported in Rochester Hills area.',
                isIceCamp: true
            },
            {
                id: 29,
                name: 'ICE Sighting - Westland',
                serviceType: 'Crisis Response',
                lat: 42.3242,
                lng: -83.4002,
                address: 'Westland Area',
                phone: '(734) 555-9999',
                email: 'report@example.org',
                notes: 'ICE activity reported in Westland area.',
                isIceCamp: true
            },
            {
                id: 30,
                name: 'ICE Sighting - Farmington Hills',
                serviceType: 'Crisis Response',
                lat: 42.4986,
                lng: -83.3677,
                address: 'Farmington Hills Area',
                phone: '(248) 555-9999',
                email: 'report@example.org',
                notes: 'ICE activity reported in Farmington Hills area.',
                isIceCamp: true
            },
            {
                id: 31,
                name: 'ICE Sighting - Portage',
                serviceType: 'Crisis Response',
                lat: 42.2012,
                lng: -85.5800,
                address: 'Portage Area',
                phone: '(269) 555-9999',
                email: 'report@example.org',
                notes: 'ICE activity reported in Portage area.',
                isIceCamp: true
            },
            {
                id: 32,
                name: 'ICE Sighting - Novi',
                serviceType: 'Crisis Response',
                lat: 42.4806,
                lng: -83.4755,
                address: 'Novi Area',
                phone: '(248) 555-9999',
                email: 'report@example.org',
                notes: 'ICE activity reported in Novi area.',
                isIceCamp: true
            },
            {
                id: 33,
                name: 'ICE Sighting - Midland',
                serviceType: 'Crisis Response',
                lat: 43.6156,
                lng: -84.2472,
                address: 'Midland Area',
                phone: '(989) 555-9999',
                email: 'report@example.org',
                notes: 'ICE activity reported in Midland area.',
                isIceCamp: true
            },
            {
                id: 34,
                name: 'ICE Sighting - Mount Pleasant',
                serviceType: 'Crisis Response',
                lat: 43.5978,
                lng: -84.7675,
                address: 'Mount Pleasant Area',
                phone: '(989) 555-9999',
                email: 'report@example.org',
                notes: 'ICE activity reported in Mount Pleasant area.',
                isIceCamp: true
            },
            {
                id: 35,
                name: 'ICE Sighting - East Lansing',
                serviceType: 'Crisis Response',
                lat: 42.7370,
                lng: -84.4839,
                address: 'East Lansing Area',
                phone: '(517) 555-9999',
                email: 'report@example.org',
                notes: 'ICE activity reported in East Lansing area.',
                isIceCamp: true
            },
            {
                id: 36,
                name: 'ICE Sighting - Ypsilanti',
                serviceType: 'Crisis Response',
                lat: 42.2411,
                lng: -83.6129,
                address: 'Ypsilanti Area',
                phone: '(734) 555-9999',
                email: 'report@example.org',
                notes: 'ICE activity reported in Ypsilanti area.',
                isIceCamp: true
            },
            {
                id: 37,
                name: 'ICE Sighting - Royal Oak',
                serviceType: 'Crisis Response',
                lat: 42.4895,
                lng: -83.1446,
                address: 'Royal Oak Area',
                phone: '(248) 555-9999',
                email: 'report@example.org',
                notes: 'ICE activity reported in Royal Oak area.',
                isIceCamp: true
            },
            {
                id: 38,
                name: 'ICE Sighting - Roseville',
                serviceType: 'Crisis Response',
                lat: 42.4973,
                lng: -82.9371,
                address: 'Roseville Area',
                phone: '(586) 555-9999',
                email: 'report@example.org',
                notes: 'ICE activity reported in Roseville area.',
                isIceCamp: true
            },
            {
                id: 39,
                name: 'ICE Sighting - Port Huron',
                serviceType: 'Crisis Response',
                lat: 42.9709,
                lng: -82.4249,
                address: 'Port Huron Area',
                phone: '(810) 555-9999',
                email: 'report@example.org',
                notes: 'ICE activity reported in Port Huron area.',
                isIceCamp: true
            },
            {
                id: 40,
                name: 'ICE Sighting - Traverse City',
                serviceType: 'Crisis Response',
                lat: 44.7631,
                lng: -85.6206,
                address: 'Traverse City Area',
                phone: '(231) 555-9999',
                email: 'report@example.org',
                notes: 'ICE activity reported in Traverse City area.',
                isIceCamp: true
            },
            {
                id: 41,
                name: 'ICE Sighting - Marquette',
                serviceType: 'Crisis Response',
                lat: 46.5435,
                lng: -87.3954,
                address: 'Marquette Area',
                phone: '(906) 555-9999',
                email: 'report@example.org',
                notes: 'ICE activity reported in Marquette area.',
                isIceCamp: true
            },
            {
                id: 42,
                name: 'ICE Sighting - Sault Ste. Marie',
                serviceType: 'Crisis Response',
                lat: 46.4953,
                lng: -84.3453,
                address: 'Sault Ste. Marie Area',
                phone: '(906) 555-9999',
                email: 'report@example.org',
                notes: 'ICE activity reported in Sault Ste. Marie area.',
                isIceCamp: true
            },
            {
                id: 43,
                name: 'ICE Sighting - Monroe',
                serviceType: 'Crisis Response',
                lat: 41.9164,
                lng: -83.3977,
                address: 'Monroe Area',
                phone: '(734) 555-9999',
                email: 'report@example.org',
                notes: 'ICE activity reported in Monroe area.',
                isIceCamp: true
            },
            {
                id: 44,
                name: 'ICE Sighting - Adrian',
                serviceType: 'Crisis Response',
                lat: 41.8976,
                lng: -84.0372,
                address: 'Adrian Area',
                phone: '(517) 555-9999',
                email: 'report@example.org',
                notes: 'ICE activity reported in Adrian area.',
                isIceCamp: true
            },
            {
                id: 45,
                name: 'ICE Sighting - Niles',
                serviceType: 'Crisis Response',
                lat: 41.8298,
                lng: -86.2542,
                address: 'Niles Area',
                phone: '(269) 555-9999',
                email: 'report@example.org',
                notes: 'ICE activity reported in Niles area.',
                isIceCamp: true
            },
            {
                id: 46,
                name: 'ICE Sighting - Petoskey',
                serviceType: 'Crisis Response',
                lat: 45.3733,
                lng: -84.9553,
                address: 'Petoskey Area',
                phone: '(231) 555-9999',
                email: 'report@example.org',
                notes: 'ICE activity reported in Petoskey area.',
                isIceCamp: true
            },
            {
                id: 47,
                name: 'ICE Sighting - Alpena',
                serviceType: 'Crisis Response',
                lat: 45.0617,
                lng: -83.4328,
                address: 'Alpena Area',
                phone: '(989) 555-9999',
                email: 'report@example.org',
                notes: 'ICE activity reported in Alpena area.',
                isIceCamp: true
            },
            {
                id: 48,
                name: 'ICE Sighting - Escanaba',
                serviceType: 'Crisis Response',
                lat: 45.7456,
                lng: -87.0646,
                address: 'Escanaba Area',
                phone: '(906) 555-9999',
                email: 'report@example.org',
                notes: 'ICE activity reported in Escanaba area.',
                isIceCamp: true
            },
            {
                id: 49,
                name: 'ICE Sighting - Big Rapids',
                serviceType: 'Crisis Response',
                lat: 43.6981,
                lng: -85.4837,
                address: 'Big Rapids Area',
                phone: '(231) 555-9999',
                email: 'report@example.org',
                notes: 'ICE activity reported in Big Rapids area.',
                isIceCamp: true
            },
            {
                id: 50,
                name: 'ICE Sighting - Owosso',
                serviceType: 'Crisis Response',
                lat: 42.9978,
                lng: -84.1766,
                address: 'Owosso Area',
                phone: '(989) 555-9999',
                email: 'report@example.org',
                notes: 'ICE activity reported in Owosso area.',
                isIceCamp: true
            }
        ];
        saveData();
    }
}

// Save data to localStorage
function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mapData));
    renderTable();
}

// Render entries table
function renderTable() {
    const tbody = document.getElementById('entriesTable');
    tbody.innerHTML = '';

    if (mapData.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="px-6 py-4 text-center text-gray-500">
                    No entries found. Click "Add New Entry" to create one.
                </td>
            </tr>
        `;
        return;
    }

    mapData.forEach(entry => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-50 fade-in';
        const iceCampBadge = entry.isIceCamp ? '<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 ml-2">⚠️ ICE Camp</span>' : '';
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">${entry.name}${iceCampBadge}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    ${entry.serviceType}
                </span>
            </td>
            <td class="px-6 py-4">
                <div class="text-sm text-gray-900">${entry.address}</div>
                <div class="text-sm text-gray-500">${entry.lat.toFixed(4)}, ${entry.lng.toFixed(4)}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">${entry.phone}</div>
                <div class="text-sm text-gray-500">${entry.email}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button 
                    onclick="editEntry(${entry.id})"
                    class="text-blue-600 hover:text-blue-900 mr-4"
                >
                    Edit
                </button>
                <button 
                    onclick="deleteEntry(${entry.id})"
                    class="text-red-600 hover:text-red-900"
                >
                    Delete
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Open modal for adding new entry
function openAddModal() {
    editingId = null;
    document.getElementById('modalTitle').textContent = 'Add New Entry';
    document.getElementById('entryForm').reset();
    document.getElementById('entryIceCamp').checked = false;
    
    // Reset lat/lng fields to readonly (will be filled from address)
    document.getElementById('entryLat').readOnly = true;
    document.getElementById('entryLat').classList.add('bg-gray-50');
    document.getElementById('entryLng').readOnly = true;
    document.getElementById('entryLng').classList.add('bg-gray-50');
    document.getElementById('geocodeStatusAdmin').textContent = '';
    
    document.getElementById('entryModal').classList.remove('hidden');
}

// Open modal for editing entry
function editEntry(id) {
    const entry = mapData.find(e => e.id === id);
    if (!entry) return;

    editingId = id;
    document.getElementById('modalTitle').textContent = 'Edit Entry';
    document.getElementById('entryName').value = entry.name;
    document.getElementById('entryServiceType').value = entry.serviceType || '';
    document.getElementById('entryLat').value = entry.lat;
    document.getElementById('entryLng').value = entry.lng;
    document.getElementById('entryAddress').value = entry.address;
    document.getElementById('entryPhone').value = entry.phone;
    document.getElementById('entryEmail').value = entry.email;
    document.getElementById('entryNotes').value = entry.notes || '';
    document.getElementById('entryIceCamp').checked = entry.isIceCamp === true;
    
    // When editing, allow manual coordinate editing
    document.getElementById('entryLat').readOnly = false;
    document.getElementById('entryLat').classList.remove('bg-gray-50');
    document.getElementById('entryLng').readOnly = false;
    document.getElementById('entryLng').classList.remove('bg-gray-50');
    document.getElementById('geocodeStatusAdmin').textContent = '';
    
    document.getElementById('entryModal').classList.remove('hidden');
}

// Delete entry
function deleteEntry(id) {
    if (!confirm('Are you sure you want to delete this entry?')) return;

    mapData = mapData.filter(e => e.id !== id);
    saveData();
}

// Geocode address to get coordinates (for admin panel)
async function geocodeAddressAdmin(address) {
    // Get Mapbox token from config
    let mapboxToken = null;
    if (window.MAPBOX_CONFIG && window.MAPBOX_CONFIG.accessToken) {
        mapboxToken = window.MAPBOX_CONFIG.accessToken;
    } else if (typeof mapboxgl !== 'undefined' && mapboxgl.accessToken) {
        mapboxToken = mapboxgl.accessToken;
    }
    
    if (!address || !mapboxToken) {
        console.error('Mapbox token not found for geocoding');
        return null;
    }
    
    try {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapboxToken}&limit=1&country=us&bbox=-90.5,41.5,-82,48.5`;
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

// Handle geocoding address in admin panel
async function handleGeocodeAddressAdmin() {
    const address = document.getElementById('entryAddress').value.trim();
    const statusEl = document.getElementById('geocodeStatusAdmin');
    
    if (!address) {
        statusEl.textContent = 'Please enter an address first.';
        statusEl.className = 'ml-2 text-sm text-red-500';
        return;
    }
    
    statusEl.textContent = 'Looking up coordinates...';
    statusEl.className = 'ml-2 text-sm text-blue-500';
    
    const result = await geocodeAddressAdmin(address);
    
    if (result) {
        document.getElementById('entryLat').value = result.lat.toFixed(6);
        document.getElementById('entryLng').value = result.lng.toFixed(6);
        
        // Keep fields readonly when auto-filled from address
        document.getElementById('entryLat').readOnly = true;
        document.getElementById('entryLat').classList.add('bg-gray-50');
        document.getElementById('entryLng').readOnly = true;
        document.getElementById('entryLng').classList.add('bg-gray-50');
        
        statusEl.textContent = '✓ Coordinates found';
        statusEl.className = 'ml-2 text-sm text-green-500';
    } else {
        statusEl.textContent = 'Could not find coordinates.';
        statusEl.className = 'ml-2 text-sm text-red-500';
    }
}

// Handle form submission
async function handleSubmit(e) {
    e.preventDefault();

    const address = document.getElementById('entryAddress').value.trim();
    let lat = parseFloat(document.getElementById('entryLat').value);
    let lng = parseFloat(document.getElementById('entryLng').value);
    
    // If coordinates are missing but address is provided, try to geocode
    if ((isNaN(lat) || isNaN(lng)) && address) {
        const statusEl = document.getElementById('geocodeStatusAdmin');
        statusEl.textContent = 'Looking up coordinates from address...';
        statusEl.className = 'ml-2 text-sm text-blue-500';
        
        const geocodeResult = await geocodeAddressAdmin(address);
        if (geocodeResult) {
            lat = geocodeResult.lat;
            lng = geocodeResult.lng;
            document.getElementById('entryLat').value = lat.toFixed(6);
            document.getElementById('entryLng').value = lng.toFixed(6);
        } else {
            alert('Could not determine coordinates from address. Please enter coordinates manually.');
            return;
        }
    }

    const entry = {
        name: document.getElementById('entryName').value.trim(),
        serviceType: document.getElementById('entryServiceType').value || 'Other',
        lat: lat,
        lng: lng,
        address: address,
        phone: document.getElementById('entryPhone').value.trim(),
        email: document.getElementById('entryEmail').value.trim(),
        notes: document.getElementById('entryNotes').value.trim(),
        isIceCamp: document.getElementById('entryIceCamp').checked
    };

    // Validation (serviceType is now optional)
    if (!entry.name || !entry.address || !entry.phone || !entry.email) {
        alert('Please fill in all required fields (Name, Address, Phone, Email).');
        return;
    }

    if (isNaN(entry.lat) || isNaN(entry.lng)) {
        alert('Please provide an address (coordinates will be found automatically) or enter coordinates manually.');
        return;
    }

    // Validate Michigan bounds (approximate)
    if (entry.lat < 41.5 || entry.lat > 48.5 || entry.lng < -90.5 || entry.lng > -82) {
        if (!confirm('This location appears to be outside Michigan. Continue anyway?')) {
            return;
        }
    }

    if (editingId) {
        // Update existing entry
        const index = mapData.findIndex(e => e.id === editingId);
        if (index !== -1) {
            entry.id = editingId;
            mapData[index] = entry;
        }
    } else {
        // Add new entry
        const newId = mapData.length > 0 ? Math.max(...mapData.map(e => e.id)) + 1 : 1;
        entry.id = newId;
        mapData.push(entry);
    }

    saveData();
    document.getElementById('entryModal').classList.add('hidden');
}

// Logout
function logout() {
    localStorage.removeItem(AUTH_KEY);
    window.location.href = 'index.html';
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    if (!checkAuth()) return;

    loadData();
    renderTable();

    // Event listeners
    document.getElementById('addEntryBtn').addEventListener('click', openAddModal);
    document.getElementById('entryForm').addEventListener('submit', handleSubmit);
    
    // Geocode address button
    document.getElementById('geocodeAddressBtnAdmin').addEventListener('click', handleGeocodeAddressAdmin);
    
    // Auto-geocode when address field loses focus
    document.getElementById('entryAddress').addEventListener('blur', async () => {
        const address = document.getElementById('entryAddress').value.trim();
        const lat = document.getElementById('entryLat').value;
        const lng = document.getElementById('entryLng').value;
        
        // Only geocode if address is provided and coordinates are not set
        if (address && (!lat || !lng)) {
            await handleGeocodeAddressAdmin();
        }
    });
    
    document.getElementById('cancelBtn').addEventListener('click', () => {
        document.getElementById('entryModal').classList.add('hidden');
    });
    document.getElementById('logoutBtn').addEventListener('click', logout);

    // Close modal on outside click
    document.getElementById('entryModal').addEventListener('click', (e) => {
        if (e.target.id === 'entryModal') {
            document.getElementById('entryModal').classList.add('hidden');
        }
    });
});

// Make functions globally available for onclick handlers
window.editEntry = editEntry;
window.deleteEntry = deleteEntry;
