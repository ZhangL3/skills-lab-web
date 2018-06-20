/**
 * Define Observable class to spread the information to observer.
 */
export default class Observable {
    // Store all observers
    constructor() {
        this.observers = [];
    }

    // Add observer(function) to observers
    subscribe(f) {
        this.observers.push(f);
    }

    // Remove observer(function) from observers
    unsubscribe(f) {
        this.observers = this.observers.filter(subscriber => subscriber !== f);
    }

    // Run all subscribed functions from different observer
    notify(data) {
        this.observers.forEach(observer => observer(data));
    }
}