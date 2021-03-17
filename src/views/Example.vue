<template>
  <div id="Example">
      <div>
        <button @click="genaratePdf">genarate pdf</button>
        <button @click="genarateHTML">genarate pdf with HTML2Canvas</button>
        <button @click="genarateImage">HTML to image</button>
      </div>
      <div style="display:flex;">
           <!-- HTML2Canvas -->
        <div ref="pdfCanvas1" style="width: fit-content;height: fit-content;">
            <img alt="Vue logo" src="@/assets/logo.png">
            <h1>PDF with HTML2Canvas</h1>
            <HelloWorld msg="Welcome to Your Vue.js App"/>
        </div>
         <!-- Image -->
        <div style="display:flex;flex-direction:column;border: 1px solid #ddd;border-radius: 4px;">
            <span>Image from HTML2Canvas</span>
            <img ref="imgCanvas">
        </div>
      </div>

  </div>
</template>

<script>
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';
import HelloWorld from '@/components/HelloWorld.vue'

export default {
    name : 'example',
    components: {
      HelloWorld
    },
    data(){
        return{
            // for jsPDF : https://rawgit.com/MrRio/jsPDF/master/docs/jsPDF.html
            pdfOption: {
                orientation: "p",
                format: "a4",
                unit: "px",
                lineHeight: 2,
                putOnlyUsedFonts : true
            },
            pdfConfig : {
                typo : {
                header : 25,
                large : 20,
                normal : 18,
                small : 14
                },
                margin : {
                t : 20,
                b : 20,
                l : 20,
                r : 20
                }
            },
        }
    },
    methods:{
        genaratePdf() {
            
            try {

                let pdf = new jsPDF(this.pdfOption);

                const pdf_width = pdf.internal.pageSize.width;
                const pdf_height = pdf.internal.pageSize.height;

                const margin_l = this.pdfConfig.margin.l;

                let pdf_position_y = 0;

                pdf.setFont('Prompt','normal'); //set font family
                pdf.setFontSize(this.pdfConfig.typo.header); //set font size
                pdf.setTextColor('#005D8E'); //set font color with hex color code
                pdf_position_y += 40;
                pdf.text('ทดสอบการสร้าง pdf โดย jsPdf', pdf_width / 2, pdf_position_y, null, null, "center"); //add text to pdf
                pdf_position_y += this.pdfConfig.typo.header
                
                pdf.setFontSize(this.pdfConfig.typo.large);
                pdf.text('ทดสอบการสร้าง pdf โดย jsPdf', pdf_width / 2, pdf_position_y, null, null, "center");
                pdf_position_y += this.pdfConfig.typo.large
                
                pdf.setFontSize(this.pdfConfig.typo.normal);
                pdf.text('ทดสอบการสร้าง pdf โดย jsPdf', pdf_width / 2, pdf_position_y, null, null, "center");
                pdf_position_y += this.pdfConfig.typo.normal
                
                pdf.setFont('Sarabun','normal');
                pdf.setTextColor('#025955'); 
                pdf.text('ทดสอบการสร้าง pdf โดย jsPdf', pdf_width / 2, pdf_position_y, null, null, "center");
                pdf_position_y += this.pdfConfig.typo.normal
                
                pdf.setTextColor('red'); //set font color with name
                pdf.setFontSize(this.pdfConfig.typo.small);
                pdf.text('ทดสอบการสร้าง pdf โดย jsPdf', pdf_width / 2, pdf_position_y, null, null, "center");
                pdf_position_y += this.pdfConfig.typo.small

                //new page
                pdf.addPage(); //new pdf page
                pdf_position_y = 0;
                pdf.setFont('Sarabun','normal');
                pdf.setFontSize(this.pdfConfig.typo.header);
                pdf.setTextColor('#025955');
                pdf_position_y += 40;
                pdf.text('ทดสอบการสร้าง pdf โดย jsPdf', pdf_width / 2, pdf_position_y, null, null, "center");

                setTimeout(() => {
                pdf.setFont('Sarabun','normal');
                pdf.setFontSize(this.pdfConfig.typo.small);
                pdf.setTextColor('#000');
                const textDate = (new Date()).toString();
                
                const pages = pdf.internal.getNumberOfPages();

                //add footer page
                for (let j = 1; j < pages + 1 ; j++) {
                    pdf.setPage(j);
                    pdf.text(`วันเวลา : ${textDate}`, margin_l , pdf_height - 15, null, null, "left");
                    pdf.text(`หน้า ${j} จาก ${pages}`, pdf_width - margin_l , pdf_height - 15, null, null, "right");
                }

                //download pdf file
                pdf.save(Date.now() + ".pdf");

                },0);

            }
            catch (err) {
                console.log(err);
            }
        },
        async genarateHTML(){
            try {
                let pdf = new jsPDF(this.pdfOption);

                let pdfCanvas1 = this.$refs.pdfCanvas1;
                await html2canvas(pdfCanvas1, this.canvasOption).then((canvas) => {
                    pdf.addImage(canvas.toDataURL('image/jpeg', 1.0), 'JPEG', 0 , 0)
                });

                setTimeout(() => {
                    //download pdf file
                    pdf.save(Date.now() + ".pdf");
                },0);
            }
            catch (err) {
                console.log(err);
            }
        },
        async genarateImage(){
            try{
                await html2canvas(this.$refs.pdfCanvas1, this.canvasOption).then((canvas) => {
                    let imgCanvas = this.$refs.imgCanvas;
                    imgCanvas.src = canvas.toDataURL('image/jpeg', 1.0);
                });
            }
            catch(e){
                console.log(e)
            }
        }
    }
}
</script>

<style>

</style>