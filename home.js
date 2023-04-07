let userNameIn=document.createElement('input')
 function variables(){
    let title=document.createElement('h1')
    let body=document.getElementById('big')
    body.classList='home'
    let realBody=document.getElementById('test')
    realBody.className='realHome'

    title.innerText="SocialLink"
    title.className='title'
    let div=document.createElement('div')
    div.classList='cards'

    title.addEventListener('mouseover', (e)=>{
        div.classList.add('visible')
        title.classList.add('visible')
    })
    let createAccount=document.createElement('h1')
    createAccount.innerText='Create an Account'
    let h1=document.createElement('h3')
    h1.innerText='Email'
    let emailIn=document.createElement('input')
    emailIn.value=''
    let h11=document.createElement('h3')
    h11.innerText='Password'
    let passwordIn=document.createElement('input')
    let createUsername=document.createElement('h3')
    createUsername.innerText='UserName'
    let submit=document.createElement('button')
    submit.innerText='Create Account'
    submit.className='submit'
    let have=document.createElement('button')
    let small=document.createElement('p')
    small.className='account'
    have.className='accountB'
    
    small.innerText="Already have account?"
    have.innerText='Sign In'
    div.append(createAccount,h1, emailIn, h11, passwordIn, createUsername, userNameIn, submit, small, have)
    body.append(title,div)
    return {h1, h11, submit, emailIn, passwordIn, have, userNameIn}
}
export {variables, userNameIn}