"use client";
import { getQuotesAction } from "@src/actions/client.actions";
import { EmptyContent } from "@src/components/empty-content";
import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableLoader } from "@src/components/dashboard/table-loader";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { quotesDetailsTableColumns } from "@src/components/dashboard/client/quotes/details/colums";
import { StickyNote } from "lucide-react";
import { useServerActionQuery } from "@/hooks/use-server-actions";

const columns = quotesDetailsTableColumns;

export default function QuotesDetailsTable({ isAll }: { isAll?: boolean }) {

  const { isPending, data = [] } = useServerActionQuery(getQuotesAction, {
    queryKey: ['quote-details'],
    input: {limit: isAll ? 10 : 10},
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="bg-card border rounded-xl p-5 space-y-5">
      <div className="rounded-lg overflow-hidden">
        {isPending ? (
          <TableLoader cols={3} rows={4} />
        ) : (
          <Table>
            <TableHeader className="bg-accent">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="text-foreground font-semibold"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    <EmptyContent
                      text="Vous n’avez pas de details pour ce devis!"
                      icon={StickyNote}
                    />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
