function parseExpression( program ){
    program = skipSpace( program );
    let match, expr;
    if ( match = /^"([^"]*)")/.exec( program )){ // Strings
        expr = { type: "value", value: match[1] };
    } else if ( match = /^\d+\b/.exec( program )) { // Digits and word boundaries
        expr = { type: "value", value: Number(match[0]) };
    } else if ( match = /^[^\s(),#"]+/.exec( program )) { // Words (operators)
        expr = { type: "word", name: match[0] };
    } else {
        throw new SyntaxError("Unexpected Syntax: " + program);
    }

    return parseApply(expr, program.slice(match[0].length));
} 

function skipSpace(string) {
    let first = string.search(/\S/);
    if (first == -1) return "";
    return string.slice(first);
}