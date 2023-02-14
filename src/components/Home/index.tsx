import { useNavigate } from "react-router-native";
import { Character } from "../../models/Character";
import { CharacterDescription, CharacterImage, CharacterName, CharacterTitle, CharacterView, CustomButton, CustomButtonText, ListPresentation, LoadingText } from "../../styledComponents";

interface HomeProps {
    characters: Array<Character> | undefined
}

const Home: React.FC<HomeProps> = ({ characters }) => {

    const navigate = useNavigate();

    if (characters) {
        return (
            <>
                <ListPresentation>Liste des personnages</ListPresentation>
                {characters.map((c, index) =>
                    <CharacterView key={index}>
                        <CharacterImage source={{ uri: c.imageUrl }} />
                        <CharacterDescription>
                            <CharacterName>{c.fullName}</CharacterName>
                            <CharacterTitle>{c.title}</CharacterTitle>
                            <CustomButton onPress={() => navigate(`/${c.id}`)}>
                                <CustomButtonText>Voir les détails</CustomButtonText>
                            </CustomButton>
                        </CharacterDescription>
                    </CharacterView>
                )}
            </>
        );
    }
    return (
        <LoadingText>Récupération en cours...</LoadingText>
    );
};

export default Home;