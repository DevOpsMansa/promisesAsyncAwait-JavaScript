// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";

function getUserData(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3,
  };
}

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
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
