const { ObjectId } = require("mongodb");

class ChuyenXeService {
  constructor(client) {
    this.ChuyenXe = client.db().collection("chuyenxe");
  }

  async createChuyenXe(payload) {
    const chuenXe = {
      tenchuyenxe: payload.tenchuyenxe,
      thoidiemdiTT: payload.thoidiemdiTT,
      tgdukienden: payload.tgdukienden,
      tgdukienkhoihanh: payload.tgdukienkhoihanh,
      gia: payload.gia,
    };

    const result = await this.ChuyenXe.insertOne(chuenXe);
    return result;
  }

  async findChuyenXe(filter) {
    const cursor = await this.ChuyenXe.find(filter);
    return await cursor.toArray();
  }

  async findChuyenXeById(id) {
    return await this.ChuyenXe.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  async updateChuyenXe(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = {
      $set: {
        tenchuyenxe: payload.tenchuyenxe,
        thoidiemdiTT: payload.thoidiemdiTT,
        tgdukienden: payload.tgdukienden,
        tgdukienkhoihanh: payload.tgdukienkhoihanh,
        gia: payload.gia,
      },
    };
    const result = await this.ChuyenXe.findOneAndUpdate(filter, update, {
      returnDocument: "after",
    });
    return result;
  }

  async deleteChuyenXe(id) {
    const result = await this.ChuyenXe.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result;
  }

  async deleteAllChuyenXe() {
    const result = await this.ChuyenXe.deleteMany({});
    return result.deletedCount;
  }
}

module.exports = ChuyenXeService;
