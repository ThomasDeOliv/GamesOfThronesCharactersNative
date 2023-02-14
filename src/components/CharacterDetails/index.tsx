import { useEffect, useState } from "react";
import { Character, LoadingText } from "../..";
import { Text, Image, View, Button } from 'react-native';
import { useNavigate, useParams } from "react-router-native";

const CharacterDetails: React.FC<{}> = () => {

    const navigate = useNavigate();

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
                <View>
                    <Text>{getSelectedCharacter.fullName}</Text>
                </View>
                <Image source={{ uri: getSelectedCharacter.imageUrl }} style={{ height: 200, width: 200 }} />
                <Text>{getSelectedCharacter.id}</Text>
                <Text>{getSelectedCharacter.title}</Text>
                <Button title="Retour" onPress={() => navigate('/')} />
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