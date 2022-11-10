import evaluate from "./evaluator";

const specialForms = Object.create(null); // this will include our various functions
// down the road;


specialForms.if = (args, scope) => {
    if (args.length != 3) {
        throw new SyntaxError('Wrong number of arguments to if.')
    } else if (evaluate(args[0], scope) !== false) {
        return evaluate(args[1], scope);
    } else {
        
    }
};







export default specialForms;