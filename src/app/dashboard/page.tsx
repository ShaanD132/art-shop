"use client"
import { createClient } from "@/api/supabase/client";
import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import {columns} from "./columns"

type Item = {
  id: number,
  name: string,
  quantity: number,
  description: string,
  min_stock: number,
  updated_at: string
}

export default function Dashboard() {
  const client = createClient()
  const router = useRouter()
  const [isLoading, setLoading] = useState<boolean>(true)
  const [items, setItems] = useState<Item[]>()
  const [userChecked, setUserCheck] = useState<boolean>(false)


  const checkUser = async () => {
    const {data: {user}} = await client.auth.getUser()
    if (!user) {
      setTimeout(() => router.push("/"), 500)
    }
    setUserCheck(true)
  }

  useEffect(() => {
    if (!userChecked) {
      checkUser()
    }
  }, [])

  const logOutButton = async () => {
    const {error} = await client.auth.signOut()
    router.push("/")
  }

  const fetchInventory = async () => {
    const {data: inventory, error} = await client.from("inventory").select()
    var curItems: Item[] = []
    for (let i in inventory) {
      curItems.push({
        id: inventory[i].id as number,
        name: inventory[i].name as string,
        quantity: inventory[i].quantity as number,
        description: inventory[i].description as string,
        min_stock: inventory[i].min_stock as number,
        updated_at: inventory[i].updated_at as string,
      })
    }
    setItems(curItems)
  }

  useEffect(() => {
    if (isLoading && userChecked == true) {
      fetchInventory()
      setLoading(false)
    }
  }, [userChecked])

  useEffect(() => {
    if (items != undefined)
      console.log(items)
  }, [items])

  return(
    <div className="container-xl mx-10 py-10 ">
      {/* Main Table */}
      <div className={(isLoading) ? "hidden" : "block"}>
        <div className="flex items-center justify-center">
          <div>
            <h1 className="font-bold text-2xl">Inventory Dashboard</h1>
            <div className="mt-5">
            {(items) ? <DataTable columns={columns} data={items} /> : <></>}
            </div>

            <div className="mt-5">
              <Button onClick={logOutButton}>Log Out</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="sidebar hidden mx-20 mt-24 h-[200px] w-[300px] bg-[yellowgreen]">
        <p className="p-2"></p>
      </div>

    </div>
  )
}