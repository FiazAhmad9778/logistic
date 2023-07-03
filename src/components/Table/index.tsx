import { flexRender, Table as RTable } from '@tanstack/react-table';

interface TableProps<T> {
  useReactTableReturn: RTable<T>;
}

const Table = <T extends Record<any, any>>(props: TableProps<T>) => {
  const { getHeaderGroups, getRowModel } = props.useReactTableReturn;

  return (
    <div className="table-responsive">
      <table className="table table-primary table-bordered text-nowrap mb-0">
        <thead>
          {getHeaderGroups()?.map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {getRowModel()?.rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
