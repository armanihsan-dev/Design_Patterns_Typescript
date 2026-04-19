// You have an old system that expects XML
class OldSystem {
  processXML(data: string): void {
    console.log(`Processing XML: ${data}`);
  }
}
// Your new system gives JSON
const jsonData = '{"name": "John"}';

const oldSystemInstance = new OldSystem();
oldSystemInstance.processXML(jsonData); // ❌ ERROR! Expects XML, gets JSON

class JSONtoXMLAdapter {
  private oldSystem: OldSystem;
  constructor(oldSystem: OldSystem) {
    this.oldSystem = oldSystem;
  }

  processJSON(jsonData: string): void {
    const xmlData = this.convertJSONtoXML(jsonData);
    this.oldSystem.processXML(xmlData);
  }
  private convertJSONtoXML(json: string): string {
    const obj = JSON.parse(json);
    return `<data><name>${obj.name}</name></data>`;
  }
}

const xmlAdapter = new JSONtoXMLAdapter(oldSystemInstance);
xmlAdapter.processJSON(jsonData); // // ✅ Works!

//The Simplest Code Example

// Target interface - what the client expects
interface USBTypeC {
  charge(): void;
}

class OldUSB {
  chargeWithOldUSB(): void {
    console.log('Charging with Old USB');
  }
}

class USBAdapter implements USBTypeC {
  private oldCharger: OldUSB;

  constructor(oldUSBCharger: OldUSB) {
    this.oldCharger = oldUSBCharger;
  }

  charge(): void {
    this.oldCharger.chargeWithOldUSB();
    console.log('Charging via adapter');
  }
}

// Client code - only understands USBTypeC
class Laptop {
  chargeDevice(charge: USBTypeC) {
    charge.charge();
  }
}

//usage
const oldUSB = new OldUSB();
const chargerAdapter = new USBAdapter(oldUSB);
chargerAdapter.charge();

// Client (Laptop)      Adapter           Old System (OldUSB)
//      |                  |                      |
//      | expects USB-C    |                      |
//      |----------------->|                      |
//      |                  | translates           |
//      |                  |--------------------->|
//      |                  |                      | does old method
//      |                  |<---------------------|
//      |<-----------------|                      |
//      |                  |                      |

// 1. API Response Adapter

// Your app expects this format
interface AppUser {
  fullName: string;
  email: string;
}

// External API gives this format
interface ApiUser {
  user: {
    first: string;
    last: string;
  };
  emailAddress: string;
}

// Adapter translates API format to App format
class UserAdapter implements AppUser {
  fullName: string;
  email: string;

  constructor(apiUser: ApiUser) {
    this.fullName = `${apiUser.user.first} ${apiUser.user.last}`;
    this.email = apiUser.emailAddress;
  }

  getUser(): AppUser {
    return {
      fullName: this.fullName,
      email: this.email,
    };
  }
}

// usage
const apiUser: ApiUser = {
  user: {
    first: 'Munnu',
    last: 'Shunnu',
  },
  emailAddress: 'munnuShunnu22@gmail.com',
};
const appUserAdapter = new UserAdapter(apiUser);
console.log(appUserAdapter.getUser());

// Payment System
// You have an old payment system that returns XML, but your new system expects JSON.

class LagacyPaymentSystem {
  processPayment(xmlData: string): string {
    // Simulate processing XML and returning a response
    console.log('Legacy system processing:', xmlData);
    return `<?xml version="1.0"?><response><status>success</status></response>`;
  }
}

// Target interface (what our new system expects)
interface ModernPaymentSystem {
  pay(
    amount: number,
    currency: string
  ): {
    success: boolean;
    transactionId: string;
    timestamp: Date;
  };
}

// Adapter - Makes legacy system work with modern interface
class PaymentAdapter implements ModernPaymentSystem {
  private legacySystem: LagacyPaymentSystem;
  constructor(oldSystem: LagacyPaymentSystem) {
    this.legacySystem = oldSystem;
  }
  pay(
    amount: number,
    currency: string
  ): {
    success: boolean;
    transactionId: string;
    timestamp: Date;
  } {
    const xmlRequest = `<payment><amount>${amount}</amount><currency>${currency}</currency></payment>`;
    const xmlResponse = this.legacySystem.processPayment(xmlRequest);

    const success = xmlResponse.includes('success');
    const transactionId = `TXN_${Date.now()}_${Math.random()}`;
    return {
      success,
      transactionId,
      timestamp: new Date(),
    };
  }
}

const LagacyPayment = new LagacyPaymentSystem();
const modernPayment = new PaymentAdapter(LagacyPayment);
const paymentResult = modernPayment.pay(100, 'USD');
console.log(paymentResult);
