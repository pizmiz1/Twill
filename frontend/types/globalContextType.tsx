import { ModuleType } from "./moduleType";

export interface GlobalContextType {
  modules: ModuleType[];
  updateModules: (newModules: ModuleType[]) => void;
}
