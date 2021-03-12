import test from "./test";
import { loadingStore } from "@renderer/stores/loading";

function createStore() {
  return {
    test,
    loading: loadingStore,
  };
}

export const store = createStore();

export type TStore = ReturnType<typeof createStore>;
