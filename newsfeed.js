
let body=document.getElementById('big')
body.className='newsfeed'
let title=document.createElement('h1')
title.innerText='SocialLink'
let updateFeed=document.createElement('input')
updateFeed.placeholder='Whats on your mind?'
let postBut=document.createElement('button')
postBut.innerText='Post!'
let photoBut=document.createElement('button')
let videoBut=document.createElement('button')
videoBut.innerHTML='<i class = "bi bi-camera-reels"></i>'
photoBut.innerHTML='<i class="bi bi-camera"</i>'
let profileBut=document.createElement('button')
profileBut.innerText='Profile'
profileBut.className='profileB'
let comment;
let postCom;
let posts=[]
let small;
let actualComment;
let realBodyo=document.getElementById('test')
    realBodyo.classList='realNewsfeed'

let newsDiv=document.createElement('div')    
newsDiv.classList='newsContainer'

let divvy;
 function newsfeed(){
    
   
    body.innerText=''
    newsDiv.append(title, updateFeed,postBut,videoBut,photoBut, profileBut)
    body.append(newsDiv)


    return {title, postBut, updateFeed, photoBut}
}
let commentArray=[]
let deleteBut;
let listing;
 function newPosts() {
    
    posts.push(updateFeed.value)
    updateFeed.value=''
     listing=document.createElement('li')
    deleteBut=document.createElement('button')
deleteBut.innerText='Delete'
deleteBut.addEventListener('click',deletedItem)
for (let i=0; i<posts.length; i++){
     small=document.createElement('div')
     small.classList='small'
        listing.innerText=posts[i]
        comment=document.createElement('input')

    divvy=document.createElement('div')
    comment.innerText='Write a Comment'
    postCom=document.createElement('button')
    postCom.innerText="Post!"

divvy.append(comment)

    
    postCom.addEventListener('click', (e)=>{
        commentArray.push(comment.value)
        actualComment=document.createElement('p')

    console.log(commentArray)
    for(let i=0; i<commentArray.length; i++){
        actualComment.innerText=commentArray[i]
        actualComment.classList='hi'
        comment.value=''
        divvy.append(actualComment)

    }
    
})

}
// divvy.append( postCom)
small.append(listing, deleteBut, divvy, postCom)
newsDiv.append(small)
    // body.append(small)
return{deleteBut, listing, comment, postCom, actualComment}
 }

 let deletedItem=(e)=>{
    e.preventDefault()
    e.target.parentElement.remove()
}

 export {newsfeed,postBut, updateFeed, newPosts, deleteBut, profileBut, photoBut, listing, comment, actualComment}
