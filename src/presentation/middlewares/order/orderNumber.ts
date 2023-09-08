// export class AutoOrderNumber {
//   private static idCounter: number = 0;
//   private static lastResetTime: number = Date.now();

//   static generateNumberOrder(prefix: number): string {
//     const now = Date.now();

//     // Check if 5 minutes (300,000 milliseconds) have passed since the last reset
//     if (now - this.lastResetTime >= 60000) {
//       this.idCounter = 0; // Reset the counter
//       this.lastResetTime = now; // Update the last reset time
//     }

//     if (this.idCounter > 1000) {
//       throw new Error("Order number limit exceeded (0-999).");
//     }

//     const orderNumber = `${prefix}${this.idCounter.toString()}`;
//     this.idCounter++;
//     return orderNumber;
//   }
// }



export class AutoOrderNumber {
  private static idCounter: number = 0;
  private static lastResetTime: number = Date.now();
  private static resetTime: number = getMidnightTimestamp(); // Set the reset time to midnight

  static generateNumberOrder(prefix: number): string {
    const now = Date.now();

    // Check if the current time has passed the reset time (midnight)
    if (now >= this.resetTime) {
      this.idCounter = 0; // Reset the counter
      this.resetTime = getMidnightTimestamp(); // Update the reset time to the next midnight
    }

    if (this.idCounter > 1000) {
      throw new Error("Order number limit exceeded (0-999).");
    }

    const orderNumber = `${prefix}${this.idCounter.toString()}`;
    this.idCounter++;
    return orderNumber;
  }
}

// Helper function to get the timestamp for the next midnight
function getMidnightTimestamp(): number {
  const now = new Date();
  now.setHours(24, 0, 0, 0); // Set the time to 12:00 AM of the next day
  return now.getTime();
}
