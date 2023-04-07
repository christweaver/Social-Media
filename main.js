 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
 import { getAuth, createUserWithEmailAndPassword, 
    signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
 import { getDatabase, set, ref, update, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";
 import {variables} from "./home.js";
 import { login } from "./login.js";
 import { choosePhoto, postPhoto, uploadPhoto} from "./profile.js";
import {getStorage, uploadBytes, ref as sref, deleteObject, listAll, getDownloadURL} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-storage.js"
 import { newsfeed, postBut, updateFeed, newPosts, profileBut, photoBut, deleteBut, listing, comment, actualComment} from "./newsfeed.js";
 
 

 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyD3sDQRMQWR5IwaESas-XEgyaY6LxIiiO0",
   authDomain: "social2-ee515.firebaseapp.com",
   projectId: "social2-ee515",
   storageBucket: "social2-ee515.appspot.com",
   messagingSenderId: "791328763134",
   appId: "1:791328763134:web:1da9666a757399d6c149af"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const auth = getAuth();
 const database = getDatabase(app);
 const storage=getStorage()


let image=document.querySelector('.image')
let post;
let user;
let userName;
let newPostRef;
let info=variables()
let body=document.getElementById('big')
let yourName;
let storageRef;
let christy=[]

// Displays Username from login
 function yourProfileName(){
  const dbRef = ref(database, 'users/' + user.uid);

  onValue(dbRef, (snapshot) => {
   //  snapshot.forEach((childSnapshot) => {
       const child = snapshot.val();
       console.log(child.displayName)
       let body=document.getElementById('big')
       yourName=document.createElement('h1')
       yourName.className='signedIn'

    yourName.innerText=child.displayName

       body.appendChild(yourName)

     // })
     })
   }

//  Creates New Account
 info.submit.addEventListener('click', (e) =>{

let email=info.emailIn.value
let password=info.passwordIn.value
userName=info.userNameIn.value

createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
     user = userCredential.user;
    console.log(user)

    // ...
    set(ref(database, 'users/' + user.uid), {
        email: email,
        password:password,  
        displayName:userName

     })

      .then(() => {
        // Data saved successfully!
        yourProfileName()

        newsfeed()
        display()
      })
      .catch((error) => {
        // The write failed...
        alert(error)
      });
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    alert(errorMessage)
  });

 })



//  Signs in user
info.have.addEventListener('click', (e)=>{
login()
let sign=login()

    sign.submitIn.addEventListener('click', (e)=>{

        let email=sign.emailInIn.value
        let password=sign.passwordInIn.value

                signInWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                // Signed in 
                 user = userCredential.user;
                                              
                // console.log(user)
                // ...
            
                let lgDate=new Date()
                
                update(ref(database, 'users/' + user.uid), {
                            last_login:lgDate,    

                         })
                          .then(() => {
                            // Data saved successfully!
                            yourProfileName()
                            newsfeed()
                              display()
                         
                             hey()          
                            
 
                          
                          })
                          .catch((error) => {
                            // The write failed...
                            alert(error)
                          });
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage)
              });
            })
            
})



// Posts a new text input and saves to realtime db

postBut.addEventListener('click', (e) => {

    // posts.push(updateFeed.value)

const postListRef = ref(database, 'posts/' + yourName.innerText);
 newPostRef = push(postListRef);
set(newPostRef, {
    // ...

  post:updateFeed.value
});
let newsfeedVar= newPosts()
let array=[]
console.log(newPostRef)
console.log(postListRef)
array.push(newPostRef.key)
let variable;
for (let i=0; i<array.length; i++){
  variable=array[i]
  console.log(variable)
  newsfeedVar.deleteBut.addEventListener('click',(e)=>{
    console.log('sdf')
    remove(ref(database, 'posts/'+yourName.innerText +  '/'+ variable))
    
  })


newsfeedVar.postCom.addEventListener('click', (e)=>{
  console.log(newsfeedVar.comment.value)
  console.log(actualComment.textContent)
 const pray=ref(database, 'posts/' + yourName.innerText + '/' + variable); 
  newPostRef=push(pray);
  update(newPostRef, {
    comment: actualComment.textContent,
    by:yourName.textContent
  })

})







}
})





// Takes snapshot of text db and displays text inputs to profile
function displayProfile(){

  let body=document.getElementById('big')

  body.innerText=''
  yourProfileName()


  const dbRef = ref(database, 'posts/');

onValue(dbRef, (snapshot) => {
  snapshot.forEach((childSnapshot) => {
     const childKey = childSnapshot.key;
   
    

    const childData = childSnapshot.val();
    // ...
    let key=[]
let list=Object.values(childData)
console.log(list)
 let computer=Object.getOwnPropertyNames(childData)


//  console.log(childData)
//  console.log(computer, key)

 for(let i=0;i<computer.length; i++){
  key.push(computer[i])
  }



// for (let i=0; i<list.length; i++){
//   let deletedItem=document.createElement('button')
//   let h1=document.createElement('h3')
//    if (childKey===yourName.innerText) {
//     h1.innerText=list[i].post
//   deletedItem.innerText='delete'
//   let body=document.getElementById('big')
//   body.append(h1, deletedItem)


// deletedItem.addEventListener('click', (e)=>{
//   e.preventDefault()

   
//   remove(ref(database, 'posts/'+childKey+'/'+key[i])) 
//   .then(() => {
//     h1.remove()
//     deletedItem.remove() 
//   console.log(list) }) 
// })
// }

// }

let yourCommentContainer;
for (let i=0; i<list.length; i++){
  let statusBy=document.createElement('h3')
  statusBy.innerText=childKey
  statusBy.classList='name'
  yourCommentContainer=document.createElement('div')
yourCommentContainer.classList='yourCommentC'
  let postContainer=document.createElement('div')
  postContainer.classList='postC'
let comCom=document.createElement('div')
comCom.classList='comCom'
  let deletedItem=document.createElement('button')
  deletedItem.classList='deleteDisplay'
  let h1=document.createElement('h3')
  h1.classList='h1Display'
  let name=document.createElement('h3')
  name.innerText=yourName.innerText
  name.classList='name'
let commenting=document.createElement('input')
commenting.placeholder='Write a Comment'
commenting.classList='commentDisplay'
let PostCom=document.createElement('button')
PostCom.innerHTML='<i class = "bi bi-arrow-right-circle-fill"></i>'
PostCom.classList='postComDisplay'
    h1.innerText=list[i].post
let uno=Object.values(list[i])
// console.log(uno)
uno.pop()
// console.log(uno)
postContainer.append(name, h1,deletedItem)
comCom.append(commenting, PostCom)
// yourCommentContainer.append(postContainer,comCom)
// console.log(postContainer)
let please=document.createElement('div')
please.classList='commentContainer'
let prevComms;
let postedBy;

// console.log(uno[0].comment, uno[1].comment)
for (let i=0; i<uno.length; i++){
  let   indieComment=document.createElement('div')

  indieComment.classList='indieComment'
  prevComms=document.createElement('p')
  postedBy=document.createElement('h4')
    prevComms.innerText=uno[i].comment
    postedBy.innerText=uno[i].by
   
    indieComment.append(postedBy,prevComms)
    please.append(indieComment)
// if (prevComms.innerText===undefined) break
  }

    // if(list[i].comment===undefined) {continue}

  deletedItem.innerText='Delete'
  let body=document.getElementById('big')
  body.className='newsfeed'
  if (childKey===yourName.innerText) {
yourCommentContainer.append(postContainer, comCom, please)
   body.append( yourCommentContainer)

   let commentArray=[]
   let actualComment;
   let postedBy;

let practice=document.createElement('div')
   PostCom.addEventListener('click', (e)=>{
    actualComment=document.createElement('p')
    postedBy=document.createElement('h4')
    console.log('HELLO')
    commentArray.push(commenting.value)
    let       indieComment=document.createElement('div')
    let christy;
    for(let i=0; i<commentArray.length; i++){
      christy=document.createElement('div')
      indieComment.classList='indieComment'
      actualComment.innerText=commentArray[i]
      actualComment.classList='hi'
      commenting.value=''
      postedBy.innerText=yourName.innerText
      
      indieComment.append(postedBy,actualComment)
      practice.append(indieComment)
      please.append(practice)

  }
  // update(ref(database, 'posts/' + childKey + '/' + key[i]), { 
  //   comment: actualComment.textContent })


  const pray=ref(database, 'posts/' + childKey + '/' + key[i]); 
  newPostRef=push(pray);
  update(newPostRef, {
    comment: actualComment.textContent,
    by:yourName.textContent
  })



        })

        yourCommentContainer.append(comCom,practice)
     body.append(yourCommentContainer)

  deletedItem.addEventListener('click', (e)=>{
    e.preventDefault()
    console.log('df')
  
     
    remove(ref(database, 'posts/'+childKey+'/'+key[i])) 
    .then(() => {
       h1.remove()
       postContainer.remove()
       console.log(yourCommentContainer)
       comCom.remove()
      // deletedItem.remove()  
      // // PostCom.remove()
      // actualComment.remove()
        please.remove()
        // yourCommentContainer.remove()
      //  commenting.remove()
      //  postedBy.remove()
      //  body.remove()
    }) 
  })

  }

//   else {  let test=document.createElement('div')
//     test.classList='test'
//     let postContainer=document.createElement('div')
//     postContainer.classList='postC'
//     comCom.append(commenting, PostCom)
//     postContainer.append(statusBy, h1)
//     test.append(postContainer, please, comCom)
//     body.append(test)
//     let commentArray=[]
//     let actualComment;
//     let practice=document.createElement('div')
//   PostCom.addEventListener('click',(e)=>{
// console.log('df')
// commentArray.push(commenting.value)
// actualComment=document.createElement('p')
// actualComment.className='hi'
// let postedBy=document.createElement('h4')
// let indieComment=document.createElement('div')

// for(let i=0; i<commentArray.length; i++){
//   indieComment.classList='indieComment'
//   actualComment.innerText=commentArray[i]
//   commenting.value=''
//   postedBy.innerText=yourName.innerText
//   indieComment.append( postedBy, actualComment)
//   practice.append(indieComment,comCom)
//   please.append(practice)
//   test.append(please)
// }
// update(ref(database, 'posts/' + childKey + '/' + key[i]), { 
//   comment: actualComment.textContent })





}

  });

}, {
  onlyOnce: true
});

}

// Call snapshot of text inputs and picture
profileBut.addEventListener('click',(e)=>{

displayProfile()
hi()}
)







// takes snapshot of all data and displays to newsfeed
function display(){
  let realBodyo=document.getElementById('test')
    realBodyo.classList='realNewsfeed'
const dbRef = ref(database, 'posts/' );
console.log(dbRef)
onValue(dbRef, (snapshot) => {
  snapshot.forEach((childSnapshot) => {
    const childKey=childSnapshot.key
   console.log(childKey)
  
    const childData = childSnapshot.val();
    console.log(childData)
    // ...
    
let list=Object.values(childData)
// console.log(list)
let destiny=snapshot.val()
console.log(destiny)
let computer=Object.getOwnPropertyNames(childData)
let key=[]

for(let i=0;i<computer.length; i++){
  key.push(computer[i])
  }

let yourCommentContainer;
let body=document.getElementById('big')

for (let i=0; i<list.length; i++){
  let statusBy=document.createElement('h3')
  statusBy.innerText=childKey
  statusBy.classList='name'
  yourCommentContainer=document.createElement('div')
yourCommentContainer.classList='yourCommentC'
  let postContainer=document.createElement('div')
  postContainer.classList='postC'
let comCom=document.createElement('div')
comCom.classList='comCom'
  let deletedItem=document.createElement('button')
  deletedItem.classList='deleteDisplay'
  let h1=document.createElement('h3')
  h1.classList='h1Display'
  let name=document.createElement('h3')
  name.innerText=yourName.innerText
  name.classList='name'
let commenting=document.createElement('input')
commenting.placeholder='Write a Comment'
commenting.classList='commentDisplay'
let PostCom=document.createElement('button')
PostCom.innerHTML='<i class = "bi bi-arrow-right-circle-fill"></i>'
PostCom.classList='postComDisplay'
    h1.innerText=list[i].post
let uno=Object.values(list[i])
// console.log(uno)
uno.pop()
// console.log(uno)
postContainer.append(name, h1,deletedItem)
comCom.append(commenting, PostCom)
// yourCommentContainer.append(postContainer,comCom)
// console.log(postContainer)
let please=document.createElement('div')
please.classList='commentContainer'
let prevComms;
let postedBy;

// console.log(uno[0].comment, uno[1].comment)
for (let i=0; i<uno.length; i++){
  let   indieComment=document.createElement('div')

  indieComment.classList='indieComment'
  prevComms=document.createElement('p')
  postedBy=document.createElement('h4')
    prevComms.innerText=uno[i].comment
    postedBy.innerText=uno[i].by
   
    indieComment.append(postedBy,prevComms)
    please.append(indieComment)
// if (prevComms.innerText===undefined) break
  }

    // if(list[i].comment===undefined) {continue}

  deletedItem.innerText='Delete'
  let body=document.getElementById('big')
  body.className='newsfeed'
  if (childKey===yourName.innerText) {
yourCommentContainer.append(postContainer, comCom, please)
   body.append( yourCommentContainer)

   let commentArray=[]
   let actualComment;
   let postedBy;

let practice=document.createElement('div')
   PostCom.addEventListener('click', (e)=>{
    actualComment=document.createElement('p')
    postedBy=document.createElement('h4')
    console.log('HELLO')
    commentArray.push(commenting.value)
    let       indieComment=document.createElement('div')
    let christy;
    for(let i=0; i<commentArray.length; i++){
      christy=document.createElement('div')
      indieComment.classList='indieComment'
      actualComment.innerText=commentArray[i]
      actualComment.classList='hi'
      commenting.value=''
      postedBy.innerText=yourName.innerText
      
      indieComment.append(postedBy,actualComment)
      practice.append(indieComment)
      please.append(practice)

  }
  // update(ref(database, 'posts/' + childKey + '/' + key[i]), { 
  //   comment: actualComment.textContent })


  const pray=ref(database, 'posts/' + childKey + '/' + key[i]); 
  newPostRef=push(pray);
  update(newPostRef, {
    comment: actualComment.textContent,
    by:yourName.textContent
  })



        })

        yourCommentContainer.append(comCom,practice)
     body.append(yourCommentContainer)

  deletedItem.addEventListener('click', (e)=>{
    e.preventDefault()
    console.log('df')
  
     
    remove(ref(database, 'posts/'+childKey+'/'+key[i])) 
    .then(() => {
        //\ yourCommentContainer.remove()
       h1.remove()
       postContainer.remove()
       console.log(yourCommentContainer)
       comCom.remove()
      // deletedItem.remove()  
      // // PostCom.remove()
      // actualComment.remove()
        please.remove()
      //  commenting.remove()
      //  postedBy.remove()
      //  body.remove()
    }) 
  })

  }

  else {  let test=document.createElement('div')
    test.classList='test'
    let postContainer=document.createElement('div')
    postContainer.classList='postC'
    comCom.append(commenting, PostCom)
    postContainer.append(statusBy, h1)
    test.append(postContainer, please, comCom)
    body.append(test)
    let commentArray=[]
    let actualComment;
    let practice=document.createElement('div')
  PostCom.addEventListener('click',(e)=>{
console.log('df')
commentArray.push(commenting.value)
actualComment=document.createElement('p')
actualComment.className='hi'
let postedBy=document.createElement('h4')
let indieComment=document.createElement('div')

for(let i=0; i<commentArray.length; i++){
  indieComment.classList='indieComment'
  actualComment.innerText=commentArray[i]
  commenting.value=''
  postedBy.innerText=yourName.innerText
  indieComment.append( postedBy, actualComment)
  practice.append(indieComment,comCom)
  please.append(practice)
  test.append(please)
}
// update(ref(database, 'posts/' + childKey + '/' + key[i]), { 
//   comment: actualComment.textContent })



const pray=ref(database, 'posts/' + childKey + '/' + key[i]); 
  newPostRef=push(pray);
  update(newPostRef, {
    comment: actualComment.textContent,
    by:yourName.innerText

  })

  })

    body.append(test)

  }



}


  });
  
}, {
  onlyOnce: true
});


 }







// Uploads photo to db
photoBut.addEventListener('click', choosePhoto )

uploadPhoto.addEventListener('click', (e)=>{
  let photoVar=postPhoto()
  let picture=photoVar.images
    storageRef=sref(storage, `photos/${user.uid}/ ${Math.random()}}`)
  uploadBytes(storageRef, picture).then((snapshot) => {
    console.log('Uploaded a blob or file!');
   
      

    });
  


  
// deletes photo from db
  photoVar.deletePho.addEventListener('click',(e)=>{

    const deleteRef=sref(storage, storageRef)
    deleteObject(deleteRef)
})




photoVar.postComment.addEventListener('click', (e)=>{

  console.log('djfjsfi')


})


})


// takes snapshot of picture data from signed in user only and displays to profile
function hi(){
  let uno=sref(storage, `photos/${user.uid}`)
  listAll(uno)
  .then((res)=>{
    res.items.forEach((item)=>{
      getDownloadURL(item).then((url)=>{
        christy.push(url)
        
        // console.log(christy)
        let image=document.createElement('img')
        let deleteThisShit=document.createElement('button')
        deleteThisShit.innerText='Delete this shit'
        // let photoComment=document.createElement('input')
        // photoComment.innerText='Post a Comment!'
        // let postComment=document.createElement('button')
        // postComment.innerText='Post C!'
        deleteThisShit.addEventListener('click', (e)=>{
          // deleteObject(storage, uno)
          image.remove()
          deleteThisShit.remove()
          const deleteRef=sref(storage, item)
          deleteObject(deleteRef)
          
        })
        // if (user.uid=!item.parent.name){
          // body.append(image)
        // }
        // else{
        image.setAttribute('src', url)
        body.append(image, deleteThisShit)
      
      // }
      }) 
    
    })
  })
}



// takes a snapshot all picture data from all users and displays to newsfeed
function hey(){
  let uno=sref(storage, `photos`)
// console.log(uno)
listAll(uno)
.then((res)=>{
res.prefixes.forEach((folder)=>{
// console.log(folder)
listAll(folder)
  .then((res)=>{
  res.items.forEach((item)=>{
  // console.log(item.parent.name)
    getDownloadURL(item).then((url)=>{
      christy.push(url)
      
      // console.log(christy)
      let image=document.createElement('img')
      let deleteThisShit=document.createElement('button')
      deleteThisShit.innerText='Delete this shit'
      // let photoComment=document.createElement('input')
      // photoComment.innerText='Post a Comment!'
      // let postComment=document.createElement('button')
      // postComment.innerText='Post C!'
    
      deleteThisShit.addEventListener('click', (e)=>{
        // deleteObject(storage, uno)
        image.remove()
        deleteThisShit.remove()
        const deleteRef=sref(storage, item)
        deleteObject(deleteRef)
        
      })
      // if (user.uid=!item.parent.name){
        // body.append(image)
      // }
      // else{
        // console.log(item)
      image.setAttribute('src', url)
      if(user.uid===item.parent.name){
      body.append(image, deleteThisShit)}
    else {body.append(image)}
    
    // }
    }) 
  })
}) 
})
})
}






function chats(){
  const dbRef = ref(database, 'posts/' );
let chatBox=document.createElement('div')
  onValue(dbRef, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const childKey=childSnapshot.key
    //  console.log(childKey)
     
      const childData = childSnapshot.val();
      // console.log(childData)
      // ...
      let users=document.createElement('button')
      if(childKey!==yourName.innerText){
      for (let i=0; i<childKey.length; i++){


      users.innerText=childKey 
      chatBox.append(users)  
    }
    }
users.addEventListener('click', (e)=>{

// const dbRef=ref(database, 'chat/'+ yourName.innerText + '/' + childKey)
// onValue(dbRef, (snapshot) => {
//   snapshot.forEach((childSnapshot) => {
//     const childKey=childSnapshot.key
//    console.log(childKey)
   
//     const childData = childSnapshot.val();
//     console.log(childData)
//     let indiMessage=document.createElement('p')

// indiMessage.innerText=childData.message
// chatBox.append(indiMessage)


//   })
// })

let chatInput=document.createElement('input')
let sendChat=document.createElement('button')
sendChat.innerText='Send Chat!'
chatBox.append(chatInput, sendChat)


sendChat.addEventListener('click', (e)=>{
  console.log('sdf')
  let math=Math.floor(Math.random()*10)
  let newMessage=document.createElement('p')
  newMessage.innerText=chatInput.value
  chatBox.append(newMessage)


  set(ref(database, 'chat/' + yourName.innerText + '/' + childKey + '/'+ math), {
    message:chatInput.value

 })



})


})




body.append(chatBox)

        })






    }) 
 
  // uses.addEventListener('e')
}

