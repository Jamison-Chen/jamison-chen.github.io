import styles from "./MainFunctionTab.module.scss";

import React, { MouseEventHandler } from "react";
import { Link } from "react-router-dom";

interface PropsInterface {
    tab_icon?: any;
    tab_name: string;
    to: string;
    onClick: MouseEventHandler;
}

interface StateInterface {}

export default class MainFunctionTab extends React.Component<
    PropsInterface,
    StateInterface
> {
    public state: StateInterface;
    public constructor(props: PropsInterface) {
        super(props);
        this.state = {};
    }
    public render(): React.ReactNode {
        return (
            <Link
                to={this.props.to}
                className={styles.tab}
                onClick={this.props.onClick}
            >
                <div className={styles.icon_outer}> {this.props.tab_icon}</div>
                {this.props.tab_name}
            </Link>
        );
    }
}
