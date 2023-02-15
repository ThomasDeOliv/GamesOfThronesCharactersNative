import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { CharacterSlice } from './features';

const store = configureStore({
    reducer: {
        characterReducer: CharacterSlice.reducer
    }
});

export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();

export default store;