# Stripe "Buy Me a Coffee" Setup Guide

This guide will help you set up the Stripe integration for the "Buy me a coffee" button on your homepage.

## Prerequisites

- A Stripe account (sign up at https://stripe.com if you don't have one)
- Access to your Stripe Dashboard

## Setup Steps

### 1. Create a Stripe Product

1. Log in to your [Stripe Dashboard](https://dashboard.stripe.com/)
2. Navigate to **Products** in the left sidebar
3. Click **Add Product**
4. Fill in the product details:
   - **Name**: "Buy me a coffee" (or your preferred name)
   - **Description**: Optional description for your customers
   - **Pricing**: Choose "Standard pricing"
   - **Price**: Enter your desired amount (e.g., $5.00)
   - **Billing period**: One time
5. Click **Save product**

### 2. Create a Payment Link

1. On your product page, click **Create payment link**
2. Configure the payment link settings:
   - Choose whether to collect customer information
   - Set up any custom fields if needed
   - Configure success/cancel URLs (optional)
3. Click **Create link**
4. Copy the generated payment link URL (it will look like: `https://buy.stripe.com/xxxxx`)

### 3. Configure Your Website

1. Create a `.env.local` file in the root of your project (copy from `.env.example`):
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and paste your Stripe payment link:
   ```
   NEXT_PUBLIC_STRIPE_PAYMENT_LINK=https://buy.stripe.com/your-actual-payment-link
   ```

3. Restart your development server:
   ```bash
   npm run dev
   ```

### 4. Customize the Button (Optional)

You can customize the button text and description in `src/config/stripe.js`:

```javascript
export const STRIPE_CONFIG = {
  PAYMENT_LINK: process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK || 'https://buy.stripe.com/your-payment-link-here',
  BUTTON_TEXT: 'Buy me a coffee', // Change this
  DESCRIPTION: 'Support my work', // Change this
};
```

## Testing

### Test Mode
- By default, Stripe operates in test mode
- Use test card numbers to verify the flow works:
  - Success: `4242 4242 4242 4242`
  - Any future expiration date and any 3-digit CVC

### Live Mode
1. In your Stripe Dashboard, toggle to **Live mode** (top right)
2. Create a new product and payment link in live mode
3. Update your `.env.local` with the live payment link
4. Deploy your changes

## Security Notes

- Never commit `.env.local` to version control (it's already in `.gitignore`)
- The `NEXT_PUBLIC_` prefix makes this variable available in the browser (safe for payment links)
- Stripe Payment Links are designed to be public and shareable

## Support

For issues with Stripe, visit:
- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Support](https://support.stripe.com/)

For issues with this integration, check the code in:
- `src/config/stripe.js` - Configuration
- `src/components/Home/index.js` - Button implementation
