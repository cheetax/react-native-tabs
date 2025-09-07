import { View } from "react-native";
import Tabs from "../Tabs/Tabs";

const ExampleTabsView = () => {

    return <View>
        <Tabs 
            content={['Tabs1', 'Tabs2', 'Tabs3']}
        />
    </View>
}