import { useState } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Inbox,
} from 'lucide-react';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  pageCount?: number;
  pageIndex?: number;
  pageSize?: number;
  totalRecords?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  onSortingChange?: (sorting: SortingState) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading = false,
  pageCount = 1,
  pageIndex = 1,
  pageSize = 10,
  totalRecords,
  onPageChange,
  onPageSizeChange,
  onSortingChange,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: (updateValue) => {
      const newSorting =
        typeof updateValue === 'function'
          ? updateValue(sorting)
          : updateValue;

      setSorting(newSorting);

      if (onSortingChange) {
        onSortingChange(newSorting);
      }
    },

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,

  });

  return (
    <div className="space-y-4">
      
      <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-100/90 dark:bg-slate-800/80 border-b border-border">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent border-b border-border">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="font-semibold text-slate-800 dark:text-slate-100 py-3.5"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isLoading ? (
              
              Array.from({ length: pageSize }).map((_, index) => (
                <TableRow key={`skeleton-${index}`}>
                  {columns.map((_, colIndex) => (
                    <TableCell key={`skeleton-cell-${colIndex}`} className="py-4">
                      <Skeleton className="h-5 w-full max-w-[120px]" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="hover:bg-muted/30 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3">
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
                  className="h-44 text-center"
                >
                  <div className="flex flex-col items-center justify-center space-y-2 text-muted-foreground">
                    <div className="p-3 rounded-full bg-muted/60">
                      <Inbox className="h-8 w-8 stroke-1" />
                    </div>
                    <p className="font-medium text-sm">No records found</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

    
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-1">
        <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground text-center">
          {totalRecords !== undefined ? (
            <span>
              Total <strong className="text-foreground">{totalRecords}</strong>{' '}
              records
            </span>
          ) : (
            <span>
              Page <strong className="text-foreground">{pageIndex}</strong> of{' '}
              <strong className="text-foreground">{pageCount || 1}</strong>
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
          {onPageSizeChange && (
            <div className="flex items-center space-x-2">
              <p className="text-xs sm:text-sm text-muted-foreground">Rows</p>
              <Select
                value={`${pageSize}`}
                onValueChange={(value) => onPageSizeChange(Number(value))}
              >
                <SelectTrigger className="h-8 w-[65px] text-xs">
                  <SelectValue placeholder={`${pageSize}`} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[5, 10, 20, 50].map((size) => (
                    <SelectItem key={size} value={`${size}`} className="text-xs">
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {onPageChange && (
            <div className="flex items-center space-x-1">
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7 sm:h-8 sm:w-8"
                onClick={() => onPageChange(1)}
                disabled={pageIndex <= 1 || isLoading}
              >
                <ChevronsLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="sr-only">First page</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7 sm:h-8 sm:w-8"
                onClick={() => onPageChange(pageIndex - 1)}
                disabled={pageIndex <= 1 || isLoading}
              >
                <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="sr-only">Previous page</span>
              </Button>
              <div className="text-xs font-medium px-1.5 min-w-[40px] text-center">
                {pageIndex} / {pageCount || 1}
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7 sm:h-8 sm:w-8"
                onClick={() => onPageChange(pageIndex + 1)}
                disabled={pageIndex >= pageCount || isLoading}
              >
                <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="sr-only">Next page</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7 sm:h-8 sm:w-8"
                onClick={() => onPageChange(pageCount)}
                disabled={pageIndex >= pageCount || isLoading}
              >
                <ChevronsRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="sr-only">Last page</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
