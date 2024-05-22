const { ObjectId } = require("mongodb");

class NguoiDungService {
  constructor(client) {
    this.NguoiDung = client.db().collection("nguoidung");
    this.PhanQuyen = client.db().collection("phanquyen");
  }

  async getPhanQuyen(phanquyenId) {
    return await this.PhanQuyen.findOne({
      _id: ObjectId.isValid(phanquyenId) ? new ObjectId(phanquyenId) : null,
    });
  }

  async createNguoiDung(payload) {
    const phanquyen = await this.getPhanQuyen(payload.phanquyenId);

    if (!phanquyen) {
      throw new Error("PhanQuyen not found");
    }

    const nguoiDung = {
      email: payload.email,
      sdt: payload.sdt,
      gioitinh: payload.gioitinh,
      namsinh: payload.namsinh,
      diachi: payload.diachi,
      matkhau: payload.matkhau,
      phanquyen: phanquyen,
    };

    const result = await this.NguoiDung.insertOne(nguoiDung);
    return result;
  }

  async findNguoiDung(filter) {
    const cursor = await this.NguoiDung.find(filter);
    return await cursor.toArray();
  }

  async findNguoiDungById(id) {
    return await this.NguoiDung.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  async updateNguoiDung(id, payload) {
    const phanquyen = await this.getPhanQuyen(payload.phanquyenId);

    if (!phanquyen) {
      throw new Error("PhanQuyen not found");
    }

    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = {
      $set: {
        email: payload.email,
        sdt: payload.sdt,
        gioitinh: payload.gioitinh,
        namsinh: payload.namsinh,
        diachi: payload.diachi,
        matkhau: payload.matkhau,
        phanquyen: phanquyen,
      },
    };
    const result = await this.NguoiDung.findOneAndUpdate(filter, update, {
      returnDocument: "after",
    });
    return result;
  }

  async deleteNguoiDung(id) {
    const result = await this.NguoiDung.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result;
  }

  async deleteAllNguoiDung() {
    const result = await this.NguoiDung.deleteMany({});
    return result.deletedCount;
  }
}

module.exports = NguoiDungService;
