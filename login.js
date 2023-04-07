function login(){
    let lol=document.getElementById('test')
    lol.className='realLogin'
    let body=document.getElementById('big')
    body.className='login'
    body.innerText=''
    let logo=document.createElement('h2') 
    logo.innerText="SocialLink"
    let signTitle=document.createElement('h1')
    signTitle.innerText='Login'
    let loginParagraph=document.createElement('p')
    loginParagraph.innerText='Welcome back! Login to access your profile'
    let signDiv=document.createElement('div')
    signDiv.className='signContainer'
    // let image=document.createElement('img')
    // image.className='imageL'
    // image.src='https://www.theanimationguys.com/wp-content/uploads/2021/03/Live-streams.jpg'
    // let imageContainer=document.createElement('div')
    // imageContainer.className='imageC'
    // imageContainer.append(image)
    // let signInEmail=document.createElement('h3')
    // signInEmail.innerText='Email:'
    let emailInIn=document.createElement('input')
    emailInIn.value=''
    emailInIn.placeholder='email'
    // let signInPassword =document.createElement('h3')
    // signInPassword.innerText='Password:'
    let passwordInIn=document.createElement('input')
    passwordInIn.placeholder='password'
    let submitIn=document.createElement('button')
    submitIn.innerText='Sign in'
    

    signDiv.append(signTitle, loginParagraph, emailInIn,  passwordInIn, submitIn)
    body.append(logo,signDiv)
    return { submitIn, emailInIn, passwordInIn,}
}

export {login};