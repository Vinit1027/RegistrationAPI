

const submit = document.getElementById('regdata');

const States = document.getElementById('States');

let StateVal

States.addEventListener('change',(e)=> {
    e.preventDefault();
    var selectedOption = States.options[States.selectedIndex];

    StateVal = selectedOption.value;
    // console.log('Selected value:', selectedOption.value);
    // console.log('Selected text:', selectedOption.textContent);
})


submit.addEventListener('submit', (e)=>{
    e.preventDefault();

    const name = document.getElementById('username').value;

    if(name === ''){
        alert("Enter Name")
    }

    const dob = document.getElementById('DateOfBirth').value;

    if(dob === ''){
        alert("Enter dob")
    }

    const Male = document.getElementById('Male');
    const Female = document.getElementById('Female');

    let gender
    if(Male.checked === true && Female.checked === false){
        gender = Male.value
    }
    else if(Female.checked === true && Male.checked === false){
        gender = Female.value
    }
    else if(Male.checked === false && Female.checked === false){
        alert('Select one option')
    }
    else if(Male.checked === true && Female.checked === true){
        alert("Select only one option")
    }


    const Music = document.getElementById('Music');
    const Anime = document.getElementById('Anime');
    const Cycling = document.getElementById('Cycling');


    let hobbies = [];
    if(Music.checked === true && Anime.checked === true && Cycling.checked ===false){
        hobbies.push(Music.value); 
        hobbies.push(Anime.value);
    }
    else if(Music.checked === false && Anime.checked === true && Cycling.checked === true){
        hobbies.push(Anime.value);
        hobbies.push(Cycling.value); 
    }
    else if(Music.checked === true && Anime.checked === false && Cycling.checked === true){
        hobbies.push(Music.value); 
        hobbies.push(Cycling.value); 
    }
    else if(Music.checked === true && Anime.checked === true && Cycling.checked === true){
        hobbies.push(Music.value); 
        hobbies.push(Anime.value);
        hobbies.push(Cycling.value);
         
    }
    else if(Music.checked === true && Anime.checked === false && Cycling.checked === false || Music.checked === false && Anime.checked === true && Cycling.checked === false || Music.checked === false && Anime.checked === false && Cycling.checked === true){
        alert('Check minimum 2 options')
    }
    else if(Music.checked === false && Anime.checked === false && Cycling.checked === false){
        alert('Select atleast 2 options')
    }


    let State

    if(StateVal !== undefined || ''){
        State = StateVal;
    }
    else{
        alert("Select one State")
    }



    const Address = document.getElementById('Address').value;

    if(Address === ''){
        alert('Address is empty')
    }

    let Resume  = document.getElementById('Resume').files[0];
    const splitext = Resume.name.split('.')[1]
    if(splitext !== 'docx'){
        Resume = ''
        alert('This is not a .docx file')
    }

    if(Resume === ''){
        alert('Select docx file')
    }



    if(name === (undefined || '') || dob === (undefined || '') || gender === (undefined || '') || hobbies === (undefined || '' || []) || State === (undefined || '') || Address === (undefined || '') || Resume === (undefined || '')){
        alert("Data not filled completely")
    }
    else{

        const formData = new FormData();
    
        formData.append('name', name);
        formData.append('dob', dob);
        formData.append('gender', gender);
        formData.append('hobbies',hobbies);
        formData.append('state', State);
        formData.append('address', Address);
        formData.append('resume', Resume);
    
    
        // const formDataObj = {};
    
    
        // formData.forEach((value, key) => (formDataObj[key] = value));
    
    
    
        
    
        axios.post('/apiv1/registration/post-regdata',formData, 
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((response) => response)
        .then(data => {
            console.log(data)
            console.log(data.data)
            const h1tag = document.getElementById('success');

            const message = data.data.message
            h1tag.innerHTML = message;
        })
        .catch((err)=> console.log(err))

    }





})