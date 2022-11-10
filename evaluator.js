import { parse, parseApply, parseExpressionType, skipSpace } from '../egg/parser.js';
import specialForms from './specialForms.js';

function evaluate(expr, scope) {
    if (expr.type == "value") { // If it's just a value, no change
        return expr.value;
    } else if (expr.type == "word") { // if expression is a binding, search the 
        // scope to see if that binding is in the environment
        // if yes, return the value of the binding
        if (expr.name in scope) {
            return scope[expr.name];
        } else { // if not, throw an error
            throw new ReferenceError(`Undefined binding: ${expr.name}`);
            }
    } else if (expr.type == "apply") { // if an operator - 
        let {operator, args} = expr; // Object deconstruction
        if (operator.type == "word" && operator.name in specialForms) {
            return specialForms[operator.name](expr.args, scope);
        } else {
            let op = evaluate(operator, scope);
            if (typeof op == "function") {
                return op(...args.map(arg => evaluate(arg, scope)));
            } else {
                throw new TypeError("Applying a non-function.");
            }
        }
    }
}

export default evaluate;