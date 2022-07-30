let parsato;
async function createTable(){
    let fetchato = await fetch("https://api.spaceflightnewsapi.net/v3/articles ")
    parsato = await fetchato.json();
}

function createCard($articolo){
    document.querySelector('body').appendChild(document.createElement('div'))
    let date = $articolo.publishedAt
    let fixedDate = date.slice(0,10);
    let joinString = $articolo.newsSite.split(" ").join("")
    document.querySelector('body > div:last-child').innerHTML = 
    `<div class="card ${joinString} shown" id="${$articolo.id}"> 
    <img src= "${$articolo.imageUrl}" alt ="Article image">
    <div>
    <h4> ${$articolo.title} </h4>
    <a href="${$articolo.url}" >Link to the full article</a>
    <p>Date: ${fixedDate} </p>
    </div>
    </div>`
}


createTable().then(()=>{
    parsato.forEach((item)=>{
        createCard(item)
    })

    let select = document.querySelector('#myselect');
    document.querySelector("div.select > p").addEventListener("click",()=>{
        select.value = "nofilter"
        document.querySelectorAll('.SpaceNews').forEach(item => {item.style.display = ""; item.classList.add('shown')})
        document.querySelectorAll('.NASASpaceflight').forEach(item => {item.style.display = ""; item.classList.add('shown')})
        document.querySelectorAll('.SpaceflightNow').forEach(item => {item.style.display = ""; item.classList.add('shown')})
        document.querySelectorAll('.NASA').forEach(item => {item.style.display = ""; item.classList.add('shown')})
        document.querySelectorAll('.Teslarati').forEach(item => {item.style.display = ""; item.classList.add('shown')})
        })

        select.addEventListener('change', ()=>{
            
        if(select.options[select.selectedIndex].value==='nasa'){
            document.querySelectorAll('.SpaceNews').forEach(item => {item.style.display = "none"; item.classList.remove('shown')})
            document.querySelectorAll('.NASASpaceflight').forEach(item => {item.style.display = "none"; item.classList.remove('shown')})
            document.querySelectorAll('.SpaceflightNow').forEach(item => {item.style.display = "none"; item.classList.remove('shown')})
            document.querySelectorAll('.Teslarati').forEach(item => {item.style.display = "none"; item.classList.remove('shown')})
            document.querySelectorAll('.NASA').forEach(item => {item.style.display = ""; item.classList.add('shown')})
        }

        else if(select.options[select.selectedIndex].value==='spaceNews'){
            document.querySelectorAll('.NASA').forEach(item => {item.style.display = "none"; item.classList.remove('shown')})
            document.querySelectorAll('.NASASpaceflight').forEach(item => {item.style.display = "none"; item.classList.remove('shown')})
            document.querySelectorAll('.SpaceflightNow').forEach(item => {item.style.display = "none"; item.classList.remove('shown')})
            document.querySelectorAll('.Teslarati').forEach(item => {item.style.display = "none"; item.classList.remove('shown')})
            document.querySelectorAll('.SpaceNews').forEach(item => {item.style.display = ""; item.classList.add('shown')})

        }

        else if(select.options[select.selectedIndex].value==='nasaSpaceflight'){
            document.querySelectorAll('.SpaceNews').forEach(item => {item.style.display = "none"; item.classList.remove('shown')})
            document.querySelectorAll('.NASA').forEach(item => {item.style.display = "none"; item.classList.remove('shown')})
            document.querySelectorAll('.SpaceflightNow').forEach(item => {item.style.display = "none"; item.classList.remove('shown')})
            document.querySelectorAll('.Teslarati').forEach(item => {item.style.display = "none"; item.classList.remove('shown')})
            document.querySelectorAll('.NASASpaceflight').forEach(item => {item.style.display = ""; item.classList.add('shown')})
        } 

        else if(select.options[select.selectedIndex].value==='spaceFlightNow'){
            document.querySelectorAll('.SpaceNews').forEach(item => {item.style.display = "none"; item.classList.remove('shown')})
            document.querySelectorAll('.NASASpaceflight').forEach(item => {item.style.display = "none"; item.classList.remove('shown')})
            document.querySelectorAll('.NASA').forEach(item => {item.style.display = "none"; item.classList.remove('shown')})
            document.querySelectorAll('.Teslarati').forEach(item => {item.style.display = "none"; item.classList.remove('shown')})
            document.querySelectorAll('.SpaceflightNow').forEach(item => {item.style.display = ""; item.classList.add('shown')})
        }
        else if(select.options[select.selectedIndex].value==='Teslarati'){
            document.querySelectorAll('.SpaceNews').forEach(item => {item.style.display = "none"; item.classList.remove('shown')})
            document.querySelectorAll('.NASASpaceflight').forEach(item => {item.style.display = "none"; item.classList.remove('shown')})
            document.querySelectorAll('.NASA').forEach(item => {item.style.display = "none"; item.classList.remove('shown')})
            document.querySelectorAll('.SpaceflightNow').forEach(item => {item.style.display = "none"; item.classList.remove('shown')})
            document.querySelectorAll('.Teslarati').forEach(item => {item.style.display = ""; item.classList.add('shown')})
        }
    })

    function download_csv(){
    let filtered = document.querySelectorAll(".shown");
    let ids = [];
    filtered.forEach(item => ids.push(Number(item.attributes[1].nodeValue)));
    
    let csvArray = [];
    parsato.forEach((item)=> {
        if(ids.includes(Number(item.id)))
       csvArray.push([`${item.title}`, `${item.url}`, `${item.newsSite}`, `${item.publishedAt}`])
    })

    let csvFile = 'Titolo;URL;Publisher;Date\n'
    csvArray.forEach((riga) => {
        csvFile += riga.join(";");
        csvFile += '\n'
    })

    let download = document.createElement('a');
    download.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvFile);
    download.target = '_blank';
    download.download = 'Lista articoli.csv'
    download.click();
    }

    document.querySelector('#downloadButton').addEventListener('click',()=>{
        download_csv()
    })
})