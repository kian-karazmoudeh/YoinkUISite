export const paymentLinks: Record<"Monthly" | "Annual", string> = {
  Monthly: `/api/stripe/subscribe/${
    process.env.NODE_ENV === "development"
      ? "price_1RqRWsF3W42U01iFUv4A23H6" // dev
      : "price_1RwfIFF3W42U01iFG5itktm4" // production
  }`,
  Annual: `/api/stripe/subscribe/${
    process.env.NODE_ENV === "development"
      ? "price_1RqRXfF3W42U01iFKTZTQSBY" // dev
      : "price_1RwfHlF3W42U01iFuHHHdP8b" // production
  }`,
};
