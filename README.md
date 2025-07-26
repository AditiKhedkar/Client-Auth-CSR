# Simple Cart Management System

A basic React/Next.js application for managing shopping cart with customer and admin views.

## Features

### Customer View
- Browse available products with details
- View product information including:
  - Product name
  - Detailed description
  - Price in INR (Indian Rupees)
  - Stock availability
- Add products to cart
- View cart summary with total amount

### Admin View
- Monitor cart contents (view-only access)
- Dashboard with key metrics:
  - Total items in cart
  - Total cart value in INR
  - Number of unique products
- Detailed cart view showing:
  - Product details and descriptions
  - Individual quantities
  - Stock information
  - Item-wise totals

## Technology Stack

- **Framework**: Next.js 13 with App Router
- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Data Persistence**: Browser localStorage

## Project Structure

```
app/
├── context/
│   └── CartContext.tsx     # Global cart state management
├── customer/
│   └── page.tsx           # Customer shopping interface
├── admin/
│   └── page.tsx           # Admin monitoring dashboard
├── layout.tsx             # Root layout with providers
├── page.tsx               # Home page with navigation
└── globals.css            # Global styles
```

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### For Customers
1. Navigate to "Customer View" from the home page
2. Browse the product catalog
3. Click "Add to Cart" to add items
4. View cart summary at the bottom of the page

### For Administrators
1. Navigate to "Admin View" from the home page
2. Monitor cart statistics in the dashboard
3. View detailed cart contents
4. Track inventory levels and order quantities

## Data Structure

### Product Object
```typescript
interface Product {
  id: number;
  name: string;
  price: number;          // Price in INR
  detail: string;         // Product description
  stockLeft: number;      // Available inventory
}
```

### Cart Item Object
```typescript
interface CartItem extends Product {
  quantity: number;       // Quantity in cart
}
```

## Key Components

### CartContext
- Manages global cart state using React Context
- Handles cart operations (add, remove, update)
- Persists data to localStorage
- Provides cart state to all components

### Customer Page
- Displays product catalog
- Handles adding items to cart
- Shows real-time cart summary
- Formats prices in Indian currency format

### Admin Page
- Read-only cart monitoring
- Dashboard with key metrics
- Detailed cart item view
- No modification capabilities (view-only)

## Currency Format
All prices are displayed in Indian Rupees (INR) with proper formatting using `toLocaleString('en-IN')`.

## State Persistence
Cart data is automatically saved to browser localStorage and restored on page reload.

## Styling
The application uses minimal Tailwind CSS classes for clean, responsive design without complex styling.

## Future Enhancements
- User authentication
- Database integration
- Order processing
- Inventory management
- Payment integration
- Product categories and search