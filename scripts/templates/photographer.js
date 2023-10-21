/*
// eslint-disable-next-line no-unused-vars
 //export default function photographerTemplate(data) {


	const {
		id, name, portrait, city, country, tagline, price,
	} = data;

	console.log(`city : ${city}  * country : ${country} * tagline : ${tagline}  * price : ${price}`);

	const picture = `./assets/photographers/${portrait}`;

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
};

// export default photographerTemplate;

*/





