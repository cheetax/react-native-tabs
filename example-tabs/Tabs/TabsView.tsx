import { useState, useEffect } from "react"
import { View } from "react-native"
import { TouchableRipple, Text, Icon } from "react-native-paper"
import { leftPadding } from "./Function"
import { TabViewProps } from "./TabsType"
import { HEIGHT, MAGRGIN_INDICATOR, PADDING_POINTER } from "./Constants"
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"

type NameProps = {
    color: string
    element: string
}

const Name = (props: NameProps) => <Text
    variant="titleSmall"
    style={{
        color: props.color,
        alignItems: 'center'
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
        theme } = props

    const left = useSharedValue<number>(0);

    const config = {
        duration: 200,
    };

    const styleAnimated = useAnimatedStyle(() => {
        return {
            left: withTiming(left.value, config),
        };
    });

    const [iconVisible] = useState<boolean>(typeof content !== 'string')

    useEffect(() => {
        if (widthTab.length > 0) left.value = leftPadding({ ...props, mode, padding: PADDING_POINTER[mode] })
    }, [selectItemTabs, widthTab, widthViewTabs, mode])

    useEffect(() => {
        (scrollable && refScroll && left != undefined)
            && refScroll.current?.scrollTo({ x: left.value * 0.5, animated: true }, 200)
    }, [left])
    //console.log(widthTab[selectItemTabs][mode])
    return <View
        style={{
            flexDirection: 'row',
            flex: 1,
            height: '100%',
            display: 'flex'
        }}
    >
        {(left != undefined && widthTab[selectItemTabs][mode] != undefined)
            && <Animated.View
                style={[styleAnimated, {
                    position: 'absolute',
                    width: widthTab[selectItemTabs][mode] - (MAGRGIN_INDICATOR[mode] * 2),
                    borderTopWidth: mode == 'primary' ? 3 : 2,
                    borderTopColor: theme.colors.primary,
                    borderTopRightRadius: mode == 'primary' ? 20 : 0,
                    borderTopLeftRadius: mode == 'primary' ? 20 : 0,
                    bottom: 0
                }]}
            />}
        {content.map((element, index) => {
            //console.log(typeof element, element)
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
                        //flexGrow: 1,
                        //flexShrink: 0,
                        //flexBasis: '100%',
                        marginHorizontal: scrollable || widthTab.length == 1 ? PADDING_POINTER['primary'] : PADDING_POINTER['secondary'],
                        width: scrollable || widthTab.length == 1 ? 'auto' : widthViewTabs / content.length
                    }}
                >
                    <View
                        style={{
                            height: mode == 'primary' && iconVisible ? HEIGHT.WITH_ICON : HEIGHT.NO_ICON,
                            //height: 48,
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