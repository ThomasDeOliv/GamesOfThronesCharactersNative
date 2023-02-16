import { useState, useEffect } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import { Character } from '../../models/Character';
import { useNavigate, useParams } from 'react-router-native';
import { useAppDispatch, useAppSelector } from '../../store';
import { updateCharacter } from '../../store/features';

const UpdateCharacter: React.FC<{}> = () => {

    const navigate = useNavigate();
    const [disableRegistration, setDisableRegistration] = useState<boolean>(true);
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [family, setFamily] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>('');
    const dispatch = useAppDispatch();
    const character = useAppSelector(state => state.characterReducer.selectedCharacter);

    useEffect(() => {
        if (character) {
            setFirstName(character.firstName);
            setLastName(character.lastName);
            setTitle(character.title);
            setFamily(character.family);
            setImage(character.image);
            setImageUrl(character.imageUrl);
        }
    }, [character]);

    useEffect(() => {
        if (firstName && lastName && title && family && image && imageUrl) {
            if (firstName.trim() && lastName.trim() && title.trim() && family.trim() && image.trim() && imageUrl.trim()) {
                setDisableRegistration(false);
            } else {
                setDisableRegistration(true);
            }
        } else {
            setDisableRegistration(true);
        }
    }, [firstName, lastName, title, family, image, imageUrl]);

    const pressAddButton = () => {
        const instanciateNewCharacter = (): Promise<Character> => new Promise<Character>((resolve, reject) => {
            try {
                if (character) {
                    if (firstName && lastName && title && family && image && imageUrl) {
                        if (firstName.trim() && lastName.trim() && title.trim() && family.trim() && image.trim() && imageUrl.trim()) {
                            const updatedCharacter = {
                                id: character.id,
                                firstName: firstName.trim(),
                                lastName: lastName.trim(),
                                fullName: `${firstName.trim()} ${lastName.trim()}`,
                                title: title.trim(),
                                family: family.trim(),
                                image: image.trim(),
                                imageUrl: imageUrl.trim()
                            };
                            resolve(updatedCharacter);
                        }
                    }
                }
                throw new Error('Impossible to currently update this character');
            } catch (error) {
                if (error instanceof Error) {
                    reject(error.message);
                }
                else {
                    reject("Unknown error");
                }
            }
        });

        const registerNewCharacter = (updatedCharacter: Character): Promise<number> => new Promise<number>(async (resolve, reject) => {
            try {
                const urlToRequest: string | undefined = process.env.API_URL;
                if (urlToRequest) {
                    const request: RequestInit = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(updatedCharacter)
                    };
                    const response: Response = await fetch(urlToRequest, request);
                    resolve(response.status);
                } else {
                    throw new Error("Cannot find API URL");
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

        instanciateNewCharacter()
            .then((updated) => {
                registerNewCharacter(updated)
                    .then(status => {
                        if (status === 200) {
                            dispatch(updateCharacter(updated));
                            navigate('/');
                        } else {
                            Alert.alert('Erreur pendant l\'enregistrement...');
                        }
                    })
                    .catch((e) => {
                        Alert.alert(e);
                    });
            })
            .catch((e) => {
                Alert.alert(e);
            });
    };

    return (
        <View>
            <Text>Prénom</Text>
            <TextInput value={firstName} onChangeText={(text: string) => setFirstName(text)} />
            <Text>Nom</Text>
            <TextInput value={lastName} onChangeText={(text: string) => setLastName(text)} />
            <Text>Titre</Text>
            <TextInput value={title} onChangeText={(text: string) => setTitle(text)} />
            <Text>Famille</Text>
            <TextInput value={family} onChangeText={(text: string) => setFamily(text)} />
            <Text>Image</Text>
            <TextInput value={image} onChangeText={(text: string) => setImage(text)} />
            <Text>URL de l'image</Text>
            <TextInput value={imageUrl} onChangeText={(text: string) => setImageUrl(text)} />
            <Button title='Enregistrer' onPress={() => pressAddButton()} disabled={disableRegistration} />
        </View>
    );
};

export default UpdateCharacter;