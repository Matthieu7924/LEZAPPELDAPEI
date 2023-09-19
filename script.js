



////////////////////////WEATHER 1 ////////////////////////////////////

function fetchWeatherData() {
    const cityInput = document.getElementById("cityInput").value;
    const apiKey = "c668fbe2523dd327e75f41ea5c50ef49";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const temperature = data.main.temp;
            const weatherDescription = data.weather[0].description;
            const icon = data.weather[0].icon;

            document.getElementById("temperatureWeather").textContent = `Température : ${temperature}°C`;
            document.getElementById("weatherDescriptionWeather").textContent = `Description : ${weatherDescription}`;
            document.getElementById("weatherIconWeather").src = `http://openweathermap.org/img/wn/${icon}.png`;
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des données météo :", error);
        });
}

////////////////////////WEATHER 2 ////////////////////////////////////

function fetchWeatherData2() {
    const cityInput = document.getElementById("cityInput2").value;
    const apiKey = "c668fbe2523dd327e75f41ea5c50ef49";
    const apiUrl2 = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

    fetch(apiUrl2)
        .then(response => response.json())
        .then(data => {
            const temperature2 = data.main.temp;
            const weatherDescription2 = data.weather[0].description;
            const icon2 = data.weather[0].icon;

            document.getElementById("temperatureWeather2").textContent = `Température : ${temperature2}°C`;
            document.getElementById("weatherDescriptionWeather2").textContent = `Description : ${weatherDescription2}`;
            document.getElementById("weatherIconWeather2").src = `http://openweathermap.org/img/wn/${icon2}.png`;
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des données météo :", error);
        });
}


////////////////////////GITHUB PROFIL ////////////////////////////////////

const btn = document.getElementById("btn");
const champ = document.getElementById("champ");
const accountInfo = document.getElementById("accountInfo");
const imageContainer = document.getElementById("imageContainer");
const errored = document.getElementById("error");
const shootAgainImage = document.getElementById("shootagain");
const output = document.getElementById("output");



    

    function fetchGitHubUsers() {
        // Réinitialiser l'affichage
        accountInfo.textContent = "";
        imageContainer.innerHTML = "";
        errored.textContent = "";
    
        fetch("https://api.github.com/users/" + champ.value)
        .then(response => {
            if (!response.ok) {
                throw new Error("Cet utilisateur n'existe pas");
            }
            return response.json();
        })
        .then(data => {
            if (data.name) {
                accountInfo.textContent = `Compte de ${data.name}`;
            } else {
                throw new Error("Nom d'utilisateur non trouvé");
            }
            
            const img = document.createElement("img");
            img.src = data.avatar_url;
            img.width = "100";
            imageContainer.appendChild(img);
        })
        .catch(error => {
            errored.textContent = error.message; // Afficher le message d'erreur
            shootAgainImage.style.display = "block"; // Afficher l'image
        });
    };


//Capitale pour l'input ville
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

cityInput.addEventListener("input", function () {
    this.value = capitalizeFirstLetter(this.value);
});

cityInput2.addEventListener("input", function () {
    this.value = capitalizeFirstLetter(this.value);
});

document.addEventListener("DOMContentLoaded", function() {
    btn.addEventListener("click", fetchGitHubUsers);
    champ.addEventListener("keydown", function(event) {
        if (event.key === "Enter") 
        {
            fetchGitHubUsers();
        }
    });
});



/////////////////////////////REST COUNTRIES ////////////////////////////

// Sélectionnez l'élément de formulaire et l'élément d'affichage
const countrySelect = document.getElementById("countrySelect");
const resultContainer = document.getElementById("resultContainer");

// Écoutez l'événement de changement de sélection du pays
countrySelect.addEventListener("change", () => {
  // Obtenez la valeur sélectionnée du pays
    const selectedCountry = countrySelect.value;

  // Assurez-vous que le pays sélectionné n'est pas vide
    if (selectedCountry) {
        // Construisez l'URL de l'API avec le pays sélectionné
        const apiUrl = `https://restcountries.com/v3.1/name/${selectedCountry}`;

        // Utilisez fetch pour récupérer les données de l'API
        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erreur de requête : " + response.status);
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                // Récupérez les informations du premier résultat (le pays)
                const countryInfo = data[0];
                // Récupérez la capitale et le nombre d'habitants
                const capital = countryInfo.capital;
                const population = countryInfo.population;
                // Affichez les informations dans le conteneur de résultat
                resultContainer.innerHTML = `
                <p>Capitale de ${selectedCountry}: ${capital}</p>
                <p>Nombre d'habitants de ${selectedCountry}: ${population}</p>
                `;
            })
            .catch((error) => {
                console.error("Erreur de réseau : " + error.message);
            });
    } 
    else 
    {
        // Effacez le conteneur de résultat si aucun pays n'est sélectionné
        resultContainer.innerHTML = "";
    }
});


///////////////////////////SELECTION DU PAYS DANS LE SELECT/////////////////////////

        // URL de l'API REST Countries pour obtenir la liste des pays
        const apiUrl = "https://restcountries.com/v3.1/all";

        // Effectuer une requête GET vers l'API
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                 // Trier les pays par ordre alphabétique
                data.sort((a, b) => {
                    const countryA = a.name.common.toLowerCase();
                    const countryB = b.name.common.toLowerCase();
                    return countryA.localeCompare(countryB);
                });
                // Parcourir les données et ajouter chaque pays à la liste déroulante
                data.forEach(country => {
                    const option = document.createElement("option");
                    option.value = country.name.common.toLowerCase(); // Utiliser le nom en minuscules comme valeur
                    option.textContent = country.name.common; // Afficher le nom du pays
                    countrySelect.appendChild(option);
                });
            })
            .catch(error => {
                console.error("Erreur lors de la récupération de la liste des pays :", error);
            });