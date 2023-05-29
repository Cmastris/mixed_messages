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