"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ColumnDef, Row, RowData, SortingFn } from "@tanstack/react-table"
import { ArrowUpDown, Pencil } from "lucide-react"

type Item = {
  id: number,
  name: string,
  quantity: number,
  description: string,
  min_stock: number,
  updated_at: string
}

const mySortFn: SortingFn<Item> = (rowA, rowB) => {
  const item1 = rowA.original;
  const item2 = rowB.original;

  const minStock1 = item1.quantity < item1.min_stock
  const minStock2 = item2.quantity < item2.min_stock
  if (minStock1 && !minStock2)
    return -1
  else if (!minStock1 && minStock2)
    return 1
  else
    return (item1.quantity - item2.quantity)// Sort by quantity ascending

}

export const columns: ColumnDef<Item>[] = [
  {
    accessorKey: "name",
    header: "Item Name"
  },
  {
    accessorKey: "quantity",
    header: "Stock",
    cell: ({row}) => {
      const item = row.original
      return(
        <p className={(item.quantity < item.min_stock) ? "text-[red]" : "text-foreground"}>{item.quantity}</p>
      )
    },
    sortingFn: mySortFn,
  },
  {
    accessorKey: "description",
    header: "Description"
  },
  {
    accessorKey: "updated_at",
    header: "Updated At"
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original
 
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={() => {navigator.clipboard.writeText(item.name)}} variant="ghost" className="h-8 w-8 p-0">
              <Pencil className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Item</DialogTitle>
              <DialogDescription>Edit the item on the database.</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input id="name" defaultValue={item.name} className="col-span-3"/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">Quantity</Label>
                <Input id="quantity" defaultValue={item.quantity} className="col-span-3"/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">Description</Label>
                <Input id="description" defaultValue={item.description} className="col-span-3"/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="min_stock" className="text-right">Minimum Stock</Label>
                <Input id="min_stock" defaultValue={item.min_stock} className="col-span-3"/>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Update DB</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )
    },
  },
]