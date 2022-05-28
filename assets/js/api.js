// https://smart-canteen-yo.herokuapp.com






async function contactSubmitHandle(e){
    e.preventDefault();
    let x ={
        name : e.target['name'].value,
        email : e.target['email'].value,
        no : e.target['no'].value,
        message : e.target['message'].value,
    }
    let res = await fetch('https://smart-canteen-yo.herokuapp.com/api/contactus',{
        method:"POST",
        headers : { 
            'Content-Type': 'application/json',
           },
        body:JSON.stringify(x)
    });
    const respData = await res.json();
    if(respData.status!=='ok'){
        window.alert('Error Occured!')
    }
    else{
        location.reload();
    }
}
async function reviewSubmitHandle(e){
    e.preventDefault();
    let x ={
        name : e.target['name'].value,
        ratings : e.target['ratings'].value,
        review : e.target['review'].value,
    }
    let res = await fetch('https://smart-canteen-yo.herokuapp.com/api/reviews',{
        method:"POST",
        headers : { 
            'Content-Type': 'application/json',
           },
        body:JSON.stringify(x)
    });
    const respData = await res.json();
    if(!respData.status){
        window.alert('Error Occured!')
        console.log(respData)
    }
    else{
        location.reload();
    }
}

async function reviewsCall () {
    const res = await fetch('https://smart-canteen-yo.herokuapp.com/api/reviews')
    const respData = await res.json();
    const img= ["./assets/img/c-1.jpg", "./assets/img/c-2.jpg", "./assets/img/c-3.jpg", "./assets/img/c-4.jpg" , "https://www.morganstanley.com/content/dam/msdotcom/people/tiles/tile-yuki.jpg.img.490.medium.jpg/1632860714777.jpg" , "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&w=1000&q=80" , "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80" , "https://i.insider.com/59b6c4bfba785e36f932a317?width=1000&format=jpeg&auto=webp" , "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvBCaqwQVeSg0BCZr6tcag5h07sM9KcmV_0w&usqp=CAU"]
    const testimonialBoxContainer = document.querySelector('.testimonial-box-container')
    respData.reviews.forEach(async(element) => {
        const box = document.createElement('div');
        box.classList.add("testimonial-box");
        const boxTop = document.createElement('div');
        boxTop.classList.add("box-top");
        const profile = document.createElement('div');
        profile.classList.add('profile');
        const profileImg = document.createElement('div');
        profileImg.classList.add('profile-img');
        profileImg.innerHTML =`<img src=${img[Math.floor(Math.random() *8)]} />`;
        const nameUser = document.createElement('div');
        nameUser.classList.add('name-user');
        nameUser.innerHTML = `<strong>${element.name}</strong>`;
        const reviewDiv = document.createElement('div');
        reviewDiv.classList.add('reviews');
        let i=0;
        let ratings=""
        if(!element.ratings){
            element.ratings ="5"
        }
        for (i=0;i<5;i++){
            if(parseInt(element.ratings)>i){
            ratings=ratings+'<i class="fas fa-star"></i>'
            }
            else{
                ratings=ratings+'<i class="far fa-star"></i>'
            }
        }
        reviewDiv.innerHTML = ratings;
        const clientComment = document.createElement('div');
        clientComment.classList.add('client-comment');
        clientComment.innerHTML = `<p>${element.review}</p>`;
        profile.appendChild(profileImg);
        profile.appendChild(nameUser);
        boxTop.appendChild(profile);
        boxTop.appendChild(reviewDiv);
        box.appendChild(boxTop);
        box.appendChild(clientComment);
        testimonialBoxContainer.appendChild(box)
    })
}
reviewsCall();