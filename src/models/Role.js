export default class Role {
    constructor({
        id = null,
        name = null,
        firebase
    }) {
        if(!firebase) throw new Error('Firebase must be defined');

        this.firebase = firebase;
        this.id = id;
        this.name = name;
        this.refName = Role.refName;
    }

    async create () {
        try {
            return await this.firebase.create(this.refName, {name: this.name});
        } catch(err) {
            throw err;
        }
    }

    /******************
     * Static methods *
     ******************/

    static get refName() {
        return 'roles';
    }
    static async getAll(firebase) {
        try{ 
            return await firebase.getAll('roles');
        } catch(err) {
            throw err;
        }
    }
    static async getByName(name) {
        try{

        }catch(err){

        }
    }
    static async getById(id, setter) {
        try{
            this.firebase.get(`/${this.refName}/${this.id}`, setter);
        }catch(err){
            throw new Error(`Error getting by id ${this.id} - ${err}`);
        }
    }
}
