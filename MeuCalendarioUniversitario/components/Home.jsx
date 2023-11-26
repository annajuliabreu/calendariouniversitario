import { View, Text, Button } from "react-native"
import myStyle from "./MyStyle"

const Home = ({ navigation }) => {

    return (
        <View>
            <Button
                title="Calendário de Aulas"
                onPress={() => navigation.navigate("CalendarioAulas")}
            />
            <Button
                title="Agenda"
                onPress={() => navigation.navigate("Agenda")}
            />
        </View>
    )
}
export default Home