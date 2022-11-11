import evaluate from "../egg/evaluator.js";
import { parse, parseApply, parseExpressionType, skipSpace } from '../egg/parser.js';
import topScope from '../egg/topScope.js';

const run = (program) => {
    return evaluate(parse(program), Object.create(topScope));
}


let prog = parse(`if(true, false, true)`);
console.log(evaluate(prog, topScope));

run(`
    do(define(total, 0),
    define(count, 1),
    while(<(count, 11),
            do(define(total, +(total, count)),
                define(count, +(count, 1)))),
    print(total))
`);

run(`
do(define(plusOne, fun(a, +(a, 1))),
   print(plusOne(10)))
`);