import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { DetailsCharacterImage, LoadingText, DetailsCharacterFullName, DetailsCharacterField, UpdateCharacterView, UpdateCharacterButton, UpdateCharacterButtonText } from "../../styledComponents";
import { useNavigate, useParams } from "react-router-native";
import { selectCharacter } from "../../store/features";
import { View } from "react-native";

const CharacterDetails: React.FC<{}> = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const character = useAppSelector(state => state.characterReducer.selectedCharacter);

    useEffect(() => {
        if (id) {
            if (!isNaN(parseInt(id))) {
                dispatch(selectCharacter({ id: parseInt(id) }));
            }
        }
    }, [id]);

    if (character) {
        return (
            <View>
                <View>
                    <DetailsCharacterFullName>{character.fullName}</DetailsCharacterFullName>
                    <DetailsCharacterImage source={{ uri: character.imageUrl }} />
                    <DetailsCharacterField>Numéro d'identifiant : {character.id}</DetailsCharacterField>
                    <DetailsCharacterField>Titre : {character.title}</DetailsCharacterField>
                    <DetailsCharacterField>Famille : {character.family}</DetailsCharacterField>
                </View>
                <UpdateCharacterView>
                    <UpdateCharacterButton onPress={() => navigate('/update')}>
                        <UpdateCharacterButtonText>Modifier</UpdateCharacterButtonText>
                    </UpdateCharacterButton>
                </UpdateCharacterView>
            </View>
        );
    } else {
        return (
            <>
                <LoadingText>Personnage en cours de récupération...</LoadingText>
            </>
        );
    }
};

export default CharacterDetails;