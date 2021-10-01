import { createRequire } from "module"; // add the ability to construct the'require' method in js file
const require = createRequire(import.meta.url); // construct the require method 
const fs = require('fs');
let farm = JSON.parse([fs.readFileSync('farm.json', 'utf8')]);

//get two random cows from the farm
let parentCow1 = farm[Math.floor(Math.random() * farm.length)];
let parentCow2 = farm[Math.floor(Math.random() * farm.length)];

//check if the cow is over 1 hour old
function checkAge(cow) {
    //check if the cow is over 1 hour old 
    if (cow.birthdate > (Date.parse(Date())-3600000)) {
        return true;
    } else {
        return false;
    }
}
//check if the cow is the same cow as it's self
function checkSameCow(cow1, cow2) {
    if (cow1.dna=== cow2.dna) {
        return false;
    } else {
        return true;
    }
}
function mixDnaBetweenParents(parent1DNA,parent2DNA){
    //take each index of the parent1DNA and parent2DNA and mix them together
    let newDna = [];
    for (let i = 0; i < parent1DNA.length; i++) {
        if (Math.random() > 0.5) {
            newDna.push( [parent1DNA[i][0], parent2DNA[i][1]].toString().replace(/,/g, ''));
        } else {
            newDna.push([parent2DNA[i][1], parent1DNA[i][0]].toString().replace(/,/g, ''));
        }
    }
    return newDna;
}

let breedCows = (parentCow1, parentCow2) => {

    if (checkAge(parentCow1) && checkAge(parentCow2) && checkSameCow(parentCow1, parentCow2)) {
            let newBabyCow = {
                'dna': mixDnaBetweenParents(parentCow1.dna, parentCow2.dna),
                'birthdate': Date.parse(Date())
            };
        //push baby cow to the farm array
        farm.push(newBabyCow)
        //stringify the farm 
        farm = JSON.stringify(farm, null, "  ");
        //add the new baby cow to the farm
    fs.writeFileSync('farm.json', farm, (err) => { //json stingify's third argument is the indentation for JSON file
            if (err) throw err;
        console.log('The file has been saved in json in farm.json!'); //saves and updates farm.json
        });

        } else{
        return "You can't breed cows that are not over 1 hour old and they cannot be not the same cow";
    }

}
breedCows(parentCow1, parentCow2);





