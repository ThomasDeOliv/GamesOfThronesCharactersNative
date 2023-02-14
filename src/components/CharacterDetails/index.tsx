import { Character } from "../../models/Character";
import { DetailsCharacterImage, LoadingText, DetailsCharacterFullName, DetailsCharacterField } from "../../styledComponents";
import { useEffect, useState } from "react";
import { Text } from 'react-native';
import { useParams } from "react-router-native";

const CharacterDetails: React.FC<{}> = () => {

    const { id } = useParams();
    const [getSelectedCharacter, setSelectedCharacter] = useState<Character | undefined>();

    useEffect(() => {

        const getCharacterDetails = async () => {
            const urlToRequest: string | undefined = process.env.API_URL + '/' + id;
            if (urlToRequest) {
                const response: Response = await fetch(urlToRequest, { method: 'GET' });
                const charachterJson: Character = await response.json();
                setSelectedCharacter(charachterJson);
            }
        };

        getCharacterDetails();

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