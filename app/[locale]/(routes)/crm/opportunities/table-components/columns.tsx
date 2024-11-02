"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import { statuses } from "../table-data/data";
import { Opportunity } from "../table-data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import moment from "moment";
import Link from "next/link";

export const columns: ColumnDef<Opportunity>[] = [
  /* {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ), 
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  */
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">
        {moment(row.getValue("createdAt")).format("YY-MM-DD")}
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),

    cell: ({ row }) => (
      <Link href={`/crm/opportunities/${row.original.id}`}>
        <div className="w-[250px] overflow-hidden">{row.getValue("name")}</div>
      </Link>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => (
      <div className="w-[250px] truncate">{row.getValue("description") || "No description"}</div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sales Type" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px]">
        {row.original.assigned_type?.name || "Not specified"}
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "sales_stage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stage" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px]">
        {row.original.assigned_sales_stage?.name || "Not set"}
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "budget",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Budget" />
    ),

    cell: ({ row }) => {
      //console.log(row.original.budget);
      return (
        <div>
          {row.original.budget
            ? row.original.budget.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })
            : "N/A"}
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "currency",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Currency" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("currency") || "USD"}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "expected_revenue",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Expected Revenue" />
    ),
    cell: ({ row }) => (
      <div>
        {row.original.expected_revenue
          ? row.original.expected_revenue.toLocaleString("en-US", {
              style: "currency",
              currency: row.original.currency || "USD",
            })
          : "N/A"}
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "close_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Expected close" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">
        {moment(row.getValue("close_date")).format("YY-MM-DD")}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "next_step",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Next step" />
    ),

    cell: ({ row }) => (
      <div className="w-[150px]">{row.getValue("next_step")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
