import styles from "./Header.module.scss";

import React, { ReactElement } from "react";

import { Logo, NavTab, RoundButton } from "..";
import {
    IconHouseDoorFill,
    IconJournalBookmark,
    IconLayoutWtf,
    IconList,
    IconPerson,
} from "../../icons";

interface Props {}

interface State {
    isSideMenuActive: boolean;
    isHeaderTransparent: boolean;
}

export default class Header extends React.Component<Props, State> {
    public state: State;
    private subpageTabs: ReactElement[];
    public constructor(props: Props) {
        super(props);
        this.state = {
            isSideMenuActive: false,
            isHeaderTransparent: true,
        };
        this.subpageTabs = [
            <NavTab
                tabIcon={<IconHouseDoorFill sideLength="100%" />}
                tabName="HOME"
                to="#home"
                onClick={this.hideSideMenu}
                key="home"
            />,
            <NavTab
                tabIcon={<IconPerson sideLength="95%" />}
                tabName="ABOUT"
                to="#about"
                onClick={this.hideSideMenu}
                key="about"
            />,
            <NavTab
                tabIcon={<IconLayoutWtf sideLength="95%" />}
                tabName="PROJECTS"
                to="#projects"
                onClick={this.hideSideMenu}
                key="projects"
            />,
            <NavTab
                tabIcon={<IconJournalBookmark sideLength="95%" />}
                tabName="BLOG"
                to="#blog"
                onClick={this.hideSideMenu}
                key="blog"
            />,
        ];
    }
    public componentDidMount(): void {
        window.addEventListener("scroll", () => {
            this.setState({
                isHeaderTransparent: window.scrollY < window.innerHeight,
            });
        });
    }
    public render(): React.ReactNode {
        return (
            <>
                <header className={this.mainClass}>
                    <Logo size="s" />
                    <div className={styles.nav_bar_tab_container}>
                        {this.subpageTabs}
                    </div>
                    <div className={styles.list_button_outer}>
                        <RoundButton onClick={this.showSideMenu}>
                            <IconList sideLength="30" />
                        </RoundButton>
                    </div>
                </header>
                <div
                    className={
                        styles.side_menu +
                        (this.state.isSideMenuActive ? ` ${styles.active}` : "")
                    }
                >
                    {this.subpageTabs}
                </div>
                <div
                    className={
                        styles.small_screen_active_background +
                        (this.state.isSideMenuActive ? ` ${styles.active}` : "")
                    }
                    onClick={this.hideSideMenu}
                />
            </>
        );
    }
    private get mainClass(): string {
        return this.state.isHeaderTransparent
            ? `${styles.main} ${styles.transparent}`
            : styles.main;
    }
    private showSideMenu = (): void => {
        this.setState({ isSideMenuActive: true });
    };
    private hideSideMenu = (): void => {
        this.setState({ isSideMenuActive: false });
    };
}
