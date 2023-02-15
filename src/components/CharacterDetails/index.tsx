import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { DetailsCharacterImage, LoadingText, DetailsCharacterFullName, DetailsCharacterField } from "../../styledComponents";
import { useParams } from "react-router-native";
import { selectCharacter } from "../../store/features";

const CharacterDetails: React.FC<{}> = () => {

    const { id } = useParams();
    const dispatch = useAppDispatch();
    const character = useAppSelector(state => state.characterReducer.selectedCharacter);

    useEffect(() => {
        if(id) {
            if(!isNaN(parseInt(id))) {
                const query = dispatch(selectCharacter({id: parseInt(id)}));
            }
        }
    }, [id]);

    if (character) {
        return (
            <>
                <DetailsCharacterFullName>{character.fullName}</DetailsCharacterFullName>
                <DetailsCharacterImage source={{ uri: character.imageUrl }} />
                <DetailsCharacterField>Numéro d'identifiant : {character.id}</DetailsCharacterField>
                <DetailsCharacterField>Titre : {character.title}</DetailsCharacterField>
                <DetailsCharacterField>Famille : {character.family}</DetailsCharacterField>
            </>
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