"use client"

import { Button } from '@/components/ui/button';
import { useSession, signOut } from 'next-auth/react';
import React from 'react'

export default function SettingsPage() {

  const session = useSession();

  const onSingOut = () => {
    signOut()
  }

  return (
    <div>
      <pre className="bg-slate-800 p-4 rounded-lg overflow-x-auto">
        {session.status === "loading"
          ? <h1>Loading...</h1>
          : <code className="text-xs font-mono">{JSON.stringify(session, null, 2)}</code>

        }
      </pre>

      <div className='w-1/4 mx-auto mt-12'>
        <div className="group relative">
          <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 opacity-75 blur transition duration-500 group-hover:opacity-100"></div>
          <Button
            type="submit"
            className="w-full relative rounded-lg bg-background px-7 py-4 text-foreground hover:bg-background"
            onClick={ () => onSingOut() }
          >
            Sing out
          </Button>
        </div>
      </div>
    </div>
  )
}
