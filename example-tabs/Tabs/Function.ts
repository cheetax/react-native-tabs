import { MAGRGIN_INDICATOR } from "./Constants"
import type { LeftPaddingProps } from "./TabsType"

export const leftPadding = (props: LeftPaddingProps): number => {
    const { scrollable, widthTab, selectItemTabs, widthViewTabs, mode, padding } = props
    const leftCorrect = MAGRGIN_INDICATOR[mode]
    let left: number = padding + leftCorrect
    //console.log(props, left)
    if (widthTab[selectItemTabs])
        if (widthTab.length > 1) {
            const paddingLeft = (widthTab[selectItemTabs]['secondary'] - widthTab[selectItemTabs][mode])/2 + leftCorrect
            left = (widthTab.slice(0, selectItemTabs).reduce((prev, cur) => prev + (cur['secondary']), 0) + paddingLeft)
        }
    //console.log(left)
    return left
}
export const needToScroll = (leng: number, lengElement: number[], padding: number) =>
    (lengElement.reduce((prev, cur) => prev + cur + padding * 2, 0) > leng && lengElement.length > 1)
    || (lengElement.reduce((prev, cur) => (cur > prev) ? cur : prev, 0) > leng / lengElement.length)
    || Array.isArray(lengElement) && lengElement.length > 4

