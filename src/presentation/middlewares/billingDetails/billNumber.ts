// export class AutoBillingNumber {
//   private static idCounter: number = 0;
//   private static lastResetTime: number = Date.now();
//   private static resetTime: number = getMidnightTimestamp(); // Set the reset time to midnight

//   static generateNumberBilling(prefix: number): string {
//     const now = Date.now();

//     // Check if the current time has passed the reset time (midnight)
//     if (now >= this.resetTime) {
//       this.idCounter = 0; // Reset the counter
//       this.resetTime = getMidnightTimestamp(); // Update the reset time to the next midnight
//     }

//     if (this.idCounter > 10000000000000000) {
//       throw new Error("Billing number limit exceeded (0-9999999999999999).");
//     }

//     const billingNumber = `${prefix}${this.idCounter.toString()}`;
//     this.idCounter++;
//     return billingNumber;
//   }
// }

// // Helper function to get the timestamp for the next midnight
// function getMidnightTimestamp(): number {
//   const now = new Date();
//   now.setHours(24, 0, 0, 0); // Set the time to 12:00 AM of the next day
//   return now.getTime();
// }


// export class AutoBillingNumber {
//   private static idCounter: number = 0;

//   static generateNumberBilling(prefix: number): string {

//     if (this.idCounter > 1000) {
//       throw new Error("Billing number limit exceeded (0-999).");
//     }

//     const billingNumber = `${prefix}${this.idCounter.toString()}`;
//     this.idCounter++;
//     return billingNumber;
//   }
// }


export class AutoBillingNumber {

  private static idCounter: number = 0;

  static generateNumberBilling(prefix: number): string {
    if (this.idCounter > 999999999999999) {
      throw new Error("Billing number limit exceeded (0-999999999999999).");
    }

    const billNumber = `${prefix}${this.idCounter.toString().padStart(1, '0')}`;
    this.idCounter++;
    return billNumber;
  }
}