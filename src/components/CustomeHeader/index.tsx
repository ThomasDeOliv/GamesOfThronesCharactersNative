import { useLocation, useNavigate } from "react-router-native";
import { AppTitle, CustomHeader, EmptyElement, ReturnHomeButton, ReturnHomeButtonText } from "../../styledComponents";

const Header = () => {

    const location = useLocation();
    const navigate = useNavigate();

    return (
        <CustomHeader>
            <ReturnHomeButton style={{ opacity: location.pathname === '/' ? 0 : 0.6 }} disabled={location.pathname === '/'} onPress={() => navigate('/')}>
                <ReturnHomeButtonText>{'←'}</ReturnHomeButtonText>
            </ReturnHomeButton>
            <AppTitle>GOT Characters</AppTitle>
            <EmptyElement />
        </CustomHeader>
    );
};

export default Header;