


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
   
   const { id, name, portrait, city, country, tagline, price } = photographers[0];

    console.log(  "city : "+ city  +  "  * country : " + country  +  " * tagline : "+ tagline  + "  * price : "+ price  )

    console.log(  photographersMedia );
    console.log( photographers);

/*************************************** */
     //partie du pays et tu titre
   

     const descriptionTitle = document.createElement("div")
     descriptionTitle.setAttribute( "class", "countryTitle")

     //creation de l'élément nom du photographe
     const nameElement = document.createElement("p")
     nameElement.setAttribute( "class", "nameElement")
     nameElement.innerText = name

     //creation du block country et description
     const countryBlock = document.createElement("div")
     countryBlock.setAttribute( "class", "countryBlock")
     countryBlock.innerText = country;

     //creation des enfants  du block country et description
     const countryElement = document.createElement("p")
     countryElement.setAttribute( "class", "countryElement")
     const descripElement = document.createElement("p")
     descripElement.setAttribute( "class", "descripElement")
     descripElement.innerText = tagline;

     //insertion des enfants dans les parents
     countryBlock.appendChild(countryElement)
     countryBlock.appendChild(descripElement )

     descriptionTitle.appendChild(nameElement )
     descriptionTitle.appendChild(countryBlock )


     /////////////////////////////////////////////////

     //creation de l'élément img du photographe

     const picture = `./assets/photographers/${portrait}`;

     const imgBlock = document.createElement("p")
     imgBlock.setAttribute( "class", "imgBlock")
     

     const imgElement = document.createElement("img")
     nameElement.setAttribute( "class", "nameElement")
     nameElement.setAttribute( "alt", " ")
     

     imgBlock.appendChild(imgElement)
     imgElement.setAttribute("src", picture)

     /////////////////////////////////////////////////

      //insertion du parent partiel sur le grand parent
      const photographHeaderClass = document.querySelector(".photograph-header")
      photographHeaderClass.appendChild(descriptionTitle)
      photographHeaderClass.appendChild(imgBlock)

/*************************************** */

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




