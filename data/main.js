
  var data =[];
  var danhSachPhieuPhuHienTai = [];
  var danhSachPhieuPhuMoi = []; //danh sách các mẫu chính là nằm trong danh sách các phiếu phụ

  var danhSachDoiTuong = [];
  var daLoadDanhSachDoiTuong = false;

  var danhSachChiTieuHienTai = [];
  var danhSachChiTieuMoi = [];

  var danhMucChiTieu = [];

  var tongSoTien1MauHienTai = 0;
  var tongSoTien1MauMoi = 0;  

  var danhSachKhachHang = [];  
  
  
  class PhieuYeuCau
  {
    constructor(constructorData={})
    {
      this.dongSheet = constructorData.dongSheet || 0;
      this.nguoiNhan = constructorData.nguoiNhan || '';
      this.ngayNhan = constructorData.ngayNhan || '';
      this.thangNhan = constructorData.thangNhan || '';
      this.namNhan = constructorData.namNhan || '';
      this.soPhieuFull = constructorData.soPhieuFull || '';
      this.soPhieuChinh = tachSoPhieuChinh(this.soPhieuFull) || '';
      this.soPhieuPhu = tachSoPhieuPhu(this.soPhieuFull) || '';
      this.khachHang = constructorData.khachHang || '';
      this.donVi = constructorData.donVi || '';
      this.diaChi = constructorData.diaChi || '';
      this.dienThoai = constructorData.dienThoai || '';
      this.maSoThue = constructorData.maSoThue || '';
      this.tenMau = constructorData.tenMau || '';
      this.maHoaMau = constructorData.maHoaMau || '';
      this.luongMau = constructorData.luongMau || '';
      this.tinhTrangMau = constructorData.tinhTrangMau || '';
      this.doiTuongThuNghiem = constructorData.doiTuongThuNghiem || '';
      this.kyHieuDoiTuong = constructorData.kyHieuDoiTuong || '';
      this.thoiGianLuuMau = constructorData.thoiGianLuuMau || '';
      this.ngayHenTra = constructorData.ngayHenTra || '';
      this.thangHenTra = constructorData.thangHenTra || '';
      this.namHenTra = constructorData.namHenTra || '';
      this.ngayTraThucTe = constructorData.ngayTraThucTe || '';
      this.thangTraThucTe = constructorData.thangTraThucTe || '';
      this.namTraThucTe = constructorData.namTraThucTe || '';
      this.hinhThucTra = constructorData.hinhThucTra || '';
      this.yeuCauKhac = constructorData.yeuCauKhac || '';
      this.tongSoTien = constructorData.tongSoTien || '';
      this.danhSachChiTieu = constructorData.danhSachChiTieu || [];
    }

    renderForDanhSachPhieuYeuCau()
    {
        let html = `<div class="data-card" onclick="chiTietPhieuYeuCau('${this.soPhieuFull}')">
                        <div class="data-card__dong1">
                            <div class="data-card__ngayThangNam">${this.ngayNhan}/${this.thangNhan}/${this.namNhan}</div>
                            <div class="data-card__soPhieu">${this.soPhieuFull}</div>
                            <div class="data-card__tenKhachHang">${this.khachHang}</div>
                        </div>
                        <div class="data-card__dong2">${this.tenMau}</div>
                    </div>`;
        return html;
    }

    renderForEditDanhSachMau(stt)
    {
      let index = stt -1;
      let html = `
        <div class="editPhieu__danhSachMau__dong" style="background-color: var(--surface);color: var(--text-main);">
          <div>${stt}</div>
          <div id="editDanhSachMau_dong_maHoaMau_${index}">
            ${this.maHoaMau}
          </div>
          <div style="text-align:left;" id="editDanhSachMau_dong_tenMau_${index}">
            ${this.tenMau}
          </div>
          <div onclick="xoaMau(this.id);" style="cursor:pointer;background:white;padding:5px;"
             id="editDanhSachMau_dong_soPhieuFull_${index}">
            x
          </div>
        </div>`;
      return html;
    }

    renderForChiTietPhieu(stt)
    {
      return `
      <div class="chiTietPhieu__danhSachMau__dong" style="background-color: var(--surface);color: var(--text-main);">
        <div>${stt}</div>
        <div>
          ${this.maHoaMau}
        </div>
        <div style="text-align:left;">
          ${this.tenMau}
        </div>          
      </div>`;
    }
  }


  class DoiTuong
  {
    constructor(constructorData={})
    {
      this.kyHieu = constructorData.kyHieu || '';
      this.ten = constructorData.ten || '';
      this.soLuong = constructorData.soLuong || 0;
      this.donViTinh = constructorData.donViTinh || '';
      this.thoiGianLuuMau = constructorData.thoiGianLuuMau || '';
      this.cacChiTieuGanDay = constructorData.cacChiTieuGanDay || '';
    }

    renderForEditNoiDungChinh()
    {
      let html = `
      <option value="${this.kyHieu}">${this.ten}</option>
      `;
      return html;
    }
  }


  class ChiTieu
  {
    constructor(constructorData={})
    {
      this.id = constructorData.id || '';
      this.kyHieuDoiTuong = constructorData.kyHieuDoiTuong || '';

      this.ten = constructorData.ten || '';
      this.phuongPhapThu = constructorData.phuongPhapThu || '';
      this.gioiHanChoPhep = constructorData.gioiHanChoPhep || '';
      this.donViTinh = constructorData.donViTinh || '';      
      this.ketQua = constructorData.ketQua || '';
      this.phiThuNghiem = constructorData.phiThuNghiem || '';
    }


    renderForChiTietPhieu(stt)
    {
      return `<div class="chiTietPhieu__danhSachChiTieu__dong" style="padding:var(--padding-md);background:var(--surface);">
                  <div>${stt}</div>
                  <div>
                    ${this.ten}
                  </div>
                  <div>
                    ${this.phuongPhapThu}
                  </div>
                  <div>
                    ${formatNumber(this.phiThuNghiem + "000")}
                  </div>
                </div>`;
    }

    renderForEditChiTieu(checked = '', stt)
    {
      return `<div class="editPhieu__danhSachChiTieu__dong" style="padding:var(--padding-md);background:var(--surface);">
                  <div>${stt}</div>
                  <div>
                    ${this.ten}
                  </div>
                  <div>
                    ${this.phuongPhapThu}
                  </div>
                  <div>
                    ${formatNumber(this.phiThuNghiem + "000")}
                  </div>
                  <div>
                    <input type="checkbox" ${checked}>
                  </div>
                </div>`;
    }



  }


    
  


  function loadDanhSachDoiTuong()
  {
    document.getElementById('editPhieu_noiDungChinh_doiTuongXetNghiem').innerHTML = '';
    google.script.run.withSuccessHandler(function(response)
    {
      for (let i=0; i<response.length; i++)
      {
       danhSachDoiTuong.push(new DoiTuong(response[i]));
      }

     danhSachDoiTuong.forEach(doiTuong => {
        document.getElementById('editPhieu_noiDungChinh_doiTuongXetNghiem').innerHTML +=doiTuong.renderForEditNoiDungChinh();
      });
      daLoadDanhSachDoiTuong = true;
      document.getElementById('chiTietPhieu_tomTat_buttonEdit').classList.remove("button-disable");
    }).getDanhSachDoiTuong();
  }


  function loadDanhMucChiTieu()
  {
    google.script.run.withSuccessHandler(function(response)
    {
      for (let i=0; i<response.length; i++)
      {
       danhMucChiTieu.push(new ChiTieu(response[i]));
      }
    }).getDanhMucChiTieu();
  }



  function timKiemTomTatCacPhieu(soPhieuFull, danhSachData)
  {
    let ketQua = [];
    for (let i = danhSachData.length -1; i>=0; i--)
    {
      if (tachSoPhieuChinh(soPhieuFull) == danhSachData[i].soPhieuChinh)
      {        
        ketQua.push(danhSachData[i]);
      }
    }
    return ketQua;
  }


  function updateSoLuongChiTieu(soPhieuFull, danhSachData, soMau)
  {
    danhSachChiTieuHienTai = [];
    document.getElementById('chiTietPhieu_tomTat_noiDung_soChiTieu').innerText = "--";
    document.getElementById('chiTietPhieu_tomTat_noiDung_tongSoTien').innerText = "đang load..";
    document.getElementById('chiTietPhieu_chiTietDoiTuongChiTieu_danhSachChiTieu').innerHTML = 'đang load..';
    document.getElementById('editPhieu_editChiTieu_danhSachChiTieu').innerHTML = 'đang load..';
    
    for (let i = danhSachData.length -1; i>=0; i--)
    {
      if (soPhieuFull == danhSachData[i].soPhieuFull)
      {
        let stt = 0;
        google.script.run.withSuccessHandler(function(response)
        {
          document.getElementById('chiTietPhieu_chiTietDoiTuongChiTieu_danhSachChiTieu').innerHTML = '';
          document.getElementById('editPhieu_editChiTieu_danhSachChiTieu').innerHTML = '';
          tongSoTien1MauHienTai = 0;
          for (let j = 0; j<response.length; j=j+6)
          {
            if (response[j] !== "")
            {
              stt++;
              tongSoTien1MauHienTai += parseInt(response[j+5]);
              let chiTieuMoi = new ChiTieu({
                  id:'',
                  kyHieuDoiTuong: '',
                  ten: response[j],
                  phuongPhapThu : response[j+1],
                  donViTinh : response[j+2],
                  gioiHanChoPhep : response[j+3],
                  ketQua : response[j+4],
                  phiThuNghiem : response[j+5]
                });
              danhSachChiTieuHienTai.push(chiTieuMoi);

              document.getElementById('chiTietPhieu_chiTietDoiTuongChiTieu_danhSachChiTieu').innerHTML += chiTieuMoi.renderForChiTietPhieu(stt);

              //Show in edit danh sách chỉ tiêu:
              document.getElementById('editPhieu_editChiTieu_danhSachChiTieu').innerHTML += chiTieuMoi.renderForEditChiTieu("checked", stt);
            }
            else
            {
              break;
            }
          }

          
          //Load danh sách chỉ tiêu (trong phiếu đã lưu và danh mục các chỉ tiêu chưa chọn) và danh sách các combo chỉ tiêu mới sử dụng gần đây.
          let kyHieuDoiTuong = danhSachData[i].kyHieuDoiTuong;
          //Nếu đã đổi đối tượng mới (sửa chọn đối tượng khác): Load toàn bộ danh mục chỉ tiêu có ký hiệu đối tượng đã chọn và unchecked all
          //nếu chưa đổi đối tượng:  Load toàn bộ chỉ tiêu đã lưu trong data (phiếu đã xuất) có ký hiệu đối tượng trên vào danh sách chọn. Sau đó load các chỉ tiêu còn lại trong danh mục chỉ tiêu (có 1 trong các thông tin khác với các chỉ tiêu đã load)
          let doiTuongMoi = false;
          if (danhSachPhieuPhuHienTai.length == 0 || danhSachPhieuPhuMoi.length == 0 ) //Tạo mới
          {
            doiTuongMoi = true;
          }
          else if (danhSachPhieuPhuHienTai[0].kyHieuDoiTuong !== danhSachPhieuPhuMoi[0].kyHieuDoiTuong) //Đổi đối tượng
          {
            doiTuongMoi = true;
          }

          if (doiTuongMoi)
          {
            document.getElementById('editPhieu_editChiTieu_danhSachChiTieu').innerHTML = '';
            let html = '';
            for (let k=0; k <danhMucChiTieu.length; k++)
            {
              if (danhMucChiTieu[k].kyHieuDoiTuong == kyHieuDoiTuong)
              {
                html += danhMucChiTieu[k].renderForEditChiTieu("", stt);
              }
            }
            document.getElementById('editPhieu_editChiTieu_danhSachChiTieu').innerHTML = html;
          }
          else
          {
            let html = '';
            for (let k=0; k <danhMucChiTieu.length; k++)
            {
              if (danhMucChiTieu[k].kyHieuDoiTuong == kyHieuDoiTuong)
              {
                if (danhSachChiTieuMoi.includes(danhMucChiTieu[k])) {} // Nếu đã nằm trong danh sách chỉ tiêu của phiếu rồi thì thôi
                else
                {
                  html += danhMucChiTieu[k].renderForEditChiTieu("", stt);
                }                  
              }
            }
            document.getElementById('editPhieu_editChiTieu_danhSachChiTieu').innerHTML += html;
          }
            
          //Cập nhật danh sách chọn gần đây:
          document.getElementById('editPhieu_editChiTieu_danhSachChiTieuGanDay').innerHTML = `<option value="-1">-</option>`;

          for (let k=0; k< danhSachDoiTuong.length; k ++)
          {
            if (danhSachDoiTuong[k].kyHieu == kyHieuDoiTuong)
            {
              //lấy lịch sử combo chỉ tiêu vừa sử dụng
              break;
            }
          }

          let tongSoTien_format = formatNumber(tongSoTien1MauHienTai*1000*soMau) + "đ";
          document.getElementById('chiTietPhieu_tomTat_noiDung_soChiTieu').innerText = danhSachChiTieuHienTai.length;
          document.getElementById('chiTietPhieu_tomTat_noiDung_tongSoTien').innerText = tongSoTien_format ;
          document.getElementById('editPhieu_noiDungChinh_soChiTieuXetNghiem').innerText  = danhSachChiTieuHienTai.length;
          document.getElementById('editPhieu_noiDungChinh_tongSoTien').innerText = tongSoTien_format ;
          document.getElementById('chiTietPhieu_tomTat_noiDung_buttonChiTiet').classList.remove('button-disable');
          document.getElementById('editPhieu_noiDungChinh_buttonShowEditMau').classList.remove('button-disable');
          document.getElementById('editPhieu_noiDungChinh_buttonShowEditChiTieu').classList.remove('button-disable');
        }).getDongDataChiTiet(danhSachData[i].dongSheet);
        break;
      }
    }    
  }
