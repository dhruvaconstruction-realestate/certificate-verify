// Read certificate ID from URL
const params = new URLSearchParams(window.location.search);
const certificateId = params.get("id");

// Load certificate data
fetch("data.json")
  .then(response => response.json())
  .then(certificates => {

      const certificate = certificates.find(
          c => c.certificateNo === certificateId
      );

      if(!certificate){

          document.querySelector(".container").innerHTML=`
          <div style="padding:50px;text-align:center;">
          <h1 style="color:red;">❌ Invalid Certificate</h1>
          <p>This certificate does not exist.</p>
          </div>
          `;
          return;

      }

      document.getElementById("photo").src = certificate.photo;

      document.getElementById("certificateNo").textContent = certificate.certificateNo;

      document.getElementById("name").textContent = certificate.name;

      document.getElementById("roll").textContent = certificate.roll;

      document.getElementById("mobile").textContent = certificate.mobile;

      document.getElementById("address").textContent = certificate.address;

      document.getElementById("project").textContent = certificate.project;

      document.getElementById("training").textContent = certificate.training;

      document.getElementById("score").textContent = certificate.score;

  });
