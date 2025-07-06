import { Session } from "@supabase/supabase-js";

type CardProps = {
  userMembership: "free" | "premium" | null;
  type: "Monthly" | "Annual";
  loading: boolean;
  setLoading?: Dispatch<SetStateAction<boolean>>;
};
