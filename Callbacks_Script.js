
const btnShowPosts = document.querySelector("#Btn_ShowPosts");

btnShowPosts.addEventListener("click", showPosts.bind(this));

let flag = false;
let Executed = false;


function showPosts(e){

    flag = !flag;

    const showElement = document.getElementById("Posts");

    btnShowPosts.textContent = 'Show Post';

    if(flag){

    showElement.style.display = 'block';

    showElement.classList.add("Cl_Post");
    btnShowPosts.classList.add("CL_Btn");

    const loading = document.createElement('p');
    
    loading.innerText = 'Callback Executed after 5 seconds...';

    showElement.appendChild(loading);
                           
    function show(callback){

        setTimeout(() => {

            fetch('https://dummyjson.com/posts').then(res => res.json())
                  .then(data => callback(data))


        }, 5000)

    }

    btnShowPosts.textContent = 'Hide Post';

    function displayData(data){
        if(Executed) return;
        Executed = true;
        const title = document.createElement('h1');
        title.id = 'Post_title';
        title.innerHTML = 'Posts :';
        title.setAttribute('style','padding-bottom:12px;');
        showElement.appendChild(title)
        data.posts.map((x) => {
             let para = document.createElement('p');
             para.innerText = JSON.stringify(x.title);
             showElement.appendChild(para);
             let space = document.createElement('br');
             showElement.appendChild(space);
        })
        showElement.children[0].remove();
        
        btnShowPosts.textContent = 'Hide Post';
       
    }

    show(displayData);

    }else{

    showElement.style.display = 'none';

    showElement.classList.remove("Cl_Post");
    btnShowPosts.classList.remove("CL_Btn");

    }

    
}

