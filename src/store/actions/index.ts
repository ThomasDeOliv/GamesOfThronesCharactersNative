import { Character } from "../../models/Character";

export const getAllCharacters: () => Promise<Array<Character> | null> = async () => {
    const urlToRequest: string | undefined = process.env.API_URL;
    if (urlToRequest) {
        const headers: RequestInit = {
            method: 'GET',
        };
        const response: Response = await fetch(urlToRequest, headers);
        try {
            if (response.ok) {
                const charachters: Character[] = await response.json();
                return charachters;
            }
        } catch {
            return null;
        }
    }
    return null;
};

export const getCharacterDetails: (id: string | undefined) => Promise<Character | null> = async (id) => {
    if (id) {
        if (!isNaN(Number.parseInt(id))) {
            const urlToRequest: string | undefined = process.env.API_URL + '/' + id;
            if (urlToRequest) {
                const headers: RequestInit = {
                    method: 'GET',
                };
                const response: Response = await fetch(urlToRequest, headers);
                try {
                    if (response.ok) {
                        const charachter: Character = await response.json();
                        return charachter;
                    }
                } catch {
                    return null;
                }
            }
        }
    }
    return null;
};

export const registerNewCharacter: (newCharacter: Character | undefined) => Promise<Character | null> = async (newCharacter) => {
    const urlToRequest: string | undefined = process.env.API_URL;
    if (urlToRequest && newCharacter) {
        const newCharacterJSON: string = JSON.stringify(newCharacter);
        const headers: RequestInit = {
            method: 'POST',
            body: newCharacterJSON
        };
        try {
            const response: Response = await fetch(urlToRequest, headers);
            if (response.ok) {
                const data: Character = await response.json();
                return data;
            }
        } catch {
            return null;
        }
    }
    return null;
};