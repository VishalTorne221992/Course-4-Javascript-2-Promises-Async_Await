const btnShowPosts = document.querySelector("#Btn_ShowPosts");

btnShowPosts.addEventListener("click", showPosts_Promise.bind(this));

let flag = false;
let Executed = false;

function showPosts_Promise(){

    flag = !flag;

    const showElement = document.getElementById("Posts");
    btnShowPosts.textContent = 'Show Post';

    if(flag){

                showElement.style.display = 'block';
                showElement.classList.add("Cl_Post");
                btnShowPosts.classList.add("CL_Btn");

                const loading = document.createElement('p');
                
                loading.innerText = 'Promise resolve after 5 sec...';

                showElement.appendChild(loading);
                
                const posts = getPosts();

                const data = Promise.race([
                    posts,
                    new Promise((resolve, reject) => {;  
                      // 6000 Milisecs or < 5500 millisecs to receive response  
                      // Reject after 5 seconds
                      // Try 5000 milliseconds to reject the fetch request or request timeout
                      setTimeout(() => reject(new Error("Operation timed out")), 6000);
                    }),
                  ])
                
                btnShowPosts.textContent = 'Hide Post';
                data.then(result => displayData(result))  
                
                data.catch(err => {
                    
                    showElement.removeChild(loading);
                    displayError(err, showElement);
                })
                
        
        }
        else
        {

            showElement.style.display = 'none';
            showElement.classList.remove("Cl_Post");
            btnShowPosts.classList.remove("CL_Btn");
        
        }



    function displayData(data){
        if(Executed) return;
        Executed = true;
        const title = document.createElement('h1');
        title.id = 'Post_title';
        title.innerHTML = 'Posts :';
        title.setAttribute('style','padding-bottom:12px;');
        showElement.appendChild(title);
        data.posts.map((x) => {
             let para = document.createElement('p');
             para.innerText = JSON.stringify(x.title);
             showElement.appendChild(para);
             let space = document.createElement('br');
             showElement.appendChild(space);
        })
        showElement.children[0].remove();
        
        

    }
    

}

function displayError(error, ErrorParentElement){

    ErrorParentElement.replaceChildren();
    const ErrorDisplay = document.createElement('p');
    ErrorDisplay.innerText = error;
    ErrorParentElement.appendChild(ErrorDisplay);

}


function getPosts(){

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            const response = getPostApi();

            resolve(response);

            response.catch(error => {
                reject(error);
            })

        }, 5000)

    })
    
}

async function getPostApi() {

        // edit the fetch url to a wrong one to get error in fetch
        
        const response = await fetch('https://dummyjson.com/posts');

        const result = await response.json();

        return result; 
    

}