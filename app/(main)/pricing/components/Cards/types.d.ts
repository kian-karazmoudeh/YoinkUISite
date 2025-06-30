import { Session } from "@supabase/supabase-js";

type CardProps = {
  session: Session | null;
};

type ProCardProps = CardProps & {
  type: "Monthly" | "Annual";
};
