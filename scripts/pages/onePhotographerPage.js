


//gestion de onePhotographerTemplate.js

async function onePhotographerData(){

    let photographers
    let photographerMedia
    let dataliste = []

    try {

        let response = await fetch('./data/photographers.json') 
        
        let dataVal = await response.json();

        photographerMedia = dataVal.media
        
       // console.log(  photographerMedia );

       photographers = dataVal.photographers

       dataliste = [photographers, photographerMedia]
      
       //console.log( dataliste);
       //console.log( photographers);

    }catch(err) {

        console.err('Erreur lors de la requête :', err); 

    }

    // et bien retourner le tableau photographers seulement une fois récupéré
    return ({
       
       
        photographers: [...photographers],
        photographersMedia: [ ...photographerMedia]
     
      })


    

}

//fonction de récupération de photographers, photographersMedia
async function onePhotographerDataTemplate(photographers, photographersMedia){

    console.log("***** bienvenue dans onePhotographerDataTemplate() *****")

    ///////////////////////////////////////

    // récupération de l'URL complète de la page
    let url = window.location.href;

    // Utilisation de la méthode split pour obtenir l'ID après le dernier ?
    let parts = url.split("?");

    // Récupération de l'ID extrait (peut contenir des espaces avant ou après)
    let extractedId = parts[parts.length - 1];

    // Suppression des espaces inutiles avant et après l'ID
    let idPhotographer = extractedId.trim();

    console.log(idPhotographer); // Affiche l'ID extrait et sans espaces

    console.log(  photographersMedia );
    console.log( photographers);

    ///////////////////////////////////////
   //récupération du photographe encours
   let photographCurrent = photographers.find( item => item.id === parseInt(idPhotographer) )

   console.log("***** photographCurrent")
   console.log(photographCurrent)

   const { id, name, portrait, city, country, tagline, price } = photographCurrent;

    console.log(  "city : "+ city  +  "  * country : " + country  +  " * tagline : "+ tagline  + "  * price : "+ price  )

    //récupération des objets du portfolio du photographe en cours
    let ProjetPhotographCurrent = photographersMedia.filter( item => item.photographerId === parseInt(idPhotographer) )

    //récupération

    console.log(  "******* ProjetPhotographCurrent" );
    console.log( ProjetPhotographCurrent);
   

    


    /*****************partie du pays et tu titre********************** */
  
     const descriptionTitle = document.createElement("div")
     descriptionTitle.setAttribute( "class", "countryTitle")

     //creation de l'élément nom du photographe///////////////
     const nameElement = document.createElement("h1")
     nameElement.setAttribute( "class", "nameElement")
     nameElement.innerText = name

     //creation du block country et description
     const countryBlock = document.createElement("div")
     countryBlock.setAttribute( "class", "countryBlock")
    
     //creation des enfants  du block country et description///////////////
     const countryElement = document.createElement("p")
     countryElement.setAttribute( "class", "countryElement")
     countryElement.innerText = country;

     const descripElement = document.createElement("p")
     descripElement.setAttribute( "class", "descripElement")
     descripElement.innerText = tagline;

     //insertion des enfants dans les parents///////////////
     countryBlock.appendChild(countryElement)
     countryBlock.appendChild(descripElement )
     descriptionTitle.appendChild(nameElement )
     descriptionTitle.appendChild(countryBlock )

     //creation de l'élément img du photographe///////////////
     const picture = `./assets/photographers/${portrait}`;
     const imgBlock = document.createElement("p")
     imgBlock.setAttribute( "class", "imgBlock")
     const imgElement = document.createElement("img")
     nameElement.setAttribute( "class", "nameElement")
     nameElement.setAttribute( "alt", " ")
     imgBlock.appendChild(imgElement)
     imgElement.setAttribute("src", picture)

      //insertion du parent partiel sur le grand parent///////////////
      const photographHeaderClass = document.querySelector(".photograph-header")
      photographHeaderClass.appendChild(descriptionTitle)
      photographHeaderClass.appendChild(imgBlock)

    /***************** gestion  et création du formulaire  du trie ********************** */
    
    // récupération du formulaire ///////////////
    let formElement = document.querySelector(".form");

    // Création du label ///////////////
    let labelElement = document.createElement("label");
    labelElement.textContent = "Trier par";

    // Association du label à l'élément select ///////////////
    labelElement.setAttribute("for", "mySelect");

    // Création d'un élément select ///////////////
    let selectElement = document.createElement("select");

    // Ajout d'une classe et d'un id ///////////////
    selectElement.classList.add("inputSelect");
    selectElement.id = "mySelect"; 

    // Création de trois options et ajout dans l'élément select ///////////////
    let option1 = document.createElement("option");
    option1.setAttribute("selected", "selected");
    option1.textContent = "Popularité";
    selectElement.appendChild(option1);

    let option2 = document.createElement("option");
    option2.textContent = "Date";
    selectElement.appendChild(option2);

    let option3 = document.createElement("option");
    option3.textContent = "Titre";
    selectElement.appendChild(option3);

    // Styles CSS pour personnaliser la flèche du sélecteur


    // Ajout de l'élément select et du label au formulaire ///////////////
    formElement.appendChild(labelElement);
    formElement.appendChild(selectElement);

  
  


    /***************** gestion  du portfolio ********************** */

  
   // const articleElement  = document.querySelector(".articlePortfolio")
    const articleElement  = document.querySelector(".articleContainer")



    console.log(ProjetPhotographCurrent.length)

    let articleItem 

    for(let i = 0; i < ProjetPhotographCurrent.length; i++){

         articleItem = `

        <article class="articlePortfolioitem"> 
        
            <div class="articlePortfolio__item">
    
                <div class="articlePortfolio__item--img">
                   
                    <img src="./assets/photographersMedia/${ProjetPhotographCurrent[i].image} " alt=" " class="photographerImg" >
                   
                </div>
                <div class="articlePortfolio__item--description description">
                <p class="description__titre" > ${ProjetPhotographCurrent[i].title}  </p>
    
                <p class="description__numLike"> 
                    ${ProjetPhotographCurrent[i].likes}  <span class="description__Like">
                        <i class="fa-solid fa-heart"></i>
                        
                            </span>
                
                </p>
                </div>
            </div>
    
         </article> 
    
        `
  
        
        articleElement.innerHTML += articleItem;
    }

    /*************** gestion des likes et du total des likes   *********************/

    //récupération du photographe encour
    const photographerCurrent = photographers.find( item => item.id === parseInt(idPhotographer) )

    //récupération de la liste des likes du photographe encours
    const listeLikes = ProjetPhotographCurrent.map( item => item.likes)
    console.log("**** listeLikes ")
    console.log(listeLikes )

    //addition des likes du photographe encours
    const totalLikes = listeLikes.reduce( (acc, current)=> {

        return acc + current;
    }, 0)

    console.log("**** totalLikes")
    console.log(totalLikes)

    console.log("**** photographerCurrent")
    console.log(photographerCurrent.price)

    //récupération de l'élément
    let priceLikeTotal1 = document.querySelector(".priceLikeTotal")

    let priceLikeTotalBlock = `
    
        <p class="priceLikeTotal__like"> 
        
            ${totalLikes} 
            <span class="priceLikeTotal__like--like"> <i class="fa-solid fa-heart"></i>  </span>
                        
        </p>
        <p class="priceLikeTotal__like price">  ${photographerCurrent.price}€ / jour  </p>
    
    `

    //insertion de l'html dans l'élément ciblé
    priceLikeTotal1.innerHTML = priceLikeTotalBlock 

     /*************** gestion des likes et du total des likes   *********************/
   

}

//fonction d'éxécusion 
async function initonePhotographerDataTemplate() {
    // Récupération de photographers, photographersMedia dans la  fonction onePhotographerData() en destructurant
    const { photographers, photographersMedia } = await onePhotographerData(); 

    
    onePhotographerDataTemplate(photographers, photographersMedia);  
   // console.log(  photographersMedia );
    //console.log( photographers);

  
   
}

initonePhotographerDataTemplate();




