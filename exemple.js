let tab = [
    {
        id: 67895,
        name: 'Arthur'
    },
    {
        id: 6789,
        name: 'Joe'
    },
    {
        id: 9876,
        name: 'Bob'
    },
    {
        id: 678987,
        name: 'Leo'
    },
    {
        id: 4567876,
        name: 'Lea'
    },
    {
        id: 987654,
        name: 'Luc'
    }
]

let num = 3
let groupe = "Veille"

let newGroup = {                                                                   
    groupe: groupe,
    name: []                                                                        
}
let newTab = tab;

let createGroup = function () {
     newGroup.name = []

    for (let i = 0; i < num; i++) {
        let random = Math.floor(Math.random() * (newTab.length))
        let obj = newTab[random]
        newTab.splice(random, 1)
        let tab = []
        newGroup.name.push(obj.name)
        }
    }

while (newTab.length !== 0) {
        createGroup()
        console.log(newGroup)
        // fetch le newGroup ici
     }



