export default class User {
    constructor({
        id = null,
        roles = [],
        firebase
    }) {
        this.firebase = firebase;
        this.id = id;
        this.roles = roles;
    }

    /**
     * 
     * @param {*} role - key:{write: true, read: false}
     */
    addNewRole (role) {
        this.roles = {
            ...this.roles,
            role
        };
    }
}