import evaluate from "../egg/evaluator.js";
import { parse, parseApply, parseExpressionType, skipSpace } from '../egg/parser.js';
import topScope from '../egg/topScope.js';



let prog = parse(`if(true, false, true)`);
console.log(evaluate(prog, topScope));