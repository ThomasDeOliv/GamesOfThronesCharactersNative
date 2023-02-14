import { useState, useEffect } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { Character } from '../../models/Character';
import { useNavigate } from 'react-router-native';

const AddNewCharacter:React.FC<{}> = () => {

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [family, setFamily] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>('');
    const [newCharacter, setNewCharacter] = useState<Character | null>();
    const [disableRegistration, setDisableRegistration] = useState<boolean>(true);

    useEffect(() => {

        if(firstName && lastName && title && family && image && imageUrl) {
            if(firstName.trim() && lastName.trim() && title.trim() && family.trim() && image.trim() && imageUrl.trim()) {
                setNewCharacter({
                    id: 0,
                    firstName: firstName.trim(),
                    lastName: lastName.trim(),
                    fullName: `${firstName.trim()} ${lastName.trim()}`, 
                    title: title.trim(),
                    family: family.trim(),
                    image: image.trim(),
                    imageUrl: imageUrl.trim()
                });
                setDisableRegistration(false);
            } else {
                setNewCharacter(null);
                setDisableRegistration(true);
            }
        } else {
            setNewCharacter(null);
            setDisableRegistration(true);
        }

    }, [firstName, lastName, title, family, image, imageUrl]);

    const pressAddButton = () => {
        const registerNewCharacter: () => Promise<Character | null> = async() => {
            const urlToRequest: string | undefined = process.env.API_URL;
            if(urlToRequest) {            
                const newCharacterJSON: string = JSON.stringify(newCharacter);
                const headers: RequestInit = {
                    method: 'POST',
                    body: newCharacterJSON
                };
                const response: Response = await fetch(urlToRequest, headers);
                const data: Character = await response.json();
                return data;
            }
    
            return null;
        };

        registerNewCharacter()
            .then((newCharacter: Character | null) => {
                if(newCharacter) {
                    navigate('/')
                }
            });
    };

    return(
        <View>
            <Text>Prénom</Text>
            <TextInput onChangeText={(text: string) => setFirstName(text)}/>
            <Text>Nom</Text>
            <TextInput onChangeText={(text: string) => setLastName(text)}/>
            <Text>Titre</Text>
            <TextInput onChangeText={(text: string) => setTitle(text)}/>
            <Text>Famille</Text>
            <TextInput onChangeText={(text: string) => setFamily(text)}/>
            <Text>Image</Text>
            <TextInput onChangeText={(text: string) => setImage(text)}/>
            <Text>URL de l'image</Text>
            <TextInput onChangeText={(text: string) => setImageUrl(text)}/>
            <Button title='Ajouter' onPress={() => pressAddButton()} disabled={disableRegistration}/>
        </View> 
    );
};

export default AddNewCharacter;