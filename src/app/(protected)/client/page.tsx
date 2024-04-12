"use client"
import React from 'react'
import UserCardInfo from '@/components/auth/user-card-info'
import { useCurrentUser } from '@/hooks/auth/use-current-user'


export default function ClientPage() {

  const user = useCurrentUser();

  return (
    <div>
      <pre className="bg-slate-800 p-4 rounded-lg overflow-x-auto">
        <UserCardInfo title='Client Component' description='' user={user} />
      </pre>
    </div>
  )
}
