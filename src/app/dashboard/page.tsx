"use client"
import { createClient } from "@/api/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const client = createClient()
  const router = useRouter()
  const [errorLog, setError] = useState<any | null>()

  const logOutButton = async () => {
    const {error} = await client.auth.signOut()
    router.push("/")
  }

  return(
    <div className="container-xl mx-10">
      Hi, I'm Dash
      <Button onClick={logOutButton}>Log Out</Button>
    </div>
  )
}