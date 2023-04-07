let uploadPhoto=document.createElement('button')
let inputFiles=document.createElement('input')
let lilDiv;
let photoList=[]
let body=document.getElementById('big')
 body.className='profile'
let deletePho;
let small;
let photoComment;
let postComment;
let commitComent;
let commentList=[]
function choosePhoto() {
inputFiles.setAttribute('type', 'file')
inputFiles.setAttribute('multiple', 'multiple')
inputFiles.setAttribute('accept', 'image/png')
uploadPhoto.innerText='Upload'
inputFiles
body.append(uploadPhoto, inputFiles)

return {uploadPhoto, inputFiles}

}



function postPhoto(){
  let files=inputFiles.files
  let images;

for (let i=0; i<files.length; i++) {
photoList.push(files[i])
inputFiles.value=''
lilDiv=document.createElement('li')
deletePho=document.createElement('button')
deletePho.setAttribute('id', `${Math.random()}`)
deletePho.innerText='Delete Photo'
small=document.createElement('div')

let commentDiv=document.createElement('div')
 photoComment=document.createElement('input')
      photoComment.innerText='Post a Comment!'
       postComment=document.createElement('button')
      postComment.innerText='Post C!'

      
    postComment.addEventListener('click', (e)=>{
  commentList.push(photoComment.value)
  console.log(commentList)
  commitComent=document.createElement('p')

  for(let i=0; i<commentList.length; i++){
  commitComent.innerText=commentList[i]
  photoComment.value=''
  // photoComment.remove()
  // postComment.remove()
commentDiv.append(commitComent)
  }

})
commentDiv.append(photoComment, postComment)
small.append(lilDiv, deletePho, commentDiv )
body.append(small)






deletePho.addEventListener('click', deletedItem)
inputFiles.remove()
uploadPhoto.remove()}


for(let i=0; i<photoList.length; i++) {
    images=photoList[i]
    lilDiv.innerHTML= `<div class="image">
                <img src="${URL.createObjectURL(images)}" alt="image">
                
              </div>`
             


             }

            
  console.log(photoList)
  



  return {deletePho, lilDiv, photoList, files, images, photoComment, postComment}


}

let deletedItem=(e)=>{
    e.preventDefault()
    // e.target.remove()
    e.target.parentElement.remove()
}



export {choosePhoto, postPhoto, uploadPhoto}