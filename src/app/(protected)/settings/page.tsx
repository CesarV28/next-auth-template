import { Button } from '@/components/ui/button';
import { auth, signOut } from '@/lib/auth'
import React from 'react'

export default async function SettingsPage() {

  const session = await auth();

  return (
    <div>
      <pre className="bg-slate-800 p-4 rounded-lg overflow-x-auto">
        <code className="text-xs font-mono">{JSON.stringify(session?.user, null, 2)}</code>
      </pre>

      <form className='w-1/4 mx-auto mt-12' action={async () => {
        "use server"

        await signOut({ redirectTo: "/" })
      }}>
        <div className="group relative">
          <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 opacity-75 blur transition duration-500 group-hover:opacity-100"></div>
          <Button
            type="submit"
            className="w-full relative rounded-lg bg-background px-7 py-4 text-foreground hover:bg-background"
          >
            Sing out
          </Button>
        </div>
      </form>
    </div>
  )
}
