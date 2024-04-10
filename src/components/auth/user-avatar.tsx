
import { FC } from 'react';
import { type User } from "next-auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { type AvatarProps } from "@radix-ui/react-avatar";
import Image from 'next/image';

interface UserAvatarProps extends AvatarProps {
    user: Pick<User, "name" | "image">;
}

const UserAvatar: FC<UserAvatarProps> = ({ user, ...props }) => {
    return (
        <Avatar {...props}>
            {user.image ? (
                <div className="relative w-full h-full aspect-square">
                    <Image
                        fill
                        src={user.image}
                        alt="profile picture"
                        referrerPolicy="no-referrer"
                    />
                </div>
            ) : (
                <AvatarFallback>
                    <span >{user?.name && user?.name[0].toUpperCase()}</span>
                </AvatarFallback>
            )}
        </Avatar>
    )
}
export default UserAvatar;