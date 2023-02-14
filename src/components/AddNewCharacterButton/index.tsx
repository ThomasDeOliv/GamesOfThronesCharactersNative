import { useLocation, useNavigate } from "react-router-native";
import { AddCharacterButton, AddCharacterButtonText, AddCharacterView } from "../../styledComponents";

const AddNewCharacterButton:React.FC<{}> = () => {

    const navigate = useNavigate();
    const location = useLocation();

    return(
        <AddCharacterView style={{ display: location.pathname === '/' ? 'flex' : 'none' }}>
          <AddCharacterButton>
            <AddCharacterButtonText onPress={() => navigate('/add')}>+ Nouveau personnage</AddCharacterButtonText>
          </AddCharacterButton>
        </AddCharacterView> 
    );
};

export default AddNewCharacterButton;