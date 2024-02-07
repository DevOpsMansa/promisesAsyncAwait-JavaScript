// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";

function getUserData(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3,
  };
  export async function getUserData(id) {
    try {
      // Call central to determine the database
      const database = await central(id);
  
      // Call the appropriate function based on the database
      let userData;
      switch (database) {
        case "db1":
          userData = await db1(id);
          break;
        case "db2":
          userData = await db2(id);
          break;
        case "db3":
          userData = await db3(id);
          break;
        default:
          throw new Error(`Invalid database: ${database}`);
      }
  
      // Call vault to get additional user data
      const vaultData = await vault(id);
  
      // Combine the data from different sources into a single object
      const result = {
        id,
        name: vaultData.name,
        username: userData.username,
        email: vaultData.email,
        address: {
          street: vaultData.address.street,
          suite: vaultData.address.suite,
          city: vaultData.address.city,
          zipcode: vaultData.address.zipcode,
          geo: {
            lat: vaultData.address.geo.lat,
            lng: vaultData.address.geo.lng,
          },
        },
        phone: vaultData.phone,
        website: userData.website,
        company: {
          name: userData.company.name,
          catchPhrase: userData.company.catchPhrase,
          bs: userData.company.bs,
        },
      };
  
      return result;
    } catch (error) {
      // Handle errors
      throw error;
    }
  }
  //This will give you an object containing the user data with the specified structure
  getUserData(5)
    .then((result) => {
      // console.log(result);
    })
    .catch((error) => {
      console.error(error);
    });
  
}

// other views to the lab

// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";
// First Method - Promises
function getUserData1(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3,
  };
  let getdb = Promise.resolve(central(id));
  let resultObj = {};
  getdb
    .then((data) => {
      console.log(data);
      let db = Promise.resolve(dbs[data](id));
      db.then((dbdata) => {
        // console.log(dbdata);
        resultObj.id = id;
        resultObj.username = dbdata.username;
        resultObj.website = dbdata.website;
        resultObj.company = dbdata.company;
        console.log("Result: ", resultObj);
      }).catch((err) => {
        console.log("Error: ", err);
      });
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
  let vaultData = Promise.resolve(vault(id));
  vaultData.then((vdata) => {
    // console.log("Vault Data:", vdata);
    resultObj.name = vdata.name;
    resultObj.email = vdata.email;
    resultObj.address = vdata.address;
    resultObj.phone = vdata.phone;
    console.log("Result: ", resultObj);
  });
}
// getUserData1(5);
// Second method - async/await
async function getUserData2(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3,
  };
  let getdb = await central(id);
  let resultObj = {};
  console.log("Get db: ", getdb);
  let db = await dbs[getdb](id);
  let vaultData = await vault(id);
  // console.log("DB: ", db);
  // console.log("Vault: ", vaultData);
  resultObj.id = id;
  resultObj.username = db.username;
  resultObj.website = db.website;
  resultObj.company = db.company;
  resultObj.name = vaultData.name;
  resultObj.email = vaultData.email;
  resultObj.address = vaultData.address;
  resultObj.phone = vaultData.phone;
  console.log("Result obj:", resultObj);
}
getUserData2(3);
