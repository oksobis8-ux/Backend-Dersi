// Account.js
class Account {
  #owner;
  #balance;
  #history;

  constructor(owner, initialBalance = 0) {
    if (typeof owner !== "string" || owner.trim() === "") {
      throw new Error("Gecerli bir hesap sahibi gerekli.");
    }
    if (
      typeof initialBalance !== "number" ||
      Number.isNaN(initialBalance) ||
      initialBalance < 0
    ) {
      throw new Error("Baslangic bakiyesi 0 veya daha buyuk olmali.");
    }

    this.#owner = owner;
    this.#balance = initialBalance;
    this.#history = [
      {
        type: "init",
        amount: initialBalance,
        date: new Date().toISOString(),
      },
    ];
  }

  deposit(amount) {
    this.#validateAmount(amount);
    this.#balance += amount;
    this.#history.push({
      type: "deposit",
      amount,
      date: new Date().toISOString(),
    });
  }

  withdraw(amount) {
    this.#validateAmount(amount);
    if (amount > this.#balance) {
      throw new Error("Yetersiz bakiye.");
    }

    this.#balance -= amount;
    this.#history.push({
      type: "withdraw",
      amount,
      date: new Date().toISOString(),
    });
  }

  getBalance() {
    return this.#balance;
  }

  getHistory() {
    return this.#history.map((entry) => ({ ...entry }));
  }

  #validateAmount(amount) {
    if (typeof amount !== "number" || Number.isNaN(amount) || amount <= 0) {
      throw new Error("Tutar 0'dan buyuk bir sayi olmali.");
    }
  }
}

module.exports = Account;
// app.js
const Account = require("./Account");

const account = new Account("Reis", 1000);

console.log("Baslangic bakiyesi:", account.getBalance());

account.deposit(250);
console.log("250 TL yatirma sonrasi bakiye:", account.getBalance());

account.withdraw(100);
console.log("100 TL cekme sonrasi bakiye:", account.getBalance());

try {
  account.withdraw(5000);
} catch (error) {
  console.log("Gecersiz islem yakalandi:", error.message);
}

console.log("Son bakiye:", account.getBalance());
console.log("Islem gecmisi:", account.getHistory());
// check.js
const Account = require("./Account");

let hasFailure = false;

function assertCondition(condition, message) {
  if (condition) {
    console.log("OK:", message);
  } else {
    console.log("FAIL:", message);
    hasFailure = true;
  }
}

function throws(fn) {
  try {
    fn();
    return false;
  } catch (_) {
    return true;
  }
}

const account = new Account("Reis", 1000);

account.deposit(200);
assertCondition(account.getBalance() === 1200, "Yatirma bakiyeyi artirmali.");

account.withdraw(150);
assertCondition(account.getBalance() === 1050, "Cekme bakiyeyi azaltmali.");

assertCondition(throws(() => account.deposit(-10)), "Negatif tutar hata vermeli.");

assertCondition(throws(() => account.withdraw(50000)), "Fazla cekim hata vermeli.");

if (hasFailure) {
  process.exitCode = 1;
}
