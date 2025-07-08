"use strict";

// Voeg dit toe om prompt en alert in Node.js te gebruiken:
const promptSync = require("prompt-sync")({ sigint: true });
function prompt(question) {
  return promptSync(question);
}
function alert(msg) {
  console.log(msg);
}

// Import mock data
const mockData = require("./mockData.js").data;

// Locatie mapping Engels -> Nederlands
const locatieMapping = {
  city: "stad",
  rural: "platteland",
};

// Prompt user to continue
const welcome = prompt(
  "Welcome To The Dating App Of Winc Winc!!! Hit Enter To Continue!!! "
);

// Initialize empty object to hold user profile data
const profile = {
  firstName: "",
  lastName: "",
  age: null,
  gender: "",
  interest: "",
  location: "",
  minAge: null,
  maxAge: null,
  matchLocationPreference: "allebei", // nieuw veld
};

// Functie om eerste naam te checken en opslaan
function checkFirstName(profile) {
  while (true) {
    const firstName = prompt("Wat is je voornaam? ");
    if (/^[A-Za-z]+$/.test(firstName)) {
      profile.firstName = firstName;
      break;
    } else {
      alert("Ongeldige invoer. Voer een geldige naam in.");
    }
  }
}

// Functie om achternaam te checken en opslaan
function checkLastName(profile) {
  while (true) {
    const lastName = prompt("Wat is je achternaam? ");
    if (/^[A-Za-z]+$/.test(lastName)) {
      profile.lastName = lastName;
      break;
    } else {
      alert("Ongeldige invoer. Voer een geldige naam in.");
    }
  }
}

// Functie om leeftijd te checken en opslaan
function checkAge(profile) {
  const minAge = 18;
  const maxAge = 100;
  while (true) {
    const age = prompt(
      `Wat is je leeftijd? (Min. ${minAge} en max. ${maxAge}) `
    );
    if (/^[0-9]+$/.test(age)) {
      const ageNum = Number(age);
      if (ageNum >= minAge && ageNum <= maxAge) {
        profile.age = ageNum;
        break;
      } else {
        alert(
          `Ongeldige leeftijd. Voer een leeftijd tussen ${minAge} en ${maxAge} in.`
        );
      }
    } else {
      alert("Ongeldige invoer. Voer een geldig getal in.");
    }
  }
}

// Functie om gender te checken en opslaan, case-insensitive
function checkGender(profile) {
  while (true) {
    const genderInput = prompt("Wat is je gender? (Voer M, F, of X in) ");
    const gender = genderInput.toUpperCase();
    if (gender === "M" || gender === "F" || gender === "X") {
      profile.gender = gender;
      break;
    } else {
      alert("Ongeldige invoer. Voer M, F, of X in.");
    }
  }
}

// Functie om interesse te checken en opslaan, case-insensitive
function checkInterest(profile) {
  while (true) {
    const interestInput = prompt(
      "Waar ben je naar op zoek? M, F, X (alle genders), B (biseksueel) "
    );
    const interestRaw = interestInput.toUpperCase();
    const interest = interestRaw === "BI" ? "B" : interestRaw; // 'Bi' als 'B'
    if (
      interest === "M" ||
      interest === "F" ||
      interest === "X" ||
      interest === "B"
    ) {
      profile.interest = interest;
      break;
    } else {
      alert("Ongeldige invoer. Voer M, F, X of B in.");
    }
  }
}

// Functie om locatie te checken en opslaan (in het Nederlands)
function checkLocation(profile) {
  while (true) {
    const location = prompt("Wat is je locatie? 'platteland' of 'stad': ");
    if (
      location.toLowerCase() === "platteland" ||
      location.toLowerCase() === "stad"
    ) {
      profile.location = location.toLowerCase();
      break;
    } else {
      alert("Ongeldige invoer. Voer 'platteland' of 'stad' in.");
    }
  }
}

// Functie om matchlocatie voorkeur te checken en opslaan (nieuw)
function checkMatchLocationPreference(profile) {
  while (true) {
    const pref = prompt(
      "Zoek je iemand uit 'stad', 'platteland' of 'allebei'? "
    );
    const p = pref.toLowerCase();
    if (p === "stad" || p === "platteland" || p === "allebei") {
      profile.matchLocationPreference = p;
      break;
    } else {
      alert("Ongeldige invoer. Voer 'stad', 'platteland' of 'allebei' in.");
    }
  }
}

// Functie om minimale en maximale leeftijd voorkeur te checken en opslaan
function checkAgeFromTill(profile) {
  const minAge = 18;
  const maxAge = 100;

  while (true) {
    const ageFrom = prompt(
      `Wat is de minimum leeftijd van je voorkeur? (Min. ${minAge} en max. ${maxAge}) `
    );
    if (/^[0-9]+$/.test(ageFrom)) {
      const ageFromNum = parseInt(ageFrom);
      if (ageFromNum >= minAge && ageFromNum <= maxAge) {
        profile.minAge = ageFromNum;
        break;
      } else {
        alert(
          `Ongeldige leeftijd. Kies een waarde tussen ${minAge} en ${maxAge}.`
        );
      }
    } else {
      alert(
        `Ongeldige invoer. Voer een getal in tussen ${minAge} en ${maxAge}.`
      );
    }
  }

  while (true) {
    const ageTill = prompt(
      `Wat is de maximum leeftijd van je voorkeur? (Min. ${profile.minAge} en max. ${maxAge}) `
    );
    if (/^[0-9]+$/.test(ageTill)) {
      const ageTillNum = parseInt(ageTill);
      if (ageTillNum >= profile.minAge && ageTillNum <= maxAge) {
        profile.maxAge = ageTillNum;
        break;
      } else {
        alert(
          `Ongeldige leeftijd. Kies een waarde tussen ${profile.minAge} en ${maxAge}.`
        );
      }
    } else {
      alert(
        `Ongeldige invoer. Voer een getal in tussen ${profile.minAge} en ${maxAge}.`
      );
    }
  }
}

// Functie om te checken of genders en interesses matchen
function genderMatch(jouwGender, jouwInterest, anderGender, anderInterest) {
  const jouwPastBijAnder =
    anderInterest === "X" ||
    anderInterest === "B" ||
    anderInterest === jouwGender;
  const anderPastBijJouw =
    jouwInterest === "X" ||
    jouwInterest === "B" ||
    jouwInterest === anderGender;
  return jouwPastBijAnder && anderPastBijJouw;
}

// Start vragen invullen
checkFirstName(profile);
checkLastName(profile);
checkAge(profile);
checkGender(profile);
checkInterest(profile);
checkLocation(profile);
checkMatchLocationPreference(profile); // <-- nieuwe vraag
checkAgeFromTill(profile);

// Toon profiel info aan gebruiker (locatie in Nederlands)
alert(
  `Hi, ${profile.firstName} ${profile.lastName}! Je bent ${profile.age} jaar oud, gender ${profile.gender}, en je interesse gaat uit naar ${profile.interest}. Je locatie is ${profile.location}, en je zoekt iemand tussen ${profile.minAge} en ${profile.maxAge} jaar.`
);

// Zoek matches in mockData
let countMatches = 0;
const matches = [];

for (let persoon of mockData) {
  const persoonLocatie = locatieMapping[persoon.location];
  if (
    profile.age >= persoon.min_age_interest &&
    profile.age <= persoon.max_age_interest &&
    // Check locatie voorkeur
    (profile.matchLocationPreference === "allebei" ||
      persoonLocatie === profile.matchLocationPreference) &&
    genderMatch(
      profile.gender,
      profile.interest,
      persoon.gender,
      persoon.gender_interest
    ) &&
    profile.minAge <= persoon.age &&
    profile.maxAge >= persoon.age
  ) {
    matches.push(persoon);
    countMatches++;
  }
}

// Toon matches netjes in een lijst
if (countMatches === 0) {
  alert("Geen matches gevonden.");
} else {
  let msg = `We hebben ${countMatches} match(es) gevonden:\n\n`;
  matches.forEach((m, i) => {
    msg += `${i + 1}. ${m.first_name} ${m.last_name}, ${m.age} jaar, locatie: ${
      locatieMapping[m.location]
    }, interesse: ${m.gender_interest}\n`;
  });
  alert(msg);
}
