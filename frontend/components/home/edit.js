import { LayoutAnimation, Text, TouchableOpacity, View } from "react-native";
import { useContext } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../constants/colors";
import GlobalContext from "../../store/globalContext";

const Edit = () => {
  const { globalData, updateHomeEditing, updateHomeAdding } = useContext(GlobalContext);

  const onEditPress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.create(200, LayoutAnimation.Types.linear, LayoutAnimation.Properties.scaleXY));

    updateHomeEditing(true);
  };

  const onAddPress = () => {
    updateHomeAdding(true);
  };

  const onSavePress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.create(200, LayoutAnimation.Types.linear, LayoutAnimation.Properties.scaleXY));

    updateHomeEditing(false);
  };

  return (
    <View style={{ alignItems: "flex-end" }}>
      {globalData.homeEditing ? (
        <View style={{ flexDirection: "row", gap: 10 }}>
          <TouchableOpacity onPress={onAddPress}>
            <MaterialIcons name="add" size={34} color={colors.light_primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onSavePress}>
            <MaterialIcons name="check" size={34} color={colors.light_primary} />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={onEditPress}>
          <MaterialIcons name="edit" size={34} color={colors.light_primary} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Edit;
