/**
 * Shopify Storefront API Client & Cart Integration
 * Supports live product fetching, inventory checks, and 1-click Shopify Checkout creation.
 */

const domain = process.env.SHOPIFY_STORE_DOMAIN || "";
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || "";
const apiVersion = process.env.SHOPIFY_API_VERSION || "2024-07";

export function isShopifyConfigured(): boolean {
  return Boolean(process.env.SHOPIFY_STORE_DOMAIN && process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN);
}

export function getShopifyStoreDomain(): string {
  return process.env.SHOPIFY_STORE_DOMAIN || "deadly-ponies-nz.myshopify.com";
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  vendor: string;
  productType: string;
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string | null;
      };
    }>;
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        availableForSale: boolean;
        price: {
          amount: string;
          currencyCode: string;
        };
      };
    }>;
  };
}

export async function shopifyFetch<T>({
  query,
  variables = {},
}: {
  query: string;
  variables?: Record<string, any>;
}): Promise<{ status: number; body: { data?: T; errors?: any } }> {
  if (!domain || !storefrontAccessToken) {
    return {
      status: 200,
      body: {
        errors: [{ message: "Shopify Store domain or Storefront Access Token is not configured in .env" }],
      },
    };
  }

  const endpoint = `https://${domain.replace(/^https?:\/\//, "")}/api/${apiVersion}/graphql.json`;

  try {
    const result = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables }),
      cache: "no-store",
    });

    const body = await result.json();

    if (body.errors) {
      console.warn("Shopify GraphQL errors:", body.errors);
    }

    return {
      status: result.status,
      body,
    };
  } catch (error) {
    console.error("Shopify fetch network error:", error);
    return {
      status: 500,
      body: {
        errors: [{ message: (error as Error).message || "Failed to connect to Shopify" }],
      },
    };
  }
}

/**
 * Fetch products from Shopify Store
 */
export async function getShopifyProducts(first: number = 20): Promise<ShopifyProduct[]> {
  const query = `
    query getProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            vendor
            productType
            images(first: 2) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch<{ products: { edges: Array<{ node: ShopifyProduct }> } }>({
    query,
    variables: { first },
  });

  if (response.body.data?.products?.edges) {
    return response.body.data.products.edges.map((edge) => edge.node);
  }

  return [];
}

/**
 * Create a Shopify Cart & generate direct checkout URL for full outfits
 */
export async function createShopifyCart(
  lines: Array<{ merchandiseId: string; quantity: number }>
): Promise<{ checkoutUrl: string | null; cartId: string | null; error?: string }> {
  // If no store configured, return simulated Shopify checkout URL
  if (!domain || !storefrontAccessToken) {
    return {
      checkoutUrl: `https://deadlyponies.com/cart?simulated_checkout=true`,
      cartId: `sim_cart_${Date.now()}`,
    };
  }

  const query = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          code
          field
          message
        }
      }
    }
  `;

  const response = await shopifyFetch<{
    cartCreate: {
      cart: { id: string; checkoutUrl: string } | null;
      userErrors: Array<{ code: string; field: string; message: string }>;
    };
  }>({
    query,
    variables: {
      input: {
        lines,
      },
    },
  });

  const cart = response.body.data?.cartCreate?.cart;
  const userErrors = response.body.data?.cartCreate?.userErrors;

  if (userErrors && userErrors.length > 0) {
    console.error("Shopify cartCreate error:", userErrors);
    return {
      checkoutUrl: null,
      cartId: null,
      error: userErrors.map((e) => e.message).join(", "),
    };
  }

  return {
    checkoutUrl: cart?.checkoutUrl || `https://${domain}/cart`,
    cartId: cart?.id || `cart_${Date.now()}`,
  };
}
