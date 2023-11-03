import React, {FC} from "react";

type PanelProps = React.ComponentPropsWithRef<'section'> & {
    title: string;
}
const Panel: FC<PanelProps> = ({title, children}: PanelProps): JSX.Element => {
    return (
        <section className="panel">
            <section className="panel-header"><h3>{title}</h3></section>
            <article className="panel-body">{children}</article>
        </section>
        
    ) 
};

export default Panel;