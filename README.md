# angularinvoice
Invoice project

This code defines an Angular component named AppComponent that represents the main application component. Here's a breakdown of each line or block:

Imports:

import { Component } from '@angular/core';: This line imports the Component decorator from the @angular/core library. This decorator is used to define an Angular component class.
Component definition:

@Component({...}): This line defines the AppComponent class using the Component decorator. It provides configuration details for the component.
selector: 'app-root': This property specifies the CSS selector used to identify this component in the HTML template. It defines where this component can be used in the HTML (<app-root></app-root>).
templateUrl: './app.component.html': This property specifies the path to the HTML template file associated with this component.
styleUrls: ['./app.component.css': This property specifies the path to the CSS stylesheet file for this component.
Component class:

export class AppComponent { ... }: This defines the AppComponent class itself.
Invoice attributes:

Lines starting with companyName, address, etc.: These lines define properties for storing invoice information like company name, address, email, phone number, etc. They are initialized with empty strings or numbers.
Methods:

print() { ... }: This method handles the "print" functionality. It calls the generateInvoice() method to create the invoice text.

generateInvoice() { ... }: This method generates the invoice text content and triggers the download. Here's what happens inside:

const invoiceData = this.getInvoiceData2();: It calls the getInvoiceData2() method to retrieve the formatted invoice text.
const blob = new Blob([invoiceData], { type: 'text/plain' });: It creates a Blob object containing the invoice text data as plain text.
Code creates a temporary URL for the Blob object and then:
Creates an anchor element (<a>) in the DOM.
Sets the element's href attribute to the temporary URL.
Sets the element's download attribute to "invoice.txt".
Triggers a click event on the anchor element, simulating a download.
Finally, it releases the temporary URL using window.URL.revokeObjectURL(url).
getInvoiceData2(): string { ... }: This method builds the formatted invoice text string.

let invoiceText = '';: Initializes a variable to store the invoice text.
const splitLongText = (text: string, maxWords: number): string[]: This defines a helper function to split long text into multiple lines based on a maximum word count.
Company Information: It builds the company information section using splitLongText and centerAlign for centering the text.
Invoice Header: It adds a separator line, "TAX Invoice" title, and another separator line.
Table headers: It defines headers for the item table ("Item", "Qty", "Rate", "Amount").
Table Data: It formats the item data in a table format with padding for alignment.
Additional Information: It adds lines for HS code, net amount, and amount in words. For the amount in words, it uses splitLongText again and handles cases with short or empty lines.
Printed On: It adds the printed date using this.printedOn.
Finally, it returns the complete invoice text string (invoiceText).
centerAlign(text: string): string { ... }: This method takes a string and returns it centered within a defined maximum width (40 characters). It calculates the padding needed for both sides and adds spaces to achieve the centering effect.

This code demonstrates how an Angular component can manage invoice data and generate a downloadable plain text invoice with basic formatting and centering.
