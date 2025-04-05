import axios from "axios";
import { generate } from "random-words";

export const translateWords = async (lang: LangType):Promise<WordType[]> => {
  try {
    // Ensure generate returns string[]
    const words = (generate(8) as string[]).map((word) => ({
      text: word,
    }));

    const response = await axios.post(
      "https://microsoft-translator-text-api3.p.rapidapi.com/translate",
      words, // Body
      {
        params: {
          to: lang,
          from: 'en',
          textType: 'plain',
        },
        headers: {
          'x-rapidapi-key': '71532fefbbmshf563c59173bc15dp113810jsnd49bf6fefbf2',
          'x-rapidapi-host': 'microsoft-translator-text-api3.p.rapidapi.com',
          'Content-Type': 'application/json',
        },
      }
    );
    
    const received:FetchedDataType[] = response.data;

    const arr:WordType[] = received.map((i,idx) => {
        return{
            word:i.translations[0].text,
            meaning:words[idx].text,
            options:["asd"]
        }
    })
    return arr;

  } catch (error: any) {
    console.error("Translation error:", error?.response?.data || error.message);
    throw new Error("Some Error");
  }
};
