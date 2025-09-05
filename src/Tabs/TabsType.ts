import { RefObject } from "react";
import { ScrollView, LayoutChangeEvent } from "react-native";
import { MD3Theme } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

export type ModeType = 'primary' | 'secondary';

export type IconType = IconSource

export type Childrens = {
    icon: IconType
    name: string
}

export type ChildrenType = string[] | Childrens[]

export interface TabsProps {
    children: ChildrenType
    onTabPress?: (index: number) => void
    mode?: ModeType
    theme?: MD3Theme
}
export type WidthTab = {
    [Mode in ModeType]?: number
}
export interface TabViewProps {
    refScroll: RefObject<ScrollView | null>
    children: ChildrenType
    onTabsPress?: (index: number) => void
    onLayoutTab: (props: { event: LayoutChangeEvent; index: number; mode: ModeType }) => void
    selectItemTabs: number
    widthTab: WidthTab[]
    widthViewTabs: number
    scrollable: boolean
    theme: MD3Theme
    mode: ModeType
}
export interface LeftPaddingProps {
    widthTab: WidthTab[]
    scrollable: boolean
    widthViewTabs: number
    selectItemTabs: number
    mode: ModeType
    padding: number
}

