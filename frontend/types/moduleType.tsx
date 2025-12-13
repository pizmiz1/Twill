import { ComponentProps } from "react";
import { DaysType } from "./daysType";
import { MaterialIcons } from "@expo/vector-icons";

export interface ModuleType {
  id: string;
  name: string;
  icon: ComponentProps<typeof MaterialIcons>["name"];
  days: DaysType;
}
