let parsato;
async function fetchData(){
    let fetchato = await fetch("https://api.spaceflightnewsapi.net/v3/articles ")
    parsato = await fetchato.json();
}

function createTable($articolo){
    // document.querySelector('body').appendChild(document.createElement('div'))
    let date = new Date($articolo.publishedAt)     
    let joinString = $articolo.newsSite.split(" ").join("")
    // document.querySelector('body > div:last-child').innerHTML = 
    // `<div class="card ${joinString} shown" id="${$articolo.id}" style="background: url(${$articolo.imageUrl}) center; background-size: 100% 100%;"> 
    // <div>
    // <h4> ${$articolo.title} </h4>
    // <a href="${$articolo.url}" >Link to the full article</a>
    // <p>Date: ${date.toLocaleDateString()} </p>
    // </div>
    // </div>`

    document.querySelector('body > table').appendChild(document.createElement('tr'));
    document.querySelector('table > tr:last-child').classList.add(joinString, 'shown')
    document.querySelector('table > tr:last-child').setAttribute('id',`${$articolo.id}`)
    document.querySelector('table > tr:last-child').innerHTML = 
    `<td> <h4>${$articolo.title}</h4> </td>
    <td> <a href="${$articolo.title}">Link</a></td>
    <td> <p>Date: ${date.toLocaleDateString()}</p> </td>
    <td> <img src="${$articolo.imageUrl}"></td>
    `

}


fetchData().then(()=>{
    parsato.forEach((item)=>{
        createTable(item)
    })

    let publishers = [];
    parsato.forEach(item => {
        if (publishers.includes(item.newsSite)){}
        else{publishers.push(item.newsSite)}
    })


    document.querySelector('div.side').appendChild(document.createElement('select'));
    let select = document.querySelector('select');
    select.classList.add("form-select", "form-select-sm");
    select.appendChild(document.createElement('option'))
    document.querySelector('option:last-child').setAttribute("value",'no-filter')

    publishers.forEach(item => {
        select.appendChild(document.createElement('option'))
        document.querySelector('option:last-child').setAttribute("value",`${item}`)
        document.querySelector('option:last-child').textContent = `${item}`
    })

    document.querySelector('div.side').appendChild(document.createElement('p'));
    document.querySelector('select + p:last-child').textContent = 'Reset filter'
    
    document.querySelector("select + p").addEventListener("click",()=>{
            select.value = "nofilter"
            document.querySelectorAll('tr').forEach(item => {item.classList.add('shown')});
            document.querySelectorAll('tr').forEach(item => {item.classList.remove('hidden')});
            })

    select.addEventListener('change',(event)=>{            
        
        if(event.target.value==='no-filter'){
        document.querySelectorAll('tr').forEach(item => {item.classList.add('shown')});
        document.querySelectorAll('tr').forEach(item => {item.classList.remove('hidden')});
        }
        else{
        document.querySelectorAll('tr:not(:first-child)').forEach(item => {
            if(item.classList.contains(event.target.value.split(" ").join(''))){
                item.classList.add('shown')
                item.classList.remove('hidden')
            }
            else{
                item.classList.add('hidden')
                item.classList.remove('shown')
            }
        })
    }
    })

    document.querySelector('div.side').appendChild(document.createElement('button'))
    document.querySelector('button').classList.add('btn', 'btn-primary')
    document.querySelector('button').textContent = 'Download CSV'

    function download_csv(){
    let filtered = document.querySelectorAll(".shown");
    let ids = [];
    filtered.forEach(item => ids.push(Number(item.id)));
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

    document.querySelector('.btn').addEventListener('click',()=>{
        download_csv()
    })
})