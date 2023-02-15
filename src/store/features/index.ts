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
        addCharacter: (state, action: PayloadAction<Character>) => {
            state.characters.push({
                id: action.payload.id,
                lastName: action.payload.lastName,
                firstName: action.payload.firstName,
                fullName: action.payload.fullName,
                family: action.payload.family,
                image: action.payload.image,
                imageUrl: action.payload.imageUrl,
                title: action.payload.title
            })
        },
        selectCharacter: (state, action: PayloadAction<{id: number}>) => {
            const query = state.characters.find(c => c.id === action.payload.id);

            if(query) {
                state.selectedCharacter = query;
            } else {
                state.selectedCharacter = null;
            }
        },
        loadCharacters: (state, action:PayloadAction<Character[]>) => {
            action.payload.map(c => {
                const check = state.characters.find(character => character.id === c.id);
                if(!check) {
                    state.characters.push(c);
                }
            });
        }
    }
});

export default CharacterSlice.reducer;
export const { addCharacter, selectCharacter, loadCharacters } = CharacterSlice.actions;