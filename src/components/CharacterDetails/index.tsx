import { useEffect, useState } from "react";
import { Character, DetailsCharacterImage, LoadingText, Title } from "../../styledComponents";
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
                <Title>{getSelectedCharacter.fullName}</Title>
                <DetailsCharacterImage source={{ uri: getSelectedCharacter.imageUrl }} />
                <Text>{getSelectedCharacter.id}</Text>
                <Text>{getSelectedCharacter.title}</Text>
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