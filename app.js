let currentAppointmentCode = "";
let isAppointmentValid = false;
let totalRevenue = 0;
let totalAppointments = 0;
let isRunning = true;

while (isRunning){
  let choice = prompt(
    "===== LOTUS SPA =====\n"+
    "1. Nhập mã lịch hẹn\n"+
    "2. Tính tiền liệu trình\n"+
    "3. Kiểm tra mã may mắn\n"+
    "0. Thoát\n"+
    "Nhập lựa chọn (0-3):"
  );
  if (choice === null){
    isRunning = false;
  } else{
    choice = choice.trim();
    switch (choice){
      case "1":{
        currentAppointmentCode = "";
        isAppointmentValid = false;
        let appointmentCode = prompt("Nhập mã lịch hẹn:");
        if (appointmentCode !== null){
          appointmentCode = appointmentCode.trim().toUpperCase();
          if (appointmentCode === ""){
            alert("Chưa nhập mã lịch hẹn.");
          } else if (appointmentCode.length < 6){
            alert("Mã phải có ít nhất 6 ký tự.");
          } else if (!appointmentCode.startsWith("SPA-")){
            alert('Mã phải bắt đầu bằng "SPA-".');
          } else if (appointmentCode.slice(4).includes(" ")){
            alert("Mã không được có khoảng trắng ở giữa.");
          } else{
            currentAppointmentCode = appointmentCode;
            isAppointmentValid = true;
            alert("Mã lịch hẹn hợp lệ: " + currentAppointmentCode);
          }
        }
        break;
      }
      case "2":{
        if (isAppointmentValid === false){
          alert("Hãy nhập mã lịch hẹn hợp lệ ở lựa chọn 1 trước.");
          break;
        }
        let treatmentCount = prompt("Nhập số liệu trình:");
        if (treatmentCount === null){
          alert("Đã hủy.");
          break;
        }
        treatmentCount = Number(treatmentCount.trim());
        if (!Number.isInteger(treatmentCount) || treatmentCount <= 0){
          alert("Số liệu trình phải là số nguyên lớn hơn 0.");
          break;
        }
        let pricePerTreatment = prompt("Nhập giá mỗi liệu trình (VND):");
        if (pricePerTreatment === null){
          alert("Đã hủy.");
          break;
        }
        pricePerTreatment = Number(pricePerTreatment.trim());
        if (!Number.isInteger(pricePerTreatment) || pricePerTreatment <= 0){
          alert("Giá phải là số nguyên lớn hơn 0.");
          break;
        }
        let serviceCost = treatmentCount * pricePerTreatment;
        let discount = 0;
        if (serviceCost >= 1000000){
          discount = serviceCost * 0.1;
        }
        let oneTimeFee = (serviceCost - discount) * 0.08;
          let totalPayment = serviceCost - discount + oneTimeFee;
        let invoiceCode = currentAppointmentCode;
        totalRevenue = totalRevenue + totalPayment;
        totalAppointments = totalAppointments + 1;
        currentAppointmentCode = "";
        isAppointmentValid = false;
        console.log("HÓA ĐƠN LOTUS SPA");
      console.log("Mã lịch hẹn: "+invoiceCode);
        console.log("Số liệu trình: "+treatmentCount);
        console.log("Giá mỗi liệu trình: "+pricePerTreatment.toLocaleString("vi-VN")+" VND");
        console.log("Chi phí cơ sở: "+serviceCost.toLocaleString("vi-VN")+" VND");
        console.log("Tiền giảm giá: "+discount.toLocaleString("vi-VN")+" VND");
        console.log("Phí tiện ích: "+oneTimeFee.toLocaleString("vi-VN")+" VND");
        console.log("Tổng thanh toán: "+totalPayment.toLocaleString("vi-VN")+" VND");
        alert("Thanh toán thành công: "+totalPayment.toLocaleString("vi-VN")+" VND");
        break;
      }
      case "3":{
        let customerCode = prompt("Nhập mã khách hàng (chỉ gồm chữ số):");
        if (customerCode === null){
          alert("Đã hủy.");
          break;
        }
        customerCode = customerCode.trim();
        if (customerCode === "" || !/^\d+$/.test(customerCode)){
          alert("Mã phải có ít nhất một chữ số và chỉ gồm chữ số 0-9.");
          break;
        }
        let reversedCode = customerCode.split("").reverse().join("");
        let digitSum = 0;
        for (let i = 0; i < customerCode.length; i++){
          digitSum = digitSum + Number(customerCode[i]);
        }
          let isSymmetric = customerCode === reversedCode;
        let isDivisibleByNine = digitSum % 9 === 0;
        let reward = "Không trúng thưởng";
        if (isSymmetric && isDivisibleByNine){
          reward = "Giải Đặc biệt: miễn phí massage 900.000 VND";
        } else if (isSymmetric){
          reward = "Giải Nhất: liệu trình chăm sóc da 300.000 VND";
        } else if (isDivisibleByNine){
          reward = "Giải Nhì: voucher giảm 50.000 VND";
        }
        console.log("Mã gốc: "+customerCode);
         console.log("Mã đảo ngược: "+reversedCode);
        console.log("Tổng chữ số: "+digitSum);
        console.log("Chia hết cho 9: "+(isDivisibleByNine ? "có" : "không"));
        console.log("Kết quả: "+reward);
        alert(reward);
        break;
      }
      case "0":{
        console.log("BÁO CÁO CA LÀM VIỆC");
        console.log("Tổng lịch hẹn đã thanh toán: "+totalAppointments);
        console.log("Tổng doanh thu: "+totalRevenue.toLocaleString("vi-VN")+" VND");
        if (totalAppointments===0){
          console.log("Doanh thu trung bình: Chưa có lịch hẹn");
        } else{
          let averageRevenue = Math.round(totalRevenue / totalAppointments);
          console.log("Doanh thu trung bình: "+averageRevenue.toLocaleString("vi-VN")+" VND");
        }
        isRunning = false;
        alert("Đã thoát chương trình. Xem báo cáo trong Console.");
        break;
      }
      default:
        alert("Lựa chọn không hợp lệ. Hãy nhập từ 0 đến 3.");
    }
  }
}