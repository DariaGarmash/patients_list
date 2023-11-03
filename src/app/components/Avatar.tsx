import {FC} from "react";

type AvatarProps = {
    url?: string;
};
  
const Avatar: FC<AvatarProps> = ({ url }): JSX.Element => {

    const bgUrl = url ?? `${window.location.origin}/assets/avatar_placeholder.png`

    return (
        <span className="avatar-holder" style={{backgroundImage: `url(${bgUrl})`}}></span>
    );
};

export default Avatar;