import { Character } from "../../models/Character";
import { getCharacterDetails } from "../../store/actions";
import { DetailsCharacterImage, LoadingText, DetailsCharacterFullName, DetailsCharacterField } from "../../styledComponents";
import { useEffect, useState } from "react";
import { useParams } from "react-router-native";

const CharacterDetails: React.FC<{}> = () => {

    const { id } = useParams();
    const [getSelectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

    useEffect(() => {
        getCharacterDetails(id)
            .then((charachter) => setSelectedCharacter(charachter))
            .catch(() => setSelectedCharacter(null));

    }, [id]);

    if (getSelectedCharacter) {
        return (
            <>
                <DetailsCharacterFullName>{getSelectedCharacter.fullName}</DetailsCharacterFullName>
                <DetailsCharacterImage source={{ uri: getSelectedCharacter.imageUrl }} />
                <DetailsCharacterField>Numéro d'identifiant : {getSelectedCharacter.id}</DetailsCharacterField>
                <DetailsCharacterField>Titre : {getSelectedCharacter.title}</DetailsCharacterField>
                <DetailsCharacterField>Famille : {getSelectedCharacter.family}</DetailsCharacterField>
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