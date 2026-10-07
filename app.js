const docs=[
["Passport","Passport application","passport identity","Learn what to check before applying, renewing or replacing a passport."],
["Visa","Visa application","visa immigration travel","Identify the appropriate visa category and the information normally required."],
["Civil Certificate","Birth certificate","certificate birth civil","Information for requesting, correcting or replacing civil-status certificates."],
["Business","Business registration","business company registration","Understand registration steps, permits and related business documents."],
["Education","Academic documents","education certificate transcript","Information about certificates, transcripts and verification."],
["Employment","Work documentation","work employment permit","Guidance on employment records and work authorization documents."],
["Vehicle","Vehicle documents","vehicle driving registration","Information about registration and common vehicle documentation."],
["Property","Land & property","property land title","Understand common property records and the authority responsible for them."]
];
function render(items=docs){
 const box=document.getElementById("results");
 box.innerHTML=items.map(d=>`<article class="result"><span class="tag">${d[0]}</span><h3>${d[1]}</h3><p>${d[3]}</p><a href="#request" style="color:#175cd3;font-weight:750;font-size:13px" onclick="document.getElementById('type').value='${d[1]}'">Request help →</a></article>`).join("");
 document.getElementById("count").textContent=items.length+" guides";
}
function searchDocs(){
 const q=document.getElementById("search").value.toLowerCase().trim();
 render(q?docs.filter(d=>(d.join(" ")).toLowerCase().includes(q)):docs);
}
function setSearch(q){document.getElementById("search").value=q;searchDocs();document.getElementById("documents").scrollIntoView({behavior:"smooth"})}
function sendRequest(e){
  e.preventDefault();

  const whatsappNumber = "237675536894";
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const country = document.getElementById("country").value.trim();
  const type = document.getElementById("type").value;
  const message = document.getElementById("message").value.trim();

  const text = `Hello DocuHelp, I need documentation assistance.

Name: ${name}
Email: ${email}
Country: ${country}
Document needed: ${type}

Request:
${message}`;

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  window.open(whatsappUrl, "_blank");
}
function toggleLanguage(){
 const lang=document.documentElement.lang==="en"?"fr":"en";
 document.documentElement.lang=lang;
 document.querySelector(".lang").textContent=lang==="en"?"FR":"EN";
 document.querySelectorAll("[data-en]").forEach(el=>el.textContent=el.dataset[lang]);
 const input=document.getElementById("search");
 input.placeholder=input.dataset[lang+"Placeholder"];
}
function toggleMenu(){
  const nav=document.getElementById("mobileNav");
  nav.classList.toggle("open");
}
render();
