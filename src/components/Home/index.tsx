import { useNavigate } from "react-router-native";
import { CharacterDescription, CharacterImage, CharacterName, CharacterTitle, CharacterView, CustomButton, CustomButtonText, ListPresentation, LoadingText } from "../../styledComponents";
import { useEffect } from "react";
import { Character } from "../../models/Character";
import { useAppDispatch, useAppSelector } from "../../store";
import { loadCharacters } from "../../store/features";
import { Alert } from "react-native";

const Home = () => {

    const dispatch = useAppDispatch();
    const characters = useAppSelector(state => state.characterReducer.characters);
    const navigate = useNavigate();

    useEffect(() => {
        const getAllCharacters = (): Promise<Array<Character>> => new Promise<Array<Character>>(async (resolve, reject) => {
            const urlToRequest: string | undefined = process.env.API_URL;
            try {
                if (urlToRequest) {
                    const headers: RequestInit = {
                        method: 'GET',
                    };
                    const response: Response = await fetch(urlToRequest, headers);
                    if (response.ok) {
                        const charachters: Character[] = await response.json();
                        resolve(charachters);
                    } else {
                        throw new Error("Bad response : " + response.status);
                    }
                } else {
                    throw new Error("Invalid API URL");
                }
            } catch (error) {
                if (error instanceof Error) {
                    reject(error.message);
                }
                else {
                    reject("Unknown error");
                }
            }
        });

        if(characters.length === 0) {
            getAllCharacters()
            .then(list => dispatch(loadCharacters(list)))
            .catch((e) => Alert.alert(e));
        }

    }, [characters]);

    if (characters) {
        return (
            <>
                <ListPresentation>Liste des personnages</ListPresentation>
                {characters.map((c) =>
                    <CharacterView key={c.id}>
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