let addPresBtn = document.getElementById("addPres");
let presBody = document.getElementById("pbody");

let presCount = 0;

addPresBtn.addEventListener("click", () => {
    // Get current input values
    const doctor=document.getElementById("doctor").value.trim();
    const patient = document.getElementById("patient").value.trim();
    const medicine = document.getElementById("medicine").value.trim();
    const dosage = document.getElementById("dosage").value.trim();
    const days = document.getElementById("days").value.trim();

    // Validate inputs
    if (
        doctor==="" ||
        patient === "" ||
        medicine === "" ||
        dosage === "" ||
        days === ""

    ) {
        alert("Please fill all fields");
        return;
    }

    presCount++;

    // Create new row
    let row = document.createElement("tr");
    row.innerHTML = `
        <td>${presCount}</td>
        <td>${doctor}</td>
        <td>${patient}</td>
        <td>${medicine}</td>
        <td>${dosage}</td>
        <td>${days}</td>
        <td>
            <button class="btn btn-info btn-sm viewBtn">View</button>
            <button class="btn btn-secondary btn-sm printBtn">Print</button>
        </td>
    `;
    presBody.appendChild(row);

    // Save to localStorage
    let prescriptions = JSON.parse(localStorage.getItem("prescriptions")) || [];
    prescriptions.push({
        doctor:doctor,
        patient: patient,
        medicine: medicine,
        dosage: dosage,
        days: days,
        date: new Date().toLocaleDateString(),
    });
    localStorage.setItem("prescriptions", JSON.stringify(prescriptions));

   

    
    // Attach event listeners to new buttons
    row.querySelector(".viewBtn").addEventListener("click", () => {
        let cells = row.children;
        let url = `./viewPres.html?patient=${encodeURIComponent(cells[1].innerText)}&medicine=${encodeURIComponent(cells[2].innerText)}&dosage=${encodeURIComponent(cells[3].innerText)}&days=${encodeURIComponent(cells[4].innerText)}`;
        window.location.href = url;
    });

    row.querySelector(".printBtn").addEventListener("click", () => {
        window.print();
    });
});