import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../constants/colors";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../store/globalContext";
import Module from "../components/shared/module";
import { useNavigation } from "@react-navigation/native";
import routeNames from "../constants/routeNames";
import DetailsModal from "../components/shared/detailsModal";
import NoModules from "../components/daily/noModules";
import { ModuleDto } from "../../shared/moduledto";
import { opacityLayout } from "../helpers/layouts";
import { JsonDto } from "../../shared/jsondto";
import { get } from "../helpers/fetch";
import { errorAlert } from "../helpers/alert";
import { MaterialIconButton } from "../components/shared/IconButton";
import PageContainer from "../components/shared/pageContainer";

const DailyScreen = () => {
  const { modules, accessToken, updateAccessToken, updateModules } = useGlobalContext();

  const [blurActive, setBlurActive] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [todaysModules, setTodaysModules] = useState<ModuleDto[]>([]);
  const [loading, setLoading] = useState(modules.length === 0);
  const date = new Date();

  const navigation = useNavigation();

  useEffect(() => {
    const load = async () => {
      const responseModule: JsonDto<ModuleDto[]> = await get("/module", { accessToken: accessToken, updateAccessToken: updateAccessToken });
      if (responseModule.error) {
        errorAlert(responseModule.error);
        return;
      }

      updateModules(responseModule.data!);
      opacityLayout();
      setLoading(false);
    };

    if (modules.length === 0) {
      load();
    }
  }, []);

  useEffect(() => {
    const today = date.toLocaleDateString("en-US", { weekday: "long" });

    switch (today) {
      case "Monday":
        setTodaysModules(modules.filter((curr) => curr.days.mon));
        return;
      case "Tuesday":
        setTodaysModules(modules.filter((curr) => curr.days.tues));
        return;
      case "Wednesday":
        setTodaysModules(modules.filter((curr) => curr.days.wed));
        return;
      case "Thursday":
        setTodaysModules(modules.filter((curr) => curr.days.thur));
        return;
      case "Friday":
        setTodaysModules(modules.filter((curr) => curr.days.fri));
        return;
      case "Saturday":
        setTodaysModules(modules.filter((curr) => curr.days.sat));
        return;
      case "Sunday":
        setTodaysModules(modules.filter((curr) => curr.days.sun));
        return;
      default:
        return;
    }
  }, [modules]);

  if (loading)
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.secondary }}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );

  return (
    <PageContainer
      header={modules.length > 0 ? date.toLocaleDateString("en-US", { weekday: "long" }) : ""}
      setBlurActive={setBlurActive}
      backButton={false}
    >
      <DetailsModal
        visible={modalVisible}
        setVisible={(deleted: boolean) => {
          setModalVisible(false);
        }}
      />

      {modules.length > 0 ? (
        <>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View>
              <Text
                style={{
                  color: "white",
                  fontSize: 40,
                  fontFamily: "Main-Font",
                  fontStyle: "italic",
                  fontWeight: "bold",
                  opacity: blurActive ? 0 : 1,
                }}
              >
                {date.toLocaleDateString("en-US", { weekday: "long" })}
              </Text>
              <Text
                style={{
                  color: colors.lighter_grey,
                  fontSize: 20,
                  fontFamily: "Main-Font",
                  opacity: blurActive ? 0 : 1,
                }}
              >
                {date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </Text>
            </View>

            <MaterialIconButton
              name="format-list-bulleted"
              color={colors.light_primary}
              size={34}
              style={{ padding: "2%", opacity: blurActive ? 0 : 1 }}
              onPress={() => {
                navigation.navigate(routeNames.module);
              }}
            />
          </View>
          {todaysModules.length > 0 && (
            <>
              <Text
                style={{
                  color: "white",
                  fontSize: 25,
                  fontFamily: "Main-Font",
                  marginTop: 20,
                  marginBottom: 5,
                }}
              >
                To-Do
              </Text>
              <View style={{ flexDirection: "row", gap: 20, flexWrap: "wrap" }}>
                {todaysModules
                  .filter((curr) => curr.progress !== 100)
                  .map((module) => (
                    <Module
                      key={module.id}
                      module={module}
                      onPress={() => {
                        // @ts-ignore
                        navigation.navigate(routeNames.moduleDetail, { moduleId: module.id, prevRoute: routeNames.daily });
                      }}
                      progress={module.progress}
                      dailyMod={true}
                    />
                  ))}
              </View>

              <Text
                style={{
                  color: "white",
                  fontSize: 25,
                  fontFamily: "Main-Font",
                  marginTop: 30,
                  marginBottom: 5,
                }}
              >
                Finished
              </Text>
              <View style={{ flexDirection: "row", gap: 20, flexWrap: "wrap" }}>
                {todaysModules
                  .filter((curr) => curr.progress === 100)
                  .map((module) => (
                    <Module
                      key={module.id}
                      module={module}
                      onPress={() => {
                        // @ts-ignore
                        navigation.navigate(routeNames.moduleDetail, { moduleId: module.id, prevRoute: routeNames.daily });
                      }}
                      progress={module.progress}
                      dailyMod={true}
                    />
                  ))}
              </View>
            </>
          )}
        </>
      ) : (
        <NoModules
          addPress={() => {
            setModalVisible(true);
          }}
        />
      )}
    </PageContainer>
  );
};

export default DailyScreen;
