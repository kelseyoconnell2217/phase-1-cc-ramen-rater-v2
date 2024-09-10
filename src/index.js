const menu = document.getElementById("ramen-menu")

// Callbacks
const handleClick = (ramen) => {
  let ramenId = ramen.target.id
  fetch(`http://localhost:3000/ramens/${ramenId}`)
    .then(resp=>resp.json())
    .then(ramenInfo=>showDetails(ramenInfo))  
};

function showDetails(ramen){
  let img = document.querySelector('.detail-image')
  img.src = ramen.image
  let name = document.querySelector('.name')
  name.textContent = ramen.name
  let restaurant = document.querySelector('.restaurant')
  restaurant.textContent = ramen.restaurant
  let rating = document.getElementById('rating-display')
  rating.textContent = ramen.rating
  let comment = document.getElementById('comment-display')
  comment.textContent = ramen.comment
} 

const addSubmitListener = (e) => {
  form.addEventListener('submit', ()=>{e.preventDefault()
  let nameInput= e.target["new-name"].value
  //fetch last id
  let idInput
    fetch('http://localhost:3000/ramens')
    .then(resp=>resp.json())
    .then(ramensArray=>{
      let lastID = ramensArray[ramensArray.length-1].id
      idInput = lastID+1
    })
  
  let restaurantInput = e.target["new-restaurant"].value
  let imageInput = e.target["new-image"].value
  let ratingInput = e.target["new-rating"].value
  let commentInput = e.target["new-comment"].value
  fetch('http://localhost:3000/ramens', {
    'method': 'POST',
    'headers': {'Content-type': 'application/json'},
    'body' : JSON.stringify({
        "id": idInput,
        "name": nameInput,
        "restaurant": restaurantInput,
        "image": imageInput,
        "rating": ratingInput,
        "comment": commentInput
    })
    
  
  })
  displayRamens
})}

const displayRamens = () => {
  fetch('http://localhost:3000/ramens')
    .then(resp=>resp.json())
    .then(jsonResponse=>{
      showDetails(jsonResponse[0]);
      jsonResponse.forEach(
      (jsonResponse)=>{
        let img = document.createElement('img')
        img.src=jsonResponse.image
        img.id=jsonResponse.id
        img.addEventListener('click', handleClick)
        menu.appendChild(img)

      }
    )})
  }

let form = document.getElementById("new-ramen")


const main = () => {
  // document.addEventListener('DOMContentLoaded', displayRamens)
    // form.addEventListener('submit', addSubmitListener)
  displayRamens()
  // addSubmitListener
}

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
}


