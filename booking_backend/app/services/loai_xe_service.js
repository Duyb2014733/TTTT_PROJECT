const { ObjectId } = require("mongodb");

class LoaiXeService {
  constructor(client) {
    this.LoaiXe = client.db().collection("loaixe");
  }

  async createLoaiXe(payload) {
    const loaiXe = {
      tenloai: payload.tenloai,
      soghe: payload.soghe,
    };

    const result = await this.LoaiXe.insertOne(loaiXe);
    return result;
  }

  async findLoaiXe(filter) {
    const cursor = await this.LoaiXe.find(filter);
    return await cursor.toArray();
  }

  async findLoaiXeById(id) {
    return await this.LoaiXe.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  async updateLoaiXe(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = {
      $set: {
        tenloai: payload.tenloai,
        soghe: payload.soghe,
      },
    };
    const result = await this.LoaiXe.findOneAndUpdate(filter, update, {
      returnDocument: "after",
    });
    return result;
  }

  async deleteLoaiXe(id) {
    const result = await this.LoaiXe.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result;
  }

  async deleteAllLoaiXe() {
    const result = await this.LoaiXe.deleteMany({});
    return result.deletedCount;
  }
}

module.exports = LoaiXeService;
