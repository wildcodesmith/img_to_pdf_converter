import PDFDocument from 'pdfkit'
import fs from 'fs'


 export default function pdfHandler (req, res){
    let doc;
  try {

    if (!req.files || req.files.length === 0) {
      res.status(400).send("No files were uploaded")
    }

    //initailize a new PDF document. autoFirstPage : false will prevent a blank start page
      doc = new PDFDocument({ autoFirstPage: false })

      let uniqueId = Date.now();
      let dynamicPDFname = `PDF_export_${uniqueId}`

    //set header so the browser knows to download the pdf
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', 'attachment; filename=dynamicPDFname ')

    //pipe the pdf doc into the response stream
    doc.pipe(res)

    req.files.forEach((file) => {
      //add a new blank page
      doc.addPage()

      try {
          //drawing the image on that blank page , fitting it within the page boundaries
      doc.image(file.path, 0, 0, {
        fit: [doc.page.width, doc.page.height],
        align: 'center',
        valign: 'center'
      })
      } catch (imgError) {
        console.log(`Skipping corrupted file: ${file.originalname}`)
        doc.text('Error : "The image is corrupted and couldnot be loaded.' , 100 , 100)
      }
    

    })

    //finalyzing the PDF doc to finish the download
    doc.end()

    //deleting the files in the uploads folder asynchronously
    req.files.forEach((file) => {
      fs.unlink(file.path, (error) => {
        if (error) {
          console.log('error deleting files')

        }
      })
    })

  } catch (error) {
    console.log("fatal error : " , error)
    if(doc){
        doc.unpipe(res)
    }
    if(!res.headersSent){

        res.status(500).send('Error occured during conversion')
    }else{
        res.end();
    }
  }
}

