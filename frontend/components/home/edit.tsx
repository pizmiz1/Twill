import { LayoutAnimation, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../constants/colors";

interface EditProps {
  editing: boolean;
  setEditing: (val: boolean) => void;
  setAdding: (val: boolean) => void;
}

const Edit = ({ editing, setEditing, setAdding }: EditProps) => {
  const onEditPress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.create(200, LayoutAnimation.Types.linear, LayoutAnimation.Properties.scaleXY));

    setEditing(true);
  };

  const onAddPress = () => {
    setAdding(true);
  };

  const onSavePress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.create(200, LayoutAnimation.Types.linear, LayoutAnimation.Properties.scaleXY));

    setEditing(false);
  };

  return (
    <View style={{ alignItems: "flex-end" }}>
      {editing ? (
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
