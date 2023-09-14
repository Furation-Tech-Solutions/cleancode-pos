export class AutoInvoiceNumber {

  private static idCounter: number = 0;

  static generateNumberInvoice(prefix: string): string {
    if (this.idCounter > 999999999999999) {
      throw new Error("Invoice number limit exceeded (0-999999999999999).");
    }

    const invoice_number = `${prefix}${this.idCounter.toString().padStart(2,"0")}`;
    this.idCounter++;
    return invoice_number;
  }
}