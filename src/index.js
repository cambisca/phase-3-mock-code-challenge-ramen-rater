// console.log("ready to go")

// ***************************** stable elements ***********************************
const ramenIndex = document.querySelector("div#ramen-menu")
const ramenForm = document.querySelector("#ramen-rating")

// ***************************** og fetch *******************************************
fetch("http://localhost:3000/ramens")
.then(resp => resp.json())
.then((ramenArr) => {
    // console.log(ramenArr)
    ramenArr.forEach((ramenObj) => {
        renderRamen(ramenObj)
    }) 
})

// ****************************** helpers *******************************************

function insertIndexDivInfoIntoShow(ramen){
    let showDiv = document.querySelector("#ramen-detail")
    // console.log(showDiv)
    showDiv.innerHTML = `
    <img class="detail-image" src="${ramen.image}" alt="Insert Name Here" />
      <h2 class="name">${ramen.name}</h2>
      <h3 class="restaurant">${ramen.restaurant}</h3>
    `
}


// *********************** render ramen objects *************************************

function renderRamen(ramen){
    let indexDiv = document.createElement("div")
    
    // console.log(indexDiv)

    indexDiv.innerHTML = `
    <img class="detail-image" src="${ramen.image}" alt="Insert Name Here" />
    `

    ramenIndex.append(indexDiv)


   
    indexDiv.addEventListener("click", (evt) => {
    fetch(`http://localhost:3000/ramens/${ramen.id}`)
    .then(resp => resp.json())
    .then((obj) => {
        // console.log("show page")
        insertIndexDivInfoIntoShow(obj)
    })
    })

    

   
}


// ******************************* FORM  ***********************************

ramenForm.addEventListener("submit", (evt) => {
    // console.log("hit submit")
    evt.preventDefault()

    let rating = evt.target.rating.value 
    let comment = evt.target.comment.value

    // debugger

    fetch("http://localhost:3000/ramens", {
        method: "POST", 
        headers: {
            "content-type": "application/json"
        }, 
        body: JSON.stringify({
            rating: rating, 
            comment: comment
        })
    })
    .then(resp => resp.json())
    .then((newRamen) => {
        renderRamen(newRamen)
    })
})