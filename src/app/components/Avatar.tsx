import React, { FC } from "react";

type AvatarProps = {
    url?: string;
    small?: boolean
};

const Avatar: FC<AvatarProps> = ({ url, small = false }): JSX.Element => {

    const bgUrl = url ?? `${window.location.origin}/assets/avatar_placeholder.png`

    return (
        <span className={`avatar-holder ${small ? 'small' : ''}`} style={{ backgroundImage: `url(${bgUrl})` }}></span>
    );
};

export default Avatar;