import { ExposedInMainWorld } from "../../preload";

export default function useElectron(): ExposedInMainWorld {
  return (window as any).electron as ExposedInMainWorld;
}
