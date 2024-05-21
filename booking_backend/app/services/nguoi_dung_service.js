const { ObjectId } = require("mongodb");

class NguoiDungService {
  constructor(client) {
    this.NguoiDung = client.db().collection("nguoidung");
  }

  async createNguoiDung(payload) {
    const nguoiDung = {
      email: payload.email,
      sdt: payload.sdt,
      gioitinh: payload.gioitinh,
      namsinh: payload.namsinh,
      diachi: payload.diachi,
      matkhau: payload.matkhau,
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
