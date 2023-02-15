import { useState, useEffect } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import { Character } from '../../models/Character';
import { useNavigate } from 'react-router-native';
import { useAppDispatch } from '../../store';
import { addCharacter } from '../../store/features';

const AddNewCharacter: React.FC<{}> = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [family, setFamily] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>('');
    const [disableRegistration, setDisableRegistration] = useState<boolean>(true);

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
                if (firstName && lastName && title && family && image && imageUrl) {
                    if (firstName.trim() && lastName.trim() && title.trim() && family.trim() && image.trim() && imageUrl.trim()) {
                        const newCharacter = {
                            id: 0,
                            firstName: firstName.trim(),
                            lastName: lastName.trim(),
                            fullName: `${firstName.trim()} ${lastName.trim()}`,
                            title: title.trim(),
                            family: family.trim(),
                            image: image.trim(),
                            imageUrl: imageUrl.trim()
                        };
                        resolve(newCharacter);
                    }
                }
                throw new Error('Impossible to currently create a new user');
            } catch (error) {
                if (error instanceof Error) {
                    reject(error.message);
                }
                else {
                    reject("Unknown error");
                }
            }
        });

        const registerNewCharacter = (newCharacter: Character): Promise<Character> => new Promise<Character>(async (resolve, reject) => {
            try {
                const urlToRequest: string | undefined = process.env.API_URL;
                if (urlToRequest) {
                    const newCharacterJSON: string = JSON.stringify(newCharacter);
                    const headers: RequestInit = {
                        method: 'POST',
                        body: newCharacterJSON
                    };
                    const response: Response = await fetch(urlToRequest, headers);
                    if (response.ok) {
                        const data: Character = await response.json();
                        resolve(data);
                    } else {                        
                        throw new Error("Bad response : " + response.status + newCharacterJSON);
                    }
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
            .then((i) => {
                registerNewCharacter(i)
                    .then(c => {
                        dispatch(addCharacter(c));
                        navigate('/');
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
            <TextInput onChangeText={(text: string) => setFirstName(text)} />
            <Text>Nom</Text>
            <TextInput onChangeText={(text: string) => setLastName(text)} />
            <Text>Titre</Text>
            <TextInput onChangeText={(text: string) => setTitle(text)} />
            <Text>Famille</Text>
            <TextInput onChangeText={(text: string) => setFamily(text)} />
            <Text>Image</Text>
            <TextInput onChangeText={(text: string) => setImage(text)} />
            <Text>URL de l'image</Text>
            <TextInput onChangeText={(text: string) => setImageUrl(text)} />
            <Button title='Ajouter' onPress={() => pressAddButton()} disabled={disableRegistration} />
        </View>
    );
};

export default AddNewCharacter;