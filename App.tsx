import { NativeRouter, Routes, Route } from "react-router-native";
import { CustomScrollView } from "./src/styledComponents";
import { Provider } from "react-redux";
import Header from "./src/components/CustomeHeader";
import Home from "./src/components/Home";
import UpdateCharacter from "./src/components/UpdateCharacter";
import CharacterDetails from "./src/components/CharacterDetails";
import store from "./src/store";

const AppContent = () => {

  return (
    <Provider store={store}>
      <NativeRouter>
        <Header />
        <CustomScrollView>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/update" element={<UpdateCharacter />} />
            <Route path="/:id" element={<CharacterDetails />} />
          </Routes>
        </CustomScrollView>
      </NativeRouter>
    </Provider>
  );
};

export default AppContent;