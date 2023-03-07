import { packages } from "./data"


// import { gsap } from './node_modules/gsap'
// gsap.registerPlugin(ScrollSmoother)

// ScrollSmoother.create({
//     smooth: 1,               // how long (in seconds) it takes to "catch up" to the native scroll position
//     effects: true,           // looks for data-speed and data-lag attributes on elements
//     smoothTouch: 0.1,        // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
//   });


const items = document.querySelectorAll('.select-section')
const containerOfCodeShowDiv = document.querySelector('.show-code-container')


items.forEach(element => {
    element.addEventListener('click', returnPackageKey)
    // element.addEventListener('dblclick',returnEqualForDeleting)
})

changeVisibiltyOfCode(0)
let theNpmOut = ''
let itemArray = []
let theCode = ""
const showCodeDiv = document.querySelector('.show-code-inner-text')
const copyButton = document.querySelector('.copy-svg')

copyButton.addEventListener('click',copyToClickBoard)

function returnPackageKey(){
    const item = this.parentElement
    changeColorCard(item)
    const itemTitle = item.querySelector('.items-title').innerHTML
    let index = findIndexFromArray(itemTitle);
    let obj = packages[index]
    createNpmCode(obj.key)
}

function changeColorCard(item){
    item.classList.toggle('clicked')
}

function findIndexFromArray(nameToFind){
    let index = packages.findIndex(function(product){
    return product.name === nameToFind 
    })
    return index
}

function createNpmCode(value){
    if(itemArray.includes(value)){
        const i = itemArray.indexOf(value)
        itemArray.splice(i,1)
        console.log(itemArray)
    }else{

        itemArray.push(value)
        console.log(itemArray)
    }
    updateTheCodeAndArray()
}

function updateTheCodeAndArray(){
    //theCode value reset everytime. That's because it have to be not reprinting every time
    theCode= ""
    for(let i=0; i<itemArray.length;i++){
        theCode+= ` ${itemArray[i]}`
    }
    
    //if there is a no code in "theCode" variable, code showing container will be gone
    if(theCode == "") changeVisibiltyOfCode(0)
    else{changeVisibiltyOfCode(1)}

    theNpmOut = `npm install${theCode}`
    console.log('npm code: ' + theNpmOut)
    showCode(theNpmOut)
}

function showCode(theNpmOut){
    showCodeDiv.value = theNpmOut
    theNpmOut.scroll(0,theNpmOut.scrollWidth)
}

function changeVisibiltyOfCode(value){
    if(value == 1){
        containerOfCodeShowDiv.style.display = "flex"
    }else{
        containerOfCodeShowDiv.style.display = "none"
    }
}

function copyToClickBoard(){
    navigator.clipboard.writeText(theNpmOut.value)
}


// function returnEqualForDeleting(){
//     const clickedElement = this.innerHTML
//     const objReturn = itemsObj[clickedElement]
//     deleteItemInNpmCode(objReturn)
// }



// function deleteItemInNpmCode(value){
//     if(!itemArray.includes(value)) return
//     console.log(itemArray.indexOf(value))
//    
// }

