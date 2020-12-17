export default {
    methods:{
        checkLengthValueInInput(){
            for (let i = 0; i < arguments.length; i++) {
                if (arguments[i] === 0) {
                    return false;
                }
            }
            return true;
        },
        checkExistsKey(obj, key){
            for (let prop in obj){
                if (prop === key){
                    return false;
                }
            }
            return true;
        }
    }
};
