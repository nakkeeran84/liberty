var hrecords = [
{
    "resources":[
    {
        "patientId":"100",
        "recordType":"join",
        "record":'{"date":"10/11/2016","time":"23:10","firstName":"Dinesh","secondName":"Balasundaram","age":"28","location":"Chennai","phNo":"9790785993","insurance":"AGQ13882513397204"}'
    }
    ],
    "transactionId": "c2c8ff1d-f0dc-4cb1-925b-990d16012592",
    "timestamp":"2017-10-28T12:24:31.388Z"
},
{
    "resources":[
    {
        "patientId":"100",
        "recordType":"appointment",
        "record":'{"date":"12/11/2016","time":"12:00","hospitalId":"101","physician":"M.Rajapandi MBBS, MD Gen Medicine, MRCP (UK), PhD - Medical Oncology","diagnosis":"Bone Fracture","reason":"surgery","physicianImg":"dr-rajapandian.jpeg"}'
    }
    ],
    "transactionId": "c2c8ff1d-f0dc-4cb1-925b-990d1601234",
    "timestamp":"2017-10-28T12:25:32.005Z"
},
{
    "resources":[
    {
        "patientId":"100",
        "recordType":"labreport",
        "record":'{"date":"15/11/2016","time":"09:10","hospitalId":"102","physician":"M.Rajapandi MBBS, MD Gen Medicine, MRCP (UK), PhD - Medical Oncology","diagnosis":"Bone Fracture","type":"Brain Perfusion SPECT/CT","docs":["image.jpg","reportsummary.pdf"]}'
      }
    ],
    "transactionId": "c2c8ff1d-f0dc-4cb1-925b-990d16087870",
    "timestamp":"2017-10-28T12:25:32.005Z"
},
{
    "resources":[
    {
        "patientId":"100",
        "recordType":"admission",
        "record":'{"date":"17/11/2016","time":"14:15","hospitalId":"101","physician":"Rajapandi","diagnosis":"Bone Fracture","reason":"Surgery","type":"inpatient","insurance":"AGQ13882513397204"}'
    }
    ],
    "transactionId": "c2c8ff1d-f0dc-4cb1-925b-990d16065465465",
    "timestamp":"2017-10-28T12:25:32.005Z"
},
{
    "resources":[
    {
        "patientId":"100",
        "recordType":"discharge",
        "record":'{"date":"18/11/2016","time":"10:30","hospitalId":"101","physician":"Rajapandi","diagnosis":"Bone Fracture","docs":["image.jpg","reportsummary.pdf"]}'
    }
    ],
    "transactionId": "c2c8ff1d-f0dc-4cb1-925b-990d160654345454",
    "timestamp":"2017-10-28T12:25:32.005Z"
},{
    "resources":[
    {
        "patientId":"100",
        "recordType":"appointment",
        "record":'{"date":"02/12/2016","time":"08:00","hospitalId":"102","physician":"A.Chithra MBBS, MD Gen Medicine","diagnosis":"General Medicine","reason":"Heavy Fever","physicianImg":"dr-chithra.jpeg"}'
    }
    ],
    "transactionId": "c2c8ff1d-f0dc-4cb1-925b-990d160874545",
    "timestamp":"2017-10-28T12:25:32.005Z"
},
{
    "resources":[
    {
        "patientId":"100",
        "recordType":"labreport",
        "record":'{"date":"15/11/2016","time":"09:10","hospitalId":"102","physician":"A.Chithra MBBS, MD Gen Medicine","diagnosis":"Dengue","type":"Blood IgM and IgG","docs":["image.jpg","reportsummary.pdf"]}'
      }
    ],
    "transactionId": "c2c8ff1d-f0dc-4cb1-925b-990d1604586932",
    "timestamp":"2017-10-28T12:25:32.005Z"
}
];

var hrecordsFormated = [];
exports.findAll = function (req, res, next) {
    formatData(hrecords);
    res.send(hrecordsFormated.reverse());
};

function formatData(hrecords) {
  hrecordsFormated = hrecords.map(function(item){
   var cardDetail = {};
   var record  = JSON.parse(item.resources[0].record);
   cardDetail.record = record;
   cardDetail.recordId = item.transactionId;
   cardDetail.recordType = item.resources[0].recordType;

    if (record.hospitalId === '101'){
      cardDetail.hostpitalImg = 'logo-apollo.png';
    } else if (record.hospitalId === '102'){
      cardDetail.hostpitalImg = 'logo-global.png';
    }
   switch (item.resources[0].recordType) {
     case "join":
       cardDetail.title = "Welcome";
       cardDetail.desc = record.firstName + ' ' + record.secondName;
       cardDetail.img = "icons8-customer.png";
     break;
     case "appointment":
       cardDetail.title = "Dr. Appointment";
       cardDetail.desc = record.physician;
       cardDetail.img = "icons8-calendar.png";
     break;
     case "labreport":
       cardDetail.title = "Lab Report";
       cardDetail.desc = record.type;
       cardDetail.img = "icons8-test-tube.png";
     break;
     case "admission":
       cardDetail.title = "Admission";
       cardDetail.desc = 'Reason: ' + record.reason;
       cardDetail.img = "icons8-nurse-call.png";
     break;
     case "discharge":
       cardDetail.title = "Discharge Summary";
       cardDetail.desc = 'Diagnosis: ' + record.diagnosis;
       cardDetail.img = "icons8-walking.png";
     break;
   }

     return cardDetail;
 });
}



exports.filterByType = function (req, res, next) {
    var type = req.params.type;
    var hrecordfilterted = hrecords.filter(function(item){
        return item.resources[0].recordType === type;
    });
    formatData(hrecordfilterted);
    res.send(hrecordsFormated);
};

exports.findById = function (req, res, next) {

    var id = req.params.recordId;
    var hrecordfilterted = hrecords.filter(function(item){
      return item.transactionId === id;
    });
    formatData(hrecordfilterted);
    res.send(hrecordsFormated);
};
