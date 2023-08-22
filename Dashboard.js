import { getFirestore, collection, addDoc, getDocs, deleteDoc , updateDoc , serverTimestamp  } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

import { auth, db, doc, signOut ,storage } from "./firebaseConfig.js";

import { ref, uploadBytesResumable,  getDownloadURL ,  } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";


// import {  } from "./firebaseConfig.js"

const productCollection = collection(db, "product")
const ProductForm = document.getElementById("ProductForm")
ProductForm.addEventListener("submit", addproduct)
window.addEventListener("load", getProduct)
const productParent = document.getElementById("productParent")
const firstName = document.getElementById("firstName")


async function getUser (){ 
    login = getUser
    var firstName = this.document.getElementById("firstName")
    if (firstName) {
        firstName.innerHTML =  loginUser.firstName

    }

}

window.getUser = getUser






async function getProduct() {
    console.log("getProduct")
    const getProduct = await getDocs(productCollection)
    getProduct.forEach(function (doc) {
        console.log('doc==========>', doc.data())
        const id = doc.id
        const productdata = doc.data()

        const currentTimestamp = new Date().getTime();

        const postDate = new Date(currentTimestamp); 
        const formattedDate = postDate.toISOString().split('T')[0];


        productParent.innerHTML += `
        
        <div class="col-12">
        <div class="card d-flex m-3 my-border" style="width: 20rem;>
        <p class="card-text">Posted on: ${formattedDate}</p>

            <img src=${productdata.imageUrl} class="card-img-top" alt="height="80px" width="100px"">
            <div class="card-body mt-3" >
                <h1 class="card-title  m-3 ">${productdata.name}</h1>
                <p class="card-text mt-3 m-3">${productdata.desc}</p>
              

                <a class="btn btn-primary" onclick="deletedata('${id}')">Delete</a>
                <button class="edit-button btn btn-primary" >Edit</button>


            </div>
        </div>
    </div>
        `
    })

} 

// delete buttun funtion

const deletedata = async(id)=>{

    await deleteDoc(doc(db, "product", id));
}

window.deletedata = deletedata
//....






// Update product details in Firestore
async function updateProduct(id, updatedName, updatedDesc) {
    const productRef = doc(db, "product", id);

    await updateDoc(productRef, {
        name: updatedName,
        desc: updatedDesc
    });

    // Refresh the product list to reflect the changes
    getProduct();
}


// logOut Acount

const logOutAcount = () => {
    signOut(auth).then(() => {
// alert("logout successfuly")
swal("Good Job", "logout successfuly", "success");

        setTimeout(() => {
            window.location.replace('/index.html')
        }, 2000);

    }).catch((error) => {
        const errorMessage = error.message
        swal("Oops", errorMessage, "error")

    });
}
window.logOutAcount = logOutAcount;
//....



// Edit buttun


document.addEventListener('click', function () {
    const editButtons = document.querySelectorAll('.edit-button');
  
    editButtons.forEach(button => {
      button.addEventListener('click', function () {
        const itemText = this.parentNode.querySelector('.card-text');
        
        const newText = prompt('Edit the item:', itemText.textContent);
        if (newText !== null) {
          itemText.textContent = newText;
        }
      });
    });
  
    
      });
    









// addproduct

async function addproduct(e) {
    try {
        e.preventDefault()
        const productName = e.target.productName.value
        const productDesc = e.target.productDesc.value
        // const productPrice = e.target.productPrice.value
        const productImage = e.target.productImage
        // console.log("productImage", productImage.files[0])

        const imageUrl = await uploadImage(productImage.files[0])

        const user = JSON.parse(localStorage.getItem("user"))
        const productObj = {
            name: productName,
            desc: productDesc,
            // price: productPrice,
            userUid: user.uid,
            imageUrl: imageUrl.imageUrl
        }
        console.log("add", productObj)

        await addDoc(productCollection, productObj)
        // alert("product added successfully")
        await swal("Good Job", "Publish blog successfully", "success");



    } catch (error) {
        alert(error.message)
    }


}
//....


//image upload

function uploadImage(file) {
    return new Promise(function (resolve, reject) {

        // Create the file metadata
        /** @type {any} */

        let imageUrl;
        const metadata = {
            contentType: 'image/jpeg'
        };

        // Upload file and metadata to the object 'images/mountains.jpg'
        const storageRef = ref(storage, 'productImages/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
            function (snapshot) {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },

            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                reject({
                    message: "something went wrong"
                })
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    resolve({
                        imageUrl: downloadURL
                    })
                });
            }
        );


    })
}



// get username

window.addEventListener("load", getAllIUser)


const tableBody = document.getElementById("firstName")

console.log("firstName", firstName)

async function getAllIUser() {

    const loginUser = JSON.parse(localStorage.getItem("user"))

    // console.log(localStorage.getItem("user"))
    window.addEventListener("load", function (){
    if (localStorage.getItem("user") === null) {
        window.location.replace("./login.html")
        return
    } else {
        if (loginUser.type !== "admin") {
            history.back()
            return
        }
    }
    })
    const docsRef = await getDocs(collection(db, "users"))
    docsRef.forEach(function (doc) {
        const user = doc.data()
        if (user.type !== "admin") {
            console.log("docs", doc.id, user)
            const rowUi = `<tr>
            <p>${user.firstName}</p> `

            tableBody.innerHTML = rowUi
        }
    })


}







//....

// window.addproduct = addproduct