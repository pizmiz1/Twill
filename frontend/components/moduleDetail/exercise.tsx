import { ActivityIndicator, Animated, StyleSheet, Text, TextInput, View } from "react-native";
import colors from "../../constants/colors";
import { MaterialIconButton } from "../shared/IconButton";
import { useGlobalContext } from "../../store/globalContext";
import { useRef, useState } from "react";
import { Swipeable } from "react-native-gesture-handler";
import { opacityLayout } from "../../helpers/layouts";
import { ExerciseDto } from "../../../shared/moduledto";

interface ExerciseProps {
  exerciseId: string;
  moduleId: string;
  viewOpacity: Animated.Value;
  circleOpacity: Animated.Value;
  last: boolean;
  hideActive: Animated.Value;
  active: boolean;
  deleteCallback: (index: number) => void;
}

const Exercise = ({ exerciseId, moduleId, viewOpacity, circleOpacity, last, hideActive, active, deleteCallback }: ExerciseProps) => {
  const { modules, patchModule } = useGlobalContext();
  const module = modules.find((x) => x.id === moduleId)!;
  const exercise = module.exercises.find((exercise) => exercise.id === exerciseId);

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState(exercise?.name);
  const [text1, setText1] = useState(exercise?.text1);
  const [text2, setText2] = useState(exercise?.text2);

  const swipeableRef = useRef<Swipeable>(null);

  const deleteExercise = async () => {
    setSaving(true);

    const oldIndex = module.exercises.findIndex((curr) => curr.id === exerciseId);
    module.exercises = module.exercises.filter((curr) => curr.id !== exerciseId);
    module.progress = module.progress - 100 / module.exercises.length;

    const success = await patchModule(module);

    if (success) {
      deleteCallback(oldIndex);
    }

    setSaving(false);
  };

  const updateExercise = async () => {
    setSaving(true);

    const newExercise: ExerciseDto = {
      id: exercise?.id,
      name: name!,
      text1: text1!,
      text2: text2,
      completed: exercise?.completed!,
    };

    const index = module.exercises.findIndex((curr) => curr.id === exercise?.id);
    module.exercises[index] = newExercise;

    const success = await patchModule(module);

    setSaving(false);

    if (success) {
      if (active) {
        Animated.timing(hideActive, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }).start();
      }
      setEditing(false);
    }
  };

  const rightAction = (progress: Animated.AnimatedInterpolation<number>) => {
    const translateX = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [50, 0],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={{
          opacity: progress,
          transform: [{ translateX }],
          alignItems: "center",
          justifyContent: "flex-end",
          flexDirection: "row",
          gap: 10,
          width: 90,
        }}
      >
        {saving ? (
          <ActivityIndicator size="small" color={colors.lightest_grey} />
        ) : (
          <>
            {editing ? (
              <></>
            ) : (
              <>
                <MaterialIconButton
                  name="edit"
                  color={colors.light_primary}
                  size={34}
                  onPress={() => {
                    opacityLayout();
                    setEditing(true);
                    swipeableRef.current!.close();
                  }}
                  style={{ padding: "1%" }}
                />
                <MaterialIconButton name="delete" color={colors.warning} size={34} onPress={deleteExercise} style={{ padding: "1%" }} />
              </>
            )}
          </>
        )}
      </Animated.View>
    );
  };

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={rightAction}
      friction={2}
      onSwipeableOpenStartDrag={() => {
        if (active) {
          Animated.timing(hideActive, {
            toValue: 0.5,
            duration: 100,
            useNativeDriver: true,
          }).start();
        }
      }}
      onSwipeableClose={() => {
        if (active && !editing) {
          Animated.timing(hideActive, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          }).start();
        }
      }}
      enabled={!saving && !editing}
    >
      <Animated.View style={{ flexDirection: "row", opacity: viewOpacity, overflow: "hidden" }}>
        <View>
          <View style={{ width: 49, alignItems: "center", zIndex: 0 }}>
            <View style={{ width: StyleSheet.hairlineWidth, backgroundColor: colors.border_grey, height: 40 }} />
          </View>
          <Animated.View style={{ opacity: circleOpacity, position: "absolute", top: 27, zIndex: 1 }}>
            <MaterialIconButton
              name="circle"
              color={"white"}
              size={30}
              onPress={() => {}}
              style={{ paddingHorizontal: 10, width: 50 }}
              disabled={true}
            />
          </Animated.View>
          <View style={{ width: 49, alignItems: "center", zIndex: 0, opacity: last ? 0 : 1 }}>
            <View style={{ width: StyleSheet.hairlineWidth, backgroundColor: colors.border_grey, height: 40 }} />
          </View>
        </View>
        <View style={{ justifyContent: "center", flex: 1, gap: 7, marginLeft: 15 }}>
          {editing ? (
            <TextInput
              value={name}
              onChangeText={setName}
              style={{ color: "white", fontWeight: "bold", fontSize: 20 }}
              placeholderTextColor="#6b6b6b"
              placeholder="Name..."
              editable={!saving}
              autoFocus={true}
            />
          ) : (
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }} numberOfLines={1}>
              {exercise?.name}
            </Text>
          )}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {editing ? (
              <TextInput
                value={text1}
                onChangeText={setText1}
                style={{ color: colors.lightest_grey, width: "40%" }}
                placeholderTextColor="#6b6b6b"
                placeholder="Text..."
                editable={!saving}
              />
            ) : (
              <Text style={{ color: colors.lightest_grey, width: "40%" }} numberOfLines={1}>
                {exercise?.text1}
              </Text>
            )}
            {editing ? (
              <>
                <View style={{ width: StyleSheet.hairlineWidth, backgroundColor: colors.border_grey, height: 20, marginHorizontal: 20 }} />
                <TextInput
                  value={text2}
                  onChangeText={setText2}
                  style={{ color: colors.lightest_grey, width: "30%" }}
                  placeholderTextColor="#6b6b6b"
                  placeholder="Optional..."
                  editable={!saving}
                />
              </>
            ) : (
              exercise?.text2 && (
                <>
                  <View style={{ width: StyleSheet.hairlineWidth, backgroundColor: colors.border_grey, height: 20, marginHorizontal: 20 }} />
                  <Text style={{ color: colors.lightest_grey, width: "40%" }} numberOfLines={1}>
                    {exercise.text2}
                  </Text>
                </>
              )
            )}
          </View>
        </View>
        {editing && (
          <View style={{ position: "absolute", right: 0, top: 30 }}>
            {saving ? (
              <ActivityIndicator size="small" color={colors.lightest_grey} />
            ) : (
              <MaterialIconButton name="check" color={colors.primary} size={30} onPress={updateExercise} />
            )}
          </View>
        )}
      </Animated.View>
    </Swipeable>
  );
};

export default Exercise;
