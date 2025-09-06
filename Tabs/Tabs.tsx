import { useEffect, useRef, useState } from "react"
import { LayoutChangeEvent, ScrollView, View } from "react-native"
import { useTheme } from "react-native-paper"
import type { ContentType, ModeType, TabsProps, TabViewProps, WidthTab } from "./TabsType"
import TabView from "./TabsView"
import { needToScroll } from "./Function"

const Tabs = (props: TabsProps) => {

    const ref = useRef<ScrollView>(null)

    const _theme = useTheme()
    const { onTabPress, mode = 'primary', theme = _theme } = props

    const [content] = useState<ContentType>(props.content)

    const [widthViewTabs, setWidthViewTabs] = useState<number>(0)
    const [widthTab, setWidthTab] = useState<WidthTab[]>([{} as WidthTab])
    const [selectItemTabs, setSelectItemTabs] = useState<number>(0)
    const [scrollable, setScrollable] = useState((needToScroll(widthViewTabs, widthTab.map(item => item[mode] || 0),
        (mode == 'primary' ? 12 : 0))))

    const [tabViewProps, setTabViewProps] = useState<TabViewProps>({
        ...props,
        content,
        refScroll: ref,
        selectItemTabs: selectItemTabs,
        widthTab: widthTab,
        widthViewTabs: widthViewTabs,
        mode: mode,
        scrollable: scrollable,
        theme,
        onLayoutTab: () => { }
    })

    const onLayoutTab = (props: { event: LayoutChangeEvent, index: number, mode: ModeType }) => {
        setWidthTab((prev) => {
            const newWidthTabs: WidthTab[] = [...prev]
            const width = props.event.nativeEvent.layout.width
            newWidthTabs[props.index] = { ...prev[props.index], [props.mode]: width > 24 ? width : 24 }
            return newWidthTabs
        })
    }

    const onLayoutViewTabs = (event: LayoutChangeEvent) => {
        setWidthViewTabs(event.nativeEvent.layout.width)
    }
    const onTabsPress = (index: number) => {
        setSelectItemTabs(index)
        onTabPress && onTabPress(index)
    }

    useEffect(() => {
        setScrollable((needToScroll(widthViewTabs, widthTab.map(item => item[mode] || 0), (mode == 'primary' ? 12 : 0))))

        setTabViewProps(props => {
            return {
                ...props,
                selectItemTabs,
                widthTab,
                widthViewTabs,
                scrollable: scrollable
            }
        })
    }, [selectItemTabs, widthTab, widthViewTabs])

    useEffect(() => {
        setTabViewProps(props => {
            return {
                ...props,
                scrollable
            }
        })
    }, [scrollable])

    return <View
        style={{
            flexDirection: 'row',
            marginTop: 12,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.outlineVariant,
            height: 'auto'
        }}
        onLayout={onLayoutViewTabs}
    >
        <ScrollView
            ref={ref}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ height: 'auto' }}
            contentContainerStyle={{ paddingLeft: scrollable ? 54 : 0, }}
        >
            <TabView {...tabViewProps} onTabsPress={onTabsPress} onLayoutTab={onLayoutTab} />
        </ScrollView>
    </View>
}

export default Tabs