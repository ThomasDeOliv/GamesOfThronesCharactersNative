import styled from 'styled-components/native';

export interface Character {
    id: number,
    firstName: string,
    lastName: string,
    fullName: string,
    title: string,
    family: string,
    image: string,
    imageUrl: string
};

export const CustomScrollView = styled.ScrollView`
    height: 100%;
    width: 100%;
`;

export const CustomHeader = styled.View`
    height: 67px;
    background-color: dodgerblue;
    margin-bottom:20px;
    display:flex;
    align-items: center;
    justify-content: center;
`;

export const AppTitle = styled.Text`
    color: white;
    font-size: 25px;
    font-weight: bold;
`;

export const ListPresentation = styled.Text`
    color: black;
    font-size: 20px;
    font-weight: bold;
    margin: 0 auto;
`;

export const CharacterView = styled.View`
    margin: 5px auto;
    border: 1px solid black;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    width: 95%;
    height: 200px
`;

export const CharacterImage = styled.Image`
    width: 30%;
    height: 90%;
    margin: 10px;
`;

export const CharacterDescription = styled.View`    
    width: 70%;
    margin: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

export const CharacterName = styled.Text`    
    font-weight: bold;
    font-size: 25px;
    width: 100%;
`;

export const CharacterTitle = styled.Text`    
    font-style: italic;
    font-size: 20px;
    width: 90%;
    overflow-wrap: break-word;
`;

export const CustomButton = styled.TouchableOpacity`
    background-color: dodgerblue;
    width: 50%;
    padding: 10px;
    border-radius: 10px;
    display: flex;
    align-items: center;
`;

export const CustomButtonText = styled.Text`
    color: white;
    font-weight: bold;
`;

export const LoadingText = styled.Text`
    font-style: italic;
    font-size: 20px;
    width: 90%;
`;