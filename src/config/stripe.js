// Stripe configuration for donations
// To set up:
// 1. Go to https://dashboard.stripe.com/
// 2. Create a new product (e.g., "Buy me a coffee" for $5)
// 3. Generate a Payment Link for the product
// 4. Replace the STRIPE_PAYMENT_LINK below with your Payment Link URL

export const STRIPE_CONFIG = {
  // Replace this with your actual Stripe Payment Link
  PAYMENT_LINK: process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK || 'https://buy.stripe.com/your-payment-link-here',
  BUTTON_TEXT: 'Buy me a coffee',
  DESCRIPTION: 'Support my work',
};
