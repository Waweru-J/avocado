import html2pdf from "html2pdf.js";
import { toast } from "react-toastify";

const generateReport = (data) => {
  // Construct HTML content for the report
  const htmlContent = `
    <html>
      <head>
        <title>Avocado Report</title>
        <style>
          .table {
            width: 100%;
            border-collapse: collapse;
          }
          .table th, .table td {
            border: 1px solid #000;
            padding: 8px;
            text-align: left;
          }
          .table th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        <h1>Avocado Report</h1>
        <table class="table">
          <thead>
            <tr class="bg-gray-200">
              <th class="border px-4 py-2">Variety</th>
              <th class="border px-4 py-2">Username</th>
              <th class="border px-4 py-2">Email</th>
              <th class="border px-4 py-2">Phone</th>
              <th class="border px-4 py-2">Produce Quality</th>
              <th class="border px-4 py-2">Price</th>
              <th class="border px-4 py-2">Location</th>
              <th class="border px-4 py-2">Harvest Times</th>
              <th class="border px-4 py-2">Farmsize</th>
              <th class="border px-4 py-2">Description</th>
              <th class="border px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            ${data
              .map(
                (avocado) => `
                  <tr>
                    <td class="border px-4 py-2">${avocado.variety}</td>
                    <td class="border px-4 py-2">${avocado.username}</td>
                    <td class="border px-4 py-2">${avocado.email}</td>
                    <td class="border px-4 py-2">${avocado.phone}</td>
                    <td class="border px-4 py-2">${avocado.produceQuality}</td>
                    <td class="border px-4 py-2">${avocado.price}</td>
                    <td class="border px-4 py-2">${avocado.location}</td>
                    <td class="border px-4 py-2">${avocado.harvestTimes}</td>
                    <td class="border px-4 py-2">${avocado.farmsize}</td>
                    <td class="border px-4 py-2">${avocado.description}</td>
                    <td class="border px-4 py-2">${new Date(
                      avocado.date
                    ).toLocaleDateString()}</td>
                  </tr>
                `
              )
              .join("")}
          </tbody>
        </table>
      </body>
    </html>
  `;

  // Options for html2pdf
  const options = {
    filename: "avocado_report.pdf",
    html2canvas: {
      useCORS: true,
    },
    jsPDF: {
      unit: "pt",
      format: "a4",
      orientation: "portrait",
    },
  };

  // Generate PDF using html2pdf
  html2pdf()
    .from(htmlContent)
    .set(options)
    .save()
    .then(() => {
      // Display success toast notification
      toast.success("Report generated successfully!");
    })
    .catch((error) => {
      // Display error toast notification
      toast.error("Error generating report.");
      console.error("Error generating report:", error);
    });
};

export default generateReport;
