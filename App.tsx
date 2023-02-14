import { useEffect, useState } from "react";
import { NativeRouter, Routes, Route } from "react-router-native";
import { Character } from "./src/models/Character";
import { CustomScrollView } from "./src/styledComponents";
import Header from "./src/components/CustomeHeader";
import AddNewCharacterButton from "./src/components/AddNewCharacterButton";
import Home from "./src/components/Home";
import AddNewCharacter from "./src/components/AddNewCharacter";
import CharacterDetails from "./src/components/CharacterDetails";

const AppContent = () => {

  const [getCharacters, setCharacters] = useState<Character[] | undefined>();

  useEffect(() => {
    const getAllCharacters = async () => {
      const urlToRequest: string | undefined = process.env.API_URL;
      if (urlToRequest) {
        const response: Response = await fetch(urlToRequest, { method: 'GET' });
        const charachtersJson: Character[] = await response.json();
        setCharacters(charachtersJson);
      }
    };
    getAllCharacters();
  }, []);

  return (
    <NativeRouter>
      <Header />  
      <CustomScrollView>
        <AddNewCharacterButton/>
        <Routes>
          <Route path="/" element={<Home characters={getCharacters} />} />
          <Route path="/add" element={<AddNewCharacter />} />
          <Route path="/:id" element={<CharacterDetails />} />
        </Routes>
      </CustomScrollView>   
    </NativeRouter>
  );
};

export default AppContent;