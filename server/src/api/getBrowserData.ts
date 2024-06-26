import axios from "axios";

const SearchLinks = async (question: string) => {

  const key = process.env.VITE_GOOGLE_SEARCH_API_KEY;
  const browserEngineId = process.env.VITE_BROWSER_ENGINE_ID;
  const url = `https://www.googleapis.com/customsearch/v1?key=${key}&cx=${browserEngineId}&q=${question}`;

  try{
    const response = await axios.get(url)
    console.log(response.data.items[0].link)
    return response.data.items

  } catch (error) {
    console.log(error);
  }
}

export default SearchLinks;