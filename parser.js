function parseExpression ( program ){
    program = skipSpace( program );
    let match, expr;
    if ( match = /^"([^"]*)"/.exec( program )){ // Strings
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

function skipSpace (string) {
    let first = string.search(/\S/);
    if (first == -1) return "";
    return string.slice(first);
}

function parseApply (expr, program) {
    program = skipSpace( program );
    if (program[0] != "(") { // If the next character here isn't a parenthesis, 
        // then it isn't an application (nothing is being called) so it just returns
        return { expr: expr, rest: program }
    }

    program = skipSpace( program.slice(1) );
    expr = { type: "apply", operator: expr, args: [] }
    while ( program[0] != ")" ) {
        let arg = parseExpression(program); // Recursive! Since parseExpression 
        //calls parseApply. "Indirect recursion"
        expr.args.push(arg.expr);
        program = skipSpace(arg.rest);
        if (program[0] == ",") {
            program = skipSpace(program.slice(1));
        } else if (program[0] != ")") {
            throw new SyntaxError("Expected ',' or ')'");
        }
    }
    return parseApply(expr, program.slice(1)) // recursive!
}

function parse(program) {
    let {expr, rest} = parseExpression(program);
    if (skipSpace(rest).length > 0) {
      throw new SyntaxError("Unexpected text after program");
    }
    return expr;
  }

console.log(parse("+(a, 10)"));

