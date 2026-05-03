class BankAccount {
  #owner;
  #balance;

  constructor(owner, initialBalance = 0) {
    if (typeof owner !== "string" || owner.trim() === "") {
      throw new Error("Gecerli bir hesap sahibi gerekli.");
    }
    if (typeof initialBalance !== "number" || Number.isNaN(initialBalance) || initialBalance < 0) {
      throw new Error("Baslangic bakiyesi 0 veya daha buyuk olmali.");
    }

    this.#owner = owner;
    this.#balance = initialBalance;
  }

  getOwner() {
    return this.#owner;
  }

  getBalance() {
    return this.#balance;
  }

  deposit(amount) {
    this.#validateAmount(amount);
    this.#balance += amount;
  }

  withdraw(amount) {
    this.#validateAmount(amount);
    const fee = this.calculateFee(amount);
    const total = amount + fee;

    if (total > this.#balance) {
      throw new Error("Yetersiz bakiye.");
    }

    this.#balance -= total;
    return { amount, fee, total };
  }

  calculateFee(_) {
    return 0;
  }

  #validateAmount(amount) {
    if (typeof amount !== "number" || Number.isNaN(amount) || amount <= 0) {
      throw new Error("Tutar 0'dan buyuk bir sayi olmali.");
    }
  }
}

class StandardAccount extends BankAccount {
  calculateFee(amount) {
    return amount * 0.02;
  }
}

class StudentAccount extends BankAccount {
  calculateFee(_) {
    return 0;
  }
}

class PremiumAccount extends BankAccount {
  calculateFee(amount) {
    return amount * 0.005;
  }
}

module.exports = {
  BankAccount,
  StandardAccount,
  StudentAccount,
  PremiumAccount,
};

const {
  StandardAccount,
  StudentAccount,
  PremiumAccount,
} = require("./Polymorphism");

function processWithdraw(account, amount) {
  const result = account.withdraw(amount);
  console.log(
    `${account.getOwner()} -> Cekilen: ${result.amount}, Ucret: ${result.fee}, Toplam dusus: ${result.total}, Yeni bakiye: ${account.getBalance()}`
  );
}

const accounts = [
  new StandardAccount("Reis", 1000),
  new StudentAccount("Codeda", 1000),
  new PremiumAccount("Backendci", 1000),
];

for (const account of accounts) {
  processWithdraw(account, 200);
}

const {
  StandardAccount,
  StudentAccount,
  PremiumAccount,
} = require("./Polymorphism");

let hasFailure = false;

function assertCondition(condition, message) {
  if (condition) {
    console.log("OK:", message);
  } else {
    console.log("FAIL:", message);
    hasFailure = true;
  }
}

const standard = new StandardAccount("A", 1000);
const student = new StudentAccount("B", 1000);
const premium = new PremiumAccount("C", 1000);

const s = standard.withdraw(200);
const st = student.withdraw(200);
const p = premium.withdraw(200);

assertCondition(s.fee === 4, "Standard hesap ucreti %2 olmali.");
assertCondition(st.fee === 0, "Ogrenci hesap ucreti 0 olmali.");
assertCondition(p.fee === 1, "Premium hesap ucreti %0.5 olmali.");
assertCondition(
  standard.getBalance() === 796 &&
    student.getBalance() === 800 &&
    premium.getBalance() === 799,
  "Ayni withdraw cagrisinda her hesap tipi farkli davranmali."
);

if (hasFailure) {
  process.exitCode = 1;
}