import dataStore from 'nedb-promise';

export class CatStore {
  constructor({ filename, autoload }) {
    this.store = dataStore({ filename, autoload });
  }

  async findAll(props) {
    return this.store.find(props);
  }

  async findPagination(userId, no, l) {
    let data = await this.store.find(userId);
    console.log({userId,no,l})
    for(let i=1;i<no;i++) data.shift();
    if(data.length>=l) data.length = l;
    return data;
  }

  async findOne(props) {
    return this.store.findOne(props);
  }

  async insert(note) {
    let noteText = note.text;
    if (!noteText) { // validation
      throw new Error('Missing text property')
    }
    return this.store.insert(note);
  };

  async update(props, cat) {
    return this.store.update(props, cat);
  }

  async remove(props) {
    return this.store.remove(props);
  }
}

export default new CatStore({ filename: './db/cats.json', autoload: true });
