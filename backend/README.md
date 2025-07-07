# GrowthProAI Backend

Express.js backend for the Mini Local Business Dashboard.

## Setup

1. Install dependencies:
```bash
cd backend
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Start development server:
```bash
npm run dev
```

## API Endpoints

### POST /api/business-data
- **Body**: `{ "name": "Business Name", "location": "City" }`
- **Returns**: `{ "rating": 4.3, "reviews": 127, "headline": "Generated headline" }`

### GET /api/regenerate-headline
- **Query**: `?name=BusinessName&location=City`
- **Returns**: `{ "headline": "New generated headline" }`

### GET /health
- Health check endpoint
- **Returns**: `{ "status": "OK", "message": "Backend is running!" }`

## Deployment to Render.com

1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Set build command: `cd backend && npm install`
4. Set start command: `cd backend && npm start`
5. Add environment variables:
   - `FRONTEND_URL`: Your deployed frontend URL
   - `NODE_ENV`: `production`