const uuidv4 = require('uuid/v4');
let dB = require('./data');

//Gets all rhinos in database. User can pass in optional parameters to filter by species or name.
exports.getAll = (data) => {
  let speciesQuery = data.species ? data.species : null;
  let nameQuery = data.name ? data.name : null;

  if(speciesQuery) {
    let filteredBySpecies = dB.rhinoceroses.filter(v => {
      return v.species === speciesQuery;
    });
      return filteredBySpecies.length > 0  ? filteredBySpecies : "Species Not Valid";
    }
 
  if(nameQuery) {
    let filteredByName = dB.rhinoceroses.filter(v => {
      return v.name === nameQuery;
    });
    return filteredByName.length > 0 ? filteredByName : "Name not valid";
    }
  
  return dB.rhinoceroses;
  }

 
  
 
//User can specify rhino by id to retrieve from database.
exports.getRhinoceros = (id) => {
  let searchId = id;
  let found = false;
  let rhinoceroses = dB.rhinoceroses;
  let iDErrorMsg = "Error: ID not found. Please supply valid ID";

  for (let i = 0; i < rhinoceroses.length; i++){
    if (rhinoceroses[i].id === searchId){
      found = i;
      break;
    }
  }
  return found === false ? iDErrorMsg : rhinoceroses[found];
}

//User can add new rhino to database.
exports.newRhinoceros = data => {
  const newRhino = {
    id: uuidv4(),
    name: data.name,
    species: data.species,
  };

  //Boolean Species Check value
  let speciesCheck = isValidSpecies(newRhino.species);

  //Conditional statements for messaging
  if (isNameValid(newRhino.name)) return nameValidationMsg;
  if(!speciesCheck) return speciesErrorMsg;
  if(Object.keys(data).length > 2) return keyErrorMsg;
  dB.rhinoceroses.push(newRhino);
  return newRhino;
};

//User can get only see rhinos who are part of a species with fewer than 3.
exports.getEndangeredRhinos = () => {
let aggregateBySpecies = {};
let endangeredSpecies = [];

for (rhino of dB.rhinoceroses){
  aggregateBySpecies[rhino.species] = (aggregateBySpecies[rhino.species] || 0 ) + 1;
}
for (const species in aggregateBySpecies){
   if(aggregateBySpecies[species] < 3) endangeredSpecies.push(species);
}
let endangeredRhinos = dB.rhinoceroses.filter(v => {
  return endangeredSpecies.includes(v.species);
})
return endangeredRhinos;
}

//User can specify rhino by id to remove from database.
exports.removeRhinoceros = (id) => {
  let searchId = id;
  let found = false;
  let rhinoceroses = dB.rhinoceroses;
  let iDErrorMsg = "Error: ID not found. Please supply valid ID";

  for (let i = 0; i < rhinoceroses.length; i++){
    if (rhinoceroses[i].id === searchId){
      found = i;
      rhinoceroses.splice(i, 1);
      break;
    } 
  }
  return found === false ? iDErrorMsg : rhinoceroses;
}

//User can update rhino by ID
exports.updateRhinoceros = (data) => {
  const updateRhino = {
    id: data.id,
    name: data.name,
    species: data.species,
  };
  if (isNameValid(updateRhino.name)) return nameValidationMsg;
  let speciesCheck = isValidSpecies(updateRhino.species);
  if(!speciesCheck) return speciesErrorMsg;
  //console.log(updateRhino);
  let searchId = data.id;
  let found = false;
  let rhinoceroses = dB.rhinoceroses;
  let iDErrorMsg = "Error: ID not found. Please supply valid ID";
  for (let i = 0; i < rhinoceroses.length; i++){
    if (rhinoceroses[i].id === searchId){
      found = i;
      rhinoceroses[i] = updateRhino;
      break;
    } 
  }
  return found === false ? iDErrorMsg : rhinoceroses;
}


//Define 3 error messages related to validation
  var nameValidationMsg = "Name must a string be between 1 to 20 characters. Please supply valid name.";
  var speciesErrorMsg = `Invalid species name. Please supply one of the following - ${dB.species}`;
  var keyErrorMsg = "Incorrect key submitted. Parameters are name and species";

//Boolean return for species validation
let isValidSpecies = (speciesRequest) => {
  return dB.species.includes(speciesRequest);
}
//Boolean return for name validation
let isNameValid = (nameRequest) => {
  if (nameRequest === " " || nameRequest> 20 || typeof(nameRequest) !== "string") return false;
} 






