import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Module from "../components/home/module";
import colors from "../constants/colors";
import ScrollViewContainer from "../components/shared/scrollViewContainer";
import { StatusBar } from "expo-status-bar";
import Edit from "../components/home/edit";
import { useState } from "react";
import { useGlobalContext } from "../store/globalContext";
import AddModal from "../components/home/addModal";
import Button from "../components/shared/button";
import { GlobalContextType } from "../types/globalContextType";

const HomeScreen = () => {
  const { modules }: GlobalContextType = useGlobalContext();

  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.secondary }}>
      <StatusBar style="light" />
      <ScrollViewContainer
        content={
          <View style={{ padding: "5%" }}>
            <AddModal
              visible={adding}
              setVisible={() => {
                setAdding(false);
                setEditing(false);
              }}
            />

            {modules.length > 0 ? (
              <View>
                <Edit editing={editing} setEditing={setEditing} setAdding={setAdding} />
                <Text style={{ color: "white", fontSize: 40, fontFamily: "Main-Font", fontStyle: "italic" }}>Incomplete</Text>
                <View style={{ marginTop: 15, flexDirection: "row", gap: 30, flexWrap: "wrap" }}>
                  {modules.map((module) => (
                    <Module key={module.id} module={module} onPress={() => {}} />
                  ))}
                </View>
              </View>
            ) : (
              <View style={{ alignItems: "center", marginTop: "30%" }}>
                <View style={{ flexDirection: "row", gap: 30, flexWrap: "wrap" }}>
                  <Module
                    style={{ opacity: 0.25 }}
                    color1={colors.lighter_grey}
                    color2={colors.dark_grey}
                    disabled={true}
                    blank={true}
                    onPress={() => {}}
                    module={{ id: "1", name: "", icon: "10k", days: { mon: false, tues: false, wed: false, thur: false, fri: false, sat: false, sun: false } }}
                  />
                  <Module
                    style={{ opacity: 0.25 }}
                    color1={colors.lighter_grey}
                    color2={colors.dark_grey}
                    disabled={true}
                    blank={true}
                    onPress={() => {}}
                    module={{ id: "1", name: "", icon: "10k", days: { mon: false, tues: false, wed: false, thur: false, fri: false, sat: false, sun: false } }}
                  />
                </View>
                <Text style={{ color: "white", fontSize: 40, marginTop: "10%", fontFamily: "Main-Font", fontStyle: "italic" }}>No modules</Text>
                <Text
                  style={{
                    width: "90%",
                    marginTop: "5%",
                    color: colors.lighter_grey,
                    textAlign: "center",
                  }}
                >
                  Add your first module to get started!
                </Text>
                <Button
                  label="Add"
                  style={{ marginTop: "10%" }}
                  onPress={() => {
                    setAdding(true);
                  }}
                />
              </View>
            )}
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
