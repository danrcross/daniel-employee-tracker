class GetList {
  constructor(query) {
    this.query = query;
  }
  createDepartmentList(db) {
    db.then((conn) => conn.query(this.query)).then(([rows, fields]) => {
      const names = rows.map((item) => {
        return { name: item.name, value: item.id };
      });
      return names;
    });
  }
}

module.exports = GetList;
