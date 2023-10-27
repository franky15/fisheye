
//gestion de onePhotographerTemplate.js
let nomForm;
async function onePhotographerData(){

	let photographers;
	let photographerMedia;
	//let dataliste = [];

	try {

		let response = await fetch("./data/photographers.json"); 
        
		let dataVal = await response.json();

		photographerMedia = dataVal.media;
        
		// console.log(  photographerMedia );

		photographers = dataVal.photographers;

	}catch(err) {

		console.err("Erreur lors de la requête :", err); 

	}

	// et bien retourner le tableau photographers seulement une fois récupéré
	return ({
       
       
		photographers: [...photographers],
		photographersMedia: [ ...photographerMedia]
     
	});


}

//fonction de récupération de photographers, photographersMedia
async function onePhotographerDataTemplate(photographers, photographersMedia){

	// récupération de l'URL complète de la page
	let url = window.location.href;

	// Utilisation de la méthode split pour obtenir l'ID après le dernier ?
	let parts = url.split("?");

	// Récupération de l'ID extrait (peut contenir des espaces avant ou après)
	let extractedId = parts[parts.length - 1];

	// Suppression des espaces inutiles avant et après l'ID
	let idPhotographer = extractedId.trim();

	//récupération du photographe encours
	let photographCurrent = photographers.find( item => item.id === parseInt(idPhotographer) );

	// eslint-disable-next-line no-unused-vars
	const {  name, portrait, city, country, tagline, price } = photographCurrent;

	//console.log(  "city : "+ city  +  "  * country : " + country  +  " * tagline : "+ tagline  + "  * price : "+ price  );

	nomForm=name;
	//récupération des objets du portfolio du photographe en cours
	let ProjetPhotographCurrent = photographersMedia.filter( item => item.photographerId === parseInt(idPhotographer) );

	//saugarde de la listes des medias d'origine dans le localstaorage si le localstorage est vide
	if(localStorage.length === 0){

		//conversion de la liste en chaine json
		const listeMediaOriginJson = JSON.stringify(ProjetPhotographCurrent);

		//stockage dans le localstorage
		localStorage.setItem("listeMediaOriginJson", listeMediaOriginJson);


	}
    
	//récupération de laliste des media d'origine du localstorage
	const listeMediaOriginJson = localStorage.getItem("listeMediaOriginJson");

	//conversion en données normales utilisables
	const listeMediaOriginLocalstorage = JSON.parse(listeMediaOriginJson);

	/*****************partie du pays et tu titre********************** */

	const imgBlock2 = `
     
        <div class= "imgBlock2"  style="background-image: url('./assets/photographers/${portrait}');
         background-repeat: no-repeat;  background-position:  center center;
          background-size: cover; width: 200px; height: 200px;  border-radius: 50%; "  > 
        
        
        </div>
     
     
     `;

	const nameElement = document.querySelector(".nameElement");
	const countryElement = document.querySelector(".countryElement");
	const descripElement = document.querySelector(".descripElement");

	nameElement.innerText = name;
	countryElement.innerText = country;
	descripElement.innerText = tagline;
	
	const imgPhotographe  = document.querySelector(".imgBlock");
	imgPhotographe.innerHTML = imgBlock2;

	/***************** gestion  du portfolio ********************** */

	const popularite  = document.querySelector(".populariteParent__article");


	let articleItem; 

	//fonction de mise à jour des résultats du filtre
	const updatefilterPage = (selectValue) => {

		/************************************************************* */
		//récupère l'article ou le media du localstorage puis l'insèrre dans la nouvelle liste et enfin range les media ordre croissant
		const listeFilterUpdateFunction = () => {  //selectValue

			//mise à jour du tableau des media avec le local storage

			let listeMediaUpdate; 

			for(let k=0; k<ProjetPhotographCurrent.length; k++){

				let itemArticle = ProjetPhotographCurrent[k];

				// Récupération de  l'objet sérialisé depuis le localStorage
				let articleString = localStorage.getItem(itemArticle.id ); //[] car je récupère un objet du local storage

				// Désérialisation de l'objet articleString en un objet Jason
				let articleJson = JSON.parse(articleString);

				if(articleString){  //articleString

					//console.log("***** bienvenue dans le if articleString existe");

					if( itemArticle.id === articleJson.id){

						//récupération de la liste des media sans l'ancien objet
						let listeMediaFilterCurrent = ProjetPhotographCurrent.filter( item => item.id !== articleJson.id);
                        
						//ajout de l'objet récupéré dans le local storage dans la liste filtrée pour remplacer l'objet filtré précédamment
						// let listemMdiaFilterUpdate =[] 
						listeMediaFilterCurrent.push(articleJson);

						//mise à jour de la nouvelle liste  
						listeMediaUpdate.push(listeMediaFilterCurrent); //attention on a une liste dans une
						listeMediaUpdate = listeMediaFilterCurrent;

						/******* gestion de la liste du nombre de likes et de son ordement croissant  *******/

						// let  lisNumberLikeOrderCroissant = [] 
						let  lisNumberLikeOrderCroissant; 
                            
						lisNumberLikeOrderCroissant  = listeMediaUpdate;

						//ordonnement de la liste du nombre de likes par ordre croissant
						lisNumberLikeOrderCroissant.sort( (a, b) => {

                                
							return a.likes - b.likes;
						});
                            
						//converion en string avant le stockage dans le local storage
						const lisNumberLikeOrderCroissantJSON = JSON.stringify(lisNumberLikeOrderCroissant);

						//stockage dans le local storage
						localStorage.setItem("listeArticlesCroissanteLikes", lisNumberLikeOrderCroissantJSON);

						/******* gestion de la liste des dates et de son ordement croissant  *******/
                            
						let listeDateOrderCroissantDate = [];
                           
						listeDateOrderCroissantDate = listeMediaUpdate;

						//ordonnement de la liste de dates par ordre croissant
						listeMediaUpdate.sort( (a, b) => {

                                
							return new Date(a.date) - new Date(b.date);  //conversion en entier de la date
						});

						//converion en string avant le stockage dans le local storage
						const lisNumberLikeOrderCroissantDateJSON = JSON.stringify(listeDateOrderCroissantDate);

						//stockage dans le local storage
						localStorage.setItem("listeDateOrderCroissantDate", lisNumberLikeOrderCroissantDateJSON);

						/******* gestion de la liste des titres et de son ordement croissant  *******/
						let listeTitreOrderCroissant;

						listeTitreOrderCroissant = listeMediaUpdate;

						//ordonnement de la liste des titres par ordre croissant
						listeTitreOrderCroissant.sort( (a, b) => {
      
							return a.title.localeCompare(b.title) ;  //.replace(/\s+/g, '')
						});

						//converion en string avant le stockage dans le local storage
						const listeTitreOrderCroissantJSON = JSON.stringify(listeTitreOrderCroissant);

						//stockage dans le local storage
						localStorage.setItem("listeTitreOrderCroissant", listeTitreOrderCroissantJSON);

					}


					
				}else{

					/******* gestion de la liste du nombre de likes et de son ordement croissant  *******/

					// let  lisNumberLikeOrderCroissant = [] 
					let  lisNumberLikeOrderCroissant; 
                            
					lisNumberLikeOrderCroissant  = ProjetPhotographCurrent; //listeMediaUpdate

					//ordonnement de la liste du nombre de likes par ordre croissant
					lisNumberLikeOrderCroissant.sort( (a, b) => {           
						return a.likes - b.likes;
					});
                            
					//converion en string avant le stockage dans le local storage
					const lisNumberLikeOrderCroissantJSON = JSON.stringify(lisNumberLikeOrderCroissant);

					//stockage dans le local storage
					localStorage.setItem("listeArticlesCroissanteLikes", lisNumberLikeOrderCroissantJSON);


					/******* gestion de la liste des dates et de son ordement croissant  *******/
                            
                           
					lisNumberLikeOrderCroissant  = ProjetPhotographCurrent;
					let listeDateOrderCroissant = ProjetPhotographCurrent;

					//listeDateOrderCroissantDate = listeMediaUpdate

					//ordonnement de la liste de dates par ordre croissant
					listeDateOrderCroissant.sort( (a, b) => {
    
						return new Date(a.date) - new Date(b.date);  //conversion en entier de la date
					});

					//converion en string avant le stockage dans le local storage
					const listeDateOrderCroissantJSON = JSON.stringify(listeDateOrderCroissant);

					//stockage dans le local storage
					localStorage.setItem("listeDateOrderCroissant", listeDateOrderCroissantJSON);

					/******* gestion de la liste des titres et de son ordement croissant  *******/
					let listeTitreOrderCroissant;

					listeTitreOrderCroissant = ProjetPhotographCurrent;

					//ordonnement de la liste des titres par ordre croissant
					listeTitreOrderCroissant.sort( (a, b) => {
         
						return a.title.localeCompare(b.title) ;  //.replace(/\s+/g, '')
					});

					//converion en string avant le stockage dans le local storage
					const listeTitreOrderCroissantJSON = JSON.stringify(listeTitreOrderCroissant);

					//stockage dans le local storage
					localStorage.setItem("listeTitreOrderCroissant", listeTitreOrderCroissantJSON);

				}

			}

		};

		//éxécution de la fonction listeFilterUpdateFunction
		listeFilterUpdateFunction();

		/***************** gestion  et création du formulaire  du trie ********************** */

		//récupération des élément
		const filterTitre1 = document.querySelector(".titreFilter1");
		const filterTitre2 = document.querySelector(".titreFilter2");
		//const arrowUp = document.querySelector(".arrowUp");
		const listeUlContainer = document.querySelector(".listeUlContainer");
		const btnPopularite1 = document.querySelector(".btnPopularite1");
		const btnPopularite2 = document.querySelector(".btnPopularite2");
		const spanPopularite1 = document.querySelector(".spanPopularite1");
		const btnDate = document.querySelector(".btnDate");
		const btnTitre = document.querySelector(".btnTitre");
		//const deuxiemeFormulaire = document.querySelector("#deuxiemeFormulaire");

		//gestion du masquage du premier bouton popularité et apparution de la liste déroulante
		btnPopularite1.addEventListener("click",() => {

			btnPopularite1.value;

			btnPopularite1.style.display = "none";
			filterTitre1.style.display = "none";

			filterTitre2.style.display = "block";
			listeUlContainer.style.display = "block";



		});


		let listevalueFilter = [ "Popularite", "Date", "Titre"];

		//gestion du bouton btnPopularite2
		btnPopularite2.addEventListener("click", ()=>{

			switch(btnPopularite2.value ){

			case listevalueFilter[0] :
                    
				//console.log("**** bienvenue dans le cas Popularite");
                        
				btnPopularite1.style.display = "block";
				spanPopularite1.innerText = "Popularité";
				filterTitre1.style.display = "block";

				filterTitre2.style.display = "none";
				listeUlContainer.style.display = "none";



				// Récupération de la valeur sélectionnée
				selectValue = btnPopularite2.value;

				//ajout dans le local storage
				localStorage.setItem("selectValue", selectValue );

				//éxécution de la fonction de gestion d'affichage des medias
				updatefilterPage(selectValue); 

				break;
			}


		});

		//gestion du bouton btnDate
		btnDate.addEventListener("click", ()=>{

			switch(btnDate.value ){

			case listevalueFilter[1] :
                          
				btnPopularite1.style.display = "block";
				spanPopularite1.innerText = "Date";
				filterTitre1.style.display = "block";

				filterTitre2.style.display = "none";
				listeUlContainer.style.display = "none";

				// Récupération de la valeur sélectionnée
				selectValue = btnDate.value;

				//ajout dans le local storage
				localStorage.setItem("selectValue", selectValue );

				//éxécution de la fonction de gestion d'affichage des medias
				updatefilterPage(selectValue); 

				break;
			}


		});

		//gestion du bouton btnTitre
		btnTitre.addEventListener("click", ()=>{

			switch(btnTitre.value ){

			case listevalueFilter[2] :
                  
				btnPopularite1.style.display = "block";
				spanPopularite1.innerText = "Titre";
				filterTitre1.style.display = "block";
				filterTitre2.style.display = "none";
				listeUlContainer.style.display = "none";

				// Récupération de la valeur sélectionnée
				selectValue = btnTitre.value;

				//ajout dans le local storage
				localStorage.setItem("selectValue", selectValue );
  
				//éxécution de la fonction de gestion d'affichage des medias
				updatefilterPage(selectValue); 

				break;
			}


		});

		// Ajout de l'événement 'beforeunload' à la fenêtre qui permet d'éxécuter un code avant actualisation de la page
		//ici je supprime selectValue du localstorage à chaque actualisation de la page
		window.addEventListener("beforeunload", ()=>{

			// Supprimer de selectValue du localStorage
			//localStorage.removeItem('selectValue');
			localStorage.clear();

		});

		//fonction d'affichage des articles mis à jour
		const showNewArticleFunction = ( ) => { //selectValue

			//récupération de lavaleur du filtre dans le local storage
			let selectValueLocalStorage = localStorage.getItem("selectValue");
              
			//récupération de la lisNumberLikeOrderCroissantJSON   dans le local storage
			const lisNumberLikeOrderCroissantJSON  = localStorage.getItem("listeArticlesCroissanteLikes");

			//convertion en tableau normal
			const lisNumberLikeOrderCroissant = JSON.parse(lisNumberLikeOrderCroissantJSON);

			/******  gestion de la récupération de la liste listeDateOrderCroissantDate ******* */

			const listeDateOrderCroissantDateJSON = localStorage.getItem("listeDateOrderCroissant");

			//convertion en tableau normal
			const listeDateOrderCroissantDate = JSON.parse(listeDateOrderCroissantDateJSON);

			/******  gestion de la récupération de la liste des titres croissants ******* */

			const listeTitreOrderCroissantJSON = localStorage.getItem("listeTitreOrderCroissant");

			//convertion en tableau normal
			const listeTitreOrderCroissant = JSON.parse(listeTitreOrderCroissantJSON);

			//creation des mediadias avec la factory function
			function createArticle( mediaData ){

				//console.log(mediaData);
				
				if(mediaData.video){

					articleItem = `

						<article class="articlePortfolioitem articlePopularite"  > 
						
							<div class="articlePortfolio__item">
					
								<button  value=${mediaData.id} class="articlePortfolio__item--img imgVideo${mediaData.id} btnMediaDisabled" > 
								
									<video class="videoMiniature" src="./assets/photographersMedia/${mediaData.video}" > 
									
								</button>
								
								<div class="articlePortfolio__item--description description">
								
									<p class="description__titre" > ${mediaData.title}  </p>
						
									<div class="description__numLike"> 
   
									<div class= "numberLikes ${mediaData.title.replace(/\s+/g, "")}  ${mediaData.id}"  id= ${mediaData.title.replace(/\s+/g, "")}  data-idMediaCurrent =${mediaData.id} > ${mediaData.likes}  </div> 
											
										<button  value=${mediaData.id} class="heartLikeMedia btnMediaDisabled ${mediaData.title.replace(/\s+/g, "")}" data-idMediaCurrent =${mediaData.id} >  <i class="fa-solid fa-heart" ></i> </button>

									</div>
									
								</div>

							</div>
					
						</article> 
					
						`;

					popularite.innerHTML += articleItem;
					

				}else{


					articleItem = `

					<article class="articlePortfolioitem articlePopularite" > 
					
						<div class="articlePortfolio__item">
				
							<button  value=${mediaData.id} class="articlePortfolio__item--img imgVideo${mediaData.id} btnMediaDisabled">
							
								<img class="child" src="./assets/photographersMedia/${mediaData.image}" alt= "${mediaData.title}" />
							
							</button>
							
							<div class="articlePortfolio__item--description description">
								<p class="description__titre" > ${mediaData.title}  </p>
					
								<div class="description__numLike"> 
	   
								<div class= "numberLikes ${mediaData.title.replace(/\s+/g, "")}  ${mediaData.id}"   data-idMediaCurrent =${mediaData.id} > ${mediaData.likes}  </div> 
										
									<button  value=${mediaData.id} class="heartLikeMedia btnMediaDisabled ${mediaData.title.replace(/\s+/g, "")} " data-idMediaCurrent =${mediaData.id} >  <i class="fa-solid fa-heart " ></i> </button>

								</div>
								
							</div>

						</div>
				
					</article> 
				
					`;

					popularite.innerHTML += articleItem;

				}

			} 

			// Fonction pour supprimer tous les éléments enfants de l'élément parent (popularite)
			const supprimerEnfants = () => {

				//supression du premier enfant jusqu'à ce qu'il y'en a plus
				while (popularite.firstChild) {
					popularite.removeChild(popularite.firstChild);
				}
			};

			//condition sur la donnée qui est dans le localstorage si c'est popularite
			if( !selectValueLocalStorage ) {   

				// Suppression de certains tableaux du localStorage qu'on ne veut pas utiliser actuellement
				localStorage.removeItem("listeTitreOrderCroissant");
				localStorage.removeItem("listeDateOrderCroissant"); 
				// localStorage.removeItem('listeTitreOrderCroissant');
                    
				
				supprimerEnfants();

				//rangement par nombre de likes croissants
				for(let i = 0; i < lisNumberLikeOrderCroissant.length; i++){

					let lisNumberLikeOrderCroissant1 = lisNumberLikeOrderCroissant[i];

					createArticle(lisNumberLikeOrderCroissant1 );

				}

				//rangement par ordre de dates croissantes
			} else if(  selectValueLocalStorage === "Popularite" && lisNumberLikeOrderCroissant ) {   //selectValueLocalStorage 

				// Suppression de certains tableaux du localStorage qu'on ne veut pas utiliser actuellement
				localStorage.removeItem("listeTitreOrderCroissant");
				localStorage.removeItem("listeDateOrderCroissant"); 
				
				supprimerEnfants();

				//rangement par nombre de likes croissants
				for(let i = 0; i < lisNumberLikeOrderCroissant.length; i++){

					let lisNumberLikeOrderCroissant1 = lisNumberLikeOrderCroissant[i];

					console.log("lisNumberLikeOrderCroissant1");
					console.log(lisNumberLikeOrderCroissant1);

					createArticle(lisNumberLikeOrderCroissant1 );

					//éxécution de la fonction likeIncrementFunction();
					likeIncrementFunction();

					//éxécution openLightliboxFunction();
					openLightliboxFunction();

				}

			}
			
			
			else if( selectValueLocalStorage === "Date" && listeDateOrderCroissantDate ) {   //selectValueLocalStorage === "Date" &&

				// Suppression de certains tableaux du localStorage
				localStorage.removeItem("lisNumberLikeOrderCroissant");
				localStorage.removeItem("listeTitreOrderCroissant");
				localStorage.removeItem("listeArticlesCroissanteLikes"); //listeArticlesOrderCroissant 
                   
				supprimerEnfants();

				for(let i = 0; i < listeDateOrderCroissantDate.length; i++){

					let listeDateOrderCroissantDate1 = listeDateOrderCroissantDate[i];

					createArticle(listeDateOrderCroissantDate1 );

					//éxécution de la fonction likeIncrementFunction();
					likeIncrementFunction();

					//éxécution openLightliboxFunction();
					openLightliboxFunction();


				}
               
				//rangement par ordre de titre croissant
			} else if( selectValueLocalStorage === "Titre" && listeTitreOrderCroissant ) {   //selectValueLocalStorage === "Titre" &&

				// Suppression de certains tableaux du localStorage
				localStorage.removeItem("listeDateOrderCroissant"); 
				localStorage.removeItem("lisNumberLikeOrderCroissant");
				localStorage.removeItem("listeArticlesCroissanteLikes"); 
                 
				supprimerEnfants();

				for(let i = 0; i < listeTitreOrderCroissant.length; i++){

					let listeTitreOrderCroissant1 = listeTitreOrderCroissant[i];

					createArticle(listeTitreOrderCroissant1);

					//éxécution de la fonction likeIncrementFunction();
					likeIncrementFunction();

					//éxécution openLightliboxFunction();
					openLightliboxFunction();


				}

			}  

		};

		showNewArticleFunction();

		
	};

	updatefilterPage(); 
	

	/*************** gestion des likes et du total des likes   *********************/

	//récupération de tous les coeurs
	const listeMedia = document.getElementsByClassName("heartLikeMedia");

	const likeIncrementFunction=() =>{ 

		for( let j=0; j< listeMedia.length; j++){

			let  currentElementHeart = listeMedia[j];

			// Obtation la valeur de l'attribut data-custom-data
			let customDataValue = currentElementHeart.getAttribute("data-idMediaCurrent");

			
			// Gestionnaire d'événement pour "click" avec accès au dataset
			currentElementHeart.addEventListener("click", function() {

				let listeMediaValue = ProjetPhotographCurrent;
				//conversion de en entier
				let idMediaCurrent= parseInt(customDataValue);

				//récupération de l'objet du média encours
				const mediaCurrent = listeMediaValue.find( item => item.id === idMediaCurrent );
				
				//récupération de l'objet média en cours mais dans la liste de media d'origine
				//car je veux le nombre de likes innitial pour faire la différence avec le nouveau
				const mediaCurrentOrigin = listeMediaOriginLocalstorage.find( item => item.id === idMediaCurrent );

				//supression des espaces dans toutes la chaine avec cette expression régulière .replace(/\s+/g, '')
				let titleMedia = mediaCurrent.title.replace(/\s+/g, "");

				//récupération du  nombre de likes en question
				let numberLikeCurrent = document.querySelector(`.${titleMedia}`);
				
				// Récupération des données dans le localstorage
				let titleLocastorage = localStorage.getItem(`${titleMedia}`);

				//vérification si  ce title est déjà dans le localstorage
				if(titleLocastorage  ){

					if(mediaCurrentOrigin.likes < mediaCurrent.likes){

						numberLikeCurrent.innerText = mediaCurrentOrigin.likes;
					
						//mise à jour de likes dans l'objet mediaCurrent
						mediaCurrent.likes = mediaCurrentOrigin.likes; 

						//mise à jour du localstorage
						localStorage.setItem(`${titleMedia}`, `${mediaCurrentOrigin.likes}`);

					}else{

						numberLikeCurrent.innerText = mediaCurrentOrigin.likes + 1;
					
						//mise à jour de likes dans l'objet mediaCurrent
						mediaCurrent.likes = mediaCurrentOrigin.likes + 1;

						//mise à jour du localstorage
						localStorage.setItem(`${titleMedia}`, `${mediaCurrent.likes}`);
						
					}
					

					//éxécution de la fonction de mise a jour du like du dom
					updateNumberlikesFunction(customDataValue, titleMedia, numberLikeCurrent );

					//éxécution de la fonction totalLikePriceFunction de mis à jour du total de likes
					totalLikePriceFunction();


				}else{

					let likeValue = parseInt(numberLikeCurrent.innerText);
					let likeIncrement = likeValue + 1;

					//mise à jour de l'objet encours
					mediaCurrent.likes = likeIncrement; //mise à jour de likes dans l'objet mediaCurrent

					//mise à jour du localstorage
					localStorage.setItem(`${titleMedia}`, `${likeIncrement}`);

					//éxécution de la fonction de mise a jour du like du dom
					updateNumberlikesFunction(customDataValue, titleMedia,numberLikeCurrent );

					//éxécution de la fonction totalLikePriceFunction de mis à jour du total de likes
					totalLikePriceFunction();

				

				}
				
				let incrementation = 1;
				totalLikePriceFunction(incrementation);

			});

		}
	};

	likeIncrementFunction();

	//////////////////////////////////////
	/*
	let listHeartLikeMedia = document.getElementsByClassName("heartLikeMedia");
	// console.log("****listHeartLikeMedia");
	// console.log(listHeartLikeMedia);
	//console.log(listHeartLikeMedia.getAttribute("class"));

	for(let l=0; l<listHeartLikeMedia.length; l++){

		let coeurCurrent = listHeartLikeMedia[l].getAttribute("class").split(" ")[2];
		//console.log(coeurCurrent.getAttribute("class").split(" ")[2]);
		console.log(coeurCurrent);

	}*/

	//////////////////////////////////////
	//mise à jour du nombre de likes après la mise à jour du localstorage
	const updateNumberlikesFunction = () =>{

		const listeMedia = document.getElementsByClassName("heartLikeMedia");//

		
		for( let k=0; k< listeMedia.length; k++){ 

			let  currentElementHeart = listeMedia[k]; 


			// Obtation la valeur de l'attribut data-custom-data qui est un id
			let customDataValue = currentElementHeart.getAttribute("data-idMediaCurrent");

			// Obtation la valeur de l'attribut data-custom-data qui est un id
			//let titleValue = currentElementHeart.getAttribute("id");//id

			//récupération des valeurs de chaque class ici le title
			let  titleValue = currentElementHeart.getAttribute("class").split(" ")[2]; 
			//console.log(titleValue);

			// Récupération de toutes les clés stockées dans le localStorage
			//s'il contient quelque chose
			const testLocalstorageExist = Object.keys(localStorage);

			if(testLocalstorageExist ){

				/////////////////////////////////:
				for(let l=0; l<testLocalstorageExist.length; l++){

					let localValueCurrent = testLocalstorageExist[l];

					if( localValueCurrent.trim() === titleValue.trim() ) {

						let listeMediaValue = ProjetPhotographCurrent;
						//conversion de en entier
						let idMediaCurrent= parseInt(customDataValue);
            
						//récupération de l'objet du média encours
						const mediaCurrent = listeMediaValue.find( item => item.id === idMediaCurrent );
                            
						//supression des espaces dans toutes la chaine avec cette expression régulière .replace(/\s+/g, '')
						let titleMedia = mediaCurrent.title.replace(/\s+/g, "");
            
						//récupération du  nombre de likes en question
						let numberLikeCurrent = document.querySelector(`.${titleMedia}`);
                        
						// Récupération des données dans le localstorage
						let titleLocastorage = localStorage.getItem(`${titleMedia}`);
            
						numberLikeCurrent.innerText = parseInt(titleLocastorage);

					}else{

						console.log("***** customDataValue est vide pas de mise à jour des likes pour l'instant ****");
                
					}

				}
                
			}      

		}
            
	};

	updateNumberlikesFunction(); 

	function totalLikePriceFunction(){

		let tableValueLike = [];

		//récupération de tous les éléments likes
		const listeNumberLikes = document.getElementsByClassName("numberLikes");

		for( let k=0; k< listeNumberLikes.length; k++){ 

			let  currentElementLike = listeNumberLikes[k];
			let customDataLike = parseInt(currentElementLike.innerText) ;

			tableValueLike.push(customDataLike);

		}

		//récupération du photographe encour
		let photographerCurrent = photographers.find( item => item.id === parseInt(idPhotographer) );

		//addition des likes du photographe encours
		let totalLikes = tableValueLike.reduce( (acc, current)=> {
    
			return acc + current;
		}, 0);
    
		//récupération de l'élément
		let priceLikeTotal = document.querySelector(".priceLikeTotal");
    
		let priceLikeTotalBlock = `
                
                    
                    <div class="totalBlock">
                        <p class="priceLikeTotal__like"> 
                        
                            <span class="total"> ${ totalLikes } </span>
                            <span class="priceLikeTotal__like--like"> <i class="fa-solid fa-heart iconheartLike"></i>  </span>
                                    
                        </p>
                        <p class="priceLikeTotal__like price">  ${photographerCurrent.price}€ / jour  </p>
                    </div>
                    
                    
                
                `;
    
		//insertion de l'html dans l'élément ciblé
		priceLikeTotal.innerHTML = priceLikeTotalBlock ;
                
	}

	totalLikePriceFunction();

	/****************************  gestion du formulaire contactez-moi******************************************** */


	let contact_button = document.querySelector(".contact_button");

	let photographHeader = document.querySelector(".photograph-header");
	let containerFormulaireContact1 = document.querySelector(".containerFormulaireContact");

	let sectionMain = document.querySelector(".sectionMain");
   
	// Création du formulaire.
	const formulaireContact = `

    
    <section id="formulaireContact"  aria-label="coordonnees du photographe" aria-label="Formulaire de contact du photographe" >
    
        <div class="titreContact ">
            <p class="titreContact__itre"> contactez-moi ${nomForm} </p>
           
            <button class="titreContact__image">
                <i class="fa-solid fa-x iconLockModal" ></i>
            </button>
        </div> 

        <p  class="conatainerItem" >
            <label for="prenom"  class="tailleContainer" >Prénom </label>
            <input type="text" id="prenom" name="prenom" class="tailleContainer input1 input" placeholder="Henri Matis" >
        </p>

        <p  class="conatainerItem">
            <label for="nom" class="tailleContainer">Nom </label>
            <input type="text" id="nom" name="nom" class="tailleContainer input"  placeholder="Pierre" >
        </p>

        <p  class="conatainerItem">
            <label for="email" class="tailleContainer">Email </label>
            <input type="email" id="email" name="email" class="tailleContainer input"  placeholder="henripierre@yahoo.fr">
        </p>

        <p  class="conatainerItem">
            <label for="message" class="tailleContainer message">Message </label>
            <textarea id="message" name="message"   class="tailleContainer input"  placeholder="Entrez votre message " ></textarea>
        </p>

      
        <input type="submit" value="Envoyer"  class="inputbtn input" >
     
       

    </section>
    `;

	// Ajout du formulaire au conteneur sélectionné.
	containerFormulaireContact1.innerHTML = formulaireContact;

	//récupération de tous les containers des images 
	const btnMediaDisabled = document.getElementsByClassName("btnMediaDisabled");

	//récupération de l'image croix 
	let imageCroix = document.querySelector(".titreContact__image");

	//insertion de l'evennement pour la fermeture de la modale
	imageCroix.addEventListener("click", () =>{

		containerFormulaireContact1.style.display = "none";

		//gestion de l'opacité du reste de la page pour grise la page en arrière plant du formulaire
		photographHeader.style.opacity = 1;
		sectionMain.style.opacity = 1;

		//insersion de la propriété disabled dans tous les likes et block des images pour revenir à l'état innitiale
		for(let l=0; l<btnMediaDisabled.length; l++){


			let btnMediaDisabledCurrent = btnMediaDisabled[l];
			btnMediaDisabledCurrent.removeAttribute("disabled");
			btnMediaDisabledCurrent.style.cursor = "pointer";
			
		}

	});


	//insertion de l'evennement pour ouvrir la modale
	contact_button.addEventListener( "click", () =>{

		containerFormulaireContact1.style.display = "block";

		//gestion de l'opacité du reste de la page pour grise la page en arrière plant du formulaire
		photographHeader.style.opacity = 0.5;
		sectionMain.style.opacity = 0.5;
		imageCroix.focus();
		
			
		sectionMain.addEventListener("focusin", () => {

			containerFormulaireContact1.style.display = "none";
			//gestion de l'opacité du reste de la page pour grise la page en arrière plant du formulaire
			photographHeader.style.opacity = 1;
			sectionMain.style.opacity = 1;

			//insersion de la propriété disabled dans tous les likes et block des images pour revenir à l'état innitiale
			for(let l=0; l<btnMediaDisabled.length; l++){


				let btnMediaDisabledCurrent = btnMediaDisabled[l];
				btnMediaDisabledCurrent.removeAttribute("disabled");
				btnMediaDisabledCurrent.style.cursor = "pointer";
				
			}

		});

		//insersion de la propriété disabled dans tous les likes et block des images
		for(let l=0; l<btnMediaDisabled.length; l++){


			let btnMediaDisabledCurrent = btnMediaDisabled[l];
			btnMediaDisabledCurrent.setAttribute("disabled", "disabled");
			btnMediaDisabledCurrent.style.cursor = "default";
			

		}
		

		
	});

	let inputbtn = document.querySelector(".inputbtn");

	//récupération de tous les champs de formulaire
	const prenom = document.querySelector("#prenom");
	const nom = document.querySelector("#nom");
	const email = document.querySelector("#email");
	const message = document.querySelector("#message");


	// Ajout d'un événement pour le submit
	inputbtn.addEventListener("click",() => {
       
		// Afficheage des valeurs dans la console
		console.log("Preom : " + prenom.value);
		console.log("Nom : " + nom.value);
		console.log("Email : " + email.value);
		console.log("Message : " + message.value);
		
		//vidage des champs du formulaire
		prenom.value = "";
		nom.value = "";
		email.value = "";
		message.value = "";


		containerFormulaireContact1.style.display = "none";

		//gestion de l'opacité du reste de la page pour grise la page en arrière plant du formulaire
		photographHeader.style.opacity = 1;
		sectionMain.style.opacity = 1;

		//insersion de la propriété disabled dans tous les likes et block des images pour revenir à l'état innitiale
		for(let l=0; l<btnMediaDisabled.length; l++){


			let btnMediaDisabledCurrent = btnMediaDisabled[l];
			btnMediaDisabledCurrent.removeAttribute("disabled");
			btnMediaDisabledCurrent.style.cursor = "pointer";
			
		}

	});


	/***************************** gestion de la lightbox ******************************************** */
	const mediaPhotographe = ProjetPhotographCurrent;

	//récupération des images de media 
	let imageMedia = mediaPhotographe.map(item => item.image || item.video);

	let titreMedia = mediaPhotographe.map(item => item.title );
    
	//récupération de la taille du tableau des images de medias
	let currentIndex = 0;

	const createLightboxFunction = ( imageMedia2, titreMedia2, listeLightboxFilnal ) => {
		

		const lightbox = `
		
			<div class="lightbox">

				

				<div class="arrowContainerlightbox">

					<div class="lockLightbox">
					
					</div>

					<div class="arrowrigthLeft arrowleft">
						<button class="prev-button"  >
							<i class="fa-solid fa-angle-left prev-button"></i>
						</button  >
					</div>
				
				</div>

				<div class="containerMediaImg imageContainer" style="display: block;" >

					<div class="image" >

						<img class="child" src="./assets/photographersMedia/${imageMedia[0]}" alt="${titreMedia[0]}" /> 
					</div>
					<div class="titreLightbox">${titreMedia[0]}</div>

				</div>
				
					
				<div class="containerMediaImg videoContainer" style="display: none;">
					<div class="videoContainer image">
						<video class="video" src="./assets/photographersMedia/${imageMedia[0]}" >
						</video>
					</div>
					<div class="titreLightbox">${titreMedia[0]}</div>
				</div>

				<div class="arrowContainerlightbox">

					<button class="lockLightbox lockLightboxBtn" >
						<i class="fa-solid fa-x" ></i>
					</button>

					<div class="arrowrigthLeft arrowrigth ">

						<button class=" next-button" >
							<i class="fa-solid fa-angle-right "></i>
						</button>

					</div>
				
				</div>

			</div>
		
		
		
		`;

		//récupération de la section de la modale containerLightbox
		const containerLightbox = document.querySelector(".containerLightbox");
		containerLightbox.innerHTML = lightbox;


		//récupération des élements
		const imageContainer = document.querySelector(".imageContainer");
		//const imagelightbox = document.querySelector(".image");
		const videoContainer = document.querySelector(".videoContainer");
		const videolightbox = document.querySelector(".video");
		const titreLightbox= document.querySelector(".titreLightbox");
		const prevButton = document.querySelector(".prev-button");
		const nextButton = document.querySelector(".next-button");
		const child = document.querySelector(".child");


		//gestion de l'index de l'image
		const showImage = (index) => {

			console.log(index);

			if(imageMedia2){
				if( imageMedia2[index].includes("jpg") ){  //listeLightboxFilnal imageMedia2[index]

					console.log("**** bienvenue dans les images");
					
					videoContainer.style.display = "none";
					imageContainer.style.display = "block";
					//imagelightbox.style.backgroundImage = `url(./assets/photographersMedia/${imageMedia[index]})`;
					child.src = `./assets/photographersMedia/${imageMedia2[index]}`;
					child.alt = `${titreMedia2[index]}`;
					titreLightbox.innerText = titreMedia2[index]; // titreMedia2 

				}else if( imageMedia2[index].includes("mp4") ){

					console.log(" ***** bienvenue dans les vidéos");

					videoContainer.style.display = "block";
					imageContainer.style.display = "none";

					videolightbox.src = `./assets/photographersMedia/${imageMedia2[index]}`;
					videolightbox.controls = true;
				}
			}
			

		};

		//gestion des images suivantes
		const showNextImage = ()=> {

			currentIndex = (currentIndex + 1) % imageMedia2.length; //modulo permet de récupérer la partie entière supérieure 1%2 = 1 ou 2/2 1
			showImage(currentIndex);

		};

		const showPreviousImage = () =>{
			currentIndex = (currentIndex - 1 + imageMedia2.length) % imageMedia2.length;
			showImage(currentIndex);
		};

		prevButton.addEventListener("click", showPreviousImage);
		nextButton.addEventListener("click", showNextImage);

		showImage(currentIndex);

		//récupération du bouton de fermeture de la galerie
		const lockGalerie = document.querySelector(".lockLightboxBtn");

		lockGalerie.addEventListener("click", ()=> {

			//modification de l'attribut aria-hidden de chaque section
			for( let a=0; a < sections.length; a++){
	
				let elementCurrent = sections[a];
	
				//modification de l'attribut aria-hidden en true pour le rendre accessible des lecteurs
				elementCurrent.setAttribute("aria-hidden", "true");
	
				//modification de l'attribut aria-hidden en false pour le masquer des lecteurs
				containerLightbox.setAttribute("aria-hidden", "false");
	
					
			}
			
			containerLightbox.style.display = "none";
			sectionMain.style.display = "block";
			sectionProfile.style.display = "block";
			
			//réinitialisation de l'index de la liste de la lightbox à 0 pour tout reprendre après la fermeture 
			currentIndex=0;
			
		});

	};

	createLightboxFunction();

	const containerLightbox = document.querySelector(".containerLightbox");

	//récupération de toutes les images
	let photographerImg = document.getElementsByClassName("articlePortfolio__item--img");
	//récupération du bouton de fermeture de la galerie
	const lockGalerie = document.querySelector(".lockLightboxBtn");

	// console.log(photographerImg)

	const sectionProfile = document.querySelector(".sectionProfile");

	//récupération des sections 
	let sections = document.getElementsByClassName("ariaHiddenElement");
	
	const openLightliboxFunction = () => {

	
		//gestion de l'ouverture de la galerie ou modale
		for( let i =0; i<photographerImg.length;i++){

			let imageencours = photographerImg[i];
		

			imageencours.addEventListener("click", ()=>{

				/////////////////////////////:::::::::
				/*const listeDateJSON = localStorage.getItem("listeDateOrderCroissant");
				const listeTitreJSON = localStorage.getItem("listeTitreOrderCroissant");
				const listePopulariteJSON = localStorage.getItem("listeArticlesCroissanteLikes");
				*/
				let listeFilterValue;
				let listeOrder=["listeDateOrderCroissant","listeTitreOrderCroissant", "listeArticlesCroissanteLikes" ];
				
				for(let i=0; i<listeOrder.length; i++){

					let myListCurrent = listeOrder[i];
					
					//récupération et conversion en json de la liste ordonnée du localstorage
					// const listeJSON = JSON.parse( localStorage.getItem( {myListCurrent} ) );
					const listeJSON =  localStorage.getItem( `${myListCurrent}` );
					//console.log(JSON.parse(listeJSON));
					// Récupération de toutes les clés stockées dans le localStorage
					//s'il contient quelque chose
					
					if( JSON.parse(listeJSON) ){

						console.log("**** bienvenue dans la condition");
						listeFilterValue = JSON.parse(listeJSON);

						
					}

					// console.log(listeFilterValue);
				}
				console.log(listeFilterValue);

				
				///////////////////////////////////////////


				console.log("*** bienvenue au  imageencours.addEventListener");
				
				//récupération de l'objet sur lequel on a cliqué
				const ObjectCurrentClick = mediaPhotographe.filter( item => item.id === parseInt(imageencours.value));
			
				//retrait de l'élément sur lequel on a cliqué 
				// let listeNewMediaFirstElementUpdate = mediaPhotographe.filter( item => item.id != parseInt(imageencours.value));
				let listeNewMediaFirstElementUpdate = listeFilterValue.filter( item => item.id != parseInt(imageencours.value));
			
				//rajout de l'élément sur lequel on a cliqué pour qu'il soit en première position
				//dans le but de l'afficher en premier sur la lightbox
				listeNewMediaFirstElementUpdate.unshift(ObjectCurrentClick[0]); // Modifie la liste d'origine
				let listeLightboxFilnal = listeNewMediaFirstElementUpdate;

				//récupération des images de media 
				let imageMedia2 = listeLightboxFilnal.map(item => item.image || item.video);

				let titreMedia2 = listeLightboxFilnal.map(item => item.title );
				
				createLightboxFunction(imageMedia2, titreMedia2, listeLightboxFilnal); //new

				containerLightbox.style.display = "block";
				sectionMain.style.display = "none";
				sectionProfile.style.display = "none";
				lockGalerie.focus();

			});
		}

	};

	//éxécution de openLightliboxFunction();
	openLightliboxFunction();
    
	
}


//fonction d'éxécusion 
async function initonePhotographerDataTemplate() {

	// Récupération de photographers, photographersMedia dans la  fonction onePhotographerData() en destructurant
	const { photographers, photographersMedia } = await onePhotographerData(); 

    
	onePhotographerDataTemplate(photographers, photographersMedia);  
	
   
}

initonePhotographerDataTemplate();



