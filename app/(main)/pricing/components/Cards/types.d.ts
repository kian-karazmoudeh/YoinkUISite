import { Session } from "@supabase/supabase-js";

type CardProps = {
  session: Session | null;
  type: "Monthly" | "Annual";
  loading: boolean;
  setLoading?: Dispatch<SetStateAction<boolean>>;
};
