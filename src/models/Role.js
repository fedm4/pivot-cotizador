export default class Role {
    constructor({
        id = null,
        name = null,
        firebase = null
    }) {
        //if(!firebase) throw new Error('Firebase must be defined');

        this.firebase = firebase;
        this.id = id;
        this.name = name;
    }

    /******************
     * Static methods *
     ******************/

    static get getCollection() {
        return 'roles';
    }
    static async getAll(firebase) {
        try{ 
            const snapshot = await firebase.getAll(this.getCollection);
            return snapshot.docs.map(doc => new Role({id: doc.id, name: doc.data().name}));
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
