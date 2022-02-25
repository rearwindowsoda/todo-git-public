const { pool } = require('../utils/db');
const { v4: uuid } = require('uuid');

class TodoRecord {
  constructor(obj) {
    this.title = obj.title;
    this.id = obj.id;
    this._validate();
  }
  _validate() {
    if (this.title.trim() < 5) {
      throw new Error('Tytuł zadania musi mieć przynajmniej 5 znaków');
    }

    if (this.title.length > 150) {
      throw new Error('Tytuł zadania nie może być większy niż 150 znaków');
    }
  }
  async insert() {
    this.id = this.id ?? uuid();
    await pool.execute('INSERT INTO `todos` VALUES(:id, :title)', {
      id: this.id,
      title: this.title.trim(),
    });
    return this.id;
  }
  static async delete(id) {
    if (!id) {
      throw new Error('Todo has no ID!');
    }
    await pool.execute('DELETE FROM `todos` WHERE `id` = :id', { id: id });
  }
  static async find(id) {
    const [results] = await pool.execute(
      'SELECT * FROM `todos` WHERE `id` = :id',
      { id: id }
    );
    return results.length === 1 ? new TodoRecord(results[0]) : null;
  }
  static async findAll() {
    const [results] = await pool.execute(
        'SELECT * from `todos`');
    const mappedResults = results.map(element => new TodoRecord(element));
   if(mappedResults.length >= 1){
     return mappedResults
   }
   else{
     return null
   }

    }

  async update() {
    if (!this.id) {
      throw new Error('Todo has no ID!');
    }
    this._validate();
    await pool.execute('UPDATE `todos` SET `title` = :title WHERE `id` = :id', {
      id: this.id,
      title: this.title,
    });
    return this.id;
  }
}

module.exports = {
  TodoRecord,
};
