import { ComponentProps, useContext, useEffect, useState } from "react";
import { FlatList, Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import { useGlobalContext } from "../../store/globalContext";
import colors from "../../constants/colors";
import Input from "../shared/input";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "../shared/button";
import Day from "./day";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import asyncKeys from "../../constants/asyncKeys";
import { GlobalContextType } from "../../types/globalContextType";
import { DaysType } from "../../types/daysType";
import { ModuleType } from "../../types/moduleType";

const initialDays: DaysType = {
  mon: false,
  tues: false,
  wed: false,
  thur: false,
  fri: false,
  sat: false,
  sun: false,
};

interface AddModalProps {
  visible: boolean;
  setVisible: () => void;
}

const AddModal = ({ visible, setVisible }: AddModalProps) => {
  const { updateModules }: GlobalContextType = useGlobalContext();

  const [days, setDays] = useState(initialDays);
  const [resetInput, setResetInput] = useState(false);
  const [resetDay, setResetDay] = useState(false);
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");

  const availableIcons = [
    "fitness-center",
    "directions-bike",
    "directions-run",
    "sports-soccer",
    "sports-basketball",
    "sports-volleyball",
    "sports-hockey",
    "water",
    "eco",
    "landscape",
    "pets",
    "personal-injury",
    "sentiment-very-satisfied",
    "local-hospital",
    "medical-services",
    "health-and-safety",
    "accessibility",
    "stream",
    "star",
    "cloud",
    "camera",
    "360",
    "all-inclusive",
    "api",
  ];

  const mapDayToLabel = (dayKey: string) => {
    const dayKeys = Object.keys(days);

    switch (dayKey) {
      case dayKeys[0]:
        return "M";
      case dayKeys[1]:
        return "T";
      case dayKeys[2]:
        return "W";
      case dayKeys[3]:
        return "T";
      case dayKeys[4]:
        return "F";
      case dayKeys[5]:
        return "S";
      case dayKeys[6]:
        return "S";
      default:
        return "M";
    }
  };

  const toggleDay = (dayKey: string) => {
    setDays((prev) => ({
      ...prev,
      [dayKey]: !prev[dayKey as keyof typeof days],
    }));
  };

  const resetState = () => {
    setResetDay(!resetDay);
    setResetInput(!resetInput);
    setName("");
    setIcon("");
    setDays(initialDays);
  };

  const closeModal = () => {
    resetState();
    setVisible();
  };

  const savePress = async () => {
    const newModule: ModuleType = {
      id: uuid.v4(),
      name: name,
      icon: icon as ComponentProps<typeof MaterialIcons>["name"],
      days: days,
    };

    const asyncData = await AsyncStorage.getItem(asyncKeys.modules);
    let existingModules = JSON.parse(asyncData!);
    existingModules.push(newModule);
    await AsyncStorage.setItem(asyncKeys.modules, JSON.stringify(existingModules));

    updateModules(existingModules);

    closeModal();
  };

  const renderIconItem = ({ item }: { item: string }) => (
    <Pressable
      onPress={() => setIcon(item)}
      style={({ pressed }) => [
        {
          backgroundColor: icon === item ? "#fff" : colors.light_grey,
          opacity: pressed ? 0.5 : 1,
          padding: "4.6%",
          margin: "3%",
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1,
        },
      ]}
    >
      <MaterialIcons name={item as ComponentProps<typeof MaterialIcons>["name"]} size={30} color="#000" />
    </Pressable>
  );

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={closeModal}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: colors.light_secondary,
            flex: 1,
            padding: 15,
            justifyContent: "flex-start",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <MaterialIcons name="close" size={24} color={colors.light_secondary} style={{ paddingVertical: "3%", paddingHorizontal: "1%" }} />
            <Text style={{ color: "white", fontSize: 35, fontFamily: "Main-Font", fontStyle: "italic", textAlign: "center" }}>New Module</Text>
            <TouchableOpacity onPress={closeModal} style={{ paddingVertical: "3%", paddingHorizontal: "1%" }}>
              <MaterialIcons name="close" size={24} color={colors.light_grey} />
            </TouchableOpacity>
          </View>

          <Input label="Name" onChangeText={setName} style={{ marginTop: 5 }} reset={resetInput} baseColor={colors.light_secondary} limit={15} />

          <Text style={{ color: "white", fontFamily: "Main-Font", fontWeight: "500", fontSize: 20, marginTop: 25 }}>Icon</Text>
          <View style={{ marginTop: 5, height: 210 }}>
            <FlatList data={availableIcons} renderItem={renderIconItem} keyExtractor={(item) => item} numColumns={4} />
          </View>

          <Text style={{ color: "white", fontFamily: "Main-Font", fontWeight: "500", fontSize: 20, marginTop: 25 }}>Days Active</Text>
          <View
            style={{
              width: "100%",
              backgroundColor: colors.dark_grey,
              paddingVertical: 17,
              paddingHorizontal: 10,
              borderRadius: 25,
              marginTop: 7,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            {Object.keys(days).map((key) => (
              <Day
                key={key}
                label={mapDayToLabel(key)}
                size={35}
                baseColor={colors.dark_grey}
                reset={resetDay}
                onPress={() => {
                  toggleDay(key);
                }}
              />
            ))}
          </View>

          <View style={{ alignItems: "flex-end", flexGrow: 1, justifyContent: "space-evenly", flexDirection: "row" }}>
            <Button label="Reset" onPress={resetState} disabled={name === "" && icon === "" && !Object.values(days).some((val) => val === true)} style={{ backgroundColor: colors.dark_grey }} />
            <Button label="Save" onPress={savePress} disabled={name === "" || icon === "" || !Object.values(days).some((val) => val === true)} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddModal;
