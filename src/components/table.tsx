import React from "react";
import {
  useReactTable,
  flexRender,
  createColumnHelper,
  getCoreRowModel,
} from "@tanstack/react-table";

import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { Cand } from "@server/routers/types";

interface Props {
  data?: Cand[];
}

const numberWithCommas = (x: string | null) => {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const toTitleCase = (str: string | undefined) => {
  if (str)
    return str.replace(/[A-Za-zÀ-ÖØ-öø-ÿ]*/g, function title(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  return null;
};

const Table: React.FC<Props> = ({ data }) => {
  const columnHelper = createColumnHelper<Cand>();

  const columns = [
    columnHelper.accessor((row) => row.nm, {
      id: "nome",
      cell: (info) => (
        <strong
          className={`${
            info.getValue().toLowerCase() === "lula" ? "text-red300" : ""
          }`}
        >
          {toTitleCase(info.getValue())}
        </strong>
      ),
      footer: (info) => info.column.id,
      header: () => <strong>Candidato</strong>,
    }),
    columnHelper.accessor((row) => row.pvap, {
      id: "Percentual",
      cell: (info) => <i>{info.getValue()}%</i>,
      header: () => <strong>Percentual</strong>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.vap, {
      id: "Total de Votos",
      header: () => <strong>Total de Votos</strong>,
      cell: (info) => numberWithCommas(info.renderValue()),
      footer: (info) => info.column.id,
    }),
  ];

  const table = useReactTable<Cand>({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <MuiTable>
      <TableHead>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableCell key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </MuiTable>
  );
};

export default Table;
