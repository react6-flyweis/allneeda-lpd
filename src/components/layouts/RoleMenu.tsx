import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

type Props = {
  role: string;
  setRole: (r: string) => void;
};

export default function RoleMenu({ role, setRole }: Props) {
  const roles = ["CEO", "COO", "CTO", "CFO", "CMO", "LPD", "GSD", "AAD"];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-3 cursor-pointer">
          <Avatar>
            <AvatarImage src="/vite.svg" alt={role} />
            <AvatarFallback>{role.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{role}</span>
          <ChevronDown className="size-4 text-muted-foreground" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-32">
        <div className="flex flex-col w-full rounded-md overflow-hidden">
          {roles.map((r) => (
            <DropdownMenuItem
              key={r}
              className="w-full hover:bg-accent"
              onClick={() => setRole(r)}
            >
              {r}
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
