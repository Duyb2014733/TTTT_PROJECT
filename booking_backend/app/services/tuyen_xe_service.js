const { ObjectId } = require("mongodb");

class TuyenXeService {
  constructor(client) {
    this.TuyenXe = client.db().collection("tuyenxe");
  }

  async createTuyenXe(payload) {
    const tuyenXe = {
      tentuyen: payload.tentuyen,
      songaytrongtuanchay: payload.songaytrongtuanchay,
      sochuyentrongngay: payload.sochuyentrongngay,
      tgdichuyentb: payload.tgdichuyentb,
      giahienhanh: payload.giahienhanh,
      quangduong: payload.quangduong,
    };

    const result = await this.TuyenXe.insertOne(tuyenXe);
    return result;
  }

  async findTuyenXe(filter) {
    const cursor = await this.TuyenXe.find(filter);
    return await cursor.toArray();
  }

  async findTuyenXeById(id) {
    return await this.TuyenXe.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  async updateTuyenXe(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = {
      $set: {
        tentuyen: payload.tentuyen,
        songaytrongtuanchay: payload.songaytrongtuanchay,
        sochuyentrongngay: payload.sochuyentrongngay,
        tgdichuyentb: payload.tgdichuyentb,
        giahienhanh: payload.giahienhanh,
        quangduong: payload.quangduong,
      },
    };
    const result = await this.TuyenXe.findOneAndUpdate(filter, update, {
      returnDocument: "after",
    });
    return result;
  }

  async deleteTuyenXe(id) {
    const result = await this.TuyenXe.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result;
  }

  async deleteAllTuyenXe() {
    const result = await this.TuyenXe.deleteMany({});
    return result.deletedCount;
  }
}

module.exports = TuyenXeService;
