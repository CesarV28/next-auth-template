import UserCardInfo from '@/components/auth/user-card-info';
import { currentServerUser } from '@/lib/auth-session';


export default async function ServerPage() {

  const user = await currentServerUser();

  return (
    <div>
      <pre className="bg-slate-800 p-4 rounded-lg overflow-x-auto">
        <UserCardInfo title='Server Component' description='' user={user}/>
      </pre>
    </div>
  )
}
