import { useEffect, useState } from "react";
import { NativeRouter, Routes, Route } from "react-router-native";
import { Character } from "./src/models/Character";
import { CustomScrollView } from "./src/styledComponents";
import Header from "./src/components/CustomeHeader";
import AddNewCharacterButton from "./src/components/AddNewCharacterButton";
import Home from "./src/components/Home";
import AddNewCharacter from "./src/components/AddNewCharacter";
import CharacterDetails from "./src/components/CharacterDetails";
import { Provider } from "react-redux";
import store from "./src/store";
import { getAllCharacters } from "./src/store/actions";

const AppContent = () => {

  const [getCharacters, setCharacters] = useState<Character[] | undefined>();

  useEffect(() => {
    getAllCharacters()
      .then((c) => {
        if (c != null) {
          setCharacters(c);
        }
      });
  }, []);

  return (
    <Provider store={store}>
      <NativeRouter>
        <Header />
        <CustomScrollView>
          <AddNewCharacterButton />
          <Routes>
            <Route path="/" element={<Home characters={getCharacters} />} />
            <Route path="/add" element={<AddNewCharacter />} />
            <Route path="/:id" element={<CharacterDetails />} />
          </Routes>
        </CustomScrollView>
      </NativeRouter>
    </Provider>
  );
};

export default AppContent;