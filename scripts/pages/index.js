  
//import photographerTemplate from "../templates/photographer.js";

async function getPhotographers() {
	// Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
	// mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
       
       
	let photographers;
	//let photographerMedia; 
        
	try {

		let response = await fetch("./data/photographers.json"); 

		let dataVal = await response.json();

		photographers = dataVal.photographers;
      
		
	} catch (error) {

		console.error("Erreur lors de la requête :", error);

	}
        
      
	// et bien retourner le tableau photographers seulement une fois récupéré
	return ({
		//  photographers: [...photographers, ...photographers, ...photographers]
		photographers: [...photographers],
		// photographersMedia: [ ...photographerMedia]
       
	});
        
       

        
}

/////////////////////////////////////////////////////

//fonction photographer  pour la page d'acceuil ramenée ici
function photographerTemplate(data) {


	const {
		id, name, portrait,  country, tagline, price,
	} = data;

	//console.log(`city : ${city}  * country : ${country} * tagline : ${tagline}  * price : ${price}`);

	const picture = `./assets/photographers/${portrait}`;

	//const picture = `../../assets/photographers/${portrait} `; //New

	function getUserCardDOM() {
		const article = document.createElement("article");
		article.setAttribute("class", "article");
		const img = document.createElement( "img" );
		img.setAttribute("src", picture);
		img.alt = `${name}`;
		img.setAttribute("class", "cercle");
    

		const h2 = document.createElement( "h2" );
		h2.textContent = name;
		// article.appendChild(img);
		// article.appendChild(h2);

		const linkImg =  document.createElement( "a" );
    
		// linkImg.href = `../Front-End-Fisheye/photographer.html?${id}`
		linkImg.href = `./photographer.html?${id}`;
    

		linkImg.setAttribute("class", "linkPicture");

		linkImg.appendChild(img);
		linkImg.appendChild(h2);
		article.appendChild(linkImg);

		const countryElement = document.createElement( "p" );
		countryElement.setAttribute("class", "countryElement");

		const  countryHtmle = `<span style="color: #901C1C; font-weight: bold;" >
                            ${country}
                            </span> `;
    
		countryElement.innerHTML = countryHtmle; 
		article.appendChild(countryElement );

		const taglineElement = document.createElement( "p" );
		taglineElement.setAttribute("class", "taglineElement");
		taglineElement.textContent = tagline;
		article.appendChild(taglineElement );

		const wrapper = document.createElement("div");
		wrapper.setAttribute("class", "wrapper");
		const priceHtml = `
        <span style=" font-size: 12px; texte-Aline: center; font-weight: bold; color: background: #757575;
        " >
            ${price}/jour
        </span>
    
     `;
		wrapper.innerHTML = priceHtml;
		article.appendChild( wrapper );
    

		return (article);
	}




	return { name, picture, getUserCardDOM };
}



///////////////////////////////////////////////////

async function displayData(photographers) {
	const photographersSection = document.querySelector(".photographer_section");

	photographers.forEach((photographer) => {
		const photographerModel = photographerTemplate(photographer);
		const userCardDOM = photographerModel.getUserCardDOM();
		photographersSection.appendChild(userCardDOM);
	});
}

async function init() {
	// Récupère les datas des photographes
	const { photographers } = await getPhotographers();
	displayData(photographers);
}
    
init();











    
    
