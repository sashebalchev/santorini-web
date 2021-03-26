import { createSlice, PayloadAction } from "@reduxjs/toolkit";
enum GameStates {
  SetStartPosition,
  SelectPawn,
  MovePawn,
  BuildStructure
}
// Define a type for the slice state
interface CurrentGameState {
  value: GameStates;
}
// Define the initial state using that type
const initialState: CurrentGameState = { value: GameStates.SetStartPosition };

export const gameStateSlice = createSlice({
  name: "gameState",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setGameState: (state, action: PayloadAction<GameStates>) => {
        console.log("IN REDUCER");
        
      state.value = action.payload;
    }
  }
});

export const { setGameState } = gameStateSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default gameStateSlice.reducer;
