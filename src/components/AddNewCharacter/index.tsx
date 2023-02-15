import { useState, useEffect } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { Character } from '../../models/Character';
import { useNavigate } from 'react-router-native';
import { registerNewCharacter } from '../../store/actions';

const AddNewCharacter: React.FC<{}> = () => {

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [family, setFamily] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>('');
    const [newCharacter, setNewCharacter] = useState<Character | undefined>();
    const [disableRegistration, setDisableRegistration] = useState<boolean>(true);

    const instanciateNewUser: () => Character | null = () => {
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
                return newCharacter
            }
        }
        return null;
    };

    const pressAddButton = () => {
        const character = instanciateNewUser();
        setNewCharacter(newCharacter);
        registerNewCharacter(newCharacter)
            .then((newCharacter: Character | null) => {
                if (newCharacter) {
                    navigate('/')
                }
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