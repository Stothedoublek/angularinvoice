import { Component } from '@angular/core';  

@Component({  
  selector: 'app-root',  
  templateUrl: './app.component.html',  
  styleUrls: ['./app.component.css']  
})  
export class AppComponent {  
  // Invoice attributes  
  companyName: string = '';  
  address: string = '';  
  email: string = '';  
  phone: string = '';  
  vatNo: string = '';  
  item: string = '';  
  qty: number = 61622;  
  rate: number = 545422;  
  amount: number = 554224;  
  hs: string = '';  
  netAmount: number = 4524245;  
  amountInWords: string = '';  
  printedOn: string = new Date().toLocaleDateString();  

  print() {  
    this.generateInvoice();  
}  

generateInvoice() {  
    // Define the invoice content  
    const invoiceData = this.getInvoiceData2();  

    // Create a Blob with the invoice data  
    const blob = new Blob([invoiceData], { type: 'text/plain' });  

    // Create a URL for the Blob and create a download link  
    const url = window.URL.createObjectURL(blob);  
    const a = document.createElement('a');  
    a.href = url;  
    a.download = 'invoice.txt';  
    a.click();  

    // Release the URL object  
    window.URL.revokeObjectURL(url);  
}
getInvoiceData2(): string {  
  // Build the invoice text  
  let invoiceText = '';  

  // Function to split text into multiple lines if it exceeds a certain number of words  
  const splitLongText = (text: string, maxWords: number): string[] => {  
      const words = text.split(' ');  
      const lines: string[] = [];  
      
      for (let i = 0; i < words.length; i += maxWords) {  
          lines.push(words.slice(i, i + maxWords).join(' '));  
      }  

      return lines;  
  };  

  // Company Information  
  const companyLines = splitLongText(this.companyName, 4);  
  const addressLines = splitLongText(this.address, 4);  

  companyLines.forEach(line => {  
      invoiceText += this.centerAlign(line) + '\n';  
  });  
  addressLines.forEach(line => {  
      invoiceText += this.centerAlign(line) + '\n';  
  });  

  invoiceText += this.centerAlign(`Email: ${this.email}`) + '\n';  
  invoiceText += this.centerAlign(`Phone: ${this.phone}`) + '\n';  
  invoiceText += this.centerAlign(`VAT Registration No: ${this.vatNo}`) + '\n';   
  invoiceText += '--------------------------------\n';  
  invoiceText += `            TAX Invoice\n`;  
  invoiceText += '--------------------------------\n';  

  // Table headers  
  invoiceText += `Item    Qty    Rate     Amount\n`;  
  invoiceText += '--------------------------------\n';  

  // Table Data - Using spaces for alignment  
  invoiceText += `${this.item.padEnd(8)}${this.qty.toString().padEnd(7)}${this.rate.toString().padEnd(9.5)}${this.amount.toString().padEnd(7)}\n`;  
  invoiceText += '--------------------------------\n';  

  // Additional Information  
  invoiceText += `HS: ${this.hs}\n`;  
  invoiceText += '--------------------------------\n';   
  invoiceText += `NET Amount: ${this.netAmount.toFixed(2).padStart(10)}\n`;  
  invoiceText += '--------------------------------\n';  
  
    // Split the Amount In Words based on the new requirement  
    const amountInWordsLines = splitLongText(this.amountInWords, 4);  

    // Handle empty or short lines appropriately  
    if (amountInWordsLines.length > 0) {  
        // If there's at least one line, safely handle the first line  
        const firstLineWords = amountInWordsLines[0].split(' ').slice(0, 2).join(' '); // Limit to first 2 words  
        invoiceText += `Amount In Words: ${firstLineWords}\n`;  

        // Print the rest of the lines (if any)  
        // Starting from the 3rd word if applicable  
        amountInWordsLines.slice(1).forEach(line => {  
            invoiceText += `${line}\n`; // Indent the continuation lines  
        });  
    }  

  invoiceText += ' \n';   
  invoiceText += `Printed On: ${this.printedOn}\n`;  

  return invoiceText;  
  
}
centerAlign(text: string): string {  
  const maxLength = 33;  // Define the maximum width of the printed line  
  const spaces = maxLength - text.length;  
  
  if (spaces > 0) {  
      const leftPad = Math.floor(spaces / 2);  
      const rightPad = spaces - leftPad;  
      return ' '.repeat(leftPad) + text + ' '.repeat(rightPad);  
  }  
  // If the text is longer than maxLength, return it as is, without padding  
  return text;  
}
}