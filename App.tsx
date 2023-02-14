import Home from "./src/components/Home";
import { useEffect, useState } from "react";
import { NativeRouter, Route, Routes } from "react-router-native";
import { AppTitle, Character, CustomHeader, CustomScrollView } from "./src";
import CharacterDetails from "./src/components/CharacterDetails";
import { Text } from "react-native";

const App = () => {

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
    <CustomScrollView>
      <CustomHeader>
        <AppTitle>GOT Characters</AppTitle>
      </CustomHeader>
      <NativeRouter>
        <Routes>
          <Route path="/" element={<Home characters={getCharacters} />} />
          <Route path="/:id" element={<CharacterDetails />} />
        </Routes>
      </NativeRouter>
    </CustomScrollView>
  );
};

export default App;
