import React, { useState, useEffect } from "react"
import { View } from "react-native"
import { TouchableRipple, Text, Icon } from "react-native-paper"
import { leftPadding } from "./Function"
import { TabViewProps } from "./TabsType"
import { HEIGHT, MAGRGIN_INDICATOR, PADDING_POINTER } from "./Constants"
import Animated, { runOnJS, useAnimatedReaction, useAnimatedStyle, useSharedValue, withTiming, WithTimingConfig } from "react-native-reanimated"

type NameProps = {
    color: string
    element: string
}

const Name = (props: NameProps) => <Text
    variant="titleSmall"
    style={{
        color: props.color,
        alignItems: 'center',
    }}
>{props.element}</Text>

const TabView = (props: TabViewProps) => {

    const {
        refScroll,
        content,
        onTabsPress,
        onLayoutTab,
        selectItemTabs,
        widthTab,
        widthViewTabs,
        scrollable,
        mode,
        duration = 300,
        theme } = props

    const left = useSharedValue<number>(leftPadding({ ...props, mode, padding: PADDING_POINTER[mode] }))
    const width = useSharedValue(widthTab[selectItemTabs][mode])

    const [config, setConfig] = useState<WithTimingConfig>({ duration: 0 })
    const [selectTab, setSelectTab] = useState<number>(selectItemTabs)

    const styleAnimated = useAnimatedStyle(() => ({
        left: withTiming(left.value, config),
        width: withTiming(width.value - MAGRGIN_INDICATOR[mode] * 2, config)
    }));

    const [iconVisible] = useState<boolean>(content.every(item => typeof item !== 'string'))

    const coef = () => Math.abs(selectItemTabs - selectTab)

    useEffect(() => {
        setTimeout(() => setConfig({ duration }), 100)
    }, [])

    useEffect(() => {
        if (widthTab.length > 0) {
            left.value = leftPadding({ ...props, mode, padding: PADDING_POINTER[mode] })
            width.value = widthTab[selectItemTabs][mode]
        }
    }, [selectItemTabs, widthTab, widthViewTabs, mode])

    useEffect(() => {
        setConfig({ duration: duration * coef() })
        setSelectTab(selectItemTabs)
    }, [selectItemTabs])

    const scrollTo = (value: number) => refScroll.current?.scrollTo({ x: value * 0.4, animated: true }, duration * coef())

    useAnimatedReaction(() => left.value, (value, previous) => (scrollable && refScroll && value !== previous)
        && runOnJS(scrollTo)(value))

    return <View
        style={{
            flexDirection: 'row',
            flex: 1,
            height: '100%',
            display: 'flex'
        }}
    >
        <Animated.View
            style={[styleAnimated, {
                position: 'absolute',
                borderTopWidth: mode == 'primary' ? 3 : 2,
                borderTopColor: theme.colors.primary,
                borderTopRightRadius: mode == 'primary' ? 20 : 0,
                borderTopLeftRadius: mode == 'primary' ? 20 : 0,
                bottom: 0
            }]}
        />
        {content.map((element, index) => {
            const color = selectItemTabs === index
                ? theme.colors.primary
                : theme.colors.onSurfaceVariant
            return <TouchableRipple
                key={index}
                style={{
                    paddingHorizontal: (content.length == 1) ? 0 : 'auto',
                    alignItems: widthTab.length == 1 ? 'flex-start' : 'center',
                }}
                onLayout={(event) => onLayoutTab({ event, index, mode: 'secondary' })}
                onPress={() => onTabsPress && onTabsPress(index)}
            >
                <View
                    style={{
                        marginHorizontal: scrollable || widthTab.length == 1 ? PADDING_POINTER['primary'] : PADDING_POINTER['secondary'],
                        width: scrollable || widthTab.length == 1 ? 'auto' : widthViewTabs / content.length
                    }}
                >
                    <View
                        style={{
                            height: (mode == 'primary' && iconVisible) ? HEIGHT.WITH_ICON : HEIGHT.NO_ICON,
                            marginHorizontal: 'auto',
                            justifyContent: 'center',
                        }}
                        onLayout={(event) => onLayoutTab({ event, index, mode: 'primary' })} >
                        {(typeof element === 'string')
                            ? <Name
                                color={color}
                                element={element}
                            />
                            : <View
                                style={{ flexDirection: mode == 'primary' ? 'column' : 'row', alignItems: "center" }}
                            >
                                <View style={{ marginRight: mode != 'primary' ? 8 : 0 }} >
                                    <Icon
                                        source={element.icon}
                                        size={24}
                                        color={color}
                                    />
                                </View>
                                <Name
                                    color={color}
                                    element={element.name}
                                />
                            </View>}
                    </View>
                </View>
            </TouchableRipple>
        })}
    </View>
}

export default TabView