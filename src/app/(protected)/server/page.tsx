import UserCardInfo from '@/components/auth/user-card-info';
import { auth } from '@/lib/auth'
import { currentServerUser } from '@/lib/auth-session';
import React from 'react'

export default async function ServerPage() {

  const user = await currentServerUser();

  return (
    <div>
      <pre className="bg-slate-800 p-4 rounded-lg overflow-x-auto">
        <UserCardInfo title='Client Component' description='' user={user}/>
      </pre>
    </div>
  )
}
