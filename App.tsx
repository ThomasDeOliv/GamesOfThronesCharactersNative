import { NativeRouter, Routes, Route } from "react-router-native";
import { CustomScrollView } from "./src/styledComponents";
import { Provider } from "react-redux";
import Header from "./src/components/CustomeHeader";
import AddNewCharacterButton from "./src/components/AddNewCharacterButton";
import Home from "./src/components/Home";
import AddNewCharacter from "./src/components/AddNewCharacter";
import CharacterDetails from "./src/components/CharacterDetails";
import store from "./src/store";

const AppContent = () => {

  return (
    <Provider store={store}>
      <NativeRouter>
        <Header />
        <CustomScrollView>
          <AddNewCharacterButton />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddNewCharacter />} />
            <Route path="/:id" element={<CharacterDetails />} />
          </Routes>
        </CustomScrollView>
      </NativeRouter>
    </Provider>
  );
};

export default AppContent;