/*
Every time a user runs a program, they should get a new, randomized output.
The message that it outputs should be made up of at least three different pieces of data.
*/


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

