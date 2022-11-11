const topScope = Object.create(null);

topScope.true = true;
topScope.false = false;

for (let op of ["+", "-", "*", "/", "==", "<", ">"]) {
        topScope[op] = Function("a, b", `return a ${op} b;`);
    } // will retool this later

topScope.print = (value) => {
    console.log(value);
    return value;
}

function run(program) {
        return evaluate(parse(program), Object.create(topScope));
    }



export default topScope;