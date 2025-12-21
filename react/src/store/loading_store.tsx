import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LoadingState {
  loading: boolean;

  /* eslint-disable no-unused-vars */
  setLoading: (loading: boolean) => void;
}

const loadingState = create<LoadingState>()(
  persist((set) => ({
    loading: false,

    setLoading: (loading: boolean): void => { set({ loading }); },
  }),
    { name: "loading-store", }
  )
);

export default loadingState;
