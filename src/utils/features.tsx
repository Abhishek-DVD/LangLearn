import axios from "axios";
import { generate } from "random-words";
import _ from 'lodash';

const generateMcq = (meaning:{
  text:string;
}[],idx:number):string[] => {
  
  const correctAns:string = meaning[idx].text;
 
  //An array with all words except for correct ans.
  const allMeaningExceptForCorrect = meaning.filter(
    (i) => i.text !== correctAns
  )
 
  //randomly generating three elements from incorrectArray
  const incorrectOptions:string[] = _.sampleSize(allMeaningExceptForCorrect,3).map((i) => i.text);

  const mcqOptions = _.shuffle([...incorrectOptions,correctAns]);
   
  return mcqOptions;
}

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
      const options : string[] = generateMcq(words,idx);

        return{
            word:i.translations[0].text,
            meaning:words[idx].text,
            options,
        }
    })
    return arr;

  } catch (error: any) {
    console.error("Translation error:", error?.response?.data || error.message);
    throw new Error("Some Error");
  }
};

//count matching
export const countMatchingElements = (arr1:string[],arr2:string[]):number => {
  
  if(arr1.length!==arr2.length){
    throw new Error("Arrays are not equal");
  }

  let matchedCount = 0;

  for(let i=0;i<arr1.length;i++){
    if(arr1[i]===arr2[i]){
      matchedCount++;
    }
  }

  return matchedCount;
}
