# Michigan Justice Fund - Rapid Response Map

An interactive map displaying rapid response providers and justice resources across Michigan, including ICE sighting reports.

## Features

- **Interactive 3D Map**: Geospatial map of Michigan with 3D buildings using Mapbox GL JS
- **Password Protection**: Secure access control for viewing the map
- **Admin Panel**: Full CRUD interface for managing map entries
- **Search & Filter**: Search by name, address, or service type
- **Address Geocoding**: Automatically converts addresses to coordinates
- **ICE Sighting Reports**: Track and display ICE activity locations
- **Responsive Design**: Works on desktop and mobile devices

## Setup Instructions

### 1. Mapbox API Key Configuration

**IMPORTANT**: This site requires a Mapbox API key. Since this is a static site, the key will be visible in the browser, but we keep it separate from the main code.

1. Get your Mapbox access token from: https://account.mapbox.com/access-tokens/
   - Use a **PUBLIC** token (starts with `pk.ey...`)
   - **DO NOT** use a secret token (starts with `sk.ey...`)

2. Create your configuration file:
   ```bash
   cp config.example.js config.js
   ```

3. Edit `config.js` and replace `YOUR_MAPBOX_ACCESS_TOKEN_HERE` with your actual token:
   ```javascript
   window.MAPBOX_CONFIG = {
       accessToken: 'pk.eyJ1IjoieW91cnVzZXJuYW1lIiwiYSI6ImN...'
   };
   ```

4. **DO NOT commit `config.js` to git** - it's already in `.gitignore`

### 2. Default Password

The default password is: `ShapeTomorrow`

To change it, edit the `AUTH_PASSWORD` constant in `app.js` (line 2).

### 3. Deploying to GitHub Pages

1. **Before deploying**: Make sure `config.js` is in `.gitignore` (it should be already)

2. **For your local deployment**: Create `config.js` with your token locally

3. **For GitHub Pages**: You have two options:
   
   **Option A**: Create `config.js` directly in the repository (less secure, but works for public repos)
   - The key will be visible in the browser anyway for static sites
   - Add your token to `config.js` and commit it
   
   **Option B**: Use GitHub Secrets with GitHub Actions (more secure)
   - Set up a GitHub Action that injects the token during build
   - See `.github/workflows/deploy.yml` example below

### 4. GitHub Actions Setup (Optional, More Secure)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Create config.js
        run: |
          echo "window.MAPBOX_CONFIG = { accessToken: '${{ secrets.MAPBOX_TOKEN }}' };" > config.js
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

Then add your Mapbox token as a GitHub Secret named `MAPBOX_TOKEN`.

## File Structure

- `index.html` - Main map interface
- `app.js` - Map functionality and authentication
- `admin.html` - Admin panel for managing entries
- `admin.js` - Admin panel functionality
- `config.js` - **Your Mapbox API key (gitignored)**
- `config.example.js` - Example configuration file
- `.gitignore` - Prevents committing sensitive files

## Data Storage

This MVP uses browser localStorage to store map entries. In a production environment, this would be replaced with a proper database.

## Technologies Used

- **Tailwind CSS** - Styling
- **Mapbox GL JS** - Interactive 3D mapping
- **Vanilla JavaScript** - No frameworks required

## Browser Support

Works in all modern browsers that support ES6 JavaScript and localStorage.

## Security Notes

⚠️ **Important**: Since this is a static site, the Mapbox API key will be visible in the browser's source code. This is normal for client-side applications. To limit exposure:

1. Use a **PUBLIC** Mapbox token (not a secret token)
2. Set up URL restrictions in your Mapbox account to only allow requests from your domain
3. Consider using Mapbox's domain restrictions feature

## License

[Your License Here]
