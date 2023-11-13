import React, { FC } from "react";

type PanelProps = React.ComponentPropsWithRef<'section'> & {
    title: string;
}
const Panel: FC<PanelProps> = ({ title, children }: PanelProps): JSX.Element => {
    return (
        <div className="panel">
            <div className="panel-header"><h3>{title}</h3></div>
            <div className="panel-body">{children}</div>
        </div>
    )
};

export default Panel;