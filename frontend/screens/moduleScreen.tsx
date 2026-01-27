import { Text, View } from "react-native";
import Module from "../components/shared/module";
import colors from "../constants/colors";
import { useState } from "react";
import { useGlobalContext } from "../store/globalContext";
import DetailsModal from "../components/shared/detailsModal";
import { useNavigation } from "@react-navigation/native";
import routeNames from "../constants/routeNames";
import { MaterialIconButton } from "../components/shared/IconButton";
import PageContainer from "../components/shared/pageContainer";

const ModuleScreen = () => {
  const { modules } = useGlobalContext();

  const [modalVisible, setModalVisible] = useState(false);
  const [blurActive, setBlurActive] = useState(false);

  const navigation = useNavigation();

  return (
    <PageContainer header="Modules" setBlurActive={setBlurActive} backButton={true} backButtonRoute={routeNames.daily}>
      <DetailsModal
        visible={modalVisible}
        setVisible={(deleted: boolean) => {
          if (deleted) {
            navigation.navigate(routeNames.daily);
          }
          setModalVisible(false);
        }}
      />

      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: "0%" }}>
        <Text
          style={{
            color: "white",
            fontSize: 50,
            fontFamily: "Main-Font",
            fontStyle: "italic",
            fontWeight: "bold",
            opacity: blurActive ? 0 : 1,
          }}
        >
          Modules
        </Text>
        <MaterialIconButton
          name="add"
          size={34}
          color={colors.light_primary}
          onPress={() => {
            setModalVisible(true);
          }}
        />
      </View>
      <View style={{ marginTop: "8%", flexDirection: "row", gap: 30, flexWrap: "wrap" }}>
        {modules.map((module) => (
          <Module
            key={module.id}
            module={module}
            onPress={() => {
              // @ts-ignore
              navigation.navigate(routeNames.moduleDetail, { moduleId: module.id, prevRoute: routeNames.module });
            }}
            dailyMod={false}
          />
        ))}
      </View>
    </PageContainer>
  );
};

export default ModuleScreen;
