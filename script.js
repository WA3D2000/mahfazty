// العناصر
const form = document.getElementById("transaction-form");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const transactionList = document.getElementById("transaction-list");
const balanceDiv = document.getElementById("balance");

// البيانات من localStorage أو مصفوفة جديدة
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// إضافة عملية جديدة
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const type = typeInput.value;

  if (description && amount && type) {
    const transaction = {
      id: Date.now(),
      description,
      amount,
      type
    };

    transactions.push(transaction);
    saveAndRender();
    form.reset();
  }
});

// حذف عملية
function deleteTransaction(id) {
  transactions = transactions.filter((t) => t.id !== id);
  saveAndRender();
}

// حساب الرصيد
function calculateBalance() {
  let income = 0;
  let expense = 0;

  transactions.forEach((t) => {
    if (t.type === "income") income += t.amount;
    else expense += t.amount;
  });

  return income - expense;
}

// حفظ وعرض
function saveAndRender() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
  renderTransactions();
  renderBalance();
}

// عرض العمليات
function renderTransactions() {
  transactionList.innerHTML = "";

  transactions.forEach((t) => {
    const row = document.createElement("tr");

    row.innerHTML = `
  <td style="padding:14px; border:1px solid #ddd;">${t.description}</td>
  <td style="padding:14px; border:1px solid #ddd;">${t.amount} $</td>
  <td style="padding:14px; border:1px solid #ddd;">${t.type === "income" ? "Income" : "Expense"}</td>
  <td style="padding:14px; border:1px solid #ddd;">
    <button 
      onclick="deleteTransaction(${t.id})"
      style="
        background-color: rgba(235, 6, 6, 1);
        color:white;
        border:none;
        padding:6px 12px;
        border-radius:4px;
        cursor:pointer;
        font-size:14px;
      ">
      Delete
    </button>
  </td>
`;

    transactionList.appendChild(row);
  });
}

// عرض الرصيد
function renderBalance() {
  const balance = calculateBalance();
  balanceDiv.textContent = `current money ${balance} $`;
}

// عند تحميل الصفحة
saveAndRender();
