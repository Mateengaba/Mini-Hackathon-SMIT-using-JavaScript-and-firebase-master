import { getFirestore, collection, addDoc,  getDocs, doc, updateDoc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

import { auth, db } from "./firebaseConfig.js";

import { ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";


import { storage } from "./firebaseConfig.js"



window.addEventListener("load", getProduct)


const productCollection = collection(db, "product")
const productParent = document.getElementById("productParent")

async function getProduct() {
    console.log("getProduct")
    const getProduct = await getDocs(productCollection)
    getProduct.forEach(function (doc) {
        // console.log('doc', doc.data())
        const id = doc.id
        const productdata = doc.data()
        const itemCard =` 
        <div class="col-4">
        <div class="card" style="width: 18rem;">
            <img src=${productdata.imageUrl} class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${productdata.name}</h5>
                <p class="card-text">${productdata.desc}</p>

            </div>
        </div>
    </div>
        `
        productParent.innerHTML += itemCard

    })

}
