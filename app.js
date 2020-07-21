const term=document.querySelector('#term');
const btn=document.querySelector('#search');
const radios=document.querySelectorAll('[name="radio"]');
const select =document.querySelector('#select');
let i=0;
btn.addEventListener('click',search);


function search(e){
e.preventDefault();

const termv=term.value;
let radiov;
radios.forEach(radio=>{
    if(radio.checked)
    radiov=radio.value;
})
const selectv=select.value;


if(termv==''){
    showmessage('Please Add A Search Term','alert alert-danger');
}

else{

    term.value='';
getdata(termv,radiov,selectv);
radios[0].checked=true;
}



}//end of search



function showmessage(message,classname){

    if(i==1)
    return;

    i=1;
    const div =document.createElement('div');

    div.innerHTML=`<div class="${classname}"> ${message}</div>`;
    const parent=document.querySelector('#all');
    const first=document.querySelector('#first');


    parent.insertBefore(div,first);

    setTimeout(()=>{

        parent.removeChild(div);
        i=0;

    },2000);
}


function getdata(termv,radiov,selectv){

const url=`http://www.reddit.com/search.json?q=${termv}&sort=${radiov}&limit=${selectv}`;

fetch(url)
.then(res=>{
    return res.json();
})
.then(data=>{
    let childs=data.data.children;

  childs=  childs.map(data=>{
        return data.data;
    })
displaydata(childs);
})
.catch(err=>{
    console.log(err);
})

}

function displaydata(data){
const results=document.querySelector('#results');
console.log(data);
let output ='<div class="card-columns">';
let image='';
   data.forEach((each)=>{
if(each.preview==undefined){
    image='img.jpg';
}
else{
    image=each.preview.images[0].source.url;
    console.log(image);
}

output+=`<div class="card">
<img class="card-img-top" src="${image}" alt="Card image cap">
<div class="card-body">
  <h5 class="card-title">${each.title}</h5>
  <p class="card-text">${shorten(each.selftext)}</p>
  <a href="https://www.reddit.com${each.permalink}" target="_blank" class="btn btn-primary">Read More</a>
  <hr>
  <span class="badge badge-secondary p-2">Subreddit: ${each.subreddit}</span>
  <span class="badge badge-dark p-2">Score: ${each.score}</span>
</div>
</div>`;



  
   })
   output+="</div>";
   results.innerHTML=output;
    

}


function shorten(text){
const shortened=text.indexOf(' ',100);
if(shortened==-1)return text;
return text.substring(0,shortened);
}