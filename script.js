const itemsContainer = document.querySelector('.items-container')
const items = document.querySelector('.item')

// const itemDivs = items.querySelectorAll('div')

const name = document.getElementById('name')
const quantity = document.getElementById('quantity')
const rate = document.getElementById('rate')
const amount = document.getElementById('amount')

const dltBtn = document.getElementById('delete-btn')
const newItemBtn = document.getElementById('new-item')

const calculationContainer = document.querySelector('.calculation-container')
const calculation  = document.querySelector('.calculation')
const calcDivs = calculation.querySelectorAll('div')
let subtotal = document.querySelector('.subtotal')
let total = document.querySelector('.total')
let balanceDue = document.querySelector('.balance-due')
let tax = document.querySelector('.tax')
let amountPaid = document.querySelector('.amount-paid')



// console.log(item.querySelector('.item-name').querySelector('input').value)
// console.log(itemDivs)
// console.log(itemDivs[0].firstElementChild.value)

// let amountArray = []
// itemDivs.forEach(itemdiv => {
//     console.log( itemdiv.firstElementChild.value)
        
// })

items.addEventListener('input',(e) => {
    amount.value = quantity.value * rate.value
    subtotal.value = amount.value
    total.value = amount.value
    balanceDue.value = amount.value
    
})



// CREATE NEW ITEM AND CALC 

newItemBtn.addEventListener('click', ()=> {
    let newelement = createNewItemElement()
    console.log('newelement',newelement)
    

    newelement.addEventListener('input',(e) => {
        
        let qty_value = newelement.querySelector('.item-quantity').querySelector('input').value
        let rte_value = newelement.querySelector('.item-rate').querySelector('input').value
        amt = qty_value * rte_value
        newelement.querySelector('.item-amount').querySelector('input').value = amt


        let ItemELes =  itemsContainer.querySelectorAll('.item')
        console.log('ItemEles', ItemELes)
        console.log('ItemEles-Length', ItemELes.length)
        let amtArray = []
        for(let i = 0; i < ItemELes.length; i++) {

            // subtotal.value += ItemELes[i].children[3].querySelector('input').value
            // console.log(ItemELes[i].children[3].querySelector('input').value)
            amtArray.push(ItemELes[i].children[3].querySelector('input').value)
            let a  = amtArray.map((x) => +x).reduce((total,x) => total+x,0)
            subtotal.value = a
            total.value = a
            balanceDue.value = a
            // console.log(a)
            
            if(tax.value){
                let tax_apply = (subtotal.value * tax.value) / 100
                console.log(tax_apply)
                let taxed_value = +subtotal.value + +tax_apply
                console.log(taxed_value)
                total.value = taxed_value
                balanceDue.value = taxed_value
            } else {

                tax.addEventListener('input', (e) => {
                
                    let tax_apply = (subtotal.value * e.target.value) / 100
                    console.log(tax_apply)
                    let taxed_value = +subtotal.value + +tax_apply
                    console.log(taxed_value)
                    total.value = taxed_value
                    balanceDue.value = taxed_value
                })
            }

            

            amountPaid.addEventListener('input', (e) => {
                let a = parseInt(amountPaid.value)
                let b = parseInt(total.value)

                let s = b - a
                console.log(s)
                balanceDue.value = s
            })

        }
           
    })

    let removeEleBtn = newelement.querySelector('.item-button').querySelector('button')
    removeEleBtn.addEventListener('click', () => {
    newelement.remove()
    })
    
})

// tax.addEventListener('change', (e) => {
//     console.log(e.target.value)
// })

// CREATE NEW DIV ELEMENT

function createNewItemElement() {
 const newItemElement = document.createElement('div')
 newItemElement.classList.add('item')
 newItemElement.innerHTML = `
        <div class="item-name">
            <input type="text" id="name" value="">
        </div>
        <div class="item-quantity">
            <input type="number" id="quantity" value="">
        </div>
        <div class="item-rate">
            <input type="number" id="rate">
        </div>
        <div class="item-amount">
            <input type="number" id="amount">
        </div>
        <div class="item-button visible">
            <button class="delete-btn" id="delete-btn" ">X</button>
        </div>
 `
    itemsContainer.appendChild(newItemElement)   
    return newItemElement
}



// itemDivs.forEach(itemdiv => {
//     console.log( itemdiv.firstElementChild.value)
    
// })