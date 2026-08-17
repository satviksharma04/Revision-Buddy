import cleanJSON from "./jsonCleaner.js";

const parseAIResponse = (response) => {

    try {

        const cleaned = cleanJSON(response);

        return JSON.parse(cleaned);

    } catch (error) {

        throw new Error("Invalid AI Response");

    }

};

export default parseAIResponse;