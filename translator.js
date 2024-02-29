// Variables declaration
const source = document.querySelector("#text1");
const target = document.querySelector("#text2");
const button = document.querySelector("#btn");
let sourceText;
let option;
let selectedLang = document.querySelector("#mySelect");


//Getting input value in text1
source.addEventListener("input",()=>{
	sourceText = source.value;  
	
	})

//Getting available languages
document.addEventListener("DOMContentLoaded", async()=>{
const url = 'https://text-translator2.p.rapidapi.com/getLanguages';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'd2eee8f2c3msh23c97b3abc4d134p14f73djsnb115d57f426f',
		'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	// console.log(result);
	if(result.data && result.data.languages){
		const languages = result.data.languages;
		languages.forEach((language)=> {
			option = document.createElement("option");
			option.value = language.code;
			option.text = language.name;
			selectedLang.appendChild(option);
		});
	}
} catch (error) {
	console.error(error);
}
});


//Getting translation
button.addEventListener("click", async()=>{
const selectedValue = selectedLang.value;
const url = 'https://text-translator2.p.rapidapi.com/translate';  
const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Key': 'd2eee8f2c3msh23c97b3abc4d134p14f73djsnb115d57f426f',
		'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
	},
	body: new URLSearchParams({
		source_language: 'auto',
		target_language: selectedValue,
		text: sourceText,
	})
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	target.textContent = result.data.translatedText;
} catch (error) {
	console.error(error);
}
});