import { RefObject } from "react";
import { ScrollView, LayoutChangeEvent } from "react-native";
import { MD3Theme } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

export type ModeType = 'primary' | 'secondary';

export type IconType = IconSource

export type Contents = {
    icon: IconType
    name: string
}

export type ContentType = string[] | Contents[]

export interface TabsProps {
    content: ContentType
    onTabPress?: (index: number) => void
    mode?: ModeType
    duration?: number
    theme?: MD3Theme
}
export type WidthTab = {
    [Mode in ModeType]: number
}
export interface TabViewProps {
    refScroll: RefObject<ScrollView | null>
    content: ContentType
    onTabsPress?: (index: number) => void
    onLayoutTab: (props: { event: LayoutChangeEvent; index: number; mode: ModeType }) => void
    selectItemTabs: number
    widthTab: WidthTab[]
    widthViewTabs: number
    scrollable: boolean
    theme: MD3Theme
    mode: ModeType
    duration?: number
}
export interface LeftPaddingProps {
    widthTab: WidthTab[]
    scrollable: boolean
    widthViewTabs: number
    selectItemTabs: number
    mode: ModeType
    padding: number
}

