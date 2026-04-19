//Observer interface
interface Observer {
  udpate(data: any): void;
}

// Subject (Observable)
class WeatherStation {
  private observers: Observer[] = [];
  private temperature: number = 0;
  private humidity: number = 0;

  attach(observer: Observer): void {
    this.observers.push(observer);
    console.log(`${observer.constructor.name} attached to weather station`);
  }

  detach(observer: Observer): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
    console.log(`${observer.constructor.name} detached from weather station`);
  }

  // Notify all observers
  private notify(): void {
    const data = {
      temperature: this.temperature,
      humidity: this.humidity,
      timeStamp: new Date(),
    };
    this.observers.forEach((obs) => obs.udpate(data));
  }

  setMeasurements(temp: number, humidity: number): void {
    this.temperature = temp;
    this.humidity = humidity;
    this.notify();
  }
}

// Concrete Observers

class PhoneDisplay implements Observer {
  private name: string;
  constructor(name: string) {
    this.name = name;
  }
  udpate(data: any): void {
    console.log(
      `${this.name} Phone Display - Temperature: ${data.temperature}°C, Humidity: ${data.humidity}%, Time: ${data.timeStamp}`
    );
  }
}
const phoneObs = new PhoneDisplay('Vivo - v60 lite');
class TVDisplay implements Observer {
  private name: string;
  constructor(name: string) {
    this.name = name;
  }
  udpate(data: any): void {
    console.log(
      `${this.name} TV Display - Temperature: ${data.temperature}°C, Humidity: ${data.humidity}%, Time: ${data.timeStamp}`
    );
  }
}
const tvObs = new TVDisplay('SONY');

class WebsiteDisplay implements Observer {
  private name: string;
  constructor(name: string) {
    this.name = name;
  }
  udpate(data: any): void {
    console.log(
      `${this.name} Website Display - Temperature: ${data.temperature}°C, Humidity: ${data.humidity}%, Time: ${data.timeStamp}`
    );
  }
}
const webObs = new WebsiteDisplay('AccuWeather');

const wStationIslamabad = new WeatherStation();
wStationIslamabad.attach(phoneObs);
wStationIslamabad.attach(tvObs);
wStationIslamabad.attach(webObs);

wStationIslamabad.setMeasurements(30, 70);


// // run this code and it will log
// PhoneDisplay attached to weather station
// TVDisplay attached to weather station
// WebsiteDisplay attached to weather station
// Vivo - v60 lite Phone Display - Temperature: 30°C, Humidity: 70%, Time: Sun Apr 19 2026 16:14:50 GMT+0500 (Pakistan Standard Time)
// SONY TV Display - Temperature: 30°C, Humidity: 70%, Time: Sun Apr 19 2026 16:14:50 GMT+0500 (Pakistan Standard Time)
// AccuWeather Website Display - Temperature: 30°C, Humidity: 70%, Time: Sun Apr 19 2026 16:14:50 GMT+0500 (Pakistan Standard Time)