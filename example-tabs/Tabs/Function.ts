import { MAGRGIN_INDICATOR } from "./Constants"
import type { LeftPaddingProps } from "./TabsType"

export const leftPadding = (props: LeftPaddingProps): number => {
    const { scrollable, widthTab, selectItemTabs, widthViewTabs, mode, padding } = props
    const leftCorrect = MAGRGIN_INDICATOR[mode]
    let left: number = padding + leftCorrect
    if (widthTab[selectItemTabs])
        if (widthTab.length > 1 && !scrollable) {
            left = ((((widthViewTabs / widthTab.length) - (widthTab[selectItemTabs][mode]) + leftCorrect) / 2)
                + (selectItemTabs * (widthViewTabs / widthTab.length)))
        }
        else if (widthTab.length > 1 && scrollable) {
            left = (widthTab.slice(0, selectItemTabs).reduce((prev, cur) => prev + (cur[mode] - leftCorrect) + padding * 2, 0) + padding)
        }
    return left
}
export const needToScroll = (leng: number, lengElement: number[], padding: number) =>
    (lengElement.reduce((prev, cur) => prev + cur + padding * 2, 0) > leng && lengElement.length > 1)
    || (lengElement.reduce((prev, cur) => (cur > prev) ? cur : prev, 0) > leng / lengElement.length)
    || Array.isArray(lengElement) && lengElement.length > 4

