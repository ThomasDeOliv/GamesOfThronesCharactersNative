import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Character } from "../../models/Character";

interface CharacterState {
    characters: Array<Character>,
    selectedCharacter: Character | null
}

const initialState: CharacterState = {
    characters: new Array<Character>,
    selectedCharacter: null
}

export const CharacterSlice = createSlice({
    name: "character",
    initialState,
    reducers: {
        updateCharacter: (state, action: PayloadAction<Character>) => {
            state.characters.map(c => {
                if (c.id == action.payload.id) {
                    c.lastName = action.payload.lastName;
                    c.firstName = action.payload.firstName;
                    c.fullName = action.payload.fullName;
                    c.family = action.payload.family;
                    c.title = action.payload.title;
                    c.image = action.payload.image;
                    c.imageUrl = action.payload.imageUrl;
                }
            });
        },
        selectCharacter: (state, action: PayloadAction<{ id: number }>) => {
            const query = state.characters.find(c => c.id === action.payload.id);

            if (query) {
                state.selectedCharacter = query;
            } else {
                state.selectedCharacter = null;
            }
        },
        loadCharacters: (state, action: PayloadAction<Character[]>) => {
            action.payload.map(c => {
                const check = state.characters.find(character => character.id === c.id);
                if (!check) {
                    state.characters.push(c);
                }
            });
        }
    }
});

export default CharacterSlice.reducer;
export const { updateCharacter, selectCharacter, loadCharacters } = CharacterSlice.actions;