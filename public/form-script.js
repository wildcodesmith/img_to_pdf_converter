const input = document.querySelector('#file-input')
const inputImgFilesContainer = document.querySelector("#inputImgFilesContainer")
const imgFileInputLabel = document.querySelector("#imgFileInputLabel")
const submitBtn = document.querySelector("#submitButton")
const form = document.querySelector('#PDFform')

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    submitBtn.innerText = "Converting..."
    submitBtn.disabled = true;
    try {
        const formData = new FormData(form)
        const response = await fetch('/convert', {
            method: "post",
            body: formData

        })
        if (!response.ok) {
            throw new Error('conversion failed on the server')

        }
        const blob = await response.blob()


        const downloadURL = window.URL.createObjectURL(blob)
        let a = document.createElement('a')
        a.href = downloadURL
        a.download = `PDF_export_${Date.now()}`
        imgFileInputLabel.appendChild(a)
        a.click()
        a.remove()
        window.URL.revokeObjectURL(downloadURL)
        submitBtn.innerText = "successful! make another PDF"



    } catch (error) {
        console.log(error)
        submitBtn.innerText = "Error! Try Again"
    } finally {
        // submitBtn.disabled = false;
        submitBtn.classList.add('cursor-not-allowed', 'bg-gray-400')
        submitBtn.classList.remove('bg-indigo-600', 'cursor-pointer', 'hover:bg-indigo-800')
        inputImgFilesContainer.innerText = ""
    }
})



submitBtn.disabled = true;

let imgFileArray = [];

function previewSelectedImgFiles(src) {
    let img = document.createElement('img')

    // both are same
    img.src = src
    img.setAttribute('src', src)
    img.classList.add("w-25","h-29", "shrink-0", "rounded")

    inputImgFilesContainer.append(img)
}
input.addEventListener('change', () => {

    //clear the array
    imgFileArray = [];
    //clear the inputImgFilesContainer
    inputImgFilesContainer.innerHTML = ""

    for (file of input.files) {
        let src = URL.createObjectURL(file);
        if (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg") {

            imgFileArray.push(src)
        }
    }

    imgFileArray.forEach((fileSrc) => {
        previewSelectedImgFiles(fileSrc)
    })

    if (imgFileArray.length) {
        submitBtn.classList.remove('cursor-not-allowed', 'bg-gray-400')
        submitBtn.classList.add('bg-indigo-600', 'cursor-pointer', 'hover:bg-indigo-800')
        submitBtn.disabled = false;

    }
})


imgFileInputLabel.addEventListener("dragover", (e) => {
    e.preventDefault();
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;


    if (isDarkMode) {
        imgFileInputLabel.classList.add("!bg-gray-800");
    } else {
        imgFileInputLabel.classList.add("!bg-blue-50");
    }

})

imgFileInputLabel.addEventListener("dragleave", (e) => {
    e.preventDefault();

    imgFileInputLabel.classList.remove("!bg-gray-800", "!bg-blue-50");
});

imgFileInputLabel.addEventListener('drop', async (e) => {
    e.preventDefault()

    imgFileInputLabel.classList.add("!bg-white")
    imgFileInputLabel.classList.remove("!bg-blue-100")

    input.files = e.dataTransfer.files
    imgFileInputLabel.classList.remove("!bg-gray-800", "!bg-blue-50");
    //manually firing the change event on input
    input.dispatchEvent(new Event('change'))
})