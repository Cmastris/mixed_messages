/*
Every time a user runs a program, they should get a new, randomized output.
The message that it outputs should be made up of at least three different pieces of data.
*/

const statementData = [
    ["This is very negative.", -2],
    ["This is negative.", -1],
    ["This is neutral.", 0],
    ["This is positive.", 1],
    ["This is very positive.", 2]
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
            return "This week will feature difficult moments but joyous ones too.";
        case 1:
            return "This week appears promising, so try to make the most of it.";
        case 2:
            return "This should be a very positive week, full of opportunity.";
        default:
            return "This week is shrouded in the fog of uncertainty.";
    }
}


function generateHoroscope(sentence_count) {
    /* Generate and return a random horoscope string containing 1 or more sentences.
    Params:
        sentence_count (int): the number of sentences (statements) in the horoscope.
    */
    let horoscope = "";
    let statement_objs = chooseStatements(sentence_count);

    statement_objs.forEach(obj => horoscope += obj.statement + " ");
    horoscope = horoscope.substring(0, horoscope.length - 1);  // Remove trailing space
    return horoscope;
}


console.log(generateHoroscope(4));