// product interface
interface Transport {
  deliver(): void;
  calculateCost(distance: number): number;
}

class Truck implements Transport {
  deliver(): void {
    console.log('Delivering by land in a truck');
  }
  calculateCost(distance: number): number {
    return distance * 0.5; //$0.5 per km
  }
}
class Ship implements Transport {
  deliver(): void {
    console.log('Delivering by sea in a ship');
  }

  calculateCost(distance: number): number {
    return distance * 0.3; // $0.3 per km
  }
}
class Airplane implements Transport {
  deliver(): void {
    console.log('Delivering by air in a plane');
  }

  calculateCost(distance: number): number {
    return distance * 0.8; // $0.8 per km
  }
}

// Creator (Factory)
abstract class Logistics {
  // Factory method
  abstract createTransport(): Transport;
  // Common method that uses the product
  planDelivery(distance: number): void {
    const transport = this.createTransport();
    console.log(`Planning delivery over ${distance} km...`);
    transport.deliver();
  }
}

//concrete creatros
class RoadLogistics extends Logistics {
  createTransport(): Transport {
    return new Truck();
  }
}
class SeaLogistics extends Logistics {
  createTransport(): Transport {
    return new Ship();
  }
}
class AirLogistics extends Logistics {
  createTransport(): Transport {
    return new Airplane();
  }
}

// Usage - Real scenario: E-commerce shipping calculator
class Order {
  public items: any[];
  public destination: string;
  public distance: number;

  constructor(items: any[], destination: string, distance: number) {
    this.items = items;
    this.destination = destination;
    this.distance = distance;
  }

  calculateShipping(): number {
    let logistics: Logistics;
    switch (this.destination) {
      case 'local':
        logistics = new RoadLogistics();
        break;
      case 'international':
        logistics = new AirLogistics();
        break;
      case 'overseas':
        logistics = new SeaLogistics();
        break;
      default:
        throw new Error('Unknown destination');
    }

    const transport = logistics.createTransport();
    return transport.calculateCost(this.distance);
  }
}

const order1 = new Order(['bag', 'laptop'], 'local', 22);
const order2 = new Order([], 'international', 400);

// console.log('Shipping cost for order2: $' + order2.calculateShipping());
// console.log(`Shipping cost for order1: $${order1.calculateShipping()}`);

// Step 1: Create the Product Interface
interface Notifier {
  send(message: string): void;
}

// Step 2: Create Concrete Products
class EmailNotifier implements Notifier {
  send(message: string): void {
    console.log(`Sending email with message: ${message}`);
  }
}
class SMSNotifier implements Notifier {
  send(message: string): void {
    console.log(`Sending SMS with message: ${message}`);
  }
}
class PhoneNotifier implements Notifier {
  send(message: string): void {
    console.log(`Sending phone notification : ${message}`);
  }
}

// Step 3: Create Creator with Factory Method
abstract class NotificationFactory {
  abstract createNotifier(): Notifier;

  sendNotification(message: string): void {
    const notifier = this.createNotifier();
    notifier.send(message);
  }
}

// Step 4: Create Concrete Creators

class EmailFactory extends NotificationFactory {
  createNotifier(): Notifier {
    return new EmailNotifier();
  }
}
class SMSFactory extends NotificationFactory {
  createNotifier(): Notifier {
    return new SMSNotifier();
  }
}
class PhoneNotificationFactory extends NotificationFactory {
  createNotifier(): Notifier {
    return new PhoneNotifier();
  }
}

enum notificationTypes {
  EMAIL = 'email',
  SMS = 'sms',
  PHONE = 'phone',
}
// Step 5: Usage
class sendNotification {
  public message: string;
  public type: notificationTypes;

  constructor(msg: string, notitype: notificationTypes) {
    this.message = msg;
    this.type = notitype;
  }
  sendNotification(): string {
    let notificationType: NotificationFactory;
    switch (this.type) {
      case notificationTypes.EMAIL:
        notificationType = new EmailFactory();
        break;
      case notificationTypes.SMS:
        notificationType = new SMSFactory();
        break;
      case notificationTypes.PHONE:
        notificationType = new PhoneNotificationFactory();
        break;
      default:
        throw new Error('Unknown notification type');
    }
    notificationType.createNotifier().send(this.message);
    return `Notification sent using ${this.type}`;
  }
}

const notification1 = new sendNotification(
  'Hello, you have a new message!',
  notificationTypes.EMAIL
);
notification1.sendNotification();
