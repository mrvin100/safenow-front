import { ColumnDef } from "@tanstack/react-table";
import { QuoteModel } from "@src/helpers/models/quote.model";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EditIcon, EyeIcon, MoreVerticalIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";

export const quotesDetailsTableColumns: ColumnDef<QuoteModel>[] = [
  {
    accessorKey: "services",
    header: "Prestation",
    cell: () => <div> Assisting guests with checking in</div>,
  },
  {
    accessorKey: "emitBy",
    header: "Description",
    cell: () => (
      <div>
        I found a 2007 study on effects of hand sanitizers on blood alcohol
        level in adults. The 12 subjects
      </div>
    ),
  },
  {
    accessorKey: "answer",
    header: "Prix U",
    cell: () => <div>500 €</div>,
  },
  {
    accessorKey: "answer",
    header: "Qte",
    cell: () => <div>1</div>,
  },
  {
    accessorKey: "totalAmount",
    header: "Total",
    cell: () => <div>500 €</div>,
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <MoreVerticalIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={5} alignOffset={5}>
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/quotes/${row.original.id}`}>
              <EyeIcon className="size-4 mr-2" />
              <span>Voir plus</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <EditIcon className="size-4 mr-2" />
            <span>Modifier</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-destructive hover:text-destructive">
            <Trash2Icon className="size-4 mr-2" />
            <span>Supprimer</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
