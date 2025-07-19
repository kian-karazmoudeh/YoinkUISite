import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { User } from "@supabase/supabase-js";
import { LogOut } from "lucide-react";

const Profile = ({ user }: { user: User | null }) => {
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="cursor-pointer">{user.user_metadata.name}</div>
      </PopoverTrigger>
      <PopoverContent align="end">
        <div
          className="flex items-center gap-2 cursor-pointer hover:bg-accent hover:text-accent-foreground p-2 rounded-sm"
          onClick={() => {}}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Profile;
