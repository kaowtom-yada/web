function doGet(e) {
  let page = e.parameter.page || 'index';
  let htmlTemplate = HtmlService.createTemplateFromFile(page);
  let htmlOutput = htmlTemplate.evaluate();
  htmlOutput.setTitle(getPageTitle(page));
  return htmlOutput;
}

function getPageTitle(page) {
  switch (page) {
    case 'form':
      return 'แบบสอบถามข้อมูลส่วนบุคคล';
    case 'know':
      return 'แบบประเมินสุขภาพโรคหลอดเลือดหัวใจ';
    case 'index':
    default:
      return 'MeowHeart';
  }
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getUrl() {
  return ScriptApp.getService().getUrl();
}

// ✅ ใช้ doPost แทน google.script.run
function doPost(e) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST",
    "Access-Control-Allow-Headers": "Content-Type"
  };

  try {
    const data = JSON.parse(e.postData.contents);

    // ตรวจสอบข้อมูลซ้ำได้ตรงนี้ (เสริมได้ภายหลัง)

    // บันทึกลงชีต
    const sheet = SpreadsheetApp.openById("ใส่ Google Sheet ID ของคุณ");
    const ws = sheet.getSheetByName("Sheet1"); // หรือชื่อชีตที่ใช้

    ws.appendRow([
      new Date(),
      data.first_name,
      data.last_name,
      data.gender,
      data.wght,
      data.height,
      data.marital_status,
      data.education,
      data.income,
      data.disease1,
      data.disease_check11,
      data.disease_check22,
      data.disease_check33,
      data.period,
      data.alcohol,
      data.alcohol2,
      data.smoke,
      data.smoke2,
      data.disease_,
      data.disease_check1,
      data.disease_check2,
      data.disease_check3,
      data.disease_check4,
      data.disease_check5,
      data.drug,
      data.type
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.message }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);
  }
}

