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
  const formObject = JSON.parse(e.postData.contents);
  const result = processForm(formObject);
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function processForm(formObject) {
  const ss = SpreadsheetApp.openById('1Wlnii1StySbMlb-2_OPjhBpdZ5OwTXj84PC7-bR5NAo');
  const ws = ss.getSheets()[0];
  const data = ws.getDataRange().getValues();

  const alreadyExists = data.some(row => row[0] === formObject.first_name && row[1] === formObject.last_name);
  if (alreadyExists) {
    return { status: "duplicate" };
  }

  ws.appendRow([
    formObject.first_name,
    formObject.last_name,
    formObject.gender,
    formObject.wght,
    formObject.height,
    formObject.marital_status,
    formObject.education,
    formObject.income,
    formObject.disease1,
    formObject.disease_check11,
    formObject.disease_check22,
    formObject.disease_check33,
    formObject.period,
    formObject.alcohol,
    formObject.alcohol2,
    formObject.smoke,
    formObject.smoke2,
    formObject.disease_,
    formObject.disease_check1,
    formObject.disease_check2,
    formObject.disease_check3,
    formObject.disease_check4,
    formObject.disease_check5,
    formObject.drug,
    formObject.type
  ]);

  return { status: "success" };
}
