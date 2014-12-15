function add(n1 : number, n2 : number) {
    return n1 + n2;
}
console.log(add(1, 2));

function comm_test_add(n1, n2) {
    console.log(add(n1,n2) === add(n2,n1))
}
comm_test_add("a","b");
