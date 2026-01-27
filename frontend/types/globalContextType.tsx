import { ModuleDto } from "../../shared/moduledto";

export interface GlobalContextType {
  accessToken: string;
  modules: ModuleDto[];
  updateAccessToken: (newAccessToken: string) => void;
  updateModules: (newModules: ModuleDto[]) => void;
  patchModule: (updatedModule: ModuleDto) => Promise<boolean>;
}
