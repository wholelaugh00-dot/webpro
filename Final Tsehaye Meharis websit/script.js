console.log("JS loaded ✅");

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
menuBtn.addEventListener("click", () => {
    mobileMenu.style.display = mobileMenu.style.display === "flex" ? "none" : "flex";
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function(e){
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if(target) target.scrollIntoView({behavior:"smooth"});
        mobileMenu.style.display = "none";
    });
});

document.getElementById("exploreBtn").addEventListener("click", ()=>{
    document.querySelector("#gallery").scrollIntoView({behavior:"smooth"});
});

const orderBtn = document.getElementById("orderBtn");
const clientName = document.getElementById("clientName");
const phoneNumber = document.getElementById("phoneNumber");
const dressType = document.getElementById("dressType");
const eventDate = document.getElementById("eventDate");
const measurements = document.getElementById("measurements");
const orderList = document.getElementById("orderList");
const completedOrders = document.getElementById("completedOrders");

let orders = JSON.parse(localStorage.getItem("orders")) || [];

function saveOrders(){ localStorage.setItem("orders", JSON.stringify(orders)); }

function renderOrders(){
    orderList.innerHTML = "";
    completedOrders.innerHTML = "";
    orders.forEach((order,index)=>{
        const li = document.createElement("li");
        let text = `${order.name} – ${order.dress} (${order.date}) | Phone: ${order.phone}`;
        if(order.measurements) text += ` | Measurements: ${order.measurements}`;
        li.textContent = text;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete"; deleteBtn.className="delete-btn";
        deleteBtn.onclick=()=>{ orders.splice(index,1); saveOrders(); renderOrders(); };

        if(!order.done){
            const completeBtn = document.createElement("button");
            completeBtn.textContent="Complete"; completeBtn.className="complete-btn";
            completeBtn.onclick=()=>{ order.done=true;
                saveOrders();
                renderOrders();
             };
            li.appendChild(completeBtn); 
            li.appendChild(deleteBtn);
            orderList.appendChild(li);
        } 
        else {
            li.classList.add("done"); 
            li.appendChild(deleteBtn); 
            completedOrders.appendChild(li);
        }
    });
}

orderBtn.addEventListener("click", ()=>{
    if(clientName.value===""||phoneNumber.value===""||dressType.value===""||eventDate.value===""){
        alert("Please fill all required fields");
        return;
    }
    orders.push({
        name: clientName.value,
        phone: phoneNumber.value,
        dress: dressType.value,
        date: eventDate.value,
        measurements: measurements.value,
        done: false
    });
    saveOrders(); 
    renderOrders();
    clientName.value="";
    phoneNumber.value=""; 
    dressType.value=""; 
    eventDate.value=""; 
    measurements.value="";
});

renderOrders();

const appointmentBtn = document.getElementById("appointmentBtn");
const appName = document.getElementById("appName");
const appPhone = document.getElementById("appPhone");
const appointmentDate = document.getElementById("appointmentDate");
const appointmentList = document.getElementById("appointmentList");

let appointments = JSON.parse(localStorage.getItem("appointments"))||[];

function saveAppointments(){ localStorage.setItem("appointments",JSON.stringify(appointments)); }

function renderAppointments(){
    appointmentList.innerHTML="";
    appointments.forEach((app,index)=>{
        const li=document.createElement("li");
        li.textContent=`${app.name} | ${app.phone} | ${app.date}`;
        const delBtn=document.createElement("button");
        delBtn.textContent="Delete"; 
        delBtn.className="delete-btn";
        delBtn.onclick=()=>{ appointments.splice(index,1); 
            saveAppointments(); 
            renderAppointments(); 
        };
        li.appendChild(delBtn); 
        appointmentList.appendChild(li);
    });
}

appointmentBtn.addEventListener("click",()=>{
    if(appName.value===""||appPhone.value===""||appointmentDate.value===""){
        alert("Please fill all fields");
        return;
    }
    appointments.push({name:appName.value,phone:appPhone.value,date:appointmentDate.value});
    saveAppointments(); 
    renderAppointments();
    appName.value="";
     appPhone.value="";
      appointmentDate.value="";
});

renderAppointments();
