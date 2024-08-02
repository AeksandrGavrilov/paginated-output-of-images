let images =[];
let btn = document.querySelector('button')
 
   btn.onclick = function () {
       
       async function getData(){
                    document.querySelector('.posts').innerHTML = "";
                    document.createElement("img").innerHTML = "";
                    document.querySelector('.pagination').innerHTML = "";
                    let inputSearch = document.getElementById('inputS')
                    console.log(inputSearch.value)
                    let query = inputSearch.value;
                    let lnk;
                
                            if (query) {
                                lnk = `https://api.unsplash.com/photos/random?query=${query}&count=30&client_id=aa50dMdSem-f_0QVL0wfh6J1KeY8D7Sqp1oIltXhAyw`
                           } else {
                               lnk = `https://api.unsplash.com/photos/random?count=30&client_id=aa50dMdSem-f_0QVL0wfh6J1KeY8D7Sqp1oIltXhAyw`
                           }
                    
                    const response =await fetch(lnk);
                    const data = await response.json();
                    images = data.map((img) => img.urls.regular);
                    return data;
                }

async function main() {
    const postsData = await getData();
    let currentPage = 1;
    let rows = 9;


    function displayList(arrData, rowPerPage, page) {
        const postsEl= document.querySelector('.posts');
        postsEl.innerHTML = "";
        page--;

        const start = rowPerPage * page ;
        const end = start + rowPerPage ;
        const paginatedData = arrData.slice(start, end);

        paginatedData.forEach((el) =>{
            const postEl = document.createElement("img");
            postEl.classList.add("post");
            postEl.src =`${el.urls.regular}`;
            postsEl.appendChild(postEl); 
        })
    };
    function displayPagination(arrData, rowPerPage) {
        const paginationEl = document.querySelector('.pagination');
        const pagesCount = Math.ceil(arrData.length / rowPerPage);
        const ulEl = document.createElement("ul");
        ulEl.classList.add('pagination__list');

        for(let i = 0; i< pagesCount; i++) {
            const liEL = dispalyPaginationBtn(i+1);
            ulEl.appendChild(liEL)
        }
        paginationEl.appendChild(ulEl)
    };
    function dispalyPaginationBtn(page) {
        const liEL = document.createElement("li");
        liEL.classList.add('pagination__item')
        liEL.innerText = page

        if (currentPage == page) liEL.classList.add('pagination__item--active');

        liEL.addEventListener('click',()=>{
            currentPage = page
            displayList(postsData, rows, currentPage)

            let currentItemLi = document.querySelector('li.pagination__item--active')
            currentItemLi.classList.remove('pagination__item--active')

            liEL.classList.add('pagination__item--active')
        })
        return liEL;
    };

    displayList(postsData, rows, currentPage);
    displayPagination(postsData, rows)
}

main();

   }
