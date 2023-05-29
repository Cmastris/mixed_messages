/*
Every time a user runs a program, they should get a new, randomized output.
The message that it outputs should be made up of at least three different pieces of data.
*/


// Array of arrays in the form [text (str), sentiment (int; from -2 to 2 inclusive)]
const statementData = [
    ["Life often presents us with challenges, and these are coming your way.", -2],
    ["There are difficult and important choices ahead, so be sure to choose your path carefully.", -2],
    ["Be careful not to spend too much effort on things that don't deserve it.", -1],
    ["Regardless of how life is treating you, remember to be cautious; not everything is what it seems.", -1],
    ["Those you are close to will need your support, but remember to look after yourself too.", -1],
    ["Spontaneity can be a good thing, but be mindful of being too impulsive.", -1],
    ["Don't be afraid to ask questions of yourself and others.", 0],
    ["Try not to be overly critical of yourself; overcoming failure is a part of life.", 0],
    ["Be sure to practice self-care and remember to set healthy boundaries.", 0],
    ["Remember that you are an independent thinker who can be proud of doing things differently to others.", 1],
    ["You possess a great deal of untapped potential, so seize the day!", 1],
    ["Challenges have come your way recently, but the future is looking brighter.", 1],
    ["Acknowledging and accepting your emotions will help you to navigate whatever life throws your way.", 1],
    ["You may find your energy levels improving over the next few days, along with a renewed enthusiasm for life.", 2],
    ["There will be a great opportunity in the days to come, but it may not be obvious so you must seek it out!", 2],
    ["This is a great time to ignite your relationships, both old and new!", 2]
];

const neutralSummaries = [
    "This week will feature difficult moments but joyous ones too.",
    "Like many, this week will have its ups and downs.",
    "The events of this week will be a mixed bag.",
    "This week will be productive but not without its challenges."
];


function statementFactory(statement, sentiment) {
    /* Generate statement objects.
    Params:
        statement (str): the statement text.
        sentiment (int): a representation of how positive/optimistic the statement is.
        -2 is very bad; -1 is bad; 0 is neutral; 1 is positive; 2 is very positive.
    */
    return {
        statement,
        sentiment
    };
}


function getRandIndex(length) {
    /* Randomly choose an array index (int) based on the length of the array.
    Params:
        length (int): the length of the array.
    */
    return Math.floor(Math.random() * length);
}


function chooseStatements(count) {
    /* Randomly choose statements to include in the horoscope,
    generate statement objects, and return them in an array.
    Params:
        count (int): the number of statements to choose.
    */

    // Ensure count isn't greater than total available statements
    const statementCount = statementData.length;
    count = (count > statementCount) ? statementCount : count;

    const indices = [];
    const statements = [];
    while (indices.length < count) {
        let index = getRandIndex(statementCount);
        // Add to arrays if not already present
        if (!indices.includes(index)) {
          indices.push(index);
          let statement_arr = statementData[index];
          statements.push(statementFactory(statement_arr[0], statement_arr[1]));
        }
    }
    return statements;
}


function calculateAvgSentiment(statements) {
    /* Calculate and return the average, rounded sentiment score of an array of statements.
    Params:
        statements (arr of obj): an array of statement objects.
    */
    let totalSentiment = 0;
    statements.forEach(obj => totalSentiment += obj.sentiment);
    
    let avgSentiment = Math.round(totalSentiment / statements.length);
    avgSentiment = (avgSentiment === -0) ? 0 : avgSentiment;  // Fix -0 rounding issue
    return avgSentiment;
}


function generateSummary(sentiment_score) {
    /* Return a sentence (str) that verbalises an average sentiment score,
    i.e. summarises the overall sentiment of multiple statements.
    Params:
        sentiment_score (int): the average, rounded sentiment score of 1 or more statements.
    */
    switch (sentiment_score) {
        case -2:
            return "This could be a very challenging week, but through courage you can overcome it.";
        case -1:
            return "This may be a difficult week, but remember that adversity presents an opportunity for growth.";
        case 0:
            return neutralSummaries[getRandIndex(neutralSummaries.length)];
        case 1:
            return "This week appears promising, so try to make the most of it.";
        case 2:
            return "This should be a very positive week, full of opportunity.";
        default:
            return "This week is shrouded in the fog of uncertainty.";
    }
}


function generateHoroscope(sentence_count) {
    /* Generate and return a random horoscope string containing 2 or more sentences.
    Params:
        sentence_count (int, >= 2): the number of sentences (statements) in the horoscope.
    */
    let statement_objs = chooseStatements(sentence_count - 1);  // Count excluding summary
    let summary = generateSummary(calculateAvgSentiment(statement_objs));
    
    let horoscope = summary + " ";
    statement_objs.forEach(obj => horoscope += obj.statement + " ");
    horoscope = horoscope.substring(0, horoscope.length - 1);  // Remove trailing space
    return horoscope;
}


console.log(generateHoroscope(2));
console.log("");
console.log(generateHoroscope(3));
console.log("");
console.log(generateHoroscope(4));