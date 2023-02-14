import styled from 'styled-components/native';

export const CustomHeader = styled.View`
    height: 10%;
    background-color: dodgerblue;
    display:flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const AppTitle = styled.Text`
    color: white;
    font-size: 25px;
    font-weight: bold;
`;

export const ReturnHomeButton = styled.TouchableOpacity`
    display:flex;
    border-radius: 50px;
    margin: 0 0 0 30px;
    width: 50px;
    height: 50px;
    align-items: center;
`;

export const EmptyElement = styled.View`
    width: 50px;
    margin: 0 30px 0 0;
`;

export const ReturnHomeButtonText = styled.Text`
    font-size: 30px;
    font-weight: bolder;
    color: white;
`;

export const CustomScrollView = styled.ScrollView`
    max-height:90%;    
    min-width: 100%;
    max-width: 100%;
`;

export const ListPresentation = styled.Text`
    color: black;
    font-size: 20px;
    font-weight: bold;
    margin: 20px auto 0 auto;
`;

export const CharacterView = styled.View`
    margin: 5px auto;
    border: 1px solid black;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    width: 95%;
    height: 200px;
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

export const DetailsCharacterFullName = styled.Text`
    font-size: 50px;
    font-weight: bolder;
    margin: 20px auto 0 auto;
`;

export const DetailsCharacterImage = styled.Image`
    height: 500px;
    width: 500px;
    margin: 10px auto;
`;

export const DetailsCharacterField = styled.Text`
    font-size: 20px;
    font-weight: normal;
    margin: 0 auto;
`;