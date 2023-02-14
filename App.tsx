import { useEffect, useState } from "react";
import { NativeRouter, Routes, Route } from "react-router-native";
import { Character } from "./src/models/Character";
import { CustomScrollView } from "./src/styledComponents";
import CharacterDetails from "./src/components/CharacterDetails";
import Header from "./src/components/CustomeHeader";
import Home from "./src/components/Home";

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
        <Routes>
          <Route path="/" element={<Home characters={getCharacters} />} />
          <Route path="/:id" element={<CharacterDetails />} />
        </Routes>
      </CustomScrollView>
    </NativeRouter>
  );
};

export default AppContent;