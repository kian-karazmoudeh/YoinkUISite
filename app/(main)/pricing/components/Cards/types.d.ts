type CardProps = {
  userMembership: "free" | "premium" | null;
  loading: boolean;
  setLoading?: Dispatch<SetStateAction<boolean>>;
};
