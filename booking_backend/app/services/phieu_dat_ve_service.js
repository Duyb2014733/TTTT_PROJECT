const { ObjectId } = require("mongodb");

class PhieuDatVeService {
  constructor(client) {
    this.PhieuDatVe = client.db().collection("phieudatve");
  }

  async createPhieuDatVe(payload) {
    const phieuDatVe = {
      ngaylap: payload.ngaylap,
      trangthai: payload.trangthai,
      tongtien: payload.tongtien,
    };

    const result = await this.PhieuDatVe.insertOne(phieuDatVe);
    return result;
  }

  async findPhieuDatVe(filter) {
    const cursor = await this.PhieuDatVe.find(filter);
    return await cursor.toArray();
  }

  async findPhieuDatVeById(id) {
    return await this.PhieuDatVe.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  async updatePhieuDatVe(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = {
      $set: {
        ngaylap: payload.ngaylap,
        trangthai: payload.trangthai,
        tongtien: payload.tongtien,
      },
    };
    const result = await this.PhieuDatVe.findOneAndUpdate(filter, update, {
      returnDocument: "after",
    });
    return result;
  }

  async deletePhieuDatVe(id) {
    const result = await this.PhieuDatVe.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result;
  }

  async deleteAllPhieuDatVe() {
    const result = await this.PhieuDatVe.deleteMany({});
    return result.deletedCount;
  }
}

module.exports = PhieuDatVeService;
