import React from "react";
import {
  useReactTable,
  flexRender,
  createColumnHelper,
  getCoreRowModel,
} from "@tanstack/react-table";

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
      cell: (info) => toTitleCase(info.getValue()),
      footer: (info) => info.column.id,
      header: () => <span>Candidato</span>,
    }),
    columnHelper.accessor((row) => row.pvap, {
      id: "Percentual",
      cell: (info) => <i>{info.getValue()}%</i>,
      header: () => <span>Percentual</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.vap, {
      id: "Total de Votos",
      header: () => <span>Total de Votos</span>,
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
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
