export const BUCKET_NAME =
  process.env.NODE_ENV === "development"
    ? "yoink-content-test"
    : "yoink-content";
