"use client"
import { createClient } from "@/api/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function AdminDashboard() {
  const client = createClient()
  const {toast} = useToast()
  const router = useRouter()
  const [isLoading, setLoading] = useState<boolean>(true)
  const [progress, setProgress] = useState<number>(10)

  const checkUser = async () => {
    const {data: {user}} = await client.auth.getUser()
    const timer = setTimeout(() => setProgress(100), 500)
    if (user) {
      setTimeout(() => router.push("/dashboard"), 600)
    }
    setTimeout(() => setLoading(false), 1000)
  }

  useEffect(() => {
    checkUser()
  }, [])

  const logInButton = async () => {
    const userInput = document.getElementById("email")
    const passInput = document.getElementById("password")

    const data = {
      email:(userInput as HTMLInputElement).value as string,
      password: (passInput as HTMLInputElement).value as string
    }
    const {error} = await client.auth.signInWithPassword(data)

    if (error) {
      toast({
        description: "Failed to Log In",
        variant: "destructive"
      })
    }
    else {
      toast({
        description: "Successfully Logged In",
        variant: "success"
      })
      router.push("/dashboard")
    }
  }

  return(
    <div className="mx-10 container-xl">
      <div className="flex justify-center items-center h-screen">
        <div className={(isLoading) ? "block" : "hidden"}>
          <Progress value={progress} className="w-[200px]" />
        </div>

        <div className={(isLoading) ? "hidden" : "block"}>
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Log In</CardTitle>
              <CardDescription>Log into admin system</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="Enter email" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" placeholder="Enter password" type="password"/>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button onClick={logInButton}>Log In</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}