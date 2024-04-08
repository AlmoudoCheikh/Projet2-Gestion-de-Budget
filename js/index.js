
function calculerTotalDepense(contacts) {

    const totalDepense = contacts.reduce((acc, depense) => Number(depense.montant) + acc, 0)
    document.getElementById('totalDepense').textContent = totalDepense + ' FCFA'
}



let tabStockDepense = []
let tabStockRevenu = []

const solde = document.getElementById('totalSoldes')

function calculerSolde() {
    const totalDepense = tabStockDepense.reduce((acc, depense) => Number(depense.montant) + acc, 0)

    const totalRevenu = tabStockRevenu.reduce((acc, depense) => Number(depense.montantR) + acc, 0)
    console.log({ totalDepense, totalRevenu })
    solde.innerHTML = (totalDepense - totalRevenu) + ' FCFA'
}

const table = document.querySelector('.table')
const tblBody = document.createElement('tbody')



//  Remplissage de la table
function createTable() {
    for (let index = 0; index < 2; index++) {
        let tr = document.createElement('tr')
        // creer le button de suppression
        let buttontd = document.createElement("td")
        let deleteButton = document.createElement("button")
        let buttonText = document.createTextNode("Supprimez")
        deleteButton.setAttribute("class", "delete-btn")
        deleteButton.appendChild(buttonText)

        for (let element = 0; element < tabStockDepense.length; element++) {

            // ajouter les td
            const td = document.createElement('td')
            const tdtext = document.createTextNode(
                Object.values(tabStockDepense[index])[element]
            )


            deleteButton.setAttribute('contactphone', tabStockDepense[index].titre)

            buttontd.appendChild(deleteButton)
            td.appendChild(tdtext)
            tr.appendChild(td)
            tr.appendChild(buttontd)

            tr.setAttribute('id', tabStockDepense[index].titre)
        }
        tblBody.appendChild(tr)
    }
    table.appendChild(tblBody)
    document.body.appendChild(table)
}
createTable()
let deleteButton = document.querySelectorAll(".delete-btn")
deleteButton.forEach(function (button) {
    button.addEventListener('click', function () {

        const titre = this.getAttribute("contactphone");
        let tr = document.getElementById(titre)
        tr.parentNode.removeChild(tr)
        // enléver l'élément supprimer
        let filterdContact = tabStockDepense.filter((contact) => contact.titre !== titre)
        tabStockDepense = filterdContact

    })
})

// modal
let modal = document.getElementById('contactModal')
let modalButton = document.getElementById('addContactModalButton')
let close = document.querySelector('.close')

modalButton.onclick = function () {
    modal.style.display = 'block'
}

close.onclick = function () {
    modal.style.display = 'none'
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none'
    }
}
// Ajouter un contact
let addContactButton = document.querySelector(".addContactButton")
addContactButton.onclick = function (event) {
    event.preventDefault()
    const titre = document.getElementById("titre").value
    const montant = document.getElementById("montant").value
    if (!titre || !montant) {
        alert("Merci de tout remplir")
        return
    }
    const newContact = { titre, montant }
    tabStockDepense.push(newContact)
    console.log({ tabStockDepense })
    // console.log({ solde })
    calculerTotalDepense(tabStockDepense)
    calculerSolde()

    let row = document.createElement("tr")

    let cell0 = row.insertCell(0)
    const cell0Text = document.createTextNode(titre)
    cell0.appendChild(cell0Text)
    row.appendChild(cell0)

    let cell1 = row.insertCell(1)
    const cell1Text = document.createTextNode(montant)
    cell1.appendChild(cell1Text)
    row.appendChild(cell1)
    // creer le button de suppression
    let buttonCell = document.createElement("td")
    let deleteButton = document.createElement("button")
    let buttonText = document.createTextNode("Supprimez")
    deleteButton.setAttribute("class", "delete-btn")
    deleteButton.setAttribute("contactphone", titre)
    deleteButton.appendChild(buttonText)
    // ajouter un événement
    deleteButton.addEventListener('click', function () {

        const titre = this.getAttribute("contactphone");
        let row = document.getElementById(titre)
        row.parentNode.removeChild(row)
        // enléver l'élément supprimer
        let filterdContact = tabStockDepense.filter((contact) => contact.titre !== titre)
        tabStockDepense = filterdContact
        calculerTotalDepense(filterdContact)
        calculerSolde(filterdContact)


    })
    buttonCell.appendChild(deleteButton)

    row.appendChild(buttonCell)

    row.setAttribute('id', titre)
    tblBody.appendChild(row)
    table.appendChild(tblBody)

    document.body.appendChild(table)
    // vider les inputs
    document.getElementById("titre").value = ''
    document.getElementById("montant").value = ''
    modal.style.display = 'none'
}


// Partie revenue
function calculerTotalRevenu(revenus) {
    const totalRevenu = revenus.reduce((acc, revenu) => Number(revenu.montantR) + acc, 0)
    document.getElementById('totalRevenu').textContent = totalRevenu + ' FCFA'
}


const tableR = document.querySelector('.tableR')
const tblBodyR = document.createElement('tbody')

//  Remplissage de la table

function createTableR() {
    for (let indexR = 0; indexR < 2; indexR++) {
        let rowR = document.createElement('tr')
        // creer le button de suppression
        let buttonCellR = document.createElement("td")
        let deleteButtonR = document.createElement("button")
        let buttonTextR = document.createTextNode("Supprimez")
        deleteButtonR.setAttribute("class", "delete-btn")
        deleteButtonR.appendChild(buttonTextR)
        for (let elementR = 0; elementR < tabStockRevenu.length; elementR++) {
            // ajouter les td

            const cellR = document.createElement('td')
            const cellTextR = document.createTextNode(
                Object.values(tabStockRevenu[indexR])[elementR]
            )


            deleteButtonR.setAttribute('contactphoneR', tabStockRevenu[indexR].titreR)
            buttonCellR.appendChild(deleteButtonR)
            cellR.appendChild(cellTextR)
            rowR.appendChild(cellR)
            rowR.appendChild(buttonCellR)
            rowR.setAttribute('id', tabStockRevenu[indexR].titreR)

        }
        tblBodyR.appendChild(rowR)
    }
    tableR.appendChild(tblBodyR)
    document.body.appendChild(tableR)

}
createTableR()


let deleteButtonR = document.querySelectorAll(".delete-btn")
deleteButtonR.forEach(function (button) {
    button.addEventListener('click', function () {
        const titreR = this.getAttribute("contactphoneR");
        let rowR = document.getElementById(titreR)
        rowR.parentNode.removeChild(rowR)
        // enléver l'élément supprimer
        let filterdContactR = tabStockRevenu.filter((contactRevenu) => contactRevenu.titreR !== titreR)
        tabStockRevenu = filterdContactR

    })
})

// modal Revenu

let modalR = document.getElementById('contactModalR')
let modalButtonR = document.querySelector('.addContactModalButtonR')
let closeR = document.querySelector('.closeR')

modalButtonR.onclick = function () {
    modalR.style.display = 'block'
}

closeR.onclick = function () {
    modalR.style.display = 'none'
}
window.onclick = function (event) {
    if (event.target == modalR) {
        modalR.style.display = 'none'
    }
}
// Ajouter un contact
let addContactButtonR = document.querySelector(".addContactButtonR")
addContactButtonR.onclick = function (event) {
    event.preventDefault()
    const titreR = document.getElementById("titreR").value
    const montantR = document.getElementById("montantR").value
    if (!titreR || !montantR) {
        alert("Merci de tout remplir")
        return
    }
    const newContactR = { titreR, montantR }
    tabStockRevenu.push(newContactR)
    calculerTotalRevenu(tabStockRevenu)
    calculerSolde()


    // ajouter un tr
    let rowR = document.createElement("tr")

    let cellR0 = rowR.insertCell(0)
    const cell0TextR = document.createTextNode(titreR)
    cellR0.appendChild(cell0TextR)
    rowR.appendChild(cellR0)

    let cellR1 = rowR.insertCell(1)
    const cell1TextR = document.createTextNode(montantR)
    cellR1.appendChild(cell1TextR)
    rowR.appendChild(cellR1)
    // creer le button de suppression
    let buttonCellR = document.createElement("td")
    let deleteButtonR = document.createElement("button")
    let buttonTextR = document.createTextNode("Supprimez")
    deleteButtonR.setAttribute("class", "delete-btn")
    deleteButtonR.setAttribute("contactphoneR", titreR)
    deleteButtonR.appendChild(buttonTextR)
    // ajouter un événement
    deleteButtonR.addEventListener('click', function () {

        const titreR = this.getAttribute("contactphoneR");
        let rowR = document.getElementById(titreR)
        rowR.parentNode.removeChild(rowR)
        // enléver l'élément supprimer
        let filterdContactR = tabStockRevenu.filter((contactRevenu) => contactRevenu.titreR !== titreR)
        tabStockRevenu = filterdContactR
        calculerTotalRevenu(filterdContactR)
        calculerSolde(filterdContactR)


    })
    buttonCellR.appendChild(deleteButtonR)

    rowR.appendChild(buttonCellR)

    rowR.setAttribute('id', titreR)
    tblBodyR.appendChild(rowR)
    tableR.appendChild(tblBodyR)

    document.body.appendChild(tableR)
    // vider les input
    document.getElementById("titreR").value = ''
    document.getElementById("montantR").value = ''
    modalR.style.display = 'none'
}


