const pokeNumberURL = 'https://pokeapi.co/api/v2/pokemon/?limit=';
const pokeNameList = new Set();

fetch(pokeNumberURL)
   .then(response => response.json())
   .then(data => {
      totalPokemon = data.count;

      return fetch(pokeNumberURL + totalPokemon);
   })
   .then(response => response.json())
   .then(json => {
      for(let i = 0; i < totalPokemon; i++) {
         pokeNameList.add(json.results[i].name);
      }
   });

document.getElementById("submitButton").addEventListener("click", function(event) {
   event.preventDefault();
   const pokeurl = "https://pokeapi.co/api/v2/pokemon/"+
   document.getElementById("nameInput").value.toLowerCase();
   fetch(pokeurl)
      .then(function(response) {
         return response.json();
      }).then(function(json) {
         console.log(json);
         var pokeImage;
         pokeImage = '<img src="' + json.sprites.front_default + '"height = "250"></img>';
         document.getElementById("pokemonImageDiv").innerHTML = pokeImage;
         document.getElementById("pokemonImageDiv").style.width = "200px";
         document.getElementById("pokemonImageDiv").style.marginTop = "40px";
         document.getElementById("pokemonImageDiv").style.marginBottom = "10px";
         document.getElementById("pokemonImageDiv").style.padding = "25px";
         document.getElementById("pokemonImageDiv").classList.add("viewWindow");

         var pokeName;
         pokeName = 'Name: ' + CapitalizeFirstLetter(json.name);
         document.getElementById("pokemonName").innerHTML = pokeName;
         var pokeType1;
         pokeType1 = 'Primary Type: ' + CapitalizeFirstLetter(json.types[0].type.name);
         document.getElementById("pokemonType1").innerHTML = pokeType1;
         var pokeType2;
         if (json.types.length > 1) {
            pokeType2 = 'Secondary Type: ' + CapitalizeFirstLetter(json.types[1].type.name);
         } else {
            pokeType2 = 'Secondary Type: None'
         }
         document.getElementById("pokemonType2").innerHTML = pokeType2;
         document.getElementById("infoContainer").style.width = 
            document.getElementById("pokemonImageDiv").getBoundingClientRect().width + "px";
         document.getElementById("infoContainer").style.padding = "20px";
         document.getElementById("infoContainer").classList.add("viewWindow");

   });
});

function CapitalizeFirstLetter(string) {
   return string.charAt(0).toUpperCase() + string.slice(1);
}

function searchPokemon(elem) {
   let selector = document.getElementById("selector");
   // Check if input is empty
   if (elem.value.trim() !== "") {
		elem.classList.add("dropdown"); // Add dropdown class (for the CSS border-radius)
		// If the selector div element does not exist, create it
      if (selector == null) {
			selector = document.createElement("div");
			selector.id = "selector";
			elem.parentNode.appendChild(selector);
			// Position it below the input element
			selector.style.left = elem.getBoundingClientRect().left + "px";
			selector.style.top = elem.getBoundingClientRect().bottom + "px";
			selector.style.width = elem.getBoundingClientRect().width + "px";
		}
      // Clear everything before new search
      selector.innerHTML = "";
      // Variable if result is empty
      let empty = true;
      for (let pokemon of pokeNameList) {
         // Join the db elements in one string
         let str = CapitalizeFirstLetter(pokemon);
         // If exists, create an item (button)
         if (str.toLowerCase().indexOf(elem.value.toLowerCase()) !== -1) {
            let opt = document.createElement("button");
            opt.setAttribute("onclick","insertValue(this);")
            opt.innerHTML = str;
            selector.appendChild(opt);
            empty = false;
         }
      }
      if (empty == true) {
			let opt = document.createElement("button");
			opt.disabled = true;
			opt.innerHTML = "No results";
			selector.appendChild(opt);
		}
   }
   else {
		if (selector !== null) {
			selector.parentNode.removeChild(selector);
			elem.classList.remove("dropdown");
		}
	}
}

function insertValue(elem) {
	document.getElementById("nameInput").classList.remove("dropdown");
	document.getElementById("nameInput").value = elem.innerHTML;
	elem.parentNode.parentNode.removeChild(elem.parentNode);
   document.getElementById("submitButton").click();
}
